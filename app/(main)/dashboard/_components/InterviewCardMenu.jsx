// app/(main)/dashboard/_components/InterviewCardMenu.jsx
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function InterviewCardMenu({ interview, onDelete }) {
  const deleteInterview = async () => {
    try {
      if (!interview?.id) {
        toast.error("Interview ID is missing");
        return;
      }
      // Check if interview has feedback records
      const { data: feedbackRecords, error: feedbackCheckError } =
        await supabase
          .from("interview-feedback")
          .select("id")
          .eq("interview_id", interview.interview_id);

      if (feedbackCheckError) {
        console.error("Error checking feedback records:", feedbackCheckError);
        toast.error("Error checking interview status");
        return;
      }
      if (feedbackRecords && feedbackRecords.length > 0) {
        toast.warning(
          "Cannot delete interview - candidates have already taken this interview"
        );
        return;
      }
      const { error } = await supabase
        .from("interviews")
        .delete()
        .eq("id", interview.id);

      if (error) {
        console.error("Supabase delete error:", error);
        toast.error("Error deleting interview: " + error.message);
        return;
      }
      toast.success("Interview deleted successfully");
      onDelete(interview.id);
    } catch (err) {
      console.error("Unexpected error during delete:", err);
      toast.error("An unexpected error occurred while deleting");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MoreVertical className="w-5 h-5 cursor-pointer hover:bg-gray-200 rounded p-1" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>{interview?.jobPosition}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={deleteInterview}
          className="focus:text-red-600 focus:bg-red-50">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete interview
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
