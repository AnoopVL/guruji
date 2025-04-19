import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function QuestionListContainer({ questionList }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Interview Questions</h2>
      <ul className="space-y-4">
        {questionList.map((item, index) => (
          <li key={index} className="p-4 bg-white rounded-lg shadow">
            <p className="font-medium">{item.question}</p>
            <span className="text-sm text-primary mt-1 inline-block">
              {item.type}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuestionListContainer;
