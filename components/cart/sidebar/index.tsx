import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { RocketIcon } from "lucide-react";

const CartSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="cursor-pointer">
                    <RocketIcon className="mr-2" />
                    <p>Carrinho</p>
                </Button>
            </SheetTrigger>
            <SheetContent className="px-4">
                <SheetHeader>
                    <SheetTitle>Carrinho</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-5 my-3">...</div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center text-xs">
                    <p>Subtotal:</p>
                    <p>...</p>
                </div>

                <Separator className="my-4" />

                <Button className="w-full text-center cursor-pointer">Finalizar compra</Button>
            </SheetContent>
        </Sheet>
    );
};

export default CartSidebar;
