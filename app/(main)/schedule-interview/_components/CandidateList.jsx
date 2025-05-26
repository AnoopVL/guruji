// app/(main)/schedule-interview/_components/CandidateList.jsx
import React from "react";
import moment from "moment";
import CandidateFeedbackDialog from "./CandidateFeedbackDialog";

function CandidateList({ candidateList }) {
  // Color based on technicalSkills rating
  const getColorForScore = (score) => {
    if (score >= 7) return "text-green-500";
    if (score >= 5) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div>
      <h2 className="my-5 font-semibold">
        Candidates ({candidateList?.length})
      </h2>
      <div className="flex flex-col gap-3">
        {candidateList?.map((candidate, index) => {
          // Fallback score if not present
          const score = candidate?.feedback?.feedback?.rating?.overall ?? 0;
          const colorClass = getColorForScore(score);

          return (
            <div
              key={index}
              className="p-5 flex items-center bg-white rounded-lg shadow-sm border border-gray-200">
              <h2 className="bg-primary font-bold text-white rounded-full p-3 px-4.5 mr-3">
                {candidate.userName[0]}
              </h2>

              <div className="flex justify-between items-center w-full">
                <div>
                  <h2 className="font-bold">{candidate.userName}</h2>
                  <h2 className="text-sm text-gray-500">
                    Completed on:{" "}
                    {moment(candidate.created_at).format(
                      "DD MMM YYYY, hh:mm A"
                    )}
                  </h2>
                </div>
                <div className="flex gap-3 items-center">
                  <h2 className={`font-bold ${colorClass}`}>{score}/10</h2>
                  <CandidateFeedbackDialog candidate={candidate} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CandidateList;
