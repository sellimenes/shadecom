'use client';

import Link from 'next/link';

import { useDisclosure } from '@mantine/hooks';
import {
  Menu,
  Group,
  Center,
  Burger,
  Container,
  Text,
  ActionIcon,
  useMantineColorScheme,
  Flex,
  Box,
  Modal,
  UnstyledButton,
  Input,
} from '@mantine/core';
import { IconChevronDown, IconMoon, IconSun, IconSearch } from '@tabler/icons-react';

import classes from './Header.module.css';

import { AuthenticationForm } from '../AuthenticationForm/AuthenticationForm';

const links = [
  { link: '#1', label: 'Categories', links: [{ link: '/category/1', label: 'Category 1' }] },
  { link: '/account', label: 'Account' },
  { link: '/favorite', label: 'Favorites' },
  { link: '/basket', label: 'My Basket' },
];

export function Header() {
  const [opened, { toggle, close, open }] = useDisclosure(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
              // onClick={(event) => event.preventDefault()}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(event) => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Modal
        opened={opened}
        onClose={close}
        centered
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        transitionProps={{ transition: 'rotate-left', duration: 300, timingFunction: 'linear' }}
      >
        <AuthenticationForm />
      </Modal>
      <Box className={classes.upperHeader} mt={2}>
        <Container size="1600px" w={'90%'}>
          <Flex justify={'flex-end'} align={'center'}>
            <Group gap={16} visibleFrom="sm">
              <Link href={'/admin'}>
                <Text size="sm">Admin</Text>
              </Link>
              <UnstyledButton onClick={open} variant="unstyled">
                <Text size="sm">Auth</Text>
              </UnstyledButton>
            </Group>
          </Flex>
        </Container>
      </Box>
      <Container size="1600px" w={'90%'}>
        <Flex className={classes.inner}>
          <Link href="/">
            <Text
              size="32px"
              fw={700}
              variant="gradient"
              gradient={{ from: 'pink', to: 'primary' }}
            >
              Shade.
            </Text>
          </Link>
          <Input
            placeholder="Search for items..."
            className={classes.searchInput}
            rightSection={<IconSearch color="primary" />}
          />
          <Group gap={5} visibleFrom="sm">
            {items}
            {colorScheme === 'light' ? (
              <ActionIcon
                color="primary"
                variant="outline"
                aria-label="Dark"
                onClick={() => setColorScheme('dark')}
              >
                <IconMoon style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            ) : (
              <ActionIcon
                color="primary"
                variant="outline"
                aria-label="Dark"
                onClick={() => setColorScheme('light')}
              >
                <IconSun style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            )}
          </Group>
          <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
        </Flex>
      </Container>
    </header>
  );
}
