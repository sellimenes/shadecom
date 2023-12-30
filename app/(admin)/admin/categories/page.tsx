'use client';

import { useDisclosure } from '@mantine/hooks';

import AdminCategoriesTable from '@/components/AdminCategoriesTable/AdminCategoriesTable';
import AdminPageTitle from '@/components/AdminPageTitle/AdminPageTitle';

const CategoriesPage = () => {
  const [isCreateOpen, { open: openCreate, close: closeCreate }] = useDisclosure(false);
  return (
    <div>
      <AdminPageTitle title="Categories" btnTitle="Add New Category" onClick={openCreate} />
      <AdminCategoriesTable isCreateOpen={isCreateOpen} closeCreate={closeCreate} />
    </div>
  );
};

export default CategoriesPage;
