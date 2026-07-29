import { useCheckoutStore } from "@/store/checkout";
import CheckoutContentFooter from "../footer";
import { CheckoutStep } from "@/store/checkout/types";

const CheckoutCustomerContent = () => {
    const setStep = useCheckoutStore((state) => state.setStep);
    const completeStep = useCheckoutStore((state) => state.completeStep);
    const setData = useCheckoutStore((state) => state.setData);

    const handleNext = () => {
        setData(CheckoutStep.CUSTOMER, {
            name: "Teste",
            email: "higorfernandes21@hotmail.com",
            phone: "21994444543",
        });

        completeStep(CheckoutStep.CUSTOMER);
        setStep(CheckoutStep.ADDRESS);
    };

    return (
        <div>
            <p>CheckoutCustomerContent</p>
            <CheckoutContentFooter isValid={true} onNext={handleNext} />
        </div>
    );
};

export default CheckoutCustomerContent;
