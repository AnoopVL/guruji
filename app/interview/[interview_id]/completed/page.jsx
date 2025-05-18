"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function InterviewCompleted() {
  const router = useRouter();

  const returnToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-10">
      <div className="flex flex-col items-center justify-center border rounded-xl bg-gray-100 p-7 shadow-xl gap-2 md:px-28 lg:px-32 xl:px-52 mb-20">
        <div>
          <Image
            src="/check.png"
            alt="check"
            width={50}
            height={50}
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <h2 className="text-3xl">Interview Completed!</h2>
          <h2 className="text-sm text-gray-500">
            Thank you for participating in the Ai driven interview with Guruji
          </h2>
        </div>
        <div>
          <Image
            src="/gurujiInterviewCompleted.png"
            alt="InterviewCompleted"
            width={600}
            height={200}
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-1 items-center justify-center">
          <h2 className="text-3xl">What next?</h2>
          <h2 className="text-md text-gray-500">
            You'll get to know the interview feedback soon.
          </h2>
        </div>
        <div className="w-full">
          <Button
            className="w-full mt-4 cursor-pointer"
            onClick={returnToDashboard}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default InterviewCompleted;
