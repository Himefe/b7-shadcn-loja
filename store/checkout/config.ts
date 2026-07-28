import { CheckoutStep } from "./types";

export const CHECKOUT_STEPS_CONFIG: Record<CheckoutStep, { title: string; description: string; progress: number }> = {
    [CheckoutStep.CUSTOMER]: {
        title: "Informações pessoais",
        description: "Preencha seus dados pessoais",
        progress: 0,
    },
    [CheckoutStep.ADDRESS]: {
        title: "Informações de endereço",
        description: "Preencha seus dados de endereço",
        progress: 33,
    },
    [CheckoutStep.PAYMENT]: {
        title: "Informações de pagamento",
        description: "Preencha seus dados de pagamento",
        progress: 66,
    },

    [CheckoutStep.REVIEW]: {
        title: "Resumo",
        description: "Confirme seus dados",
        progress: 90,
    },
    [CheckoutStep.SUCCESS]: {
        title: "Sucesso",
        description: "Seu pedido foi realizado com sucesso",
        progress: 100,
    },
    [CheckoutStep.FAILURE]: {
        title: "Erro",
        description: "Ocorreu um erro ao realizar seu pedido",
        progress: 100,
    },
};
