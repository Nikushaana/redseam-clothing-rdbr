"use client";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface paginationProps {
  value: number;
  setValue: (val: number) => void;
  last_page?: number;
}

export default function Pagination({
  value,
  setValue,
  last_page = 1,
}: paginationProps) {
  const getPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (last_page <= 7) {
      for (let i = 1; i <= last_page; i++) pages.push(i);
    } else {
      const leftPages = [1, 2];
      const rightPages = [last_page - 1, last_page];
      const middleStart = Math.max(3, value - 1);
      const middleEnd = Math.min(last_page - 2, value + 1);

      pages.push(...leftPages);

      if (middleStart > 3) pages.push("...");

      for (let i = middleStart; i <= middleEnd; i++) pages.push(i);

      if (middleEnd < last_page - 2) pages.push("...");

      pages.push(...rightPages);
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    setValue(page);
  };

  return (
    <div className="flex items-center justify-center gap-[8px]">
      <IoIosArrowBack
        onClick={() => value > 1 && setValue(value - 1)}
        className={`cursor-pointer ${value === 1 && "opacity-30"}`}
      />
      {getPages().map((page, index) => {
        const isCurrent = page === value;
        const isEllipsis = page === "...";

        return (
          <p
            key={index}
            onClick={() => !isEllipsis && handlePageClick(Number(page))}
            className={`w-[32px] aspect-square flex items-center justify-center rounded-[4px] text-[14px] font-medium 
              ${
                isCurrent
                  ? "border-[1px] border-myRed text-myRed"
                  : "text-myDarkGrey"
              } 
              ${isEllipsis ? "cursor-default" : "cursor-pointer"}
            `}
          >
            {page}
          </p>
        );
      })}
      <IoIosArrowForward
        className={`cursor-pointer ${value === last_page && "opacity-30"}`}
        onClick={() => value < last_page && setValue(value + 1)}
      />
    </div>
  );
}
