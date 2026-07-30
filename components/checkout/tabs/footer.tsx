import { Button } from "@/components/ui/button";

type CheckoutContentFooterProps = {
    onPrev?: () => void;
    isValid?: boolean;
    button?: Partial<{
        label: string;
        type: "button" | "submit";
        onClick?: () => void;
    }>;
};

const CheckoutContentFooter = ({ onPrev, isValid = false, button = {} }: CheckoutContentFooterProps) => {
    const { label, type, onClick } = button;

    return (
        <div className="flex border-t border-border py-2 justify-between items-center">
            {Boolean(onPrev) && (
                <Button variant="default" type={type}>
                    Voltar
                </Button>
            )}
            <div className="flex-1 flex justify-end">
                <Button variant="outline" disabled={!isValid} type={type} onClick={onClick}>
                    {label || "Avançar"}
                </Button>
            </div>
        </div>
    );
};

export default CheckoutContentFooter;
