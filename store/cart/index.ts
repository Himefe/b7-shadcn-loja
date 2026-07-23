import { create } from "zustand";
import { CartStore } from "./types";

const initialState: Pick<CartStore, "cart" | "isCartOpen"> = {
    cart: [],
    isCartOpen: false,
};

export const useCartStore = create<CartStore>()((set) => ({
    ...initialState,
    openCloseCart: (open: boolean) => set((state) => ({ ...state, isCartOpen: open })),
    addToCart: (product, quantity) => {
        return set((state) => {
            const hasProduct = state.cart.some((item) => item.product.id === product.id);

            if (hasProduct) {
                return {
                    ...state,
                    cart: state.cart.map((item) => ({
                        ...item,
                        quantity: item.product.id === product.id ? item.quantity + quantity : item.quantity,
                    })),
                };
            }

            return {
                ...state,
                cart: [...state.cart, { product, quantity }],
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
                cart: state.cart.map((item) => ({
                    ...item,
                    quantity: item.product.id === product.id ? item.quantity - 1 : item.quantity,
                })),
            };
        });
    },
    clearCart: () => set({ cart: [] }),
}));
