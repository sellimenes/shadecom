'use server';

import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handleLogin = async (email: string, password: string) => {
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    const res = await fetch(`${API_BASE_URL}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    // TODO: Kullanıcı çağırma işlemini 2 fetch ile YAPMA. Backend tarafında düzenle.
    const userData = await getCurrentUser(data.token);
    cookies().set("session", JSON.stringify(userData), { expires, httpOnly: true });
    cookies().set("token", data.token, { expires, httpOnly: true });
}

export const handleLogout = async() => {
    cookies().set("session", "", { expires: new Date(0) });
    cookies().set("token", "", { expires: new Date(0) });
}

export const getCurrentUser = async(token: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
    const data = await res.json();
    return data;
}

export const handleRegister = async(email: string, password: string, name: string) => {
    const res = await fetch(`${API_BASE_URL}register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    await handleLogin(email, password);
    return data;
}