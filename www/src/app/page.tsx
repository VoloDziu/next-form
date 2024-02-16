import Form, { Field } from "./components/formHook/Form";
import Submissions from "./components/Submissions";
import { saveSubmissionData } from "./db";

const fields: Field[] = [
  {
    name: "email",
    type: "email",
    label: "Email",
    options: {
      required: "email is required",
      minLength: {
        value: 3,
        message: "at least 3 chars",
      },
    },
  },
  {
    name: "name",
    type: "text",
    label: "Name",
    options: {
      required: "name is required",
      minLength: {
        value: 5,
        message: "at least 5 characters long",
      },
    },
  },
  {
    name: "message",
    type: "text",
    label: "Message",
    options: {
      required: "message is required",
      minLength: {
        value: 10,
        message: "at least 10 characters long",
      },
    },
  },
];

export default async function Home() {
  return (
    <main className="max-w-[300px] p-6">
      <h1 className="mb3">React Hook Form</h1>

      <Form fields={fields} action={saveSubmissionData} />

      <Submissions />
    </main>
  );
}
