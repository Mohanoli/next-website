// Reusable Label Component
export const FormLabel = (
    props: Readonly<{ htmlFor: string; labelText?: string; required?: boolean }>
) => {
    return (
        <label htmlFor={props.htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
            {props.labelText} {props.required && <span className="text-red-500">*</span>}
        </label>
    );
};
