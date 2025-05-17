// app/page.js
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-4xl font-bold">Welcome to Guruji</h1>
      <p className="text-lg text-gray-600">
        Generate AI-powered interviews in minutes
      </p>

      <Button asChild>
        <Link href="/auth" className="w-40 text-center">
          Sign In
        </Link>
      </Button>
    </div>
  );
}
