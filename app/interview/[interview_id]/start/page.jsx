"use client";
import { InterviewDataContext } from "@/app/context/InterviewDataContext";
import { Mic } from "lucide-react";
import { Phone } from "lucide-react";
import { Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import Vapi from "@vapi-ai/web";

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);

  useEffect(() => {
    interviewInfo && startCall();
  }, [interviewInfo]);

  const startCall = () => {
    if (interviewInfo) {
    }
  };

  return (
    <div className="p-20 lg:px-48 xl:px-56 bg-gray-200">
      <h2 className="font-bold justify-between text-xl flex">
        Ai Interview Session
        <span className="flex gap-2 justify-center">
          <Timer />
          00:00:00
        </span>
      </h2>

      <div className="grid grid-col-1 md:grid-cols-2 gap-7 mt-7">
        <div className="bg-[#e6f9ee] h-[400px] rounded-lg flex flex-col gap-3 items-center justify-center border-2 border-[#00a63e] shadow-[0_4px_20px_#00a63e33]">
          <Image
            src="/gurujiPortrait.png"
            alt="ai-interviewer"
            width={100}
            height={100}
            className="w-[100px] h-[100px] rounded-full object-cover ring-4 ring-[#00a63e]"
          />
          <h2 className="text-lg">Ai Recruiter</h2>
        </div>
        <div>
          <div className="bg-[#e6f9ee] h-[400px] rounded-lg flex flex-col gap-3 items-center justify-center border-2 border-[#00a63e] shadow-[0_4px_20px_#00a63e33]">
            <h2 className="text-4xl bg-primary text-white p-3 rounded-full px-8 py-6">
              {interviewInfo?.userName[0]}
            </h2>
            <h2 className="text-lg">{interviewInfo?.userName}</h2>
          </div>
        </div>
      </div>

      <div className="mt-9 flex flex-row gap-8 justify-center">
        <Mic className="bg-blue-400 rounded-full h-12 w-12 p-3 cursor-pointer transform transition-transform hover:scale-110 hover:shadow-lg" />
        <Phone className="bg-red-400 rounded-full h-12 w-12 p-3 cursor-pointer transform transition-transform hover:scale-110 hover:shadow-lg" />
      </div>

      <h2 className="text-gray-500 mt-6 justify-center flex">
        Interview in process
      </h2>
    </div>
  );
}

export default StartInterview;
