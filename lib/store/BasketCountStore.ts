import {create} from 'zustand';

interface BasketCountState {
  count: number;
  setCount: (count: number) => void;
}

export const useBasketCount = create<BasketCountState>((set) => ({
  count: 0,
  setCount: (count: number) => set({count}),
}));