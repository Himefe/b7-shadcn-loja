type NumberToCurrencyOptions = {
    locale?: Intl.LocalesArgument;
} & Intl.NumberFormatOptions;

export const numberToCurrency = (number: number, options?: NumberToCurrencyOptions) => {
    if (typeof number !== "number") {
        throw new Error("Parameter number must be a number");
    }

    return Intl.NumberFormat(options?.locale || "pt-BR", { style: "currency", currency: "BRL", ...options }).format(number);
};

export const currencyToNumber = (currency: string) => {
    if (typeof currency !== "string") {
        throw new Error("Parameter currency must be a string");
    }

    currency = currency.replace(/[^0-9.,]/g, "");
    const number = Number(currency.replace(",", "."));

    if (isNaN(number)) {
        throw new Error("Invalid currency format");
    }

    return number;
};
