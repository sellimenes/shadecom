'use client';

import React, { useCallback, useState, useMemo, useEffect } from 'react';

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
  Select,
  Group,
  rem,
  CloseButton,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';

import { RichTextEditorComp } from '@/components/RichTextEditor/RichTextEditor';

import '@mantine/dropzone/styles.css';
import classes from './AdminProductForm.module.css';
import { getCategories } from '@/lib/actionsCategories';

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

type Props = {};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const imgS3BaseURL = 'https://shadecom.s3.eu-central-1.amazonaws.com/';

const FormPaper: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => (
  <Paper shadow="sm" withBorder>
    <Box className={classes.paperTitle}>
      <Text size="md" fw={500} p="sm">
        {title}
      </Text>
    </Box>
    <Box p="sm">{children}</Box>
  </Paper>
);

interface Category {
  Name: string;
  ID: number;
}
const CategoryCombobox = ({
  loading,
  onSelect,
}: {
  loading: boolean;
  onSelect: (ID: number) => void;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const combobox = useCombobox();
  const [value, setValue] = useState<any>('');

  const handleCategories = useCallback(async () => {
    const categories = await getCategories();
    setCategories(categories);
  }, []);

  useEffect(() => {
    handleCategories();
  }, []);

  useEffect(() => {
    console.log(value);
  }, [value]);

  const shouldFilterOptions = !categories.some((item) => item.Name === value);
  const filteredOptions: any = shouldFilterOptions
    ? categories.filter((item) => item.Name.toLowerCase().includes(value.toLowerCase().trim()))
    : categories;

  const options = useMemo(
    () =>
      filteredOptions.map((item: any) => (
        <Combobox.Option value={item} key={item.ID}>
          {item.Name}
        </Combobox.Option>
      )),
    [filteredOptions]
  );

  return (
    <Box className={classes.categoryComboboxWrapper}>
      <UnstyledButton className={classes.addCategoryBtn}>Add New</UnstyledButton>
      <Combobox
        disabled={loading}
        onOptionSubmit={(optionValue: any) => {
          setValue(optionValue.Name);
          onSelect(optionValue.ID);
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
              setValue(event.target.value);
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

const AdminProductForm = (props: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [images, setImages] = useState<FileWithPath[]>([]);
  const [imagesURLList, setImagesURLList] = useState<string[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const form = useForm({
    initialValues: {
      name: '',
      price: null,
      salePrice: null,
      saleDiscount: null,
      stock: null,
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

  const uploadImages = useCallback(async () => {
    const formData = new FormData();
    for (let i = 0; i < images.length; i += 1) {
      formData.append('files[]', images[i]);
    }
    await fetch(`${API_BASE_URL}upload`, {
      method: 'POST',
      body: formData,
    });
  }, [images]);

  const deleteImageFromState = useCallback((image: FileWithPath) => {
    setImages(images.filter((img) => img.path !== image.path));
  }, []);

  const createProduct = useCallback(async (product: any) => {
    await fetch(`${API_BASE_URL}product`, {
      method: 'POST',
      body: JSON.stringify(product),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }, []);

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      if (form.validate().hasErrors) {
        console.log('error');
        // return;
      }

      await uploadImages();

      if (form.values.price === 0 || form.values.salePrice === 0) {
        console.log('price is 0, are you crazy?');
        return;
      }

      const { name, description, price, stock, published, salePrice, saleDiscount } = form.values;
      const product = {
        Name: name,
        Description: description,
        Price: price,
        Stock: stock,
        Images: imagesURLList,
        CategoryID: selectedCategoryId,
        // TODO: Isactive true always...
        IsActive: published === 'Published' ? true : false,
        IsSale: salePrice && saleDiscount,
        IsFeatured: false,
        SaleProcent: saleDiscount,
      };
      await createProduct(product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [form, images, uploadImages, createProduct]);

  useEffect(() => {
    console.log(form.values);
  }, [form.values]);

  return (
    <Grid>
      <Grid.Col span={{ base: 12, lg: 'auto' }}>
        <Stack>
          <FormPaper title="General Information">
            <TextInput
              disabled={loading}
              label="Product Name"
              placeholder="Enter product name"
              required
              {...form.getInputProps('name')}
            />
            <Flex gap={16} mt={8} align="flex-start">
              <NumberInput
                disabled={loading}
                label="Price"
                description="Product price"
                placeholder="123"
                min={0}
                required
                {...form.getInputProps('price')}
              />
              <NumberInput
                disabled={loading}
                label="Sale Price"
                description="Sale price, leave empty if product is not on sale"
                placeholder="49.99"
                min={0}
                {...form.getInputProps('salePrice')}
              />
              <NumberInput
                disabled={loading}
                label="Discount"
                description="Discount in %, leave empty if product is not on sale"
                placeholder="25%"
                min={0}
                {...form.getInputProps('saleDiscount')}
              />
              <NumberInput
                disabled={loading}
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
              loading={loading}
              onDrop={(files: FileWithPath[]) => {
                const newImages = [...images, ...files];
                setImages(newImages);
                setImagesURLList(newImages.map((img) => imgS3BaseURL + img.path));
              }}
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
                    className={classes.imageWrapper}
                  >
                    <CloseButton
                      className={classes.deleteImgBtn}
                      onClick={() => deleteImageFromState(image)}
                    />
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
            <RichTextEditorComp disabled={loading} />
          </FormPaper>
        </Stack>
        <Button loading={loading} mt={8} onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 4 }}>
        <Stack>
          <FormPaper title="Category">
            <CategoryCombobox
              loading={loading}
              onSelect={(selectedCategory: number) => setSelectedCategoryId(selectedCategory)}
            />
          </FormPaper>
          <FormPaper title="Status">
            <Select
              disabled={loading}
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
                disabled={loading}
                label="Meta Title"
                placeholder="Enter meta title"
                {...form.getInputProps('metaTitle')}
              />
              <Textarea
                disabled={loading}
                label="Meta Description"
                placeholder="Enter meta description"
                {...form.getInputProps('metaDescription')}
              />
              <TagsInput
                disabled={loading}
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
