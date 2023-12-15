'use client';

import React, { useEffect } from 'react';
import classes from './AdminProductForm.module.css';

import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';
import { Grid, Paper, Stack, Text, Box, TextInput, Button, Flex, NumberInput } from '@mantine/core';
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
    published: z.boolean(),
    metaTitle: z.string().min(2, { message: 'Meta title should have at least 2 letters' }),
    metaDescription: z
      .string()
      .min(2, { message: 'Meta description should have at least 2 letters' }),
    metaKeywords: z.string().min(2, { message: 'Meta keywords should have at least 2 letters' }),
  });

  const form = useForm({
    initialValues: {
      name: '',
      //   price: 0,
      //   salePrice: 0,
      //   saleDiscount: 0,
      stock: 0,
      category: '',
      description: '',
      images: [],
      published: false,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
    },
    validate: zodResolver(schema),
  });

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
    if (form.validate().hasErrors) {
      console.log('error');
    }

    console.log('test');
  };

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
            <Flex gap={16} mt={8}>
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
          <FormPaper title="Product Gallery">test</FormPaper>
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
          <FormPaper title="Category">test</FormPaper>
          <FormPaper title="Publish">Test</FormPaper>
          <FormPaper title="Meta Data">Test</FormPaper>
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
