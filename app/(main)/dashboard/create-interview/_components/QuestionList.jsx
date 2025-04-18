// app/(main)/dashboard/create-interview/_components/QuestionList.jsx
import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

function QuestionList({ formData }) {
  const [loading, setLoading] = useState(false);
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
      console.log(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast("Server error, try again after some time");
      setLoading(false);
    }
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
      </div>
    </>
  );
}

export default QuestionList;
