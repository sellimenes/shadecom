import AdminProductsTable from '@/components/AdminProductsTable/AdminProductsTable';
import React from 'react';

import classes from './ProductsPage.module.css';
import AdminPageTitle from '@/components/AdminPageTitle/AdminPageTitle';

type Props = {};

const ProductsPage = (props: Props) => {
  return (
    <div className={classes.productsPageWrapper}>
      <AdminPageTitle title="Products" btnTitle="Add New Product" href="/admin/products/add" />
      <AdminProductsTable />
    </div>
  );
};

export default ProductsPage;
