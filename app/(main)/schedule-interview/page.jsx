// app/(main)/schedule-interview/page.jsx
"use client";
import { useUser } from "@/app/provider";
import { useState } from "react";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FaVideo } from "react-icons/fa6";
import InterviewCard from "../dashboard/_components/InterviewCard";

function ScheduleInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);
  //        2. Number of candidates who have attended a particular interview
  const GetInterviewList = async () => {
    let { data: interviews, error } = await supabase
      .from("interviews")
      .select(
        "jobPosition, duration, interview_id, created_at, interview-feedback(userEmail)"
      )
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });
    console.log(interviews);
    setInterviewList(interviews);
  };
  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">
        Interview list with candidate feedback
      </h2>
      {interviewList?.length == 0 && (
        <div className="flex flex-col p-5 space-y-3 items-center">
          <div className="w-12 h-12 bg-green-100 rounded-lg inline-flex items-center justify-center">
            <FaVideo className="text-green-700 w-6 h-6" />
          </div>
          <h2>You don't have any interviews created</h2>
          <Button>+ Create New Interview</Button>
        </div>
      )}
      {interviewList && (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-5 p-5">
          {interviewList
            .filter((interview) => interview["interview-feedback"] !== null)
            .map((interview, index) => (
              <InterviewCard
                interview={interview}
                key={index}
                viewDetail={true}
              />
            ))}
        </div>
      )}
    </div>
  );
}

export default ScheduleInterview;
