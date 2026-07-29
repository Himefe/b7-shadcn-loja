import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useCheckoutStore } from "@/store/checkout";
import { CHECKOUT_STEPS_COMPONENTS, CHECKOUT_STEPS_CONFIG } from "@/store/checkout/config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CheckoutStep } from "@/store/checkout/types";
import { Separator } from "../ui/separator";

const CheckoutModal = () => {
    const toggleCheckout = useCheckoutStore((state) => state.toggleCheckout);
    const isCheckoutOpen = useCheckoutStore((state) => state.isCheckoutOpen);

    const steps = useCheckoutStore((state) => state.steps);
    const currentStep = useCheckoutStore((state) => state.currentStep);
    const completedSteps = useCheckoutStore((state) => state.completedSteps);
    const setStep = useCheckoutStore((state) => state.setStep);

    const { title = "", description = "", progress = 0 } = CHECKOUT_STEPS_CONFIG[currentStep];

    const currentStepIndex = steps.indexOf(currentStep) + 1;

    const getContentComponent = (step: CheckoutStep) => {
        const Component = CHECKOUT_STEPS_COMPONENTS[step];

        return <Component />;
    };

    return (
        <Dialog open={isCheckoutOpen} onOpenChange={toggleCheckout}>
            <DialogContent className="md:max-w-3xl!" onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </DialogHeader>
                <Separator />
                <div>
                    <span className="text-sm text-muted-foreground text-right block w-full mb-1">
                        {currentStepIndex} de {steps.length + 1}
                    </span>
                    <Progress value={progress} title={`${progress}%`} />
                </div>
                <Tabs value={currentStep} defaultValue={CheckoutStep.CUSTOMER}>
                    <TabsList className="w-full">
                        {steps.map((step) => {
                            const isTabDisabled = step !== currentStep && !completedSteps.includes(step);

                            return (
                                <TabsTrigger key={step} value={step} onClick={setStep.bind(null, step)} disabled={isTabDisabled}>
                                    {CHECKOUT_STEPS_CONFIG[step].label}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                    <TabsContent value={currentStep} className="flex flex-col gap-4 mb-4">
                        {getContentComponent(currentStep)}
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutModal;
