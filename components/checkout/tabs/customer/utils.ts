import z from "zod";
import { isValidCPF } from "@brazilian-utils/brazilian-utils";

export const CheckoutCustomerFormSchema = z.object({
    name: z.string().nonempty("O nome é obrigatório"),
    email: z.email("O email é inválido").nonempty("O email é obrigatório"),
    phone: z.string().min(11, "O telefone é inválido").nonempty("O telefone é obrigatório"),
    cpf: z.string().nonempty("O CPF é obrigatório").refine(isValidCPF, {
        error: "O CPF é inválido",
    }),
});

export type CheckoutStepCustomerData = z.infer<typeof CheckoutCustomerFormSchema>;
