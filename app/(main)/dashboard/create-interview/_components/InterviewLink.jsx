"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Copy,
  Clock,
  Mail,
  ArrowLeft,
  Plus,
  CheckCircle,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaWhatsapp, FaSlack } from "react-icons/fa";
import Link from "next/link";
import { toast } from "sonner";

function InterviewLink({ interview_id, formData }) {
  const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview_id;

  const onCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy link.");
    }
  };

  // Share via email
  const onEmailShare = () => {
    const subject = encodeURIComponent("Interview Link from Guruji");
    const body = encodeURIComponent(
      `Hi,\n\nHere is the interview link:\n${url}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Success header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-card-foreground">
          Your AI Interview is Ready!!
        </h2>
        <p className="text-muted-foreground">
          Share this link with your candidates to start the interview process
        </p>
      </div>

      {/* Interview-link card */}
      <div className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 shadow-sm p-6">
        {/* CONTENT */}
        <div className="space-y-4 relative z-[1]">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-card-foreground">Interview Link</h3>
            <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
              Valid for 30 days
            </div>
          </div>

          <div className="flex gap-3">
            <Input
              value={url}
              readOnly
              className="flex-1 bg-background/50 border-border/60"
            />
            <Button
              onClick={onCopyLink}
              variant="outline"
              className="flex items-center gap-2 hover:bg-accent/80 cursor-pointer">
              <Copy className="w-4 h-4" />
              Copy Link
            </Button>
          </div>

          <div className="h-px bg-border/60 w-full" />

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{formData?.duration || "N/A"}</span>
          </div>
        </div>

        {/* Decorative gradient – ignore clicks */}
        <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/10" />
      </div>

      {/* Share-options card */}
      <div className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 shadow-sm p-6">
        <div className="space-y-4 relative z-[1]">
          <div className="flex items-center justify-center gap-2">
            <Share2 className="h-4 w-4 text-primary" />
            <h3 className="font-medium text-card-foreground">Share via</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              onClick={onEmailShare}
              variant="outline"
              className="flex items-center justify-center gap-2 hover:bg-accent/80 transition-colors cursor-pointer">
              <Mail className="w-4 h-4" />
              Email
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 hover:bg-accent/80 transition-colors cursor-pointer">
              <FaSlack className="w-4 h-4" />
              Slack
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 hover:bg-accent/80 transition-colors cursor-pointer">
              <FaWhatsapp className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 pointer-events-none bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/10" />
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Link href="/dashboard" className="flex-1">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 hover:bg-accent/80 transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
        <Link href="/dashboard/create-interview" className="flex-1">
          <Button className="w-full flex items-center justify-center gap-2 transition-colors hover:bg-primary/90 cursor-pointer">
            <Plus className="w-4 h-4" />
            Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default InterviewLink;
