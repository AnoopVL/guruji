// app/interview/[interview_id]/start/page.jsx
"use client";
import { InterviewDataContext } from "@/app/context/InterviewDataContext";
import { Mic, Video, VideoOff, Loader2 } from "lucide-react";
import { Phone } from "lucide-react";
import { Timer } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState, useRef } from "react";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

function StartInterview() {
  const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext);
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeUser, setActiveUser] = useState(false);
  const [conversation, setConversation] = useState();
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const { interview_id } = useParams();
  const router = useRouter();

  useEffect(() => {
    interviewInfo && startCall();
  }, [interviewInfo]);

  // Timer functions
  const startTimer = () => {
    setIsInterviewActive(true);
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
  };

  const stopTimer = () => {
    setIsInterviewActive(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Camera functions
  const startCamera = async () => {
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera not supported by this browser");
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      setStream(mediaStream);
      setIsCameraOn(true);

      // Wait for next render cycle before setting video source
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current
            .play()
            .catch((e) => console.log("Video play error:", e));
        }
      }, 100);

      toast("Camera turned on successfully");
    } catch (error) {
      console.error("Error accessing camera:", error);

      // Provide specific error messages
      let errorMessage = "Failed to access camera";

      if (error.name === "NotAllowedError") {
        errorMessage =
          "Camera permission denied. Please allow camera access and try again.";
      } else if (error.name === "NotFoundError") {
        errorMessage =
          "No camera found. Please connect a camera and try again.";
      } else if (error.name === "NotReadableError") {
        errorMessage =
          "Camera is being used by another application. Please close other apps and try again.";
      } else if (error.name === "OverconstrainedError") {
        errorMessage =
          "Camera doesn't support the requested settings. Trying with default settings...";

        // Try again with basic settings
        try {
          const basicStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          setStream(basicStream);
          setIsCameraOn(true);

          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.srcObject = basicStream;
              videoRef.current
                .play()
                .catch((e) => console.log("Video play error:", e));
            }
          }, 100);

          toast("Camera turned on with basic settings");
          return;
        } catch (basicError) {
          errorMessage = "Camera access failed even with basic settings";
        }
      } else if (error.name === "NotSupportedError") {
        errorMessage = "Camera not supported by this browser";
      } else if (error.message.includes("not supported")) {
        errorMessage = "Camera not supported by this browser or device";
      }

      toast(errorMessage);
      setIsCameraOn(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    toast("Camera turned off");
  };

  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  // Cleanup camera and timer on component unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [stream]);

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
        provider: "11labs",
        voiceId: "6MoEUz34rbRrmmyxgRm4", // Manav
        similarityBoost: 0.75,
        stability: 0.5,
        model: "eleven_turbo_v2_5",
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

  const stopInterview = async () => {
    console.log("Stopping interview...");
    setIsGeneratingFeedback(true);

    try {
      // Stop the call
      vapi.stop();

      // Stop camera and timer immediately
      stopCamera();
      stopTimer();
      setIsCallActive(false);

      toast("Interview ended. Generating feedback...");

      // Generate feedback immediately since we have the conversation data
      await GenerateFeedback();
    } catch (error) {
      console.error("Error stopping interview:", error);
      setIsGeneratingFeedback(false);
      toast.error("Error ending interview");
    }
  };

  // Set up VAPI event listeners in useEffect
  useEffect(() => {
    const handleCallStart = () => {
      console.log("Call has started.");
      setIsCallActive(true);
      startTimer(); // Start timer when call starts
      toast("Interview Started...");
    };

    const handleSpeechStart = () => {
      console.log("Assistant speech has started.");
      setActiveUser(false);
    };

    const handleSpeechEnd = () => {
      console.log("Assistant speech has ended.");
      setActiveUser(true);
    };

    const handleCallEnd = async () => {
      console.log("Call has ended naturally.");
      setIsCallActive(false);
      stopTimer(); // Stop timer when call ends

      // Only generate feedback if not already generating
      if (!isGeneratingFeedback) {
        setIsGeneratingFeedback(true);
        toast("Interview ended. Generating feedback...");
        await GenerateFeedback();
      }
    };

    const handleMessage = (message) => {
      console.log("Message: ", message);
      if (message?.conversation) {
        const ConvoString = JSON.stringify(message.conversation);
        console.log("Conversation String: ", ConvoString);
        setConversation(ConvoString);
      }
    };

    // Add event listeners
    vapi.on("call-start", handleCallStart);
    vapi.on("speech-start", handleSpeechStart);
    vapi.on("speech-end", handleSpeechEnd);
    vapi.on("call-end", handleCallEnd);
    vapi.on("message", handleMessage);

    // Cleanup function
    return () => {
      vapi.off("call-start", handleCallStart);
      vapi.off("speech-start", handleSpeechStart);
      vapi.off("speech-end", handleSpeechEnd);
      vapi.off("call-end", handleCallEnd);
      vapi.off("message", handleMessage);
    };
  }, [isGeneratingFeedback]); // Add isGeneratingFeedback as dependency

  const GenerateFeedback = async () => {
    console.log("GenerateFeedback called with conversation:", conversation);

    try {
      // Check if conversation data exists
      if (!conversation) {
        console.error("No conversation data available");
        toast.error("No conversation data to generate feedback");
        router.push(`/interview/${interview_id}/completed`);
        return;
      }

      const result = await axios.post("/api/ai-feedback", {
        conversation,
      });

      // 1️ Check HTTP status
      if (result.status !== 200) {
        console.error("AI provider error:", result.data);
        toast.error("Could not generate feedback (AI service error)");
        router.push(`/interview/${interview_id}/completed`);
        return;
      }

      // 2️ Check payload
      const Content = result.data?.content;
      if (typeof Content !== "string") {
        console.error("Unexpected AI response:", result.data);
        toast.error("Invalid feedback format");
        router.push(`/interview/${interview_id}/completed`);
        return;
      }

      // 3️ Clean up markdown fences
      const FINAL_CONTENT = Content.replace(/```json\s*/, "")
        .replace(/```/, "")
        .trim();

      // 4️ Parse JSON safely
      let feedbackObj;
      try {
        feedbackObj = JSON.parse(FINAL_CONTENT);
      } catch (parseErr) {
        console.error("JSON parse error:", parseErr);
        toast.error("Could not parse feedback");
        router.push(`/interview/${interview_id}/completed`);
        return;
      }

      // 5️ Persist to Supabase
      const { data, error } = await supabase
        .from("interview-feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id,
            feedback: feedbackObj,
            recommended: false,
          },
        ])
        .select();

      if (error) {
        console.error("Supabase insert error:", error);
        toast.error("Failed to save feedback");
        router.push(`/interview/${interview_id}/completed`);
        return;
      }

      console.log("Feedback saved successfully:", data);
      toast.success("Feedback generated successfully!");

      // 6️ Go to completed screen
      router.push(`/interview/${interview_id}/completed`);
    } catch (err) {
      // 7️ Network / Axios errors
      console.error("Unexpected error in GenerateFeedback:", err);
      toast.error("Server error—please try again later");
      router.push(`/interview/${interview_id}/completed`);
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  return (
    <div className="relative">
      {/* Main Content */}
      <div
        className={`p-20 lg:px-48 xl:px-56 bg-gray-200 ${
          isGeneratingFeedback ? "blur-sm pointer-events-none" : ""
        }`}>
        <h2 className="font-bold justify-between text-xl flex">
          Ai Interview Session
          <span className="flex gap-2 justify-center">
            <Timer />
            {formatTime(timer)}
          </span>
        </h2>

        <div className="grid grid-col-1 md:grid-cols-2 gap-7 mt-7">
          <div className="h-[400px] rounded-lg flex flex-col gap-3 items-center justify-center border-2 border-[#00a63e] shadow-[0_4px_20px_#00a63e33]">
            <div className="relative">
              {!activeUser && isCallActive && (
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
            <div className="h-[400px] rounded-lg flex flex-col gap-3 items-center justify-center border-2 border-[#00a63e] shadow-[0_4px_20px_#00a63e33] relative overflow-hidden">
              {isCameraOn ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover rounded-lg"
                    onLoadedMetadata={() =>
                      console.log("Video metadata loaded")
                    }
                    onError={(e) => console.log("Video error:", e)}
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                    <h2 className="text-lg text-white bg-black bg-opacity-50 px-3 py-1 rounded">
                      {interviewInfo?.userName}
                    </h2>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative">
                    {activeUser && !isCameraOn && isCallActive && (
                      <span className="absolute inset-0 rounded-full opacity-75 bg-[#e6f9ee] animate-ping" />
                    )}
                    <h2 className="text-4xl bg-primary text-white p-3 rounded-full px-8 py-6">
                      {interviewInfo?.userName[0]}
                    </h2>
                  </div>
                  <h2 className="text-lg">{interviewInfo?.userName}</h2>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-row gap-8 justify-center">
          <Mic className="bg-blue-400 rounded-full h-12 w-12 p-3 cursor-pointer transform transition-transform hover:scale-110 hover:shadow-lg" />

          {/* Camera Toggle Button */}
          <button
            onClick={toggleCamera}
            disabled={isGeneratingFeedback}
            className="bg-green-400 rounded-full h-12 w-12 p-3 cursor-pointer transform transition-transform hover:scale-110 hover:shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
            {isCameraOn ? (
              <Video className="h-6 w-6 text-white" />
            ) : (
              <VideoOff className="h-6 w-6 text-white" />
            )}
          </button>

          <AlertConfirmation
            stopInterview={stopInterview}
            disabled={isGeneratingFeedback}>
            <Phone className="bg-red-400 rounded-full h-12 w-12 p-3 cursor-pointer transform transition-transform hover:scale-110 hover:shadow-lg" />
          </AlertConfirmation>
        </div>

        <h2 className="text-gray-500 mt-6 justify-center flex">
          {isCallActive ? "Interview in process" : "Preparing interview..."}
        </h2>
      </div>

      {/* Loading Overlay */}
      {isGeneratingFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 max-w-sm mx-4">
            <Loader2 className="h-12 w-12 animate-spin text-[#00a63e]" />
            <h3 className="text-lg font-semibold text-gray-900">
              Generating Feedback
            </h3>
            <p className="text-gray-600 text-center">
              Please wait while we analyze your interview and generate
              personalized feedback...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StartInterview;
