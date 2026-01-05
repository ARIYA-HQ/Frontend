import type { ReactNode } from 'react';

interface FormFieldProps {
    label: string;
    id?: string;
    name?: string;
    type?: 'text' | 'email' | 'number' | 'date' | 'select' | 'textarea' | 'password';
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    required?: boolean;
    children?: ReactNode;
    className?: string;
    rows?: number;
    error?: string;
}

export const FormField = ({
    label,
    id,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    onBlur,
    required = false,
    children,
    className = '',
    rows = 4,
    error
}: FormFieldProps) => {
    const fieldId = id || name || label.toLowerCase().replace(/\s+/g, '-');

    const baseInputClasses = `w-full rounded-2xl border ${error ? 'border-red-300 dark:border-red-600' : 'border-gray-100 dark:border-gray-700'} bg-gray-50/30 dark:bg-gray-800/50 px-5 py-4 text-xs font-bold text-[#1D2939] dark:text-white placeholder:text-gray-300 dark:placeholder:text-gray-500 focus:bg-white dark:focus:bg-gray-800 focus:border-[#D0771E] dark:focus:border-[#D0771E] focus:ring-4 focus:ring-orange-500/10 dark:focus:ring-orange-500/20 transition-all outline-none`;

    const renderInput = () => {
        if (type === 'select') {
            return (
                <select
                    id={fieldId}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    required={required}
                    className={`${baseInputClasses} pr-12 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236B7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem_1.25rem] bg-right-center bg-no-repeat ${className}`}
                >
                    {children}
                </select>
            );
        }

        if (type === 'textarea') {
            return (
                <textarea
                    id={fieldId}
                    name={name}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={onBlur}
                    required={required}
                    placeholder={placeholder}
                    rows={rows}
                    className={`${baseInputClasses} resize-none ${className}`}
                />
            );
        }

        return (
            <input
                type={type}
                id={fieldId}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                required={required}
                placeholder={placeholder}
                className={`${baseInputClasses} ${className}`}
            />
        );
    };

    return (
        <div className="space-y-2.5 w-full">
            <div className="flex justify-between items-center px-1">
                <label htmlFor={fieldId} className="block text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">
                    {label} {required && <span className="text-red-400 dark:text-red-400">*</span>}
                </label>
                {error && <span className="text-[9px] font-black text-red-500 dark:text-red-400 uppercase tracking-widest">{error}</span>}
            </div>
            <div className="relative">
                {renderInput()}
            </div>
        </div>
    );
};
