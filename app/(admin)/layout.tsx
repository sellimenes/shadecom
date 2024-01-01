import { AdminSidebar } from '@/components/(Admin)/AdminSidebar/AdminSidebar';
import { getSettings } from '@/lib/actionsSettings';

import classes from './AdminLayout.module.css';
import { ScrollArea } from '@mantine/core';

const layout = async ({ children }: { children: any }) => {
  const settingsData = await getSettings();
  return (
    <div className={classes.adminWrapper}>
      <AdminSidebar settingsData={settingsData} />
      <ScrollArea w="100%">
        <div className={classes.childrenWrapper}>{children}</div>
      </ScrollArea>
    </div>
  );
};

export default layout;
