import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, className, placeholder, ...props }, ref) => {
    return (
      <>
        {type === "text" && (
          <input
            type="text"
            placeholder={placeholder}
            className={`md:w-3/4 h-12 w-5/6 bg-gray-200/40 rounded-md outline-none p-4 text-white shadow-md ${className} placeholder:text-white`}
            ref={ref}
            {...props}
          />
        )}
        {type === "date" && (
          <input
            type="date"
            placeholder={placeholder}
            className={`md:w-3/4 h-12 w-5/6 bg-gray-200/40 rounded-md outline-none p-4 text-white shadow-md ${className} placeholder:text-white`}
            ref={ref}
            min="2000-01-01"
            max="2008-01-01"
            {...props}
          />
        )}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
