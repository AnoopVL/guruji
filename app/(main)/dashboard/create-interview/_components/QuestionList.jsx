// app/(main)/dashboard/create-interview/_components/QuestionList.jsx
"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { LoaderCircle, ArrowRight, Check, Sparkles } from "lucide-react";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";

function QuestionList({ formData, onCreateLink }) {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState();
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveFinished, setSaveFinished] = useState(false);
  const [interviewId, setInterviewId] = useState(null);

  const { user } = useUser();

  useEffect(() => {
    if (formData) {
      GenerateQuestionList();
    }
  }, [formData]);

  const GenerateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });

      const Content = result.data.content;
      const jsonArrayMatch = Content.match(/\[[\s\S]*\]/);

      if (jsonArrayMatch) {
        try {
          const parsed = JSON.parse(jsonArrayMatch[0]);
          console.log(parsed);
          setQuestionList(parsed);
        } catch (err) {
          console.error("JSON parse error:", err);
          toast("Invalid response from AI model");
        }
      } else {
        console.error("Could not find JSON array in response");
        toast("Invalid response format from AI model");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast("Server error, try again after some time");
      setLoading(false);
    }
  };

  const onFinish = async () => {
    if (saveFinished) {
      onCreateLink(interviewId);
      return;
    }

    setSaveLoading(true);
    setSaveFinished(false);
    const newInterviewId = uuidv4();

    const { data, error } = await supabase
      .from("interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: newInterviewId,
        },
      ])
      .select();

    const userUpdate = await supabase
      .from("Users")
      .update({ credits: Number(user?.credits) - 1 })
      .eq("email", user?.email)
      .select();

    console.log(userUpdate);

    setSaveLoading(false);
    setSaveFinished(true);
    setInterviewId(newInterviewId);
  };

  return (
    <div className="space-y-6">
      {loading && (
        <div className="relative overflow-hidden backdrop-blur-sm bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20 shadow-sm p-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
              <LoaderCircle className="h-6 w-6 text-primary animate-spin" />
            </div>
            <div className="space-y-1">
              <h3 className="font-medium text-card-foreground flex items-center gap-2">
                Generating Interview Questions
                <Sparkles className="h-4 w-4 text-primary" />
              </h3>
              <p className="text-sm text-muted-foreground">
                Our AI is crafting personalized interview questions for your job
                description
              </p>
            </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/10" />
        </div>
      )}

      {!loading && questionList && questionList.length > 0 && (
        <div className="space-y-6">
          <QuestionListContainer questionList={questionList} />

          <div className="flex justify-end">
            <Button
              onClick={onFinish}
              disabled={saveLoading}
              className="flex items-center gap-2 transition-all duration-200 hover:shadow-md cursor-pointer">
              {saveLoading ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : saveFinished ? (
                <>
                  Create Interview Link and Finish
                  <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  Finish
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionList;
