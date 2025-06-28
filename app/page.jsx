// app/page.jsx
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Brain,
  Clock,
  FileSpreadsheet,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  Play,
  Sparkles,
  ArrowRight,
  Eye,
} from "lucide-react";
import { useUser } from "@/app/provider";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    setIsVisible(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll(
      ".feature-card, .tech-item, .step-item"
    );
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400">
                Guruji
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-gray-700 hover:text-emerald-500 transition-colors">
                Features
              </Link>
              <Link
                href="#tech-stack"
                className="text-gray-700 hover:text-emerald-500 transition-colors">
                Tech Stack
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-700 hover:text-emerald-500 transition-colors">
                How It Works
              </Link>
              {user ? (
                <Button asChild>
                  <Link href="/dashboard" className="w-28 text-center">
                    Dashboard
                  </Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link href="/auth" className="w-28 text-center">
                    Sign In
                  </Link>
                </Button>
              )}
            </nav>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 text-gray-700 hover:text-emerald-500 focus:outline-none">
                {menuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white p-4 shadow-md">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-gray-700 hover:text-emerald-500 transition-colors py-2"
                onClick={() => setMenuOpen(false)}>
                Features
              </Link>
              <Link
                href="#tech-stack"
                className="text-gray-700 hover:text-emerald-500 transition-colors py-2"
                onClick={() => setMenuOpen(false)}>
                Tech Stack
              </Link>
              <Link
                href="#how-it-works"
                className="text-gray-700 hover:text-emerald-500 transition-colors py-2"
                onClick={() => setMenuOpen(false)}>
                How It Works
              </Link>
              <Button asChild className="w-full">
                <Link href="/auth" className="text-center">
                  Sign In
                </Link>
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-2/3 bg-gradient-to-b from-emerald-50 to-transparent rounded-bl-full opacity-70" />
          <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-gradient-to-t from-emerald-50 to-transparent rounded-tr-full opacity-50" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div
                className={`transition-all duration-1000 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                  <span className="block text-gray-900">
                    AI-Powered Interviews
                  </span>
                  <span className="block bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400">
                    In Minutes
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg">
                  Generate intelligent, tailored interview questions for any
                  role. Save hours of preparation time and ensure you hire the
                  right talent.
                </p>

                {/* Enhanced CTA Section */}
                <div className="space-y-6">
                  {/* Primary CTA */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-emerald-500 hover:bg-emerald-600 text-lg px-8 py-4 h-auto">
                      <Link href="/auth" className="text-center">
                        Get Started Free{" "}
                        <ChevronRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                  </div>

                  {/* Demo CTA - More Prominent */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-2xl blur-xl opacity-60 animate-pulse"></div>
                    <div className="relative bg-white/90 backdrop-blur-sm border-2 border-emerald-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full">
                            <Play className="h-6 w-6 text-white ml-1" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 text-lg">
                              Try it now - No signup required!
                            </h3>
                            <p className="text-sm text-gray-600">
                              Experience the full platform instantly
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 rounded-full">
                          <Sparkles className="h-4 w-4 text-emerald-600" />
                          <span className="text-xs font-medium text-emerald-700">
                            Live Demo
                          </span>
                        </div>
                      </div>

                      <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="w-full border-2 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400 text-emerald-700 font-semibold text-lg py-4 h-auto group-hover:scale-[1.02] transition-all duration-300">
                        <Link
                          href="/guest/dashboard"
                          className="flex items-center justify-center gap-3">
                          <Eye className="h-5 w-5" />
                          See How It Works
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>

                      <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          <span>No credit card</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          <span>Instant access</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                          <span>Full features</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`relative transition-all duration-1000 delay-300 transform ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}>
                <div className="relative rounded-lg overflow-hidden shadow-2xl border border-emerald-100">
                  <Image
                    src="/aiInterviewTrans.png"
                    alt="AI-powered interview dashboard"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600/20 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Highlight Section */}
        <section className="py-12 bg-gradient-to-r from-emerald-50 via-blue-50 to-emerald-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-emerald-200 mb-6">
                <Sparkles className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">
                  Interactive Demo Available
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                See Guruji in Action - Right Now!
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Don't just read about it - experience our AI-powered interview
                platform yourself. Create questions, conduct interviews, and see
                results in under 2 minutes.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link
                    href="/guest/dashboard"
                    className="flex items-center gap-3">
                    <Play className="h-5 w-5" />
                    Launch Interactive Demo
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Takes less than 2 minutes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="py-20 bg-gradient-to-b from-white to-emerald-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Streamline Your Interview Process
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform offers powerful tools to make interviewing more
                effective and efficient
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 - Hardcoded */}
              <div
                className="feature-card bg-white rounded-xl p-6 h-full border border-emerald-100 shadow-sm hover:shadow-md transition-shadow group"
                style={{ transitionDelay: "100ms" }}>
                <div className="w-14 h-14 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                  <Brain className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  AI-Powered Generation
                </h3>
                <p className="text-gray-600">
                  Leverage advanced AI to generate relevant, role-specific
                  interview questions in seconds.
                </p>
              </div>

              {/* Feature 2 - Hardcoded */}
              <div
                className="feature-card bg-white rounded-xl p-6 h-full border border-emerald-100 shadow-sm hover:shadow-md transition-shadow group"
                style={{ transitionDelay: "200ms" }}>
                <div className="w-14 h-14 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                  <Clock className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Time Efficiency</h3>
                <p className="text-gray-600">
                  Cut interview preparation time by 80%. Focus on evaluating
                  candidates, not creating questions.
                </p>
              </div>

              {/* Feature 3 - Hardcoded */}
              <div
                className="feature-card bg-white rounded-xl p-6 h-full border border-emerald-100 shadow-sm hover:shadow-md transition-shadow group"
                style={{ transitionDelay: "300ms" }}>
                <div className="w-14 h-14 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                  <FileSpreadsheet className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Custom Templates</h3>
                <p className="text-gray-600">
                  Create and save templates for different roles and departments
                  within your organization.
                </p>
              </div>

              {/* Feature 4 - Hardcoded */}
              <div
                className="feature-card bg-white rounded-xl p-6 h-full border border-emerald-100 shadow-sm hover:shadow-md transition-shadow group"
                style={{ transitionDelay: "400ms" }}>
                <div className="w-14 h-14 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-100 transition-colors">
                  <UserCheck className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Skill Verification
                </h3>
                <p className="text-gray-600">
                  Ensure questions accurately assess the skills and experience
                  required for each position.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section id="tech-stack" className="py-20 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Built With Modern Technologies
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Leveraging cutting-edge tools for reliability, security, and
                performance
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {/* Tech 1 - Hardcoded */}
              <div
                className="tech-item bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-emerald-100 flex flex-col items-center text-center h-full"
                style={{ transitionDelay: "0ms" }}>
                <div className="relative w-16 h-16 mb-4">
                  <Image
                    src="https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png"
                    alt="Next.js logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">Next.js</h3>
                <p className="text-sm text-gray-600">
                  The React framework for production
                </p>
              </div>

              {/* Tech 2 - Hardcoded */}
              <div
                className="tech-item bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-emerald-100 flex flex-col items-center text-center h-full"
                style={{ transitionDelay: "100ms" }}>
                <div className="relative w-16 h-16 mb-4">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
                    alt="React logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">React</h3>
                <p className="text-sm text-gray-600">
                  A JavaScript library for building user interfaces
                </p>
              </div>

              {/* Tech 3 - Hardcoded */}
              <div
                className="tech-item bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-emerald-100 flex flex-col items-center text-center h-full"
                style={{ transitionDelay: "200ms" }}>
                <div className="relative w-16 h-16 mb-4">
                  <Image
                    src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg"
                    alt="Vapi logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">Vapi</h3>
                <p className="text-sm text-gray-600">
                  Voice API for natural language processing
                </p>
              </div>

              {/* Tech 4 - Hardcoded */}
              <div
                className="tech-item bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:border-emerald-100 flex flex-col items-center text-center h-full"
                style={{ transitionDelay: "300ms" }}>
                <div className="relative w-16 h-16 mb-4">
                  <Image
                    src="https://seeklogo.com/images/S/supabase-logo-DCC676FFE2-seeklogo.com.png"
                    alt="Supabase logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">Supabase</h3>
                <p className="text-sm text-gray-600">
                  Open source Firebase alternative
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="py-20 bg-gradient-to-b from-emerald-50 to-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How Guruji Works
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Generate professional interview questions in four simple steps
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Step 1 - Hardcoded */}
              <div
                className="step-item mb-8"
                style={{ transitionDelay: "0ms" }}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600">
                      <span className="font-semibold">1</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-emerald-100 shadow-sm flex-grow relative">
                    <div className="absolute h-full w-0.5 bg-emerald-100 left-[-21px] top-[48px]"></div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      Sign in to your account
                    </h3>
                    <p className="text-gray-600">
                      Create an account or sign in with your existing
                      credentials to access the platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 - Hardcoded */}
              <div
                className="step-item mb-8"
                style={{ transitionDelay: "100ms" }}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600">
                      <span className="font-semibold">2</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-emerald-100 shadow-sm flex-grow relative">
                    <div className="absolute h-full w-0.5 bg-emerald-100 left-[-21px] top-[48px]"></div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      Specify the job role
                    </h3>
                    <p className="text-gray-600">
                      Enter the job title, required skills, and experience level
                      to generate tailored interview questions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 - Hardcoded */}
              <div
                className="step-item mb-8"
                style={{ transitionDelay: "200ms" }}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600">
                      <span className="font-semibold">3</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-emerald-100 shadow-sm flex-grow relative">
                    <div className="absolute h-full w-0.5 bg-emerald-100 left-[-21px] top-[48px]"></div>
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      Generate AI powered interviews
                    </h3>
                    <p className="text-gray-600">
                      Share or attend the interviews conducted by AI assistant
                      for your desired job role.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 - Hardcoded */}
              <div className="step-item" style={{ transitionDelay: "300ms" }}>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600">
                      <span className="font-semibold">4</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-6 border border-emerald-100 shadow-sm flex-grow">
                    <h3 className="text-xl font-semibold mb-2 flex items-center">
                      Feedback and verdict
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 ml-2" />
                    </h3>
                    <p className="text-gray-600">
                      Get instant feedback on the interviews that where attended
                      and get instant verdict based on that feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm">
            © {currentYear} Guruji. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-emerald-500 transition-colors">
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-emerald-500 transition-colors">
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-500 hover:text-emerald-500 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
