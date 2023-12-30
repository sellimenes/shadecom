'use server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getCategories = async () => {
  const res = await fetch(`${API_BASE_URL}category`);
  const data = await res.json();
  return data.categories;
};
