import {ProductsFormModal} from "@/components/formModel/ProductsFormModal"
import { ProductFormModalProps } from "@/lib/types/GlobalTypes"


export const SavingFormModal = (props: any) => {
    return (
        <ProductsFormModal
            {...props}
            title="Saving"
            endpoint="/saving-services"
            amountKey="minBalance"
            amountLabel="Min. Balance"
        />
    );
};
