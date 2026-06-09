export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  total: number;
}

export interface Cart {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}
