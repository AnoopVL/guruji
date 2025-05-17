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
} from "lucide-react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const currentYear = new Date().getFullYear();

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
              <Button asChild>
                <Link href="/auth" className="w-28 text-center">
                  Sign In
                </Link>
              </Button>
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
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-emerald-500 hover:bg-emerald-600">
                    <Link href="/auth" className="text-center">
                      Get Started <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-emerald-200 hover:bg-emerald-50">
                    <Link href="#how-it-works" className="text-center">
                      See How It Works
                    </Link>
                  </Button>
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
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-2">
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400">
                  Guruji
                </span>
              </Link>
              <p className="text-gray-600 mb-4 max-w-md">
                Streamline your interview process with AI-powered question
                generation, saving you time and ensuring you hire the right
                talent.
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  href="#"
                  className="text-gray-500 hover:text-emerald-500 transition-colors">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-emerald-500 transition-colors">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-emerald-500 transition-colors">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-500 hover:text-emerald-500 transition-colors">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#features"
                    className="text-gray-600 hover:text-emerald-500 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-500 transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-500 transition-colors">
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-500 transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-500 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-500 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-500 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-600 hover:text-emerald-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div> */}
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
