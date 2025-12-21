import { useId } from "react";

export default function Input({ label, labelHidden = false, className = "", ...props }) {
  const inputId = useId();
  const labelClass = labelHidden ? "sr-only" : "";
  const inputClass = `input-field ${className}`.trim();

  return (
    <div className="input unit unit-atom">
      <label htmlFor={inputId} className={labelClass}>
        {label}
      </label>
      <input id={inputId} className={inputClass} {...props} />
    </div>
  );
}
