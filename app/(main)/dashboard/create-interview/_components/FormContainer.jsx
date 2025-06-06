// app/(main)/dashboard/create-interview/_components/FormContainer.jsx
"use client";
import React, { useEffect, useState } from "react";
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
import { ArrowRight, Briefcase, FileText, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

function FormContainer({ onHandleInputChange, GoToNext }) {
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
    <div className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 shadow-sm p-6">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/10" />

      <div className="relative z-10 space-y-6">
        {/* Job Position */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-primary" />
            <label className="text-sm font-medium text-card-foreground">
              Job Position
            </label>
          </div>
          <Input
            placeholder="e.g. Full Stack Developer"
            className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 border-border/60 hover:border-border/80"
            onChange={(event) =>
              onHandleInputChange("jobPosition", event.target.value)
            }
          />
        </div>

        {/* Job Description */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-primary" />
            <label className="text-sm font-medium text-card-foreground">
              Job Description
            </label>
          </div>
          <Textarea
            placeholder="Enter detailed job description..."
            className="min-h-[180px] transition-all duration-200 focus:ring-2 focus:ring-primary/20 border-border/60 hover:border-border/80 resize-none"
            onChange={(event) =>
              onHandleInputChange("jobDescription", event.target.value)
            }
          />
        </div>

        {/* Interview Duration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <label className="text-sm font-medium text-card-foreground">
              Interview Duration
            </label>
          </div>
          <Select
            onValueChange={(value) => onHandleInputChange("duration", value)}>
            <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary/20 border-border/60 hover:border-border/80">
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5 Min">5 Minutes</SelectItem>
              <SelectItem value="15 Min">15 Minutes</SelectItem>
              <SelectItem value="30 Min">30 Minutes</SelectItem>
              <SelectItem value="45 Min">45 Minutes</SelectItem>
              <SelectItem value="60 Min">60 Minutes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Interview Type */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <label className="text-sm font-medium text-card-foreground">
              Interview Type
            </label>
          </div>
          <div className="flex flex-wrap gap-3">
            {InterviewType.map((type, index) => (
              <div
                key={index}
                className={`group flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-sm ${
                  interviewType.includes(type.title)
                    ? "bg-primary/10 border-primary/30 text-primary"
                    : "bg-background border-border/60 hover:border-border/80 hover:bg-accent/50"
                }`}
                onClick={() => AddInterviewType(type.title)}>
                <type.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{type.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={() => GoToNext()}
            className="flex items-center gap-2 transition-all duration-200 hover:shadow-md cursor-pointer">
            <span>Generate Questions</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FormContainer;
