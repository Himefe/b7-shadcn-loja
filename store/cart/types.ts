import { Cart } from "@/types/cart";
import { Product } from "@/types/product";

export type CartStore = {
    cart: Cart[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (product: Product) => void;
    clearCart: () => void;
};
