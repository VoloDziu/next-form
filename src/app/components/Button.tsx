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
      className="bg-slate-600 disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {children}
    </button>
  );
}
