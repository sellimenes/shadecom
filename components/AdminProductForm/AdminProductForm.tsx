'use client';

import React, { useEffect, useState } from 'react';
import classes from './AdminProductForm.module.css';
import '@mantine/dropzone/styles.css';

import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import {
  Grid,
  Paper,
  Stack,
  Text,
  Box,
  TextInput,
  Button,
  Flex,
  NumberInput,
  Combobox,
  useCombobox,
  UnstyledButton,
  Textarea,
  TagsInput,
  Autocomplete,
  Select,
  Group,
  rem,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { RichTextEditorComp } from '@/components/RichTextEditor/RichTextEditor';

type Props = {};

const AdminProductForm = (props: Props) => {
  const schema = z.object({
    name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
    price: z.number().min(0, { message: 'Price should be greater than 0' }),
    salePrice: z.number().optional(),
    saleDiscount: z.number().optional(),
    stock: z.number().min(0, { message: 'Stock should be greater than 0' }),
    category: z.string().min(2, { message: 'Category should have at least 2 letters' }),
    description: z.string().min(2, { message: 'Description should have at least 2 letters' }),
    images: z.array(z.string()),
    published: z.string(),
    metaTitle: z
      .string()
      .min(10, { message: 'Meta title should have at least 10 letters' })
      .optional(),
    metaDescription: z
      .string()
      .min(100, { message: 'Meta description should have at least 100 letters' })
      .optional(),
    metaKeywords: z.array(z.string()).optional(),
  });

  const form = useForm({
    initialValues: {
      // name: '',
      // price: 0,
      // salePrice: 0,
      // saleDiscount: 0,
      stock: 0,
      category: '',
      description: '',
      images: [],
      published: 'Draft',
      // metaTitle: '',
      // metaDescription: '',
      metaKeywords: [],
    },
    validate: zodResolver(schema),
  });

  const [images, setImages] = useState<any[]>([]);

  const uploadImages = async () => {
    // Create a new FormData object
    const formData = new FormData();
    // Loop over the images array and append each file to the FormData object
    for (let i = 0; i < images.length; i++) {
      formData.append('files[]', images[i]);
    }
    const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'uploads', {
      method: 'POST',
      body: formData,
    });
  };

  //   Set initial values on edit mode.
  //   useEffect(() => {
  //     fetch('/api/user')
  //       .then((res) => res.json())
  //       .then((data) => {
  //         // Update initial values after form was initialized
  //         // These values will be used in form.reset
  //         // and to compare values to get dirty state
  //         form.setInitialValues(data);
  //         form.setValues(data);
  //       });
  //   }, []);

  const handleSubmit = () => {
    uploadImages();
    if (form.validate().hasErrors) {
      console.log('error');
    }

    console.log(form);
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <Grid>
      <Grid.Col span={{ base: 12, lg: 'auto' }}>
        <Stack>
          <FormPaper title="General Information">
            <TextInput
              label="Product Name"
              placeholder="Enter product name"
              required
              {...form.getInputProps('name')}
            />
            <Flex gap={16} mt={8} align={'flex-start'}>
              <NumberInput
                label="Price"
                description="Product price"
                placeholder="123"
                min={0}
                required
                {...form.getInputProps('price')}
              />
              <NumberInput
                label="Sale Price"
                description="Sale price, leave empty if product is not on sale"
                placeholder="49.99"
                min={0}
                {...form.getInputProps('salePrice')}
              />
              <NumberInput
                label="Discount"
                description="Discount in %, leave empty if product is not on sale"
                placeholder="25%"
                min={0}
                {...form.getInputProps('saleDiscount')}
              />
              <NumberInput
                label="Stock"
                description="Product stock"
                placeholder="0"
                min={0}
                required
                {...form.getInputProps('stock')}
              />
            </Flex>
          </FormPaper>
          <FormPaper title="Product Gallery">
            <Dropzone
              // loading
              onDrop={(files) => setImages([...images, ...files])}
              onReject={(files) => console.log('rejected files', files)}
              maxSize={5 * 1024 ** 2}
              accept={IMAGE_MIME_TYPE}
              {...props}
            >
              <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                <Dropzone.Accept>
                  <IconUpload
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: 'var(--mantine-color-blue-6)',
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Accept>
                <Dropzone.Reject>
                  <IconX
                    style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                    stroke={1.5}
                  />
                </Dropzone.Reject>
                <Dropzone.Idle>
                  <IconPhoto
                    style={{
                      width: rem(52),
                      height: rem(52),
                      color: 'var(--mantine-color-dimmed)',
                    }}
                    stroke={1.5}
                  />
                </Dropzone.Idle>

                <div>
                  <Text size="xl" inline>
                    Drag images here or click to select files
                  </Text>
                  <Text size="sm" c="dimmed" inline mt={7}>
                    Attach as many files as you like, each file should not exceed 5mb
                  </Text>
                </div>
              </Group>
            </Dropzone>
            {images.length > 0 && (
              <Flex wrap="wrap" mt={8} gap="sm">
                {images.map((image) => (
                  <Paper
                    key={image.path}
                    shadow="sm"
                    style={{ width: rem(120), height: rem(120) }}
                    withBorder
                  >
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Paper>
                ))}
              </Flex>
            )}
          </FormPaper>
          <FormPaper title="Description">
            <RichTextEditorComp />
          </FormPaper>
        </Stack>
        <Button mt={8} onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 4 }}>
        <Stack>
          <FormPaper title="Category">
            <CategoryCombobox />
          </FormPaper>
          <FormPaper title="Status">
            <Select
              label="Published"
              placeholder="Select published status"
              data={['Published', 'Draft']}
              required
              {...form.getInputProps('published')}
            />
          </FormPaper>
          <FormPaper title="Meta Data">
            <Stack gap={8}>
              <TextInput
                label="Meta Title"
                placeholder="Enter meta title"
                {...form.getInputProps('metaTitle')}
              />
              <Textarea
                label="Meta Description"
                placeholder="Enter meta description"
                {...form.getInputProps('metaDescription')}
              />
              <TagsInput
                label="Meta Keywords (max 5)"
                placeholder='Press "Enter" to add new keyword'
                clearable
                maxTags={5}
                {...form.getInputProps('metaKeywords')}
                defaultValue={[]}
              />
            </Stack>
          </FormPaper>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

export default AdminProductForm;

const FormPaper: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
  <Paper shadow="sm" withBorder>
    <Box className={classes.paperTitle}>
      <Text size="md" fw={500} p={'sm'}>
        {title}
      </Text>
    </Box>
    <Box p={'sm'}>{children}</Box>
  </Paper>
);

const categories = ['Electronics', 'Clothing', 'Shoes', 'Accessories', 'Jewelry', 'Watches'];
const CategoryCombobox = () => {
  const combobox = useCombobox();
  const [value, setValue] = useState('');
  const shouldFilterOptions = !categories.some((item) => item === value);
  const filteredOptions = shouldFilterOptions
    ? categories.filter((item) => item.toLowerCase().includes(value.toLowerCase().trim()))
    : categories;

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));
  return (
    <Box className={classes.categoryComboboxWrapper}>
      <UnstyledButton className={classes.addCategoryBtn}>Add New</UnstyledButton>
      <Combobox
        onOptionSubmit={(optionValue) => {
          setValue(optionValue);
          combobox.closeDropdown();
        }}
        store={combobox}
      >
        <Combobox.Target>
          <TextInput
            required
            label="Choose category"
            placeholder="Choose category or type to search"
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {options.length === 0 ? <Combobox.Empty>Nothing found</Combobox.Empty> : options}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </Box>
  );
};
