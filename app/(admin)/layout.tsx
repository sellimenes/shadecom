import classes from './AdminLayout.module.css';
import React, { memo } from 'react';

import { AdminSidebar } from '@/components/AdminSidebar/AdminSidebar';

type Props = {};

const fetchSettings = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'settings');
  const data = await res.json();
  return data;
};

const layout = async ({ children }: { children: any }) => {
  const settingsData = await fetchSettings();
  return (
    <div className={classes.adminWrapper}>
      <AdminSidebar settingsData={settingsData} />
      <div className={classes.childrenWrapper}>{children}</div>
    </div>
  );
};

export default layout;
