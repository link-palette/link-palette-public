"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SkinsNav() {
  const pathname = usePathname();
  const routes = [
    {
      label: "배경 편집",
      href: "/skins/bg-edit",
    },
    {
      label: "폰트 편집",
      href: "/skins/font-edit",
    },
    {
      label: "카드 편집",
      href: "/skins/card-edit",
    },
  ];

  return (
    <>
      <nav className="flex w-full">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.label}
            className={cn(
              "w-full h-full flex justify-center items-center text-[#ACACAC]",
              route.href === pathname && "text-black font-black"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
