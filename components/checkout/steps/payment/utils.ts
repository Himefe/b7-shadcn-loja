export const getCardValidationYears = () => {
    const years: number[] = [];
    const thisYear = new Date().getFullYear();

    for (let i = 0; i <= 10; i++) {
        years.push(thisYear + i);
    }

    return years;
};

export const getCardValidationMonths = () => {
    const months: number[] = [];

    for (let i = 1; i <= 12; i++) {
        months.push(i);
    }

    return months;
};
