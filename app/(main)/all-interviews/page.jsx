// app/(main)/all-interviews/page.jsx
"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaVideo } from "react-icons/fa6";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import InterviewCard from "../dashboard/_components/InterviewCard";

function AllInterviews() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    let { data: interviews, error } = await supabase
      .from("interviews")
      .select("*")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });
    console.log(interviews);
    setInterviewList(interviews);
  };

  return (
    <>
      <div className="my-5">
        <h2 className="my-3 font-bold text-2xl p-5">All Interview List</h2>
      </div>
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
          {interviewList?.map((interview, index) => (
            <InterviewCard
              interview={interview}
              key={index}
              viewDetail={false}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default AllInterviews;
