"use client";

import Button from "@/app/components/button";
import Input from "@/app/components/input";
import UploadImage from "@/app/components/upload-image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Page() {
  const router = useRouter();

  const [registerValues, setRegisterValues] = useState({
    newImage: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // helper to update one field
  const handleChange = (name: string, value: string) => {
    setRegisterValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col gap-y-[24px] w-full">
      <h1 className="text-[42px] font-semibold text-myDarkBlue mb-[24px]">
        Registration
      </h1>
      <UploadImage
        name="newImage"
        value={registerValues.newImage}
        setValue={(val: string) => handleChange("newImage", val)}
      />
      <Input
        text="Username"
        name="username"
        value={registerValues.username}
        setValue={(val: string) => handleChange("username", val)}
      />
      <Input
        text="Email"
        name="email"
        value={registerValues.email}
        setValue={(val: string) => handleChange("email", val)}
      />
      <Input
        text="Password"
        name="password"
        type="password"
        value={registerValues.password}
        setValue={(val: string) => handleChange("password", val)}
      />
      <Input
        text="Confirm password"
        name="confirmPassword"
        type="password"
        value={registerValues.confirmPassword}
        setValue={(val: string) => handleChange("confirmPassword", val)}
      />
      <div className="mt-[22px]">
        <Button text="Register" />
      </div>
      <p className="text-center text-myDarkBlue2 font-normal text-[14px]">
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
