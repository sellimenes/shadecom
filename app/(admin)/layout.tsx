import classes from './AdminLayout.module.css';
import React from 'react';

import { AdminSidebar } from '@/components/AdminSidebar/AdminSidebar';
import { getSettings } from '@/lib/actionsSettings';

type Props = {};

const layout = async ({ children }: { children: any }) => {
  const settingsData = await getSettings();
  return (
    <div className={classes.adminWrapper}>
      <AdminSidebar settingsData={settingsData} />
      <div className={classes.childrenWrapper}>{children}</div>
    </div>
  );
};

export default layout;
