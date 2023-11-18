import Image from "next/image";
import Form from "./components/form/Form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Form></Form>
    </main>
  );
}
