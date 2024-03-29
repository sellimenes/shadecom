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
} from '@tabler/icons-react';

import classes from './Header.module.css';

import { AuthenticationForm } from '../AuthenticationForm/AuthenticationForm';
import { handleLogout } from '@/lib/actionsAuth';
import { useEffect } from 'react';
import { useBasketCount } from '@/lib/store/BasketCountStore';

type Props = {
  settingsData?: any;
  categories?: any;
  currentUser?: any;
  basket?: any;
};

type MenuCategories = {
  Slug: string;
  Name: string;
};

export function Header({ settingsData, categories, currentUser, basket }: Props) {
  const {count, setCount} = useBasketCount();
  const [opened, { toggle, close, open }] = useDisclosure(false);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const links = [{ label: 'Categories', links: categories }];

  useEffect(() => {
    setCount(basket?.length);
  }, [basket]);

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
              {currentUser?.user?.RoleID === 1 && (
                <Link href="/admin">
                  <Text size="sm">Admin</Text>
                </Link>
              )}
              {!currentUser?.user?.Name && (
                <UnstyledButton onClick={open} variant="unstyled">
                  <Text size="sm">Auth</Text>
                </UnstyledButton>
              )}
              {currentUser?.user?.Name && (
                <UnstyledButton variant="unstyled" onClick={() => handleLogout()}>
                  <Text size="sm">{currentUser?.user?.Name}</Text>
                </UnstyledButton>
              )}
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
              {count > 0 ? (
                <Link href="/basket">
                  <Indicator variant="dot" color="primary" label={count} size={16}>
                    <ActionIcon variant="outline" color="primary">
                      <IconShoppingBag style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                  </Indicator>
                </Link>
              ) : (
                <Link href="/basket">
                  <ActionIcon variant="outline" color="primary">
                    <IconShoppingBag style={{ width: '70%', height: '70%' }} stroke={1.5} />
                  </ActionIcon>
                </Link>
              )}
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
