"use client";

import React, { useRef, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";

interface inputProps {
  name: string;
  text: string;
  type?: string;
  value: string;
  setValue: (val: string) => void;
  isCheckout?: boolean;
  isEmail?: boolean;
  isError?: any;
}

export default function Input({
  name,
  text,
  type,
  value,
  setValue,
  isCheckout,
  isEmail,
  isError,
}: inputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [active, setActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleContainerClick = () => {
    setActive(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleBlur = () => {
    if (value.trim() === "") {
      setActive(false);
    }
  };

  return (
    <div>
      <div
        onClick={handleContainerClick}
        className={`h-[42px] flex items-center justify-between gap-[5px] rounded-[8px] border-[1px] px-[12px] bg-white ${
          isError ? "border-myRed" : "border-myGrey2"
        }`}
      >
        {isEmail && isCheckout && <MdOutlineMailOutline />}
        {active || value ? (
          <input
            ref={inputRef}
            type={type === "password" && !showPassword ? "password" : "text"}
            name={name}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={handleBlur}
            className="flex-1 text-[14px] outline-none"
          />
        ) : (
          <p className="text-myDarkBlue2 flex-1 text-[14px] font-normal cursor-text">
            {text}
            {!isCheckout && <span className="text-myRed ml-[5px]">*</span>}
          </p>
        )}
        {type === "password" && (
          <div
            onClick={(e) => {
              setShowPassword((prev) => !prev);
            }}
            className="text-[20px] cursor-pointer"
          >
            {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
          </div>
        )}
      </div>
      {isError && (
        <p className="text-[10px] text-myRed mt-[1px]">Incorrect {text}</p>
      )}
    </div>
  );
}
