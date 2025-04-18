// app/(main)/dashboard/create-interview/_components/QuestionList.jsx
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import QuestionListContainer from "./QuestionListContainer";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(false);
  const [questionList, setQuestionList] = useState();
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

  const onFinish = () => {};
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
          </div>
        )}
      </div>
    </>
  );
}

export default QuestionList;
