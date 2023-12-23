import { create } from 'zustand';

// NOTE: Example of a store that fetches data from an API. Unused in this project.

interface SettingsState {
  data: object | null;
  loading: boolean;
  fetchSettings: () => void;
}

let cachedData: object | null = null;

const fetchData = async () => {
  if (cachedData) {
    return cachedData;
  }

  const res = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + 'settings');
  const data = await res.json();
  cachedData = data;
  return data;
};

export const useSettings = create<SettingsState>((set) => ({
  data: null,
  loading: false,
  fetchSettings: async () => {
    set({ loading: true });
    const data = await fetchData();
    set({ data, loading: false });
  },
  serialize: true,
}));
