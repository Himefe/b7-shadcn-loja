import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { numberToCurrency } from "@/utils/number";
import { memo } from "react";

type CartContentFooterProps = {
    subtotal: number;
    onOpenCheckoutModal: () => void;
};

const CartContentFooter = ({ subtotal = 0, onOpenCheckoutModal }: CartContentFooterProps) => {
    return (
        <>
            <div className="flex justify-between items-center text-xs">
                <p>Subtotal:</p>
                <p>{numberToCurrency(subtotal)}</p>
            </div>
            <Separator />
            <Button className="w-full text-center" onClick={onOpenCheckoutModal}>
                Finalizar compra
            </Button>
        </>
    );
};

export default memo(CartContentFooter);
