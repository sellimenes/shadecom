'use client';

import { Grid } from '@mantine/core';

import AdminStats from '@/components/(Admin)/AdminStats/AdminStats';
import AdminPageTitle from '@/components/(Admin)/AdminPageTitle/AdminPageTitle';
import AdminTodo from '@/components/(Admin)/AdminTodo/AdminTodo';
import { AdminBestSellersTable } from '@/components/(Admin)/AdminBestSellersTable/AdminBestSellersTable';

// TODO: Drag and drop layout need to handle.

const AdminPage = () => (
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

export default AdminPage;
