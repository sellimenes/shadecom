'use client';

import { Group, Code, ScrollArea, useMantineColorScheme, ActionIcon, Text } from '@mantine/core';
import {
  IconShoppingBag,
  IconBuildingStore,
  IconGauge,
  IconPresentationAnalytics,
  IconUsers,
  IconAdjustments,
  IconLock,
  IconMoon,
  IconSun,
  IconExternalLink,
} from '@tabler/icons-react';
import { AdminUserButton } from '@/components/AdminUserButton/AdminUserButton';
import { LinksGroup } from '@/components/AdminNavbarLinksGroup/AdminNavbarLinksGroup';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './AdminSidebar.module.css';
import { useEffect } from 'react';

const mockdata = [
  { label: 'Go to site', icon: IconExternalLink, link: '/' },
  { label: 'Dashboard', icon: IconGauge, link: '/admin' },
  {
    label: 'Orders',
    icon: IconShoppingBag,
    link: '/admin/orders',
    badge: 5,
  },
  {
    label: 'Products',
    icon: IconBuildingStore,
    link: '/admin/products',
  },
  { label: 'Users', icon: IconUsers },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  {
    label: 'Settings',
    icon: IconAdjustments,
    links: [
      { label: 'General settings', link: '/' },
      { label: 'SEO settings', link: '/' },
    ],
  },
  {
    label: 'Security',
    icon: IconLock,
    links: [
      { label: 'Enable 2FA', link: '/' },
      { label: 'Change password', link: '/' },
      { label: 'Recovery codes', link: '/' },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const links = mockdata.map((item) => {
    const isActive = item.link === pathname;
    return <LinksGroup {...item} key={item.label} isActive={isActive} />;
  });
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Link href="/">
            <Text size="32px" fw={700} variant="gradient" gradient={{ from: 'pink', to: 'orange' }}>
              Shade.
            </Text>
          </Link>
          <Code fw={700}>v0.0.1</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.themeToggle}>
        {colorScheme === 'light' ? (
          <ActionIcon
            color="orange"
            variant="outline"
            aria-label="Dark"
            onClick={() => setColorScheme('dark')}
          >
            <IconMoon style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        ) : (
          <ActionIcon
            color="orange"
            variant="outline"
            aria-label="Dark"
            onClick={() => setColorScheme('light')}
          >
            <IconSun style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        )}
      </div>
      <div className={classes.footer}>
        <AdminUserButton />
      </div>
    </nav>
  );
}
