import { deleteSubmission, getSubmissions } from "../db";

export default async function Submissions() {
  const result = await getSubmissions();

  let content: React.ReactNode = "";
  if (result.success) {
    content =
      result.data?.map((submission) => (
        <form key={submission.id} action={deleteSubmission}>
          <input type="hidden" name="id" value={submission.id} />
          <button className="flex gap-2">
            {submission.name} {submission.email}
          </button>
        </form>
      )) ?? "";
  }

  return content;
}
