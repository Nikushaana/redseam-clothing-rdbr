"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <h1 className="text-[42px] font-semibold text-myDarkBlue">Log in</h1>
      <p className="text-myDarkBlue2 font-normal text-[14px]">
        Not a member?{" "}
        <span
          onClick={() => {
            router.push("/auth/registration");
          }}
          className="text-myRed font-medium cursor-pointer"
        >
          Register
        </span>
      </p>
    </div>
  );
}
