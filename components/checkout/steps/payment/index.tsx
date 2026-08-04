import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCardValidationYears } from "./utils";
import CheckoutStepFooter from "../footer";

export const CheckoutStepPaymentContent = () => {
    return (
        <form>
            <FieldGroup>
                <div className="grid sm:grid-cols-2 gap-6">
                    <Field>
                        <FieldLabel htmlFor="checkout-7j9-card-number-uw1">N° de Cartão</FieldLabel>
                        <Input id="checkout-7j9-card-number-uw1" placeholder="1234 5678 9012 3456" required />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="checkout-7j9-card-name-43j" className="flex items-center gap-2">
                            Nome no cartão
                        </FieldLabel>
                        <Input id="checkout-7j9-card-name-43j" placeholder="Evil Rabbit" required />
                    </Field>
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                    <Field>
                        <FieldLabel htmlFor="checkout-exp-month-ts6">Mês de validade</FieldLabel>
                        <Select defaultValue="">
                            <SelectTrigger id="checkout-7j9-exp-year-f59">
                                <SelectValue placeholder="Digite o mês de validade" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {getCardValidationYears().map((year) => (
                                        <SelectItem key={year} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="checkout-7j9-exp-year-f59">Ano de validade</FieldLabel>
                        <Select defaultValue="">
                            <SelectTrigger id="checkout-7j9-exp-year-f59">
                                <SelectValue placeholder="Digite o ano de validade" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {getCardValidationYears().map((year) => (
                                        <SelectItem key={year} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="checkout-7j9-cvv">CVV</FieldLabel>
                        <Input id="checkout-7j9-cvv" placeholder="123" required />
                    </Field>
                </div>
            </FieldGroup>
            <CheckoutStepFooter
                isValid={true}
                onPrev={() => {
                    console.log("HEHE");
                }}
            />
        </form>
    );
};

export default CheckoutStepPaymentContent;
