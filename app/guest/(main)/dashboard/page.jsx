// app/guest/(main)/dashboard/page.jsx
"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Play, Sparkles, ArrowRight, Users, Clock, Trophy } from "lucide-react";

function GuestDashboard() {
  const router = useRouter();

  const handleDemoClick = () => {
    try {
      router.push("/interview/066f5f08-6fbb-42d3-92ee-d237170a872f");
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Main Card */}
        <div className="relative overflow-hidden backdrop-blur-sm bg-card/80 dark:bg-card/70 rounded-2xl border border-border/50 shadow-xl p-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h1 className="text-4xl font-bold text-card-foreground">
                Welcome to Guruji AI
              </h1>
              <Sparkles className="h-6 w-6 text-emerald-500 animate-pulse" />
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Experience the future of interviews with our AI-powered platform.
              Get instant feedback and improve your interview skills.
            </p>
          </div>

          {/* Image Section */}
          <div className="relative mb-8 group">
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
              <Image
                src="/gurujiGuestDashboard.png"
                alt="AI Interview Demo"
                width={800}
                height={400}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg border border-emerald-100">
              <Trophy className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg border border-emerald-100">
              <Clock className="h-6 w-6 text-emerald-600" />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-emerald-100 rounded-full w-fit mx-auto mb-3">
                <Play className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Interactive Demo
              </h3>
              <p className="text-sm text-gray-600">
                Experience real interview scenarios
              </p>
            </div>

            <div className="text-center p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-emerald-100 rounded-full w-fit mx-auto mb-3">
                <Sparkles className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">AI Feedback</h3>
              <p className="text-sm text-gray-600">
                Get instant performance insights
              </p>
            </div>

            <div className="text-center p-4 rounded-xl bg-white border border-gray-200 hover:shadow-md transition-all duration-300">
              <div className="p-3 bg-emerald-100 rounded-full w-fit mx-auto mb-3">
                <Trophy className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Skill Assessment
              </h3>
              <p className="text-sm text-gray-600">
                Measure your interview readiness
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Ready to get started?
              </h2>
              <p className="text-gray-600">
                Try our demo interview and see how AI can help you succeed.
              </p>
            </div>

            {/* Alternative Button using shadcn (if the above doesn't work) */}
            <div className="mt-4">
              <Button
                onClick={handleDemoClick}
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                <Play className="h-5 w-5 mr-2" />
                Try Demo Interview
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              No registration required • Takes 5-10 minutes • Instant results
            </p>
          </div>

          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-green-500/5 dark:from-emerald-500/10 dark:to-green-500/10 pointer-events-none" />

          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100/50 to-green-100/50 rounded-full blur-3xl -translate-y-16 translate-x-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-100/50 to-green-100/50 rounded-full blur-3xl translate-y-16 -translate-x-16 pointer-events-none" />
        </div>

        {/* Bottom Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <div className="text-2xl font-bold text-emerald-600">100+</div>
            <div className="text-sm text-gray-600">Interviews Completed</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <div className="text-2xl font-bold text-emerald-600">95%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </div>
          <div className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <div className="text-2xl font-bold text-emerald-600">24/7</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestDashboard;
