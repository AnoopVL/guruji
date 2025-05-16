// app/(main)/schedule-interview/_components/InterviewDetailContainer.jsx
import React from "react";
import moment from "moment";
import { Clock } from "lucide-react";
import { Calendar } from "lucide-react";
import { Tag } from "lucide-react";

function InterviewDetailContainer({ interviewDetail }) {
  return (
    <div className="mt-5 p-5 rounded-xl bg-gray-100 shadow-sm">
      <h2 className="font-semibold text-lg">{interviewDetail?.jobPosition}</h2>
      <div className="flex items-center justify-between mt-5">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-gray-500">Duration</h2>
          <div className="flex flex-row gap-1">
            <Clock className="text-xs" />
            <h2 className="text-sm">{interviewDetail?.duration}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <h2 className="text-gray-500">Created on</h2>
          <div className="flex flex-row gap-1">
            <Calendar className="text-xs" />
            <h2>{moment(interviewDetail?.created_at).format("DD MMM YYYY")}</h2>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <h2 className="text-gray-500">Type</h2>
          <div className="flex flex-row gap-1">
            <Tag className="text-xs" />
            <h2>
              {interviewDetail?.type
                ? JSON.parse(interviewDetail.type).join(" + ")
                : ""}
            </h2>
          </div>
        </div>
      </div>
      <h2 className="font-semibold text-lg mt-5">Job Description</h2>
      <p className="text-sm leading-6">{interviewDetail?.jobDescription}</p>
      <div className="mt-5">
        <h2 className="font-semibold text-lg">Interview Questions</h2>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {interviewDetail?.questionList.map((item, index) => (
            <h2 className="text-sm" key={item?.question || index}>
              {index + 1}. {item?.question}
            </h2>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewDetailContainer;
