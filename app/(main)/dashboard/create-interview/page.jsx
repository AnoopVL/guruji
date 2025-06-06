// app/(main)/dashboard/create-interview/page.jsx
"use client";
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import FormContainer from "./_components/FormContainer";
import QuestionList from "./_components/QuestionList";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import InterviewLink from "./_components/InterviewLink";
import { useUser } from "@/app/provider";

function CreateInterview() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState();
  const [interviewId, setInterviewId] = useState();
  const onHandleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log("Form Data", formData);
  };
  const onGoToNext = () => {
    if (user?.credits <= 0) {
      toast("Insufficient credits!");
      return;
    }
    if (
      !formData?.jobPosition ||
      !formData?.jobDescription ||
      !formData?.duration ||
      formData?.type.length == 0
    ) {
      toast("Please enter all the details!!");
      return;
    }
    setStep(step + 1);
  };

  const onCreateLink = (interview_id) => {
    setInterviewId(interview_id);
    setStep(step + 1);
  };
  return (
    <>
      <div className="mt-10 px-10 pb-20 md:px-24 lg:px-px-44 xl:px-56">
        <div className="flex gap-5 items-center">
          <ArrowLeft onClick={() => router.back()} className="cursor-pointer" />
          <h2 className="font-bold text-2xl">Create a new interview</h2>
        </div>
        <Progress value={step * 33} className="my-5" />
        {step == 1 ? (
          <FormContainer
            onHandleInputChange={onHandleInputChange}
            GoToNext={() => onGoToNext()}
          />
        ) : step == 2 ? (
          <QuestionList
            formData={formData}
            onCreateLink={(interview_id) => onCreateLink(interview_id)}
          />
        ) : step == 3 ? (
          <InterviewLink interview_id={interviewId} formData={formData} />
        ) : null}
      </div>
    </>
  );
}

export default CreateInterview;
