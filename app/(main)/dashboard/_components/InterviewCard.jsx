// app/(main)/dashboard/_components/InterviewCard.jsx
import React from "react";
import moment from "moment";
import { Copy } from "lucide-react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowRight } from "lucide-react";

function InterviewCard({ interview, viewDetail }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interview_id;
  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast("Link copied.");
  };

  console.log("test");
  console.log(interview["interview-feedback"]);

  const onSend = () => {
    const subject = encodeURIComponent("Interview Link from Guruji");
    const body = encodeURIComponent(
      `Hi,\n\nHere is the interview link:\n${url}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="p-5 bg-gray-100 rounded-lg border">
      <div className="flex items-center justify-between">
        <div className="h-[40px] w-[40px] bg-primary rounded-full"></div>
        <h2 className="text-sm">
          {moment(interview?.created_at).format("DD MMM YYYY")}
        </h2>
      </div>
      <h2 className="mt-3 font-semibold text-lg">{interview?.jobPosition}</h2>
      {!viewDetail ? (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="mt-2 text-sm">{interview?.duration}</h2>
          </div>
          <div className="flex gap-3 w-full mt-5">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center gap-2 cursor-pointer"
              onClick={copyLink}>
              <Copy className="w-4 h-4" />
              Copy link
            </Button>
            <Button
              className="flex-1 flex items-center justify-center gap-2 cursor-pointer"
              onClick={onSend}>
              <Send className="w-4 h-4" />
              Send
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <h2 className="mt-2 text-sm">{interview?.duration}</h2>
            <span>
              {interview["interview-feedback"]?.length ?? 0} Candidates
            </span>
          </div>
          <div className="flex gap-3 w-full mt-5">
            <Button
              className="flex-1 flex items-center justify-center gap-2 cursor-pointer"
              variant="outline">
              <ArrowRight className="w-4 h-4" />
              View Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewCard;
