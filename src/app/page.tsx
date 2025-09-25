"use client";

import Pagination from "./components/pagination";
import { BsXLg } from "react-icons/bs";
import { useEffect, useState } from "react";
import Filter from "./components/filter components/filter";
import SortBy from "./components/filter components/sort-by";
import Card from "./components/cards/card";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { axiosClient } from "@/lib/api";

export default function Home() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!user?.id) {
      router.push("/auth/login");
    }
  }, [user, router]);

  const [filterProductsValues, setFilterProductsValues] = useState({
    from: "",
    to: "",
    sortBy: "",
    page: 1,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [productsData, setProductsData] = useState<ProductsResponse | null>(
    null
  );

  const handleChange = (name: string, value: string | number) => {
    setFilterProductsValues((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setFilterProductsValues((prev) =>
      prev.page === 1 ? prev : { ...prev, page: 1 }
    );
  }, [
    filterProductsValues.from,
    filterProductsValues.to,
    filterProductsValues.sortBy,
  ]);

  useEffect(() => {
    if (!user?.id) return;

    setIsLoading(true);
    axiosClient
      .get(
        `/products?page=${filterProductsValues.page}&filter[price_from]=${filterProductsValues.from}&filter[price_to]=${filterProductsValues.to}&sort=${filterProductsValues.sortBy}`
      )
      .then((res: any) => {
        setProductsData(res.data);
      })
      .catch((error) => {})
      .finally(() => {
        setIsLoading(false);
      });
  }, [user?.id, filterProductsValues]);

  return (
    <div className="px-[100px] my-[72px]">
      <div className="flex items-center justify-between">
        <h1 className="text-[42px] font-semibold text-myDarkBlue">Products</h1>
        <div className="flex items-center gap-[32px]">
          <p className="text-myDarkBlue2 text-[12px]">
            Showing {productsData?.meta.from ?? 0}-{productsData?.meta.to ?? 0}{" "}
            of {productsData?.meta.total ?? 0} results
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
        className={`${
          isLoading && "opacity-[0.5]"
        } grid grid-cols-4 gap-[24px] mb-[90px] ${
          filterProductsValues.from && filterProductsValues.to
            ? "mt-[26px]"
            : "mt-[34px]"
        }`}
      >
        {isLoading &&
          !productsData?.data &&
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((gst) => (
            <div
              key={gst}
              className="w-full rounded-[10px] h-[600px] bg-myGrey"
            ></div>
          ))}
        {productsData?.data.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>

      <Pagination
        {...productsData?.meta}
        value={filterProductsValues.page}
        setValue={(val: number) => handleChange("page", val)}
      />
    </div>
  );
}
