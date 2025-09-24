"use client";

import React, { useEffect, useRef, useState } from "react";
import { VscSettings } from "react-icons/vsc";
import Input from "../inputs/input";
import Button from "../button";

interface FilterProps {
  from: string;
  to: string;
  setFrom: (val: string) => void;
  setTo: (val: string) => void;
}

export default function Filter({ from, to, setFrom, setTo }: FilterProps) {
  const filterRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);

  // Local state to hold temporary input values
  const [localFrom, setLocalFrom] = useState(from);
  const [localTo, setLocalTo] = useState(to);

  // Toggle filter panel
  const handleToggle = () => setShow((prev) => !prev);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Save values on Apply
  const handleApply = () => {
    setFrom(localFrom);
    setTo(localTo);
    setShow(false);
  };

  return (
    <div ref={filterRef} className="relative">
      <div
        onClick={handleToggle}
        className="flex items-center gap-[8px] cursor-pointer"
      >
        <VscSettings />
        <h2 className="text-myDarkBlue font-normal">Filter</h2>
      </div>

      {show && (
        <div className="absolute top-[35px] right-0 flex flex-col gap-y-[10px] rounded-[8px] bg-[white] border-[1px] border-myGrey2 p-[16px]">
          <h1 className="text-myDarkBlue font-semibold">Select price</h1>
          <div className="grid grid-cols-2 gap-[10px] w-[360px] mt-[10px]">
            <Input
              text="From"
              name="from"
              value={localFrom}
              setValue={setLocalFrom}
            />
            <Input text="To" name="to" value={localTo} setValue={setLocalTo} />
          </div>
          <Button
            text="Apply"
            click={handleApply}
            className="self-end text-[14px] h-[41px] w-[124px]"
          />
        </div>
      )}
    </div>
  );
}
