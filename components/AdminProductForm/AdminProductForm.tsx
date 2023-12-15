'use client';

import React, { useEffect } from 'react';
import classes from './AdminProductForm.module.css';

import { useForm } from '@mantine/form';
import { zodResolver } from 'mantine-form-zod-resolver';
import { z } from 'zod';

type Props = {};

const AdminProductForm = (props: Props) => {
  const schema = z.object({
    name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
    email: z.string().email({ message: 'Invalid email' }),
    age: z.number().min(18, {
      message: 'You must be at least 18 to create an account',
    }),
  });

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
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

  return <div>AdminProductForm</div>;
};

export default AdminProductForm;
