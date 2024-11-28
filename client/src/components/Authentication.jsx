import React from "react";
import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUp,
  UserButton,
} from "@clerk/clerk-react";
import { Link, Navigate } from "react-router-dom";
import { Dashboard } from "./Dashboard";

const Authentication = () => {
  return (
    <div className="h-full bg-gray-900">
      <SignedOut>
        <div className="flex h-full items-center justify-center">
          <SignIn />
        </div>
      </SignedOut>

    </div>
  );
};

export default Authentication;
