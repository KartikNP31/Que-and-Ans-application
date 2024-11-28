import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-gray-800 ">
      <Link to="/" className="text-2xl font-bold text-teal-400">
        FinanceQ&A
      </Link>
      <SignedOut>
        <Link
          to="/Authentication"
          className="text-white bg-teal-400 hover:bg-teal-500 px-4 py-2 rounded font-semibold"
        >
          Sign In
        </Link>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};

export default Navbar;
