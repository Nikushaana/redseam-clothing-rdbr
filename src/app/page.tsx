"use client";

import Pagination from "./components/pagination";
import { BsXLg } from "react-icons/bs";
import { useState } from "react";
import Filter from "./components/filter components/filter";
import SortBy from "./components/filter components/sort-by";
import Card from "./components/cards/card";

export default function Home() {
  const [filterProductsValues, setFilterProductsValues] = useState({
    from: "",
    to: "",
    sortBy: "",
  });

  const handleChange = (name: string, value: string) => {
    setFilterProductsValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="px-[100px] my-[72px]">
      <div className="flex items-center justify-between">
        <h1 className="text-[42px] font-semibold text-myDarkBlue">Products</h1>
        <div className="flex items-center gap-[32px]">
          <p className="text-myDarkBlue2 text-[12px]">
            Showing 1-10 of 100 results
          </p>
          <p className="text-myGrey2">|</p>
          <Filter
            from={filterProductsValues.from}
            to={filterProductsValues.to}
            setFrom={(val) =>
              setFilterProductsValues((prev) => ({ ...prev, from: val }))
            }
            setTo={(val) =>
              setFilterProductsValues((prev) => ({ ...prev, to: val }))
            }
          />
          <SortBy
            value={filterProductsValues.sortBy}
            setValue={(val: string) => handleChange("sortBy", val)}
          />
        </div>
      </div>

      {filterProductsValues.from && filterProductsValues.to && (
        <div className="mt-[6px] h-[37px] flex items-center place-self-start gap-[6px] rounded-[50px] pr-[10px] pl-[16px] border-[1px] border-myGrey2">
          <p className="text-[14px] font-normal">
            Price: {filterProductsValues.from}-{filterProductsValues.to}
          </p>
          <BsXLg
            onClick={() => {
              handleChange("from", "");
              handleChange("to", "");
            }}
            className="text-[11px] cursor-pointer"
          />
        </div>
      )}
      <div
        className={`grid grid-cols-4 gap-[24px] mb-[90px] ${
          true ? "mt-[26px]" : "mt-[34px]"
        }`}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((product) => (
          <Card key={product} />
        ))}
      </div>

      <Pagination />
    </div>
  );
}
