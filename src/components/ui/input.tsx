import * as React from "react";
import { cn } from "@/lib/utils";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface CustomInputProps extends InputProps {
  error?: boolean;
  errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className, type, error, errorMessage, ...props }, ref) => {
    const [eye, setEye] = React.useState(false);

    const toggleEye = () => {
      setEye(!eye);
    };

    const inputType = type === "password" && eye ? "text" : type;

    return (
      <div className="relative h-[90px]">
        <input
          type={inputType}
          className={cn(
            "flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
            error && "focus-visible:ring-error-400 border-error-400",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <span
            onClick={toggleEye}
            className="absolute right-3 top-[25%] transform -translate-y-1/2 cursor-pointer"
          >
            {eye ? <FaEye /> : <FaEyeSlash />}
          </span>
        )}
        {error && errorMessage && (
          <p className="text-error-400 text-sm mt-[0.5px]">{errorMessage}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
