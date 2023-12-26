import classes from './AdminLayout.module.css';
import React, { Suspense } from 'react';
import Loading from './loading';

import { AdminSidebar } from '@/components/AdminSidebar/AdminSidebar';
import { getSettings } from '@/lib/actionsSettings';

type Props = {};

const layout = async ({ children }: { children: any }) => {
  const settingsData = await getSettings();
  return (
    <div className={classes.adminWrapper}>
      <AdminSidebar settingsData={settingsData} />
      <Suspense fallback={<Loading />}>
        <div className={classes.childrenWrapper}>{children}</div>
      </Suspense>
    </div>
  );
};

export default layout;
