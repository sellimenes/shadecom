'use client';

import AdminCategoriesTable from '@/components/AdminCategoriesTable/AdminCategoriesTable';
import AdminPageTitle from '@/components/AdminPageTitle/AdminPageTitle';
import React from 'react';
import { useDisclosure } from '@mantine/hooks';

type Props = {};

const CategoriesPage = (props: Props) => {
  const [isCreateOpen, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  return (
    <div>
      <AdminPageTitle title="Categories" btnTitle="Add New Category" onClick={openCreate} />
      <AdminCategoriesTable isCreateOpen={isCreateOpen} closeCreate={closeCreate} />
    </div>
  );
};

export default CategoriesPage;
