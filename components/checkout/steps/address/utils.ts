import z from "zod";
import { isValidCEP } from "@brazilian-utils/brazilian-utils";

export const checkoutAddressFormSchema = z.object({
    zipCode: z.string().nonempty("O CEP é obrigatório").refine(isValidCEP, {
        message: "O CEP é inválido",
    }),
    street: z.string().nonempty("A rua é obrigatória"),
    number: z.string().nonempty("O número é obrigatório"),
    complement: z.string(),
    neighborhood: z.string().nonempty("O bairro é obrigatório"),
    city: z.string().nonempty("A cidade é obrigatória"),
    state: z.string().nonempty("O estado é obrigatório"),
    observations: z.string(),
});

export type CheckoutStepAddressData = z.infer<typeof checkoutAddressFormSchema>;

type ViaCepResponse = {
    cep: string;
    logradouro: string;
    complemento: string;
    unidade?: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
};

export const getAddressFromZipCode = async (zipCode: string): Promise<ViaCepResponse> => {
    const response = await fetch(`https://viacep.com.br/ws/${zipCode}/json/`);

    if (!response.ok) {
        throw new Error("CEP inválido");
    }

    const json = (await response.json()) as ViaCepResponse;

    if ("erro" in json) {
        throw new Error("CEP inválido");
    }

    return json;
};
