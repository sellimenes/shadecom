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
  TextInput,
  rem,
  Indicator,
} from '@mantine/core';
import {
  IconChevronDown,
  IconMoon,
  IconSun,
  IconSearch,
  IconArrowRight,
  IconShoppingBag,
  IconUser,
  IconUserFilled,
} from '@tabler/icons-react';

import classes from './Header.module.css';

import { AuthenticationForm } from '../AuthenticationForm/AuthenticationForm';
import { useEffect } from 'react';
import { fetchUser, useUser } from '@/lib/store/UserStore';
import { getCurrentUser } from '@/lib/actionsAuth';

type Props = {
  settingsData?: any;
  categories?: any;
};

type MenuCategories = {
  Slug: string;
  Name: string;
};

interface User {
  Name: string;
  // Add other properties as needed
}

interface UserData {
  user: User;
  // Add other properties as needed
}



export function Header({ settingsData, categories }: Props) {
  const userData = useUser((state) => state.data) as UserData;
  const setUser = useUser((state) => state.setUser);
  const [opened, { toggle, close, open }] = useDisclosure(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const fetchCurrentUser = async () => {
    const currentUser = await getCurrentUser(localStorage.getItem('token') || "");
    setUser(currentUser);
  }

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const links = [{ label: 'Categories', links: categories }];

  const items = links.map((link) => {
    const menuItems = link.links?.map((item: MenuCategories) => (
      <Menu.Item key={item.Slug}>
        <Link href={item.Slug}>{item.Name}</Link>
      </Menu.Item>
    ));
  
    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href="#" // You can replace this with the appropriate link
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
        href="#" // You can replace this with the appropriate link
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
        <AuthenticationForm close={close} />
      </Modal>
      <Box className={classes.upperHeader} mt={2}>
        <Container size="1600px" w="90%">
          <Flex justify="flex-end" align="center">
            <Group gap={16} visibleFrom="sm">
              <Link href="/admin">
                <Text size="sm">Admin</Text>
              </Link>
              <UnstyledButton onClick={open} variant="unstyled">
                <Text size="sm">Auth</Text>
              </UnstyledButton>
              <Text>{userData?.user?.Name}</Text>
            </Group>
          </Flex>
        </Container>
      </Box>
      <Container size="1600px" w="90%">
        <Flex className={classes.inner}>
          <Link href="/">
            <Text
              size="32px"
              fw={700}
              variant="gradient"
              gradient={{ from: 'pink', to: 'primary' }}
            >
              {settingsData.WebsiteName}
            </Text>
          </Link>
          <TextInput
            className={classes.searchInput}
            radius="xl"
            size="md"
            placeholder="Search for products..."
            rightSectionWidth={42}
            leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
            rightSection={
              <ActionIcon size={32} radius="xl" color="primary" variant="filled">
                <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
              </ActionIcon>
            }
          />
          <Group gap={24} visibleFrom="sm">
            <Group gap={8}>
              {items}
              <ActionIcon variant="outline" color="primary">
                <IconUser style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
              <Indicator variant="dot" color="primary" label="5" size={16}>
                <ActionIcon variant="outline" color="primary">
                  <IconShoppingBag style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
              </Indicator>
            </Group>
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
