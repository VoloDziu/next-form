"use client";

import { saveSubmission } from "@/app/submission/db";
import { useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Input } from "./Input";
import { Button } from "./Button";

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submit, null);

  async function submit(
    _: { success: boolean; message?: string } | null,
    data: FormData
  ) {
    const result = await saveSubmission(data);
    if (result.success) {
      formRef.current?.reset();
    }
    return result;
  }

  return (
    <form ref={formRef} className="flex flex-col gap-4" action={formAction}>
      <Input type="text" label="Name" name="name" />
      <Input type="email" label="Email" name="email" />

      {state?.message}

      <Button>Sign up</Button>
    </form>
  );
}
