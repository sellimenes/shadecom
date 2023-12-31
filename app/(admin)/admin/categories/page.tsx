'use client';

import { useDisclosure } from '@mantine/hooks';

import AdminCategoriesTable from '@/components/(Admin)/AdminCategoriesTable/AdminCategoriesTable';
import AdminPageTitle from '@/components/(Admin)/AdminPageTitle/AdminPageTitle';

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
