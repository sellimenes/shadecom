'use server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const handleLogin = async (email: string, password: string) => {
    const res = await fetch(`${API_BASE_URL}login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log(data)
    return data.token;
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
    console.log(data)
    return data;
}

export const handleRegister = async(email: string, password: string, name: string) => {
    const res = await fetch(`${API_BASE_URL}register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
    });
    const data = await res.json();
    return data;
}