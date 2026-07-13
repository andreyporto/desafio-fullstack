interface FormLabelProps {
  label: string;
  required?: boolean;
}

export default function FormLabel({ label, required = false }: FormLabelProps) {
  return (
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="ml-0.5 text-red-500">*</span>}
    </label>
  );
}
