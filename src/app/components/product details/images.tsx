import React from "react";

export default function Images() {
  return (
    <div className="flex gap-[24px]">
      <div className="flex flex-col gap-y-[9px] w-[121px]">
        {[1, 2, 3, 4, 5].map((img) => (
          <div key={img} className="w-full h-[161px]">
            <img
              src="/images/Logo (1).png"
              alt="logo"
              className="w-full h-full object-contain cursor-pointer"
            />
          </div>
        ))}
      </div>
      <div className="w-[703px] h-[937px]">
        <img
          src="/images/Logo (1).png"
          alt="logo"
          className="w-full h-full object-contain cursor-pointer"
        />
      </div>
    </div>
  );
}
