"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaVideo } from "react-icons/fa6";

function LatestInterviewList() {
  const [interviewList, setInterviewList] = useState([]);
  return (
    <>
      <div className="my-5">
        <h2 className="my-3 font-bold text-2xl p-5">Latest Interview List</h2>
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
    </>
  );
}

export default LatestInterviewList;
