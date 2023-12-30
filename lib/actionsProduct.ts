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
