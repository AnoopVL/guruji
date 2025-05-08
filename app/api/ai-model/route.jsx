// app/api/ai-model/route.jsx
import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { jobPosition, jobDescription, duration, type } = await req.json();
  const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", type);
  console.log(FINAL_PROMPT);

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "nvidia/llama-3.1-nemotron-ultra-253b-v1:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
      //   response_format: "json",
    });
    console.log(completion.choices[0].message);
    return NextResponse.json(completion.choices[0].message);
  } catch (error) {
    console.log(error);
    return NextResponse.json(error);
  }
}

// export const API_route = "dfadf";
