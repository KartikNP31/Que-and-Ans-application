import React from "react";
import {
  SignedOut,
  SignIn,
} from "@clerk/clerk-react";

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
