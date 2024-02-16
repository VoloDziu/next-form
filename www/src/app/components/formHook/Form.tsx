"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useCallback, useState } from "react";
import { RegisterOptions, useForm } from "react-hook-form";
import Input from "./Input";

export interface Field {
  name: string;
  label: string;
  type: "number" | "text" | "email";
  options?: RegisterOptions;
}

interface Props {
  action: (data: unknown) => Promise<{ success: boolean; message: string }>;
  fields: Field[];
}

export default function Form({ fields, action }: Props) {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const onSubmit = useCallback(
    async (data: unknown) => {
      setMessage("");
      const result = await action(data);

      if (result.success) {
        reset();
      }
      setMessage(result.message);
    },
    [reset, action],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <fieldset disabled={isSubmitting}>
        {fields.map((f) => (
          <Input
            key={f.name}
            label={f.label}
            type={f.type}
            error={<ErrorMessage errors={errors} name={f.name} />}
            {...register(f.name, {
              ...f.options,
            })}
          />
        ))}
      </fieldset>

      <button
        disabled={isSubmitting}
        className="bg-slate-600 disabled:cursor-not-allowed disabled:bg-red-400"
      >
        Sign up
      </button>

      {message}
    </form>
  );
}
