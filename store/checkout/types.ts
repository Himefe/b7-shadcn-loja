import { CheckoutStepAddressData } from "@/components/checkout/steps/address/utils";
import { CheckoutStepCustomerData } from "@/components/checkout/steps/customer/utils";
import { CheckoutStepPaymentData } from "@/components/checkout/steps/payment/utils";

export enum CheckoutStep {
    CUSTOMER = "CUSTOMER",
    ADDRESS = "ADDRESS",
    PAYMENT = "PAYMENT",
    REVIEW = "REVIEW",
}

type CheckoutStepData = {
    [CheckoutStep.CUSTOMER]: CheckoutStepCustomerData;
    [CheckoutStep.ADDRESS]: CheckoutStepAddressData;
    [CheckoutStep.PAYMENT]: CheckoutStepPaymentData;
};

export type CheckoutStore = {
    isCheckoutOpen: boolean;
    steps: CheckoutStep[];
    currentStep: CheckoutStep;
    data: Partial<CheckoutStepData>;
    completedSteps: CheckoutStep[];
    stepValidities: Partial<Record<CheckoutStep, boolean>>;
    completeStep: (step: CheckoutStep) => void;
    toggleCheckout: (open: boolean) => void;
    setStep: (step: CheckoutStep) => void;
    setStepValidity: (step: CheckoutStep, isValid: boolean) => void;
    nextStep: () => void;
    prevStep: () => void;
    setData: <K extends keyof CheckoutStepData>(step: K, data: CheckoutStepData[K]) => void;
};
