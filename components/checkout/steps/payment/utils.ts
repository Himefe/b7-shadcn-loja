import z from "zod";

const MONTHS = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

export const getCardExpirationYears = () => {
    const years: string[] = [];
    const thisYear = new Date().getFullYear();

    for (let i = 0; i <= 10; i++) {
        years.push(String(thisYear + i));
    }

    return years;
};

export const getCardExpirationMonths = () => {
    const months: Array<{ value: string; label: string }> = [];

    for (let i = 1; i <= 12; i++) {
        months.push({
            value: String(i),
            label: MONTHS[i - 1],
        });
    }

    return months;
};

export const checkoutStepPaymentSchema = z.object({
    cardHolder: z.string().nonempty("O nome no cartão é obrigatório"),
    cardNumber: z
        .string()
        .nonempty("O número do cartão é obrigatório")
        .refine(
            (value) => {
                const cardNumber = value.replace(/[^0-9]/g, "");
                return cardNumber.length === 16;
            },
            { error: "O número do cartão é inválido" },
        ),
    expirationMonth: z.string().nonempty("O mês de validade é obrigatório"),
    expirationYear: z.string().nonempty("O ano de validade é obrigatório"),
    cvv: z.string().nonempty("O CVV é obrigatório"),
});

export type CheckoutStepPaymentData = z.infer<typeof checkoutStepPaymentSchema>;
