import { create } from "zustand";
import { CartStore } from "./types";

const initialState: Pick<CartStore, "cart"> = {
    cart: [],
};

export const useCartStore = create<CartStore>()((set) => ({
    ...initialState,
    addToCart: (product, quantity) => {
        return set((state) => {
            const hasProduct = state.cart.some((item) => item.product.id === product.id);

            return {
                ...state,
                cart: hasProduct
                    ? state.cart.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
                    : [...state.cart, { product, quantity }],
            };
        });
    },
    removeFromCart: (product) => {
        return set((state) => {
            const existingProduct = state.cart.find((item) => item.product.id === product.id);

            if (!existingProduct) {
                return state;
            }

            if (existingProduct.quantity === 1) {
                return {
                    ...state,
                    cart: state.cart.filter((item) => item.product.id !== product.id),
                };
            }

            return {
                ...state,
                cart: state.cart.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity - 1 } : item)),
            };
        });
    },
    clearCart: () => set({ cart: [] }),
}));
