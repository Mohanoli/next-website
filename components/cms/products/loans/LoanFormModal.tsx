import {ProductsFormModal} from "@/components/formModel/ProductsFormModal"
import { ProductFormModalProps } from "@/lib/types/GlobalTypes"


export const LoanFormModal = (props: any) => {
    return (
        <ProductsFormModal
            {...props}
            title="Loan"
            endpoint="/loans-services"
            amountKey="loanAmount"
            amountLabel="Loan Amount"
        />
    );
};