"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const router = useRouter();

  const [loginValues, setLoginValues] = useState({
    email: "",
    password: "",
  });

  // helper to update one field
  const handleChange = (name: string, value: string) => {
    setLoginValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-y-[24px] w-full">
      <h1 className="text-[42px] font-semibold text-myDarkBlue mb-[24px]">
        Log in
      </h1>
      <Input
        text="Email"
        name="email"
        value={loginValues.email}
        setValue={(val: string) => handleChange("email", val)}
      />
      <Input
        text="Password"
        name="password"
        type="password"
        value={loginValues.password}
        setValue={(val: string) => handleChange("password", val)}
      />
      <div className="mt-[22px]">
        <Button text="Log in" />
      </div>
      <p className="text-center text-myDarkBlue2 font-normal text-[14px]">
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
