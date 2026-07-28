import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCheckoutStore } from "@/store/checkout";
import { numberToCurrency } from "@/utils/number";
import { memo } from "react";

type CartContentFooterProps = {
    subtotal: number;
};

const CartContentFooter = ({ subtotal = 0 }: CartContentFooterProps) => {
    const toggleCheckout = useCheckoutStore((state) => state.toggleCheckout);

    return (
        <>
            <div className="flex justify-between items-center text-xs">
                <p>Subtotal:</p>
                <p>{numberToCurrency(subtotal)}</p>
            </div>
            <Separator />
            <Button className="w-full text-center" onClick={toggleCheckout.bind(null, true)}>
                Finalizar compra
            </Button>
        </>
    );
};

export default memo(CartContentFooter);
