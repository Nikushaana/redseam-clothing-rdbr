"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface sortByProps {
  value: string;
  setValue: (val: string) => void;
}

export default function SortBy({ value, setValue }: sortByProps) {
  const sortByRef = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);

  // Toggle filter panel
  const handleToggle = () => setShow((prev) => !prev);

  const handleSelect = (option: string) => {
    setValue(option);
    setShow(false);
  };

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortByRef.current &&
        !sortByRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={sortByRef} className="relative">
      <div
        onClick={handleToggle}
        className="flex items-center gap-[4px] cursor-pointer"
      >
        <p className="text-myDarkBlue font-normal">{value || "Sort by"}</p>
        <IoIosArrowDown />
      </div>

      {show && (
        <div className="absolute top-[35px] right-0 flex flex-col gap-y-[8px] rounded-[8px] bg-[white] border-[1px] border-myGrey2 p-[16px]">
          <h1 className="text-myDarkBlue font-semibold">Sort by</h1>
          <div className="w-[223px]">
            {[
              "New products first",
              "Price, low to high",
              "Price, high to low",
            ].map((sort) => (
              <p
                key={sort}
                onClick={() => handleSelect(sort)}
                className="h-[40px] flex items-center text-myDarkBlue font-normal cursor-pointer"
              >
                {sort}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
