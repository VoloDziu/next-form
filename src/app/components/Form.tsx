import { saveSubmission } from "@/app/submission/db";

export default function Form() {
  return (
    <form className="flex flex-col gap-4" action={saveSubmission}>
      <label className="flex flex-col">
        Your name:
        <input type="text" name="name" className="text-slate-900" />
      </label>

      <label className="flex flex-col">
        Your email:
        <input type="email" name="email" className="text-slate-900" />
      </label>

      <button className="bg-slate-600">Submit</button>
    </form>
  );
}
