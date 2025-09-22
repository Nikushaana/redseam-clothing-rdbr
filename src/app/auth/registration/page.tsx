"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <h1 className="text-[42px] font-semibold text-myDarkBlue">
        Registration
      </h1>
      <p className="text-myDarkBlue2 font-normal text-[14px]">
        Already member?{" "}
        <span
          onClick={() => {
            router.push("/auth/login");
          }}
          className="text-myRed font-medium cursor-pointer"
        >
          Log in
        </span>
      </p>
    </div>
  );
}
