import { forwardRef } from "react";

export const Input = forwardRef((props, ref, styles) => (
  <input
    {...props}
    ref={ref}
    className={
      "text-sm border border-gray-300 py-2 px-3 rounded-md outline-none focus:shadow cursor-pointer font-semibold uppercase w-full"
    }
  />
));
