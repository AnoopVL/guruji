// app/(main)/schedule-interview/_components/InterviewDetailContainer.jsx
import React from "react";
import moment from "moment";
import {
  Clock,
  Calendar,
  Tag,
  FileText,
  HelpCircle,
  Sparkles,
} from "lucide-react";

function InterviewDetailContainer({ interviewDetail }) {
  return (
    <div className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 shadow-lg mt-5 p-6">
      {/* Header Section */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary rounded-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-card-foreground">
            {interviewDetail?.jobPosition}
          </h2>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="group p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
              <Clock className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Duration</span>
          </div>
          <p className="text-lg font-semibold text-gray-800">
            {interviewDetail?.duration}
          </p>
        </div>

        <div className="group p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
              <Calendar className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              Created on
            </span>
          </div>
          <p className="text-lg font-semibold text-gray-800">
            {moment(interviewDetail?.created_at).format("DD MMM YYYY")}
          </p>
        </div>

        <div className="group p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
              <Tag className="h-4 w-4 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Type</span>
          </div>
          <p className="text-lg font-semibold text-gray-800">
            {interviewDetail?.type
              ? JSON.parse(interviewDetail.type).join(" + ")
              : ""}
          </p>
        </div>
      </div>

      {/* Job Description Section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative z-10 p-2 bg-primary rounded-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-card-foreground">
            Job Description
          </h3>
        </div>
        <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
          <p className="text-gray-700 leading-relaxed">
            {interviewDetail?.jobDescription}
          </p>
        </div>
      </div>

      {/* Interview Questions Section */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="relative z-10 p-2 bg-primary rounded-lg">
            <HelpCircle className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-card-foreground">
            Interview Questions
          </h3>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
            {interviewDetail?.questionList?.length || 0} Questions
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {interviewDetail?.questionList?.map((item, index) => (
            <div
              key={item?.question || index}
              className="group p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md hover:border-emerald-200 transition-all duration-300">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-emerald-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800 transition-colors">
                  {item?.question}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative gradient - very subtle */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50/20 via-transparent to-gray-50/20" />
    </div>
  );
}

export default InterviewDetailContainer;
