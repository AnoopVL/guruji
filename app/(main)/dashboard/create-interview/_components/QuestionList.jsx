// app/(main)/dashboard/create-interview/_components/QuestionList.jsx
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Check } from "lucide-react";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState();
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveFinished, setSaveFinished] = useState(false);
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
      // console.log(result.data.content);
      const Content = result.data.content;
      // Extract just the array part from the response
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
    setSaveLoading(true);
    setSaveFinished(false);
    const interview_id = uuidv4();
    const { data, error } = await supabase
      .from("interviews")
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select();
    setSaveLoading(false);
    setSaveFinished(true);
    console.log(data);
  };
  return (
    <>
      <div>
        {loading && (
          <div className="p-5 bg-green-100 rounded-xl border border-primary shadow-xl flex gap-5 items-center">
            <LoaderCircle className="animate-spin" />
            <div>
              <h2 className="font-medium">Generation Interview questions</h2>
              <p className="text-primary">
                Our Ai is crafting personalized interview questions for your job
                description
              </p>
            </div>
          </div>
        )}

        {!loading && questionList && questionList.length > 0 && (
          <div className="mt-5">
            <QuestionListContainer questionList={questionList} />
            <div className="flex justify-end mt-10">
              <Button onClick={onFinish} disabled={saveLoading}>
                {saveLoading ? (
                  <LoaderCircle className="animate-spin mr-2" />
                ) : saveFinished ? (
                  <>
                    Finished <Check className="ml-2" />
                  </>
                ) : (
                  <>
                    Finish <ArrowRight className="ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default QuestionList;
