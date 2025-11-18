import { Input } from '../atoms';

interface FormFieldProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  hint?: string;
}

export function FormField({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  required = false,
  hint,
}: FormFieldProps) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        error={error}
        required={required}
      />
      {hint && !error && <p className="text-xs text-text-secondary mt-2">{hint}</p>}
    </div>
  );
}
