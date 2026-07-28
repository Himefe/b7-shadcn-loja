import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useCheckoutStore } from "@/store/checkout";

const CheckoutModal = () => {
    const toggleCheckout = useCheckoutStore((state) => state.toggleCheckout);
    const isCheckoutOpen = useCheckoutStore((state) => state.isCheckoutOpen);

    return (
        <Dialog open={isCheckoutOpen} onOpenChange={toggleCheckout}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Checkout</DialogTitle>
                </DialogHeader>
                <Progress value={50} />
                <div className="flex flex-col gap-3">..</div>
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutModal;
