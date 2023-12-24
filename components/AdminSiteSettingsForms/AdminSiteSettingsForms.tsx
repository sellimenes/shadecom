'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, NumberInput, Stack, TextInput } from '@mantine/core';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';

type Props = {
  settingsData?: any;
};

const schema = z.object({
  WebsiteName: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  WebsiteDescription: z
    .string()
    .min(40, { message: 'Description should have at least 40 letters' }),
  WebsiteEmail: z.string().email({ message: 'Invalid email' }),
  WebsitePhone: z.number().lte(999999999999, { message: 'Invalid phone number' }).gte(1000000000),
});

const AdminSiteSettingsForms = ({ settingsData }: Props) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      WebsiteName: settingsData?.WebsiteName,
      WebsiteDescription: settingsData?.WebsiteDescription,
      WebsiteEmail: settingsData?.WebsiteEmail,
      WebsitePhone: settingsData?.WebsitePhone,
    },
    validate: zodResolver(schema),
  });

  const handleSubmit = async () => {
    try {
      form.validate();
      setLoading(true);

      // Convert WebsitePhone to string
      const formValuesWithStringPhone = {
        ...form.values,
        WebsitePhone: String(form.values.WebsitePhone), // Ensure string conversion
      };

      // Add + sign to the beginning of the phone number
      formValuesWithStringPhone.WebsitePhone = '+' + formValuesWithStringPhone.WebsitePhone;

      await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'settings', {
        method: 'PUT',
        body: JSON.stringify(formValuesWithStringPhone),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(settingsData);
  }, [settingsData]);
  return (
    <Stack gap={6}>
      <TextInput
        disabled={loading}
        label="Site Name"
        placeholder="Shade."
        {...form.getInputProps('WebsiteName')}
      />
      <TextInput
        disabled={loading}
        label="Site Description"
        placeholder="Lorem ipsum dolor sit amet..."
        {...form.getInputProps('WebsiteDescription')}
      />
      <TextInput
        disabled={loading}
        label="Email"
        placeholder="info@sitename.com"
        {...form.getInputProps('WebsiteEmail')}
      />
      <NumberInput
        disabled={loading}
        label="Phone"
        placeholder="850 555 5555"
        allowNegative={false}
        allowDecimal={false}
        hideControls
        leftSection="+"
        {...form.getInputProps('WebsitePhone')}
      />
      <Button
        loading={loading}
        loaderProps={{ type: 'dots' }}
        onClick={handleSubmit}
        maw={'max-content'}
        variant="gradient"
        gradient={{ from: 'pink', to: 'primary' }}
      >
        Save
      </Button>
    </Stack>
  );
};

export default AdminSiteSettingsForms;
