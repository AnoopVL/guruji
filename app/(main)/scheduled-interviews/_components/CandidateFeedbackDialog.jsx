// app/(main)/schedule-interview/_components/CandidateFeedbackDialog.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Mail } from "lucide-react";

function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;

  const getColorForScore = (score) => {
    if (score >= 7) return "text-green-500";
    if (score >= 5) return "text-yellow-500";
    return "text-red-500";
  };

  const onSend = () => {
    const subject = encodeURIComponent("Interview feedback from Guruji");
    const body = encodeURIComponent(`Hi,\n\nHere is the feedback:\n`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const score = candidate?.feedback?.feedback?.rating?.overall ?? 0;
  const colorClass = getColorForScore(score);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer">
          View Report <ArrowRight className="ml-1" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback</DialogTitle>
          <DialogDescription asChild>
            <div>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                  <div className="bg-primary font-bold text-white rounded-full p-3 px-4.5">
                    {candidate.userName[0]}
                  </div>
                  <div>
                    <h2 className="font-semibold text-black">
                      {candidate.userName}
                    </h2>
                    <h2 className="text-sm text-gray-500">
                      {candidate?.userEmail}
                    </h2>
                  </div>
                </div>

                {/* Score */}
                <div className="flex gap-3 items-center">
                  <h2 className={`font-bold text-xl ${colorClass}`}>
                    {score}/10
                  </h2>
                </div>
              </div>

              <div className="mt-4">
                <h2 className="font-bold text-black">Skill Assessment</h2>
                <div className="mt-3 grid grid-cols-2 gap-10">
                  <div>
                    <h2 className="flex justify-between">
                      Technical Skills{" "}
                      <span>{feedback?.rating?.technicalSkills}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.technicalSkills * 10}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Communication{" "}
                      <span>{feedback?.rating?.communication}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.communication * 10}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Problem Solving{" "}
                      <span>{feedback?.rating?.problemSolving}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.problemSolving * 10}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <h2 className="flex justify-between">
                      Experience <span>{feedback?.rating?.experience}/10</span>
                    </h2>
                    <Progress
                      value={feedback?.rating?.experience * 10}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="font-bold text-black">Performance Summary</h2>
                <p className="mt-2">{feedback?.summary}</p>
              </div>
              <div
                className={`p-5 rounded-md mt-5 flex item-center justify-between ${
                  feedback?.Recommendation == "Yes"
                    ? "bg-green-300"
                    : "bg-red-300"
                }`}>
                <div>
                  <h2
                    className={`font-semibold ${
                      feedback?.Recommendation == "Yes"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}>
                    Recommendation : {feedback?.Recommendation}
                  </h2>
                  <p
                    className={`text-sm ${
                      feedback?.Recommendation == "Yes"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}>
                    {feedback?.RecommendationMsg}
                  </p>
                </div>
                <Button variant="outline" onClick={onSend}>
                  <Mail />
                  Send Mail{" "}
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
