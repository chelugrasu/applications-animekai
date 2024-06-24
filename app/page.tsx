import Main from "@/components/Main";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <main>
      <div className="h-screen flex flex-col gap-4">
        <Main />
      </div>
      <Toaster position="top-center" richColors />
    </main>
  );
}
