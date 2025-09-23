"use client";

import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function Pagination() {
  const totalPages = 10; // total number of pages
  const [currentPage, setCurrentPage] = useState(1);

  const getPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const leftPages = [1, 2];
      const rightPages = [totalPages - 1, totalPages];
      const middleStart = Math.max(3, currentPage - 1);
      const middleEnd = Math.min(totalPages - 2, currentPage + 1);

      pages.push(...leftPages);

      if (middleStart > 3) pages.push("...");

      for (let i = middleStart; i <= middleEnd; i++) pages.push(i);

      if (middleEnd < totalPages - 2) pages.push("...");

      pages.push(...rightPages);
    }

    return pages;
  };

  const handlePageClick = (page: number | string) => {
    if (typeof page === "number") {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-[8px]">
      <IoIosArrowBack
        onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        className={`cursor-pointer ${currentPage === 1 && "opacity-30"}`}
      />
      {getPages().map((page, index) => {
        const isCurrent = page === currentPage;
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
        className={`cursor-pointer ${
          currentPage === totalPages && "opacity-30"
        }`}
        onClick={() =>
          currentPage < totalPages && setCurrentPage(currentPage + 1)
        }
      />
    </div>
  );
}
