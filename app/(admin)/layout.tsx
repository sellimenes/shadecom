import { AdminSidebar } from '@/components/(Admin)/AdminSidebar/AdminSidebar';
import { getSettings } from '@/lib/actionsSettings';

import classes from './AdminLayout.module.css';

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
