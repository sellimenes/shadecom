'use server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const uploadImages = async ({ images }: any) => {
  const formData = new FormData();
  for (let i = 0; i < images.length; i += 1) {
    formData.append('files[]', images[i]);
  }
  await fetch(`${API_BASE_URL}upload`, {
    method: 'POST',
    body: formData,
  });
};
