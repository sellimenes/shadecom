'use server';

import { revalidateTag } from 'next/cache';

export const getSettings = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'settings', {
    next: {
      tags: ['settings'],
    },
  });
  const data = await res.json();
  return data;
};

export const revalidateSettings = async () => {
  revalidateTag('settings');
};
