import Form from "./components/Form";
import SubmissionItem from "./components/SubmissionItem";
import { getSubmissions } from "./submission/db";

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
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6">
      <Form />

      {content}
    </main>
  );
}
