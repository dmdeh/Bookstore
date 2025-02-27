import { BookType } from "@/types/type";
import styles from "@/styles/InputField.module.css";

export interface InputFieldProps {
  id: keyof BookType;
  label: string;
  type?: string;
  placeholder: string;
  min?: number;
  required?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({
  id,
  label,
  type = "text",
  placeholder,
  min,
  required = true,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        className={styles.input}
        type={type}
        placeholder={placeholder}
        min={min}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
