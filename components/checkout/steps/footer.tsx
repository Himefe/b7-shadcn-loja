import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PropsWithChildren } from "react";
import { LoaderCircle } from "lucide-react";

type CheckoutStepContentFooterProps = Partial<{
    onPrev: () => void;
    isValid: boolean;
    isSubmitting: boolean;
    button: Partial<{
        label: string;
        type: "button" | "submit";
        onClick?: () => void;
    }>;
}>;

const CheckoutStepFooter = ({ onPrev, isValid = false, button = {}, isSubmitting, children }: PropsWithChildren<CheckoutStepContentFooterProps>) => {
    const { label, type, onClick } = button;

    return (
        <>
            {children}
            {children && <Separator className="my-4" />}
            <div className="flex border-t border-border pt-2 justify-between items-center">
                {Boolean(onPrev) && (
                    <Button variant="outline" type="button" onClick={onPrev} disabled={!isValid || isSubmitting}>
                        Voltar
                    </Button>
                )}
                <div className="flex-1 flex justify-end">
                    <Button variant="default" disabled={!isValid} type={type} onClick={onClick}>
                        {isSubmitting ? <LoaderCircle className="animate-spin" /> : label || "Avançar"}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CheckoutStepFooter;
