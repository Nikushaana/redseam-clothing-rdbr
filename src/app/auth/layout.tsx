"use client";

import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user?.id) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="grid grid-cols-2 h-[calc(100vh-80px)]">
      <div className="h-full w-full overflow-hidden">
        <img
          src="/images/Rectangle 10.png"
          alt="auth"
          className="h-full w-full object-cover object-top"
        />
      </div>

      <div className="h-full w-[554px] place-self-center flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
