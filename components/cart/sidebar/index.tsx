"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCartStore } from "@/store/cart";
import { RocketIcon } from "lucide-react";
import CartContentHeader from "./header";
import CartContentFooter from "./footer";
import CartContent from "./content";
import CartContentEmpty from "./empty";
import CheckoutModal from "@/components/checkout";

const CartSidebar = () => {
    const cart = useCartStore((state) => state.cart);
    const isCartOpen = useCartStore((state) => state.isCartOpen);
    const openCloseCart = useCartStore((state) => state.openCloseCart);

    const { cartItemCount, subtotal } = useMemo(() => {
        return cart.reduce(
            (acc, item) => {
                acc.cartItemCount += item.quantity;
                acc.subtotal += item.product.price * item.quantity;

                return acc;
            },
            { cartItemCount: 0, subtotal: 0 },
        );
    }, [cart]);

    return (
        <Sheet open={isCartOpen} onOpenChange={openCloseCart.bind(null, true)} modal={false}>
            <SheetTrigger asChild>
                <Button>
                    <RocketIcon className="mr-2" />
                    <span>Carrinho</span>
                    {Boolean(cartItemCount) && (
                        <span className="bg-red-500 w-5 h-5 rounded-full absolute -right-2 -top-2 text-xs text-white flex justify-center items-center">{cartItemCount}</span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="px-4 pb-6" showCloseButton={false}>
                <CartContentHeader onToggleCart={openCloseCart.bind(null, false)} />
                <Separator />
                {cart.length ? (
                    <>
                        <CartContent cart={cart} />
                        <Separator />
                        <CartContentFooter subtotal={subtotal} />
                    </>
                ) : (
                    <CartContentEmpty />
                )}
            </SheetContent>
            <CheckoutModal />
        </Sheet>
    );
};

export default CartSidebar;
