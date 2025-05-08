// app/interview/[interview_id]/start/page.jsx
"use client";
import { InterviewDataContext } from "@/app/context/InterviewDataContext";
import { Mic } from "lucide-react";
import { Phone } from "lucide-react";
import { Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();

  useEffect(() => {
    interviewInfo && startCall();
  }, [interviewInfo]);

  const startCall = () => {
    let questionList;
    interviewInfo?.interviewData?.questionList.forEach(
      (item, index) => (questionList = item?.question + "," + questionList)
    );

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi" +
        interviewInfo?.userName +
        ", how are you? Ready for your interview on " +
        interviewInfo?.interviewData?.jobPosition +
        "?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              `
  You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ` +
              interviewInfo?.interviewData?.jobPosition +
              ` interview. Lets get started with a few questions!"
Ask one question at a time and wait for the candidates response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
Questions: ` +
              questionList +
              `
If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
"Need a hint? Think about how React tracks component updates!"
Provide brief, encouraging feedback after each answer. Example:
"Nice! Thats a solid answer."
"Hmm, not quite! Want to try again?"
Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Lets tackle a tricky one!"
After 5-7 questions, wrap up the interview smoothly by summarizing their performance. Example:
"That was great! You handled some tough questions well. Keep sharpening your skills!"
End on a positive note:
"Thanks for chatting! Hope to see you crushing projects soon!"
Key Guidelines:
- Be friendly, engaging, and witty
- Keep responses short and natural, like a real conversation
- Adapt based on the candidates confidence level
- Ensure the interview remains focused on React
`.trim(),
          },
        ],
      },
    };
    vapi.start(assistantOptions);
  };

  const stopInterview = () => {
    vapi.stop();
  };

  vapi.on("call-start", () => {
    console.log("Call has started.");
    toast("Interview Started...");
  });
  vapi.on("speech-start", () => {
    console.log("Assistant speech has started.");
    setActiveUser(false);
  });
  vapi.on("speech-end", () => {
    console.log("Assistant speech has ended.");
    setActiveUser(true);
  });
  vapi.on("call-end", () => {
    console.log("Call has ended.");
    toast("Interview Ended...");
    GenerateFeedback();
  });
  vapi.on("message", (message) => {
    console.log(message?.conversation);
    setConversation(message?.conversation);
  });

  const GenerateFeedback = async () => {
    const result = await axios.post("/api/ai-feedback", {
      conversation: conversation,
    });
    console.log(result?.data);
    const Content = result.data.content;
    const FINAL_CONTENT = Content.replace("```json", "").replace("```", "");
    console.log(FINAL_CONTENT);
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
        <div className="h-[400px] rounded-lg flex flex-col gap-3 items-center justify-center border-2 border-[#00a63e] shadow-[0_4px_20px_#00a63e33]">
          <div className="relative">
            {!activeUser && (
              <span className="absolute inset-0 rounded-full opacity-75 bg-[#e6f9ee] animate-ping" />
            )}
            <Image
              src="/gurujiPortrait.png"
              alt="ai-interviewer"
              width={100}
              height={100}
              className="w-[100px] h-[100px] rounded-full object-cover ring-4 ring-[#00a63e]"
            />
          </div>
          <h2 className="text-lg">Ai Recruiter</h2>
        </div>
        <div>
          <div className="h-[400px] rounded-lg flex flex-col gap-3 items-center justify-center border-2 border-[#00a63e] shadow-[0_4px_20px_#00a63e33]">
            <div className="relative">
              {activeUser && (
                <span className="absolute inset-0 rounded-full opacity-75 bg-[#e6f9ee] animate-ping" />
              )}
              <h2 className="text-4xl bg-primary text-white p-3 rounded-full px-8 py-6">
                {interviewInfo?.userName[0]}
              </h2>
            </div>
            <h2 className="text-lg">{interviewInfo?.userName}</h2>
          </div>
        </div>
      </div>

      <div className="mt-9 flex flex-row gap-8 justify-center">
        <Mic className="bg-blue-400 rounded-full h-12 w-12 p-3 cursor-pointer transform transition-transform hover:scale-110 hover:shadow-lg" />
        <AlertConfirmation stopInterview={() => stopInterview()}>
          <Phone className="bg-red-400 rounded-full h-12 w-12 p-3 cursor-pointer transform transition-transform hover:scale-110 hover:shadow-lg" />
        </AlertConfirmation>
      </div>

      <h2 className="text-gray-500 mt-6 justify-center flex">
        Interview in process
      </h2>
    </div>
  );
}

export default StartInterview;
