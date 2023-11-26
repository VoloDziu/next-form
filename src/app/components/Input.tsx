"use client";

import { HTMLInputTypeAttribute } from "react";
import { useFormStatus } from "react-dom";

interface Props {
  type: HTMLInputTypeAttribute;
  name: string;
  label: string;
}

export function Input({ type, name, label }: Props) {
  const { pending } = useFormStatus();

  return (
    <label className="flex flex-col">
      {label}
      <input
        disabled={pending}
        type={type}
        name={name}
        className="text-slate-900 disabled:opacity-80 disabled:cursor-not-allowed"
      />
    </label>
  );
}
