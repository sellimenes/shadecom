'use server'

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getBasket = async () => {
    const token = cookies().get('token');
    if (!token) {
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}basket`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.value
            },
            cache: 'no-cache'
        });
        const data = await res.json();
        return data.basket;
    } catch (error) {
        console.log('There has been a problem with your fetch operation:', error);
    }
}

export const addBasket = async (productId: string) => {
    const token = cookies().get('token');
    if (!token) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}basket`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token.value
            },
            body: JSON.stringify({
                "ProductID": productId,
              }),
        });
        const basket = await response.json();
        return basket;
    } catch (error) {
        console.log('There has been a problem with your fetch operation:', error);
    }
}