import { SignedIn, SignedOut, SignIn } from "@clerk/clerk-react";
import React from "react";
import { Link, Navigate } from "react-router-dom";

const WelcomePage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center bg-gray-900 text-white px-4">
      {/* Main Heading */}
      <h1 className="text-5xl font-bold text-teal-400 mb-6">
        Welcome to FinanceQ&A
      </h1>

      <p className="text-lg text-gray-400 mb-8 max-w-3xl">
        Your one-stop platform to ask and share financial questions, collaborate
        with a growing community, and find solutions to all your financial
        queries. Empower your finance journey today!
      </p>

      <SignedIn>
        <Link
          to="/Dashboard"
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg text-lg transition duration-300"
        >
          Go To Dashboard
        </Link>
      </SignedIn>
      <SignedOut>
        <Link
          to="/Authentication"
          className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg text-lg transition duration-300"
        >
          New Here ? Let's Get Started
        </Link>
      </SignedOut>
    </div>
  );
};

export default WelcomePage;
