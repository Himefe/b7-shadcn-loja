import { create } from "zustand";
import { CheckoutStep, CheckoutStore } from "./types";

const initialState: Pick<CheckoutStore, "steps" | "currentStep" | "data" | "isCheckoutOpen" | "completedSteps" | "stepValidities"> = {
    isCheckoutOpen: false,
    steps: [CheckoutStep.CUSTOMER, CheckoutStep.ADDRESS, CheckoutStep.PAYMENT, CheckoutStep.REVIEW],
    currentStep: CheckoutStep.CUSTOMER,
    data: {},
    completedSteps: [],
    stepValidities: {},
};

export const useCheckoutStore = create<CheckoutStore>()((set) => ({
    ...initialState,

    toggleCheckout: (isOpen: boolean) => set((state) => ({ ...state, isCheckoutOpen: isOpen })),
    completeStep: (step: CheckoutStep) =>
        set((state) => {
            const uniqueCompletedSteps = new Set(state.completedSteps);
            uniqueCompletedSteps.add(step);

            return {
                ...state,
                completedSteps: Array.from(uniqueCompletedSteps),
            };
        }),
    setStep: (step: CheckoutStep) => set((state) => ({ ...state, currentStep: step })),
    setStepValidity: (step, isValid) =>
        set((state) => ({
            ...state,
            stepValidities: {
                ...state.stepValidities,
                [step]: isValid,
            },
        })),
    nextStep: () =>
        set((state) => {
            const currentIndex = state.steps.indexOf(state.currentStep);

            if (currentIndex === -1 || currentIndex === state.steps.length - 1) {
                return state;
            }

            return {
                ...state,
                currentStep: state.steps[currentIndex + 1],
            };
        }),
    prevStep: () =>
        set((state) => {
            const currentIndex = state.steps.indexOf(state.currentStep);

            if (currentIndex <= 0) {
                return state;
            }

            return {
                ...state,
                currentStep: state.steps[currentIndex - 1],
            };
        }),
    setData: (step, data) => {
        return set((state) => ({
            ...state,
            data: {
                ...state.data,
                [step]: data,
            },
        }));
    },
}));
