const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const createProduct = async (product: any) => {
  await fetch(`${API_BASE_URL}product`, {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getBestSellerProducts = async () => {
  const response = await fetch(`${API_BASE_URL}products?limit=6`, {
    // TODO: Change cache when Nextjs fixes revalidateTag
    cache: 'force-cache',
  });
  const data = await response.json();
  return data.products;
};

export const getSingleProduct = async (slug: string) => {
  const response = await fetch(`${API_BASE_URL}product/${slug}`);
  const data = await response.json();
  return data.product;
};

export const getAllProducts = async () => {
  const response = await fetch(`${API_BASE_URL}products`);
  const data = await response.json();
  return data.products;
};
