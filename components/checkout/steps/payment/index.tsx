import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { checkoutStepPaymentSchema, CheckoutStepPaymentData, getCardExpirationYears, getCardExpirationMonths } from "./utils";
import CheckoutStepFooter from "../footer";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { CheckoutStep } from "@/store/checkout/types";
import { useCheckoutStore } from "@/store/checkout";
import { PatternFormat } from "react-number-format";

export const CheckoutStepPaymentContent = () => {
    const data = useCheckoutStore((state) => state.data[CheckoutStep.PAYMENT]);
    const setData = useCheckoutStore((state) => state.setData);
    const setStepValidity = useCheckoutStore((state) => state.setStepValidity);
    const completeStep = useCheckoutStore((state) => state.completeStep);
    const nextStep = useCheckoutStore((state) => state.nextStep);

    const { formState, control, handleSubmit, getValues } = useForm<CheckoutStepPaymentData>({
        resolver: zodResolver(checkoutStepPaymentSchema),
        mode: "onChange",
        defaultValues: {
            cardHolder: "",
            cardNumber: "",
            expirationMonth: "",
            expirationYear: "",
            cvv: "",
            ...data,
        },
    });

    const submit = () => {
        completeStep(CheckoutStep.PAYMENT);
        nextStep();
    };

    useEffect(() => {
        setStepValidity(CheckoutStep.PAYMENT, formState.isValid);
    }, [formState.isValid, setStepValidity]);

    useEffect(() => {
        return () => {
            setData(CheckoutStep.PAYMENT, getValues());
            if (formState.isValid) {
                completeStep(CheckoutStep.PAYMENT);
            }
        };
    }, [getValues, setData, formState.isValid, completeStep]);

    // STRIPEEEEEEEEEE
    return (
        <form onSubmit={handleSubmit(submit)}>
            <FieldGroup className="mb-4">
                <div className="grid sm:grid-cols-2 gap-6 ">
                    <Controller
                        control={control}
                        name="cardNumber"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="cardNumber">N° de Cartão</FieldLabel>
                                <PatternFormat
                                    {...field}
                                    allowEmptyFormatting={false}
                                    customInput={Input}
                                    format="#### #### #### ####"
                                    id="cardNumber"
                                    aria-invalid={fieldState.invalid}
                                    placeholder="1234 1234 1234 1234"
                                    autoComplete="off"
                                />
                            </Field>
                        )}
                    />
                    <Controller
                        control={control}
                        name="cardHolder"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="cardHolder" className="flex items-center gap-2">
                                    Nome no cartão
                                </FieldLabel>
                                <Input aria-invalid={fieldState.invalid} id="cardHolder" placeholder="João da Silva" {...field} />
                            </Field>
                        )}
                    />
                </div>
                <div className="grid sm:grid-cols-3 gap-6">
                    <Controller
                        control={control}
                        name="expirationMonth"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="expirationMonth">Mês de validade</FieldLabel>
                                <Select value={field.value} aria-invalid={fieldState.invalid} onValueChange={(value) => field.onChange(value)} defaultValue="">
                                    <SelectTrigger id="expirationMonth">
                                        <SelectValue placeholder="Digite o mês de validade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {getCardExpirationMonths().map(({ value: month, label }) => (
                                                <SelectItem key={month} value={month}>
                                                    {label}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}
                    />
                    <Controller
                        control={control}
                        name="expirationYear"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="expirationYear">Ano de validade</FieldLabel>
                                <Select value={field.value} aria-invalid={fieldState.invalid} defaultValue="" onValueChange={(value) => field.onChange(value)}>
                                    <SelectTrigger id="expirationYear">
                                        <SelectValue placeholder="Digite o ano de validade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {getCardExpirationYears().map((year) => (
                                                <SelectItem key={year} value={year}>
                                                    {year}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                        )}
                    />
                    <Controller
                        control={control}
                        name="cvv"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="cvv">CVV</FieldLabel>
                                <Input id="cvv" placeholder="123" {...field} />
                            </Field>
                        )}
                    />
                </div>
            </FieldGroup>
            <CheckoutStepFooter
                isValid={formState.isValid}
                onPrev={() => {
                    console.log("HEHE");
                }}
            />
        </form>
    );
};

export default CheckoutStepPaymentContent;
