import React from "react";
import InterviewHeader from "./_components/InterviewHeader";
import { Inter } from "next/font/google";

function InterviewLayout({ children }) {
  return (
    <div>
      <InterviewHeader />
      {children}
    </div>
  );
}

export default InterviewLayout;
