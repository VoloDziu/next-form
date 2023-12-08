import Form, { Field } from "./components/formHook/Form";
import SubmissionItem from "./components/SubmissionItem";
import { getSubmissions, saveSubmissionData } from "./db";

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
  const result = await getSubmissions();

  let content: React.ReactNode = "";
  if (result.success) {
    content =
      result.data?.map((submission) => (
        <SubmissionItem key={submission.id} submission={submission} />
      )) ?? "";
  }

  return (
    <main className="max-w-[300px] p-6">
      <Form fields={fields} action={saveSubmissionData} />

      {content}
    </main>
  );
}
