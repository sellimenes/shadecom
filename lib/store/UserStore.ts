import { create } from 'zustand'
import { getCurrentUser } from '../actionsAuth';

interface UserState {
        data: object | null;
        setUser: (data: any) => void;
}

export const useUser = create<UserState>((set) => ({
    data: null,
    setUser: (data: any) => set({ data }),
}))

// Use this function inside a component or useEffect hook
export const fetchUser = async() => {
    const setUser = useUser((state) => state.setUser);
    const currentUser = await getCurrentUser(localStorage.getItem('token') || '');
    setUser(currentUser);
}