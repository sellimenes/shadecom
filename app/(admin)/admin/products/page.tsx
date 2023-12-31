import AdminProductsTable from '@/components/(Admin)/AdminProductsTable/AdminProductsTable';
import AdminPageTitle from '@/components/(Admin)/AdminPageTitle/AdminPageTitle';

import classes from './ProductsPage.module.css';

const ProductsPage = () => (
  <div className={classes.productsPageWrapper}>
    <AdminPageTitle title="Products" btnTitle="Add New Product" href="/admin/products/add" />
    <AdminProductsTable />
  </div>
);

export default ProductsPage;
