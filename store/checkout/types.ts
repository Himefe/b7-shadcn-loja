import { Cart } from "@/types/cart";

export enum CheckoutStep {
    CUSTOMER = "CUSTOMER",
    ADDRESS = "ADDRESS",
    PAYMENT = "PAYMENT",
    REVIEW = "REVIEW",
    SUCCESS = "SUCCESS",
    FAILURE = "FAILURE",
}

type CheckoutStepCustomerData = {
    name: string;
    email: string;
    phone: string;
};

type CheckoutStepAddressData = {
    zipCode: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
};

type CheckoutStepPaymentData = {
    paymentMethod: string;
    cardNumber: string;
    cardHolder: string;
    expirationDate: string;
    cvv: string;
};

type CheckoutStepData = {
    [CheckoutStep.CUSTOMER]: CheckoutStepCustomerData;
    [CheckoutStep.ADDRESS]: CheckoutStepAddressData;
    [CheckoutStep.PAYMENT]: CheckoutStepPaymentData;
};

export type CheckoutStore = {
    isCheckoutOpen: boolean;
    toggleCheckout: (open: boolean) => void;
    steps: CheckoutStep[];
    currentStep: CheckoutStep;
    data: Partial<{
        [CheckoutStep.CUSTOMER]: CheckoutStepCustomerData;
        [CheckoutStep.ADDRESS]: CheckoutStepAddressData;
        [CheckoutStep.PAYMENT]: CheckoutStepPaymentData;
        [CheckoutStep.REVIEW]: Cart;
    }>;
    setStep: (step: CheckoutStep) => void;
    nextStep: () => void;
    prevStep: () => void;
    setData: <K extends keyof CheckoutStepData>(step: K, data: CheckoutStepData[K]) => void;
};
