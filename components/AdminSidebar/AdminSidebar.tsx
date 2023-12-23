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
  IconCategory2,
} from '@tabler/icons-react';
import { AdminUserButton } from '@/components/AdminUserButton/AdminUserButton';
import { LinksGroup } from '@/components/AdminNavbarLinksGroup/AdminNavbarLinksGroup';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classes from './AdminSidebar.module.css';
import { useEffect, useState } from 'react';

const sidebarData = [
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
  {
    label: 'Categories',
    icon: IconCategory2,
    link: '/admin/categories',
  },
  { label: 'Users', icon: IconUsers },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  {
    label: 'Settings',
    icon: IconAdjustments,
    links: [
      { label: 'General settings', link: '/admin/settings/general' },
      { label: 'SEO settings', link: '/admin/settings/seo' },
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
  const [siteSettings, setSiteSettings] = useState({});
  const pathname = usePathname();
  const links = sidebarData.map((item) => {
    const isActive = item.link === pathname || item.links?.some((link) => link.link === pathname);
    return <LinksGroup {...item} key={item.label} isActive={isActive} />;
  });
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const getSiteSettings = async () => {
    const res = await fetch('http://localhost:8080/api/settings', {
      cache: 'force-cache',
    });
    const data = await res.json();
    setSiteSettings(data);
    console.log(data);
  };

  useEffect(() => {
    getSiteSettings();
  }, [siteSettings]);

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Link href="/">
            <Text
              size="32px"
              fw={700}
              variant="gradient"
              gradient={{ from: 'pink', to: 'primary' }}
            >
              {siteSettings?.WebsiteName}
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
      </div>
      <div className={classes.footer}>
        <AdminUserButton />
      </div>
    </nav>
  );
}
