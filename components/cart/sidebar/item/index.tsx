import { Cart } from "@/types/cart";
import { numberToCurrency } from "@/utils/number";
import Image from "next/image";
import CartContentItemQuantity from "./quantity";

type CartContentItemProps = {
    item: Cart;
};

const CartContentItem = ({ item }: CartContentItemProps) => {
    return (
        <div className="flex items-center gap-3">
            <div className="w-16 overflow-hidden">
                <Image
                    src={`${item.product.imageUrl}`}
                    placeholder="blur"
                    blurDataURL={item.product.imageUrl || ""}
                    alt={item.product.name}
                    width={100}
                    height={100}
                    className="w-full object-cover"
                />
            </div>
            <div className="flex-1">
                <span className="block text-ellipsis overflow-hidden whitespace-nowrap max-w-50" title={item.product.name}>
                    {item.product.name}
                </span>
                <span className="text-xs text-muted-foreground">{numberToCurrency(item.product.price)}</span>
            </div>
            <CartContentItemQuantity item={item} />
        </div>
    );
};

export default CartContentItem;
