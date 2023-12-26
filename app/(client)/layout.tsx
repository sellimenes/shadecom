import React from 'react';
import classes from './Layout.module.css';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { getSettings } from '@/lib/actionsSettings';

type Props = {};

const layout = async ({ children }: { children: any }) => {
  const settingsData = await getSettings();
  return (
    <>
      <Header settingsData={settingsData} />
      <main className={classes.main}>
        <div className={classes.content}>{children}</div>
      </main>
      <Footer settingsData={settingsData} />
    </>
  );
};

export default layout;
