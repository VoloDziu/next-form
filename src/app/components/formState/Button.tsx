"use client";

import { ReactNode } from "react";
import { useFormStatus } from "react-dom";

interface Props {
  children: ReactNode;
}

export function Button({ children }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-slate-600 disabled:bg-red-400 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
