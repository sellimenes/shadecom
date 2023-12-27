'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { Button, NumberInput, Stack, TextInput } from '@mantine/core';
import { z } from 'zod';
import { zodResolver } from 'mantine-form-zod-resolver';
import { changeSettings, revalidateSettings } from '@/lib/actionsSettings';

type Props = {
  settingsData?: any;
};

const phoneRegex = /^(05|5)?[0-9]{9}$/;
const schema = z.object({
  WebsiteName: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  WebsiteDescription: z
    .string()
    .min(40, { message: 'Description should have at least 40 letters' }),
  WebsiteEmail: z.string().email({ message: 'Invalid email' }),
  WebsitePhone: z.string().min(10, { message: 'Invalid phone number' }),
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
      setLoading(true);

      // Convert WebsitePhone to string
      const formValuesWithStringPhone = {
        ...form.values,
        WebsitePhone: String(form.values.WebsitePhone), // Ensure string conversion
      };

      // form.validate();
      await changeSettings(formValuesWithStringPhone);
      // revalidateSettings();
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
