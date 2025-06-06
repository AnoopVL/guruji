"use client";
import React from "react";
import { HelpCircle, Tag } from "lucide-react";

function QuestionListContainer({ questionList }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <HelpCircle className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold text-card-foreground">
          Interview Questions
        </h2>
      </div>

      <div className="space-y-3">
        {questionList.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 shadow-sm p-5 transition-all duration-200 hover:shadow-md group">
            <div className="relative z-10 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <p className="font-medium text-card-foreground leading-relaxed flex-1">
                  {item.question}
                </p>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                  {item.type}
                </span>
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuestionListContainer;
