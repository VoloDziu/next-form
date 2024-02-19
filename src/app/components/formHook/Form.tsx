"use client";

import { ErrorMessage } from "@hookform/error-message";
import { useCallback, useState } from "react";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import {
  Button,
  FieldError,
  Input,
  Label,
  TextField,
  Form as FormRAC,
} from "react-aria-components";

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
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    reset,
  } = useForm();

  const onSubmit = useCallback(
    async (data: unknown) => {
      console.log("her!!!");
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
    <FormRAC onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        control={control}
        name="name"
        rules={{
          required: "name is required",
          minLength: {
            value: 5,
            message: "at least 5 characters long",
          },
        }}
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <TextField
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            validationBehavior="aria"
            isInvalid={invalid}
          >
            <Label>Name</Label>
            <Input
              ref={ref}
              className="border-4 border-purple-400 text-slate-900 invalid:border-red-300 disabled:cursor-not-allowed disabled:opacity-80"
            />
            <FieldError>{error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="email"
        rules={{
          required: "email is required",
          minLength: {
            value: 3,
            message: "at least 3 chars",
          },
        }}
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <TextField
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            validationBehavior="aria"
            isInvalid={invalid}
          >
            <Label>Email</Label>
            <Input
              ref={ref}
              className="border-4 border-purple-400 text-slate-900 invalid:border-red-300 disabled:cursor-not-allowed disabled:opacity-80"
            />
            <FieldError>{error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        control={control}
        name="message"
        rules={{
          required: "message is required",
          minLength: {
            value: 10,
            message: "at least 10 characters long",
          },
        }}
        render={({
          field: { name, value, onChange, onBlur, ref },
          fieldState: { invalid, error },
        }) => (
          <TextField
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            validationBehavior="aria"
            isInvalid={invalid}
          >
            <Label>Message</Label>
            <Input
              ref={ref}
              className="border-4 border-purple-400 text-slate-900 invalid:border-red-300 disabled:cursor-not-allowed disabled:opacity-80"
            />
            <FieldError>{error?.message}</FieldError>
          </TextField>
        )}
      />
      <Button type="submit">Submit</Button>
    </FormRAC>
  );
}
