import { FunctionComponent } from "react";
import { CheckoutStep } from "./types";
import CheckoutCustomerContent from "@/components/checkout/tabs/customer";

export const CHECKOUT_STEPS_CONFIG: Record<CheckoutStep, { title: string; description: string; progress: number; label: string }> = {
    [CheckoutStep.CUSTOMER]: {
        title: "Informações pessoais",
        description: "Preencha seus dados pessoais",
        label: "Inf. pessoais",
        progress: 0,
    },
    [CheckoutStep.ADDRESS]: {
        title: "Informações de endereço",
        description: "Preencha seus dados de endereço",
        label: "Endereço",
        progress: 33,
    },
    [CheckoutStep.PAYMENT]: {
        title: "Informações de pagamento",
        label: "Pagamento",
        description: "Preencha seus dados de pagamento",
        progress: 66,
    },
    [CheckoutStep.REVIEW]: {
        title: "Resumo",
        description: "Confirme seus dados",
        label: "Resumo",
        progress: 99,
    },
};

export const CHECKOUT_STEPS_COMPONENTS = {
    [CheckoutStep.CUSTOMER]: CheckoutCustomerContent,
    [CheckoutStep.ADDRESS]: CheckoutCustomerContent,
    [CheckoutStep.PAYMENT]: CheckoutCustomerContent,
    [CheckoutStep.REVIEW]: CheckoutCustomerContent,
} satisfies Record<CheckoutStep, FunctionComponent>;
