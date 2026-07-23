import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { numberToCurrency } from "@/utils/number";
import { memo } from "react";

type CartContentFooterProps = {
    subtotal: number;
};

const CartContentFooter = ({ subtotal = 0 }: CartContentFooterProps) => {
    return (
        <>
            <div className="flex justify-between items-center text-xs">
                <p>Subtotal:</p>
                <p>{numberToCurrency(subtotal)}</p>
            </div>
            <Separator className="my-4" />
            <Button className="w-full text-center cursor-pointer">Finalizar compra</Button>
        </>
    );
};

export default memo(CartContentFooter);
