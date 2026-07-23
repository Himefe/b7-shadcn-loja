import { Button } from "@/components/ui/button";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { X } from "lucide-react";

type CartContentHeaderProps = {
    onToggleCart: () => void;
};

const CartContentHeader = ({ onToggleCart }: CartContentHeaderProps) => {
    return (
        <SheetHeader className="pl-0 pr-0 pb-0 flex flex-row items-center justify-between">
            <SheetTitle>Carrinho</SheetTitle>
            <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={onToggleCart}>
                <X className="h-2 w-2" />
            </Button>
        </SheetHeader>
    );
};

export default CartContentHeader;
