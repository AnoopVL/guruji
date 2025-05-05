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

The goal is to create a structured, relevant, and time-optimized interview plan for a {(jobTitle}} role.
I am going to use the json format further, so strictly give the questions only, that too in the json format in output, nothing else.
Also you can mention in the question itself, how much time should we allocate to that particular question. `;

export const FEEDBACK_PROMPT = `
{{conversation}}
Depends on this Interview Conversation between assitant and user, 
Give me feedback for user interview. Give me rating out of 10 for technical Skills, 
Communication, Problem Solving, Experince. Also give me summery in 3 lines 
about the interview and one line to let me know whether is recommanded 
for hire or not with msg. Give me response in JSON format

{
    feedback:{
        rating:{
            techicalSkills:5,
            communication:6,
            problemSolving:4,
            experince:7
        },
        summery:<in 3 Line>,
        Recommendation:'',
        RecommendationMsg:''
    }
}

`;
