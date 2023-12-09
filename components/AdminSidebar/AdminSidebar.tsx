'use client';

import { Group, Code, ScrollArea, rem, useMantineColorScheme, ActionIcon } from '@mantine/core';
import {
  IconNotes,
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconFileAnalytics,
  IconAdjustments,
  IconLock,
  IconMoon,
  IconSun,
  IconExternalLink,
} from '@tabler/icons-react';
import { AdminUserButton } from '@/components/AdminUserButton/AdminUserButton';
import { LinksGroup } from '@/components/AdminNavbarLinksGroup/AdminNavbarLinksGroup';
import { Logo } from './Logo';
import classes from './AdminSidebar.module.css';

const mockdata = [
  { label: 'Go to site', icon: IconExternalLink, link: '/' },
  { label: 'Dashboard', icon: IconGauge, link: '/admin' },
  {
    label: 'Market news',
    icon: IconNotes,
    // initiallyOpened: true,
    links: [
      { label: 'Overview', link: '/' },
      { label: 'Forecasts', link: '/' },
      { label: 'Outlook', link: '/' },
      { label: 'Real time', link: '/' },
    ],
  },
  {
    label: 'Releases',
    icon: IconCalendarStats,
    links: [
      { label: 'Upcoming releases', link: '/' },
      { label: 'Previous releases', link: '/' },
      { label: 'Releases schedule', link: '/' },
    ],
  },
  { label: 'Analytics', icon: IconPresentationAnalytics },
  { label: 'Contracts', icon: IconFileAnalytics },
  { label: 'Settings', icon: IconAdjustments },
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
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Logo style={{ width: rem(120) }} />
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.themeToggle}>
        {colorScheme === 'light' ? (
          <ActionIcon variant="outline" aria-label="Dark" onClick={() => setColorScheme('dark')}>
            <IconMoon style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        ) : (
          <ActionIcon variant="outline" aria-label="Dark" onClick={() => setColorScheme('light')}>
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
