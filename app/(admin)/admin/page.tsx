'use client';

import AdminStats from '@/components/AdminStats/AdminStats';
import classes from './AdminPage.module.css';
import { Grid } from '@mantine/core';
import AdminPageTitle from '@/components/AdminPageTitle/AdminPageTitle';
import AdminTodo from '@/components/AdminTodo/AdminTodo';
import { AdminBestSellersTable } from '@/components/AdminBestSellersTable/AdminBestSellersTable';

// TODO: Drag and drop layout need to handle.
type Props = {};

const AdminPage = (props: Props) => {
  return (
    <div>
      <AdminPageTitle title="Dashboard" />
      <AdminStats />
      <Grid mt={16}>
        <Grid.Col span={{ base: 12, sm: 8 }}>
          <AdminBestSellersTable />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 4 }}>
          <AdminTodo />
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default AdminPage;
