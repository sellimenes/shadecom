'use client'

import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
} from '@mantine/core';
import { GoogleButton } from './GoogleButton';
import { TwitterButton } from './TwitterButton';
import { handleLogin, handleRegister, getCurrentUser } from '@/lib/actionsAuth';
import { useState } from 'react';

type Props = PaperProps & {
  close: () => void;
}

export function AuthenticationForm(props: Props) {
  const [loading, setLoading] = useState(false);
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 4 ? 'Password should include at least 6 characters' : null),
    },
  });

  const handleOnSubmit = async() => {
    const {email, name, password} = form.values
    setLoading(true);
    try {
      if(type === "register"){
        await handleRegister(email, password, name)
      } else {
        const token = await handleLogin(email, password);
        localStorage.setItem('token', token);
      }
    } catch (error) {
      console.log(error)
    } finally{
      props.close();
      setLoading(false);
    }
  }

  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        Welcome to Shade, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl" onClick={() => getCurrentUser(localStorage.getItem('token') || '')}>Google</GoogleButton>        <TwitterButton radius="xl">Twitter</TwitterButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit(handleOnSubmit)}>
        <Stack>
          {type === 'register' && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@shade.dev"
            value={form.values.email}
            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
            error={form.errors.email && 'Invalid email'}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
            error={form.errors.password && 'Password should include at least 6 characters'}
            radius="md"
          />

          {type === 'register' && (
            <Checkbox
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
            />
          )}
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor component="button" type="button" c="dimmed" onClick={() => toggle()} size="xs">
            {type === 'register'
              ? 'Already have an account? Login'
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl" loading={loading}>
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
