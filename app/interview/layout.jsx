"use client";
import React from "react";
import InterviewHeader from "./_components/InterviewHeader";
import { Inter } from "next/font/google";
import { InterviewDataContext } from "../context/InterviewDataContext";
import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";

function InterviewLayout({ children }) {
  const [interviewInfo, setInterviewInfo] = useState();

  return (
    <InterviewDataContext.Provider value={{ interviewInfo, setInterviewInfo }}>
      <div>
        <InterviewHeader />
        {children}
        <Toaster />
      </div>
    </InterviewDataContext.Provider>
  );
}

export default InterviewLayout;
