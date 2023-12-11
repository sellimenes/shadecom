import AdminProductsTable from '@/components/AdminProductsTable/AdminProductsTable';
import React from 'react';

import classes from './ProductsPage.module.css';

type Props = {};

const ProductsPage = (props: Props) => {
  return (
    <div className={classes.productsPageWrapper}>
      <AdminProductsTable />
    </div>
  );
};

export default ProductsPage;
