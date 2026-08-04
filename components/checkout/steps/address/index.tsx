"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { checkoutAddressFormSchema, CheckoutStepAddressData, getAddressFromZipCode } from "./utils";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckoutStepFooter from "../footer";
import { useCheckoutStore } from "@/store/checkout";
import { CheckoutStep } from "@/store/checkout/types";
import { LoaderCircle } from "lucide-react";

const CheckoutAddressStepContent = () => {
    const [isLoading, setIsLoading] = useState(false);

    const nextStep = useCheckoutStore((state) => state.nextStep);
    const prevStep = useCheckoutStore((state) => state.prevStep);
    const setData = useCheckoutStore((state) => state.setData);
    const completeStep = useCheckoutStore((state) => state.completeStep);
    const setStepValidity = useCheckoutStore((state) => state.setStepValidity);

    const data = useCheckoutStore((state) => state.data[CheckoutStep.ADDRESS]);

    const { formState, control, getValues, setValue, handleSubmit } = useForm<CheckoutStepAddressData>({
        mode: "onChange",
        resolver: zodResolver(checkoutAddressFormSchema),
        defaultValues: {
            zipCode: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
            observations: "",
            ...data,
        },
    });

    const handleGetAddressFromZipCode = async () => {
        try {
            setIsLoading(true);
            const address = await getAddressFromZipCode(getValues("zipCode"));

            setValue("street", address.logradouro || "");
            setValue("neighborhood", address.bairro || "");
            setValue("city", address.localidade || "");
            setValue("state", address.uf || "");
        } catch (error) {
            console.error(error);
            setValue("street", "");
            setValue("neighborhood", "");
            setValue("city", "");
            setValue("state", "");
        } finally {
            setIsLoading(false);
        }
    };

    const submit = () => {
        completeStep(CheckoutStep.ADDRESS);
        nextStep();
    };

    const handlePrevStep = () => {
        if (formState.isValid) {
            completeStep(CheckoutStep.ADDRESS);
        }

        prevStep();
    };

    useEffect(() => {
        setStepValidity(CheckoutStep.ADDRESS, formState.isValid);
    }, [formState.isValid, setStepValidity]);

    useEffect(() => {
        return () => {
            setData(CheckoutStep.ADDRESS, getValues());
            if (formState.isValid) {
                completeStep(CheckoutStep.ADDRESS);
            }
        };
    }, [getValues, setData, formState.isValid, completeStep]);

    return (
        <form onSubmit={handleSubmit(submit)}>
            <FieldGroup className="grid sm:grid-cols-2 gap-6 mb-4">
                <div className="sm:col-span-2">
                    <Controller
                        name="zipCode"
                        control={control}
                        render={({ field, fieldState }) => {
                            return (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel>CEP</FieldLabel>
                                    <div className="flex gap-2">
                                        <PatternFormat
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            mask="_"
                                            allowEmptyFormatting={false}
                                            format="#####-###"
                                            placeholder="00000-000"
                                            customInput={Input}
                                        />
                                        <Button type="button" disabled={isLoading || fieldState.invalid || !field.value} onClick={handleGetAddressFromZipCode}>
                                            {isLoading ? <LoaderCircle className="animate-spin" /> : "Buscar"}
                                        </Button>
                                    </div>
                                </Field>
                            );
                        }}
                    />
                </div>
                <Controller
                    name="state"
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Estado</FieldLabel>
                                <Input {...field} aria-invalid={fieldState.invalid} placeholder="Digite seu estado" />
                            </Field>
                        );
                    }}
                />
                <Controller
                    name="city"
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Cidade</FieldLabel>
                                <Input {...field} aria-invalid={fieldState.invalid} placeholder="Digite sua cidade" />
                            </Field>
                        );
                    }}
                />
                <Controller
                    name="neighborhood"
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Bairro</FieldLabel>
                                <Input {...field} aria-invalid={fieldState.invalid} placeholder="Digite seu bairro" />
                            </Field>
                        );
                    }}
                />
                <Controller
                    name="street"
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Rua</FieldLabel>
                                <Input {...field} aria-invalid={fieldState.invalid} placeholder="Digite o nome da rua" />
                            </Field>
                        );
                    }}
                />
                <div className="sm:flex gap-4">
                    <div className="sm:max-w w-20">
                        <Controller
                            name="number"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Número</FieldLabel>
                                        <Input {...field} aria-invalid={fieldState.invalid} placeholder="N°" />
                                    </Field>
                                );
                            }}
                        />
                    </div>
                    <div className="flex-1">
                        <Controller
                            name="complement"
                            control={control}
                            render={({ field, fieldState }) => {
                                return (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel>Complemento</FieldLabel>
                                        <Input {...field} aria-invalid={fieldState.invalid} placeholder="Digite o complemento" />
                                    </Field>
                                );
                            }}
                        />
                    </div>
                </div>
                <Controller
                    name="observations"
                    control={control}
                    render={({ field, fieldState }) => {
                        return (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Observações</FieldLabel>
                                <Input {...field} aria-invalid={fieldState.invalid} placeholder="Digite as observações" />
                            </Field>
                        );
                    }}
                />
            </FieldGroup>
            <CheckoutStepFooter isValid={formState.isValid} onPrev={handlePrevStep} />
        </form>
    );
};

export default CheckoutAddressStepContent;
