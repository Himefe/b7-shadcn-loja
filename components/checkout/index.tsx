import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
    const stepValidities = useCheckoutStore((state) => state.stepValidities);
    const setStep = useCheckoutStore((state) => state.setStep);

    const { title = "", description = "" } = CHECKOUT_STEPS_CONFIG[currentStep];

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
                <Tabs value={currentStep} defaultValue={CheckoutStep.CUSTOMER}>
                    <TabsList className="w-full">
                        {steps.map((step) => {
                            const currentStepInvalid = !stepValidities[currentStep];
                            const isReviewStep = step === CheckoutStep.REVIEW;
                            const isCompletedStep = completedSteps.includes(step);
                            const isCurrentStepCompleted = completedSteps.includes(currentStep);
                            const isTabDisabled = step !== currentStep && ((currentStepInvalid && isCurrentStepCompleted) || (!isReviewStep && !isCompletedStep));

                            return (
                                <TabsTrigger key={step} value={step} onClick={setStep.bind(null, step)} disabled={isTabDisabled}>
                                    {CHECKOUT_STEPS_CONFIG[step].label}
                                </TabsTrigger>
                            );
                        })}
                    </TabsList>
                    <Separator className="my-2" />
                    <TabsContent value={currentStep} className="flex flex-col gap-4">
                        {getContentComponent(currentStep)}
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
};

export default CheckoutModal;
