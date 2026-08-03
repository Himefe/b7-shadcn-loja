import { useCheckoutStore } from "@/store/checkout";
import CheckoutStepFooter from "../footer";
import { CheckoutStep } from "@/store/checkout/types";
import { Controller, useForm } from "react-hook-form";
import { checkoutCustomerFormSchema, CheckoutStepCustomerData } from "./utils";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PatternFormat } from "react-number-format";
import { useEffect } from "react";

const CheckoutCustomerStepContent = () => {
    const nextStep = useCheckoutStore((state) => state.nextStep);
    const completeStep = useCheckoutStore((state) => state.completeStep);
    const setData = useCheckoutStore((state) => state.setData);
    const setStepValidity = useCheckoutStore((state) => state.setStepValidity);

    const data = useCheckoutStore((state) => state.data[CheckoutStep.CUSTOMER]);

    const { control, formState, handleSubmit, setValues, getValues } = useForm<CheckoutStepCustomerData>({
        resolver: zodResolver(checkoutCustomerFormSchema),
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            cpf: "",
        },
    });

    const submit = () => {
        completeStep(CheckoutStep.CUSTOMER);
        nextStep();
    };

    useEffect(() => {
        if (data) {
            setValues(data);
        }
    }, [data, setValues]);

    useEffect(() => {
        setStepValidity(CheckoutStep.CUSTOMER, formState.isValid);
    }, [formState.isValid, setStepValidity]);

    useEffect(() => {
        return () => {
            setData(CheckoutStep.CUSTOMER, getValues());
        };
    }, [getValues, setData]);

    return (
        <form onSubmit={handleSubmit(submit)}>
            <div className="grid sm:grid-cols-2 gap-6 mb-4">
                <FieldGroup>
                    <Controller
                        name="name"
                        control={control}
                        render={({ field, fieldState }) => {
                            return (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="name">Nome completo</FieldLabel>
                                    <Input {...field} id="name" aria-invalid={fieldState.invalid} placeholder="Digite seu nome completo" autoComplete="off" />
                                </Field>
                            );
                        }}
                    />
                </FieldGroup>
                <FieldGroup>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => {
                            return (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input {...field} type="email" id="email" aria-invalid={fieldState.invalid} placeholder="Digite seu melhor e-mail" autoComplete="off" />
                                </Field>
                            );
                        }}
                    />
                </FieldGroup>
                <FieldGroup>
                    <Controller
                        name="cpf"
                        control={control}
                        render={({ field, fieldState }) => {
                            return (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="cpf">CPF</FieldLabel>
                                    <PatternFormat
                                        {...field}
                                        mask="_"
                                        allowEmptyFormatting={false}
                                        customInput={Input}
                                        format="###.###.###-##"
                                        id="cpf"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Digite seu CPF"
                                        autoComplete="off"
                                    />
                                </Field>
                            );
                        }}
                    />
                </FieldGroup>
                <FieldGroup>
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => {
                            return (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="phone">Celular</FieldLabel>
                                    <PatternFormat
                                        {...field}
                                        mask="_"
                                        customInput={Input}
                                        format="(##) #####-####"
                                        id="phone"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Digite seu celular"
                                        autoComplete="off"
                                    />
                                </Field>
                            );
                        }}
                    />
                </FieldGroup>
            </div>
            <CheckoutStepFooter isValid={formState.isValid} />
        </form>
    );
};

export default CheckoutCustomerStepContent;
