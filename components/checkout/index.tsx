import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

type CheckoutModalProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
};

const CheckoutModal = ({ isOpen, onOpenChange }: CheckoutModalProps) => {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
