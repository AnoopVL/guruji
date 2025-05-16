// app/(main)/schedule-interview/[interview_id]/details/page.jsx
"use client";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState } from "react";
import { useUser } from "@/app/provider";
import InterviewDetailContainer from "../../_components/InterviewDetailContainer";
import CandidateList from "../../_components/CandidateList";

function InterviewDetails() {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetail, setInterviewDetail] = useState(null);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    let { data: interview, error } = await supabase
      .from("interviews")
      .select(
        "jobPosition, jobDescription, type, questionList, duration, interview_id, created_at, interview-feedback(userEmail, userName, feedback, created_at)"
      )
      .eq("userEmail", user?.email)
      .eq("interview_id", interview_id)
      .single();

    console.log(interview);
    setInterviewDetail(interview);
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Interview Details</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
      <CandidateList candidateList={interviewDetail?.["interview-feedback"]} />
    </div>
  );
}

export default InterviewDetails;
