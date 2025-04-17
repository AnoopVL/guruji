// app/(main)/dashboard/create-interview/_components/FormContainer.jsx
import React, { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/services/Constants";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Preahvihear } from "next/font/google";
import { useState } from "react";

function FormContainer({ onHandleInputChange }) {
  const [interviewType, setInterviewType] = useState([]);
  useEffect(() => {
    if (interviewType) {
      onHandleInputChange("type", interviewType);
    }
  }, [interviewType]);

  const AddInterviewType = (type) => {
    const data = interviewType.includes(type);
    if (!data) {
      setInterviewType((prev) => [...prev, type]);
    } else {
      const result = interviewType.filter((item) => item != type);
      setInterviewType(result);
    }
  };
  return (
    <>
      <div className="p-5 bg-gray-100 rounded-xl shadow-xl">
        <div className="pt-5">
          <h2 className="text-md pl-4">Job Position</h2>
          <Input
            placeholder="eg. Full Stack Developer"
            className="mt-2 bg-white "
            onChange={(event) =>
              onHandleInputChange("jobPosition", event.target.value)
            }
          />
        </div>
        <div className="pt-5">
          <h2 className="text-md pl-4">Job Description</h2>
          <Textarea
            placeholder="Enter detailed job description..."
            className="mt-2 bg-white h-[200px]"
            onChange={(event) =>
              onHandleInputChange("jobDescription", event.target.value)
            }
          />
        </div>
        <div className="pt-5">
          <h2 className="text-md pl-4">Interview Duration</h2>
          <Select
            onValueChange={(value) => onHandleInputChange("duration", value)}>
            <SelectTrigger className="w-full mt-2 bg-white">
              <SelectValue
                placeholder="Select Duration"
                className="text-black"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5 Min">5 Min</SelectItem>
              <SelectItem value="15 Min">15 Min</SelectItem>
              <SelectItem value="30 Min">30 Min</SelectItem>
              <SelectItem value="45 Min">45 Min</SelectItem>
              <SelectItem value="60 Min">60 Min</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="pt-5">
          <h2 className="text-md pl-4">Interview Type</h2>
          <div className="flex flex-wrap gap-3 mt-2">
            {InterviewType.map((type, index) => (
              <div
                key={index}
                className={`flex gap-2 p-1 px-2 rounded-xl border border-gray-300 items-center cursor-pointer hover:bg-green-100 ${
                  interviewType.includes(type.title)
                    ? "bg-green-50 text-primary"
                    : "bg-white"
                }`}
                // 1.48.00 change this thing and add new method, if further issues
                onClick={() => AddInterviewType(type.title)}>
                <type.icon className="w-4 h-4" />
                <span>{type.title}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex mt-8 justify-end-safe">
          <Button>
            Generate Questions <ArrowRight />
          </Button>
        </div>
      </div>
    </>
  );
}

export default FormContainer;
