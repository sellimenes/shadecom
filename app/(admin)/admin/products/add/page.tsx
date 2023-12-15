import AdminPageTitle from '@/components/AdminPageTitle/AdminPageTitle';
import AdminProductForm from '@/components/AdminProductForm/AdminProductForm';
import React from 'react';

type Props = {};

const AddNewProductPage = (props: Props) => {
  return (
    <div>
      <AdminPageTitle title="Add New Product" />
      <AdminProductForm />
    </div>
  );
};

export default AddNewProductPage;
