'use server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getCategories = async () => {
  const res = await fetch(`${API_BASE_URL}category`, {
    // TODO: Will be cached when revalidateTag updated by Vercel.
    cache: 'no-cache',
  });
  const data = await res.json();
  return data.categories;
};

export const createCategory = async (Name: string) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}category`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Name }),
    });
  } catch (error) {
    console.log('There has been a problem with your fetch operation:', error);
  }
};
