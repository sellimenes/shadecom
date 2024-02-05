import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';
import { getSettings } from '@/lib/actionsSettings';

import classes from './Layout.module.css';
import { getCategories } from '@/lib/actionsCategories';
import { cookies } from 'next/headers';

const layout = async ({ children }: { children: any }) => {
  const settingsData = await getSettings();
  const categories = await getCategories();
  const currentUser = cookies().get('session');
  return (
    <>
      <Header settingsData={settingsData} categories={categories} currentUser={JSON.parse(currentUser?.value || '{}')} />
      <main className={classes.main}>
        <div className={classes.content}>{children}</div>
      </main>
      <Footer settingsData={settingsData} />
    </>
  );
};

export default layout;
