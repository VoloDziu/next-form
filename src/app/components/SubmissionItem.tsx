import { Submission, deleteSubmission } from "../submission/db";

interface Props {
  submission: Submission;
}

export default async function SubmissionItem({ submission }: Props) {
  return (
    <form key={submission.id} action={deleteSubmission}>
      <input type="hidden" name="id" value={submission.id} />
      <button className="flex gap-2">
        {submission.name} {submission.email}
      </button>
    </form>
  );
}
