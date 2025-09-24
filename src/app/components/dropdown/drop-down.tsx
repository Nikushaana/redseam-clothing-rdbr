"use client";

import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface DropDownProps {
  value: string;
  setValue: (val: string) => void;
}

export default function DropDown({ value, setValue }: DropDownProps) {
  const dropDownRef = useRef<HTMLInputElement>(null);
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
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropDownRef} className="relative w-[70px]">
      <div
        onClick={handleToggle}
        className="w-full h-[42px] rounded-[10px] border-[1px] border-myGrey2 flex items-center justify-center gap-[10px] cursor-pointer"
      >
        <p className="text-myDarkBlue font-normal">{value}</p>
        <IoIosArrowDown
          className={`duration-200 ${show && "rotate-[180deg]"}`}
        />
      </div>

      {show && (
        <div className="absolute top-[45px] left-0 w-full h-[200px] overflow-y-scroll showScroll flex flex-col gap-y-[5px] p-[5px] rounded-[8px] bg-[white] border-[1px] border-myGrey2">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map((qnt) => (
            <p
              key={qnt}
              onClick={() => handleSelect(qnt)}
              className={`h-[35px] shrink-0 flex items-center justify-center text-myDarkBlue font-normal cursor-pointer rounded-[8px] duration-100 ${
                value === qnt ? "bg-myGrey" : "hover:bg-myGrey2"
              }`}
            >
              {qnt}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
