"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { ZodError, z } from "zod";

const Submission = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email("email is required"),
});

export type Submission = z.infer<typeof Submission> & { id: number };

export async function getSubmissions() {
  try {
    const { rows } = await sql<Submission>`SELECT * FROM submissions`;

    return {
      success: true,
      data: rows,
    };
  } catch {
    return {
      success: false,
      data: [],
    };
  }
}

export async function saveSubmission(formData: FormData) {
  try {
    const data = Submission.parse({
      email: formData.get("email"),
      name: formData.get("name"),
    });

    const result = await sql`
      INSERT INTO submissions (name, email)
      VALUES (${data.name}, ${data.email});
    `;

    revalidatePath("/");

    return { message: "success" };
  } catch (e: unknown) {
    if (e instanceof ZodError) {
      return {
        error: e.issues[0].message,
      };
    }

    return { error: "Failed to subscribe to the waiting list" };
  }
}

export async function deleteSubmission(formData: FormData) {
  try {
    const id = z.string().min(1).parse(formData.get("id"));

    await sql`
      DELETE FROM submissions 
      WHERE id = ${id};
    `;

    revalidatePath("/");
  } catch (e: unknown) {
    if (e instanceof ZodError) {
      return {
        error: e.issues[0].message,
      };
    }

    return { error: "Failed to delete a record" };
  }
}
