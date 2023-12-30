'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getSettings = async () => {
  const res = await fetch(`${API_BASE_URL}settings`, {
    next: {
      tags: ['settings'],
    },
  });
  const data = await res.json();
  return data;
};

export const revalidateSettings = () => {
  revalidateTag('settings');
};

export const changeSettings = async (settings: any) => {
  const res = await fetch(`${API_BASE_URL}settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  });
  // revalidateTag('settings');
  revalidatePath('/', 'layout');
  const data = await res.json();
  return data;
};
