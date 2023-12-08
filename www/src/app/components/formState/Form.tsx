"use client";

import { saveSubmissionForm } from "@/app/db";
import { useRef } from "react";
import { Input } from "./Input";
import { Button } from "./Button";
import { useFormState } from "react-dom";

export default function Form() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(submit, null);

  async function submit(
    _: { success: boolean; message?: string } | null,
    data: FormData,
  ) {
    const result = await saveSubmissionForm(data);
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
