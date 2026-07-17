import { Product } from "@/types/product";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type ProductItemProps = {
    item: Product;
};

const ProductItem = ({ item }: ProductItemProps) => {
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
                <p className="text-sm text-muted-foreground">{item.price.toFixed(2)}</p>
                <Button variant="outline" className="cursor-pointer">
                    Adicionar
                </Button>
            </div>
        </div>
    );
};

export default ProductItem;
