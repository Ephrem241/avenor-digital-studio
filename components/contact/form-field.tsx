import type { ReactNode } from "react";
import { ChevronDown, CircleAlert } from "lucide-react";
import { cn } from "@/lib/cn";
import type { Option } from "@/lib/enquiry/options";

/** Shared look for text inputs, selects and the textarea on ivory surfaces. */
export const controlClass =
  "w-full rounded-control border border-charcoal-950/20 bg-white px-4 text-body text-charcoal-950 transition-[border-color,box-shadow] duration-200 ease-standard placeholder:text-stone-500 hover:border-charcoal-950/40 focus-visible:border-gold-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-700 aria-invalid:border-error-700";

export function fieldIds(name: string) {
  return { input: `enquiry-${name}`, hint: `enquiry-${name}-hint`, error: `enquiry-${name}-error` };
}

/** `aria-describedby` for a control: its hint and error, when present. */
export function describedBy(name: string, hint?: ReactNode, error?: string) {
  const ids = fieldIds(name);
  return [hint ? ids.hint : null, error ? ids.error : null].filter(Boolean).join(" ") || undefined;
}

export function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} className="flex items-start gap-2 text-small text-error-700">
      <CircleAlert aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

type FieldProps = {
  name: string;
  label: string;
  required?: boolean;
  hint?: ReactNode;
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Label, control, hint and error, stacked. The control gets its id from `fieldIds(name)`. */
export function Field({ name, label, required, hint, error, className, children }: FieldProps) {
  const ids = fieldIds(name);
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={ids.input} className="text-small font-medium text-charcoal-950">
        {label}
        <span className="ml-2 font-normal text-stone-500">{required ? "required" : "optional"}</span>
      </label>
      {children}
      {hint && (
        <p id={ids.hint} className="text-small text-stone-500">
          {hint}
        </p>
      )}
      <FieldError id={ids.error}>{error}</FieldError>
    </div>
  );
}

type SelectProps = {
  name: string;
  options: Option[];
  defaultValue: string;
  error?: string;
  required?: boolean;
  placeholder: string;
};

export function Select({ name, options, defaultValue, error, required, placeholder }: SelectProps) {
  return (
    <div className="relative">
      <select
        id={fieldIds(name).input}
        name={name}
        defaultValue={defaultValue}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(name, undefined, error)}
        className={cn(controlClass, "min-h-12 cursor-pointer appearance-none pr-11")}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-stone-500"
      />
    </div>
  );
}
