'use client';

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
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconMoon, IconSun } from '@tabler/icons-react';
import classes from './Header.module.css';
import Link from 'next/link';

const links = [
  { link: '/about', label: 'Features' },
  {
    link: '#1',
    label: 'Learn',
    links: [
      { link: '/docs', label: 'Documentation' },
      { link: '/resources', label: 'Resources' },
      { link: '/community', label: 'Community' },
      { link: '/blog', label: 'Blog' },
    ],
  },
  { link: '/about', label: 'About' },
  { link: '/pricing', label: 'Pricing' },
  {
    link: '#2',
    label: 'Support',
    links: [
      { link: '/faq', label: 'FAQ' },
      { link: '/demo', label: 'Book a demo' },
      { link: '/forums', label: 'Forums' },
    ],
  },
];

export function Header() {
  const [opened, { toggle }] = useDisclosure(false);
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
              onClick={(event) => event.preventDefault()}
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
      <Box className={classes.upperHeader} mt={2}>
        <Container size="1600px">
          <Flex justify={'flex-end'} align={'center'}>
            <Group gap={5} visibleFrom="sm">
              <Link href={'/admin'}>
                <Text size="sm">Admin</Text>
              </Link>
            </Group>
          </Flex>
        </Container>
      </Box>
      <Container size="1600px">
        <Flex className={classes.inner}>
          <Link href="/">
            <Text size="32px" fw={700} variant="gradient" gradient={{ from: 'pink', to: 'orange' }}>
              Shade
            </Text>
          </Link>
          <Group gap={5} visibleFrom="sm">
            {items}
            {colorScheme === 'light' ? (
              <ActionIcon
                variant="outline"
                aria-label="Dark"
                onClick={() => setColorScheme('dark')}
              >
                <IconMoon style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            ) : (
              <ActionIcon
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
