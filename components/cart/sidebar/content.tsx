import { Cart } from "@/types/cart";
import CartContentItem from "./item";

type CartContentProps = {
    cart: Cart[];
};

const CartContent = ({ cart }: CartContentProps) => {
    return (
        <div className="flex flex-col gap-5 my-3">
            {cart.map((item) => (
                <CartContentItem key={item.product.id} item={item} />
            ))}
        </div>
    );
};

export default CartContent;
