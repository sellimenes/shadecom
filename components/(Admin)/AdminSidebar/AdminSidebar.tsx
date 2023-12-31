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
  IconPhoto,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AdminUserButton } from '@/components/(Admin)/AdminUserButton/AdminUserButton';
import { LinksGroup } from '@/components/(Admin)/AdminNavbarLinksGroup/AdminNavbarLinksGroup';

import classes from './AdminSidebar.module.css';

type Props = {
  WebsiteName: string;
};

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
  {
    label: 'Gallery',
    icon: IconPhoto,
    link: '/admin/gallery',
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

export const AdminSidebar = ({ settingsData }: { settingsData: Props }) => {
  const pathname = usePathname();
  const links = sidebarData.map((item) => {
    const isActive = item.link === pathname || item.links?.some((link) => link.link === pathname);
    return <LinksGroup {...item} key={item.label} isActive={isActive} />;
  });
  const { colorScheme, setColorScheme } = useMantineColorScheme();

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
              {settingsData?.WebsiteName}
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
};
