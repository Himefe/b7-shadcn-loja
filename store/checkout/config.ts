import { FunctionComponent } from "react";
import { CheckoutStep } from "./types";
import CheckoutCustomerContent from "@/components/checkout/tabs/customer";

export const CHECKOUT_STEPS_CONFIG: Record<CheckoutStep, { title: string; description: string; label: string }> = {
    [CheckoutStep.CUSTOMER]: {
        title: "Informações pessoais",
        description: "Preencha seus dados pessoais",
        label: "Inf. pessoais",
    },
    [CheckoutStep.ADDRESS]: {
        title: "Informações de endereço",
        description: "Preencha seus dados de endereço",
        label: "Endereço",
    },
    [CheckoutStep.PAYMENT]: {
        title: "Informações de pagamento",
        label: "Pagamento",
        description: "Preencha seus dados de pagamento",
    },
    [CheckoutStep.REVIEW]: {
        title: "Resumo",
        description: "Confirme seus dados",
        label: "Resumo",
    },
};

export const CHECKOUT_STEPS_COMPONENTS = {
    [CheckoutStep.CUSTOMER]: CheckoutCustomerContent,
    [CheckoutStep.ADDRESS]: CheckoutCustomerContent,
    [CheckoutStep.PAYMENT]: CheckoutCustomerContent,
    [CheckoutStep.REVIEW]: CheckoutCustomerContent,
} satisfies Record<CheckoutStep, FunctionComponent>;
