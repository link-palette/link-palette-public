import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export interface CustomTextareaProps extends TextareaProps {
  error?: boolean;
  errorMessage?: string;
}
const Textarea = React.forwardRef<HTMLTextAreaElement, CustomTextareaProps>(
  ({ className, error, errorMessage, ...props }, ref) => {
    return (
      <div className="relative h-[150px] ">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
            error && "focus-visible:ring-error-400 border-error-400",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && errorMessage && (
          <p className="text-error-400 text-sm mt-[0.5px] mb-2">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
