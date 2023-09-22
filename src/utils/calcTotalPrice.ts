import { CartItem } from "../redux/slices/cartSclice";

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, obj) => sum + obj.count * obj.price, 0);
};