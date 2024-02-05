import {create} from 'zustand';
import { addBasket } from '../actionsBasket';
import { notifications } from '@mantine/notifications';

interface BasketCountState {
  count: number;
  setCount: (count: number) => void;
}

export const useBasketCount = create<BasketCountState>((set) => ({
  count: 0,
  setCount: (count: number) => set({count}),
}));

export const handleAddBasket = async(id: string) => {
  const {count, setCount} = useBasketCount.getState();
  const res = await addBasket(id);

  if(res && !res.error) {
    setCount(count + 1);
    notifications.show({
      title: 'Product added to basket',
      message: 'You can view your basket in the top right corner.',
      color: 'teal',
      icon: null,
    })
  }

  if(res.error && res.error === "Product already in basket") {
    notifications.show({
      title: 'Product already in basket',
      message: 'You can change the quantity in the basket.',
      color: 'red',
      icon: null,
    })
  }
}