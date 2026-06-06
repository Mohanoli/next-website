import { ITextInputProps, InputType } from "@/lib/types/GlobalTypes";
import { useController } from "react-hook-form";

export const TextInput = ({
    name,
    type = "text",
    placeholder,
    className,
    control,
    errMsg,
    icon
}: ITextInputProps) => {
    const { field } = useController({
        name,
        control,
        defaultValue: "",
    });


    return (
        <div className="w-full">
            <input
                {...field}
                type={type}
                id={name}
                placeholder={placeholder}
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all ${errMsg ? "border-red-500 bg-red-50" : "border-gray-300"
                    } ${className}`}
            />
            {errMsg && <p className="mt-1 text-xs text-red-500">{errMsg}</p>}
        </div>
    );
};


 

// export const EmiInput = ({
//   loanAmount,
//   loanRate,
//   tenure,
//   tenureType,
//   onLoanAmountChange,
//   onLoanRateChange,
//   onTenureChange,
//   onTenureTypeChange,
// }: IEmiInputtProps) {
//   return (
//     <div className="p-6 lg:p-8 space-y-6">
//       <SliderInput
//         prefix="NPR"
//         value={loanAmount}
//         onChange={onLoanAmountChange}
//         step={10_000}
//         minLabel="NPR 10K"
//         maxLabel="NPR 1Cr"
//         placeholder="e.g. 500000"
//         />