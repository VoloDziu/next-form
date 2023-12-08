"use client";

import { ComponentPropsWithRef, ReactNode, forwardRef, useId } from "react";

type Props = {
  label: string;
  error: ReactNode;
} & ComponentPropsWithRef<"input">;

export default forwardRef<HTMLInputElement, Props>(function Input(
  { label, error, ...rest },
  ref,
) {
  const errorId = useId();
  const errorView = error?.toString() ? <div id={errorId}>{error}</div> : "";

  return (
    <>
      <label className="flex flex-col">
        {label}

        <input
          ref={ref}
          className="border-4 border-purple-400 text-slate-900 invalid:border-red-300 disabled:cursor-not-allowed disabled:opacity-80"
          {...rest}
        />
      </label>

      {errorView}
    </>
  );
});
