// app/(main)/profile/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  CreditCard,
  Edit3,
  Check,
  X,
  LogOut,
  Trash2,
  Plus,
  AlertTriangle,
  Sparkles,
  Camera,
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/services/supabaseClient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

function Profile() {
  const { user, setUser } = useUser();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(user?.name || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [totalInterviews, setTotalInterviews] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);

  // Fetch user statistics
  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user?.email) return;

      setLoadingStats(true);
      try {
        // Get total interviews count
        const { data: interviews, error } = await supabase
          .from("interviews")
          .select("id")
          .eq("userEmail", user.email);

        if (error) {
          console.error("Error fetching interviews:", error);
        } else {
          setTotalInterviews(interviews?.length || 0);
        }
      } catch (error) {
        console.error("Error fetching user stats:", error);
      } finally {
        setLoadingStats(false);
      }
    };

    fetchUserStats();
  }, [user?.email]);

  const handleUpdateName = async () => {
    if (!newName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsUpdating(true);
    try {
      const { data, error } = await supabase
        .from("Users")
        .update({ name: newName.trim() })
        .eq("email", user?.email)
        .select();

      if (error) throw error;

      setUser({ ...user, name: newName.trim() });
      setIsEditingName(false);
      toast.success("Name updated successfully!");
    } catch (error) {
      console.error("Error updating name:", error);
      toast.error("Failed to update name");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setNewName(user?.name || "");
    setIsEditingName(false);
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      toast.success("Signed out successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // First, delete user data from Users table
      const { error: userError } = await supabase
        .from("Users")
        .delete()
        .eq("email", user?.email);

      if (userError) throw userError;

      // Delete all user's interviews
      const { error: interviewsError } = await supabase
        .from("interviews")
        .delete()
        .eq("userEmail", user?.email);

      if (interviewsError) {
        console.warn("Error deleting interviews:", interviewsError);
        // Don't throw here, continue with account deletion
      }

      // Sign out the user (this will effectively "delete" their session)
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;

      // Clear user state immediately
      setUser(null);

      toast.success("Account deleted successfully!");

      // Redirect to home page
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to delete account. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBuyCredits = () => {
    toast("Feature coming soon!");
    // window.location.href = "/billing";
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-muted-foreground">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 shadow-sm p-6">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 text-primary dark:from-primary/20 dark:to-primary/40">
              <User className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-card-foreground">
                Profile Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your account information and preferences
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 shadow-sm p-6">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <User className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-card-foreground">
                  Personal Information
                </h2>
              </div>

              {/* Profile Picture Section */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-card-foreground">
                  Profile Picture
                </label>
                <div className="flex items-center gap-4">
                  {user?.picture ? (
                    <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-border/60">
                      <Image
                        src={user.picture}
                        alt={user.name || "Profile"}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 text-primary dark:from-primary/20 dark:to-primary/40 border-2 border-border/60">
                      <Camera className="h-8 w-8" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">
                      {user?.picture
                        ? "Your profile picture from your account"
                        : "No profile picture set"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Profile pictures are managed through your authentication
                      provider
                    </p>
                  </div>
                </div>
              </div>

              {/* Username */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-card-foreground">
                  Username
                </label>
                <div className="flex items-center gap-3">
                  {isEditingName ? (
                    <>
                      <Input
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="flex-1 transition-all duration-200 focus:ring-2 focus:ring-primary/20 border-border/60 hover:border-border/80"
                        placeholder="Enter your name"
                      />
                      <Button
                        size="sm"
                        onClick={handleUpdateName}
                        disabled={isUpdating}
                        className="flex items-center gap-1">
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                        disabled={isUpdating}>
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Input
                        value={user?.name || ""}
                        readOnly
                        className="flex-1 bg-background/50 border-border/60"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setIsEditingName(true)}
                        className="flex items-center gap-1 hover:bg-accent/80">
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-card-foreground">
                  Email Address
                </label>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    value={user?.email || ""}
                    readOnly
                    className="flex-1 bg-background/50 border-border/60"
                  />
                  <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium">
                    Verified
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/10" />
          </div>

          {/* Account Actions */}
          <div className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 shadow-sm p-6">
            <div className="relative z-10 space-y-6">
              <h2 className="text-lg font-semibold text-card-foreground">
                Account Actions
              </h2>

              <div className="space-y-4">
                {/* Sign Out */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border/60 hover:border-border/80 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <LogOut className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-card-foreground">
                        Sign Out
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Sign out of your account
                      </p>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" className="hover:bg-accent/80">
                        Sign Out
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. Do you really want to
                          sign out?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSignOut}>
                          Sign out
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>

                {/* Delete Account */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 hover:border-destructive/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-destructive/10">
                      <Trash2 className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-medium text-card-foreground">
                        Delete Account
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Permanently delete your account and all data
                      </p>
                    </div>
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="destructive"
                        className="hover:bg-destructive/90">
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                          Delete Account
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove all your data from our
                          servers, including all interviews and settings.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          disabled={isDeleting}
                          className="bg-destructive hover:bg-destructive/90">
                          {isDeleting ? "Deleting..." : "Delete Account"}
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/10" />
          </div>
        </div>

        {/* Credits Sidebar */}
        <div className="space-y-6">
          {/* Credits Card */}
          <div className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 shadow-sm p-6">
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-card-foreground">
                  Credits
                </h2>
              </div>

              <div className="text-center space-y-3">
                <div className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-gradient-to-br from-primary/10 to-primary/30 text-primary dark:from-primary/20 dark:to-primary/40">
                  <Sparkles className="h-8 w-8" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-card-foreground">
                    {user?.credits || 0}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Available Credits
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-xs text-muted-foreground text-center">
                    Each interview creation uses 1 credit
                  </p>
                </div>

                <Button
                  onClick={handleBuyCredits}
                  className="w-full flex items-center justify-center gap-2 transition-colors hover:bg-primary/90">
                  <Plus className="h-4 w-4" />
                  Buy More Credits
                </Button>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/10" />
          </div>

          {/* Usage Stats */}
          <div className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-xl border border-border/50 shadow-sm p-6">
            <div className="relative z-10 space-y-4">
              <h3 className="font-medium text-card-foreground">
                Account Stats
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Member since
                  </span>
                  <span className="text-sm font-medium text-card-foreground">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Total interviews
                  </span>
                  <span className="text-sm font-medium text-card-foreground">
                    {loadingStats ? "..." : totalInterviews}
                  </span>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 dark:from-primary/10 dark:to-primary/10" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
