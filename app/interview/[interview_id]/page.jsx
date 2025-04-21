"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { useState } from "react";

function Interview() {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState();

  useEffect(() => {
    interview_id && GetInterviewDetails();
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    let { data: interviews, error } = await supabase
      .from("interviews")
      .select("jobPosition, jobDescription, type, duration")
      .eq("interview_id", interview_id);
    setInterviewData(interviews[0]);
  };
  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-10">
      <div className="flex flex-col items-center justify-center border rounded-xl bg-gray-100 p-7 shadow-xl gap-2 md:px-28 lg:px-32 xl:px-52 mb-20">
        <div className="flex flex-row items-center space-x-1 p-4">
          <Image
            src="/gurujiLogoSm.png"
            alt="logo small"
            width={40}
            height={40}
          />
          <div className="text-2xl text-green-700">GURUJI</div>
        </div>
        <Image
          src="/joinInterview.png"
          alt="joinInterview"
          width={600}
          height={200}
          className="rounded-xl"
        />
        <h2 className="font-bold text-lg">{interviewData?.jobPosition}</h2>
        <h2 className="flex gap-1.5 items-center text-gray-500 mt-4">
          <Clock />
          {interviewData?.duration}
        </h2>
        <div className="w-full mt-4">
          <h2>Enter your full name</h2>
          <Input placeholder="eg. Anoop Lanjekar" className="bg-white" />
        </div>

        <div className="p-4 flex gap-4 rounded-lg bg-green-200 mt-4 w-full">
          <Info className="text-primary" />
          <div>
            <h2 className="font-bold text-primary">Before you begin</h2>
            <ul>
              <li className="text-primary text-sm">
                - Ensure you have stable internet connection.
              </li>
              <li className="text-primary text-sm">
                - Test your camera and microphone.
              </li>
              <li className="text-primary text-sm">
                - Find a quite place for interview.
              </li>
            </ul>
          </div>
        </div>
        <Button className="w-full mt-4 ">
          <VideoIcon />
          Join Interview
        </Button>
      </div>
    </div>
  );
}

export default Interview;
