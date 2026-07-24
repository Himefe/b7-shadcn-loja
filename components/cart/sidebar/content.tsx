import { Cart } from "@/types/cart";
import CartContentItem from "./item";
import { memo } from "react";

type CartContentProps = {
    cart: Cart[];
};

const CartContent = ({ cart }: CartContentProps) => {
    return (
        <div className="flex flex-col gap-5 p-2 pl-0 overflow-y-auto max-h-[calc(100vh-200px)]">
            {cart.map((item) => (
                <CartContentItem key={item.product.id} item={item} />
            ))}
        </div>
    );
};

export default memo(CartContent);
