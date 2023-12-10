import React from 'react';

import classes from './AdminLayout.module.css';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { AdminSidebar } from '@/components/AdminSidebar/AdminSidebar';

type Props = {};

const layout = ({ children }: { children: any }) => {
  return (
    <div className={classes.adminWrapper}>
      <AdminSidebar />
      <div className={classes.childrenWrapper}>{children}</div>
    </div>
  );
};

export default layout;
