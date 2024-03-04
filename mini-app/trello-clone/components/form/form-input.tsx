"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormError } from "./form-error";

interface FormInputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      defaultValue = "",
      onBlur,
    },
    ref,
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? (
            <Label
              className="text-xs font-semibold text-neutral-700"
              htmlFor={id}
            >
              {label}
            </Label>
          ) : null}
          <Input
            ref={ref}
            id={id}
            name={id}
            required={required}
            type={type}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={pending || disabled}
            onBlur={onBlur}
            className={cn("h-7 px-2 py-1 text-sm", className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormError id={id} errors={errors} />
      </div>
    );
  },
);

FormInput.displayName = "FormInput";
