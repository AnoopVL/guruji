import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { List } from "lucide-react";
import { Mail } from "lucide-react";
import { Slack } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { ArrowLeft } from "lucide-react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function InterviewLink({ interview_id, formData }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;
  const GetInterviewUrl = () => {
    return url;
  };

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(url);
    toast("Link Copied!!");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-2">
        <Image
          src={"/check.png"}
          alt="check"
          width={200}
          height={200}
          className="w-[50px] h-[50px] mt-5"
        />
        <h2 className="font-bold text-lg">Your AI interview is Ready!!</h2>
        <p>
          Share this link with your candidates to start the interview process
        </p>
        <div className="w-full mt-10 p-7 rounded-xl bg-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="font-bold">Interview Link</h2>
            <h2 className="p-1 px-2 text-primary bg-green-100 rounded-xl border border-primary">
              Valid for 30 days
            </h2>
          </div>
          <div className="mt-4 gap-3 flex items-center">
            <Input
              defaultValue={GetInterviewUrl()}
              disable={true}
              className="bg-white"
            />
            <Button onClick={() => onCopyLink()}>
              <Copy /> Copy Link
            </Button>
          </div>
          <hr className="my-8" />
          <div className="flex gap-5">
            <h2 className="text-sm text-gray-500 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {formData?.duration}
            </h2>
            {/* <h2 className="text-sm text-gray-500 flex items-center gap-2">
              <List className="h-4 w-4" />
            </h2> */}
          </div>
        </div>
        <div className="w-full mt-10 p-7 rounded-xl bg-gray-100">
          <h2 className="font-bold text-center">Share via</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="w-full flex justify-center items-center gap-2">
              <Mail /> Email
            </Button>
            <Button
              variant="outline"
              className="w-full flex justify-center items-center gap-2">
              <Slack /> Slack
            </Button>
            <Button
              variant="outline"
              className="w-full flex justify-center items-center gap-2">
              <FaWhatsapp /> Whatsapp
            </Button>
          </div>
        </div>
        <div className="flex w-full gap-5 justify-between mt-6">
          <Link href={"/dashboard"}>
            <Button variant="outline">
              <ArrowLeft />
              Back to Dashboard
            </Button>
          </Link>
          <Link href={"/dashboard/create-interview"}>
            <Button>
              <Plus />
              Create New Interview
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default InterviewLink;
