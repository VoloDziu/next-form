import { sql } from "@vercel/postgres";

export default async function Home() {
  const { rows } = await sql`SELECT * FROM submissions`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {rows.map((submission) => (
        <div key={submission.id} className="flex gap-2">
          {submission.name} {submission.email}
        </div>
      ))}
    </main>
  );
}
