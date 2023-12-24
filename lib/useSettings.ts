import { create } from 'zustand';

// NOTE: Example of a store that fetches data from an API. Unused in this project.

interface SettingsState {
  data: object | null;
  setSettings: (data: any) => void;
}

export const useSettings = create<SettingsState>((set) => ({
  data: null,
  setSettings: (data: any) => set({ data }),
}));
