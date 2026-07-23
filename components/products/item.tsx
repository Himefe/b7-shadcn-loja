import { Product } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart";
import { memo } from "react";
import { numberToCurrency } from "@/utils/number";

type ProductItemProps = {
    item: Product;
};

const ProductItem = ({ item }: ProductItemProps) => {
    const { addToCart } = useCartStore();

    const handleAddToCart = () => {
        addToCart(item, 1);

        toast("Produto adicionado ao carrinho", {
            description: `O produto ${item.name} foi adicionado ao carrinho com sucesso`,
        });
    };

    return (
        <div>
            <div className="rounded-md overflow-hidden mb-3">
                <Image
                    src={`${item.imageUrl}`}
                    placeholder="blur"
                    blurDataURL={item.imageUrl || ""}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="w-full h-32 object-cover"
                />
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm">{item.name}</p>
                <p className="text-sm text-muted-foreground">{numberToCurrency(item.price)}</p>
                <Button variant="outline" className="cursor-pointer" onClick={handleAddToCart}>
                    Adicionar
                </Button>
            </div>
        </div>
    );
};

export default memo(ProductItem);
