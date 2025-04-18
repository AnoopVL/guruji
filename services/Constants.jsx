// app/services/Constants.jsx
import { Calendar } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiCreditCard1 } from "react-icons/ci";
import { Settings } from "lucide-react";
import { Code2Icon } from "lucide-react";
import { User2Icon } from "lucide-react";
import { Puzzle } from "lucide-react";
import { Briefcase } from "lucide-react";
import { Speech } from "lucide-react";

export const SidebarOptions = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    name: "Schedule Interview",
    icon: Calendar,
    path: "/schedule-interview",
  },
  {
    name: "All Interviews",
    icon: RxHamburgerMenu,
    path: "/all-interviews",
  },
  {
    name: "Billing",
    icon: CiCreditCard1,
    path: "/billing",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export const InterviewType = [
  {
    title: "Technical",
    icon: Code2Icon,
  },
  {
    title: "Behavioral",
    icon: User2Icon,
  },
  {
    title: "Problem Solving",
    icon: Puzzle,
  },
  {
    title: "Experience",
    icon: Briefcase,
  },
  {
    title: "Leadership",
    icon: Speech,
  },
];

export const QUESTIONS_PROMPT = `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:

Job Title: {{jobTitle}}
Job Description: {{jobDescription}}
Interview Duration: {{duration}}
Interview Type: {{type}}

Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life {{type}} interview.

Format your response in JSON format with array list of questions.
format: interviewQuestions=[
  {
    question:"
    type:'Technical/Behavioral/Experince/Problem Solving/Leaseship'
  },{
  ...  
  }
]

The goal is to create a structured, relevant, and time-optimized interview plan for a {(jobTitle}} role.`;
