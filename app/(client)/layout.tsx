import React from 'react';
import classes from './Layout.module.css';

import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

type Props = {};

const layout = ({ children }: { children: any }) => {
  return (
    <>
      <Header />
      <main className={classes.main}>
        <div className={classes.content}>{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default layout;
