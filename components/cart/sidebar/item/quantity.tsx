import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart";
import { Cart } from "@/types/cart";
import { MinusIcon, PlusIcon } from "lucide-react";

type CartContentItemQuantityProps = {
    item: Cart;
};

const CartContentItemQuantity = ({ item }: CartContentItemQuantityProps) => {
    const handleIncreaseQuantity = useCartStore((state) => state.addToCart);
    const handleDecreaseQuantity = useCartStore((state) => state.removeFromCart);

    return (
        <div className="flex items-center gap-2">
            <Button title="Diminuir quantidade" className="size-6" size="icon" variant="outline" onClick={handleDecreaseQuantity.bind(null, item.product)}>
                <MinusIcon className="size-3" />
            </Button>
            <span className="text-xs">{item.quantity}</span>
            <Button title="Aumentar quantidade" className="size-6" size="icon" variant="outline" onClick={handleIncreaseQuantity.bind(null, item.product, 1)}>
                <PlusIcon className="size-3" />
            </Button>
        </div>
    );
};

export default CartContentItemQuantity;
