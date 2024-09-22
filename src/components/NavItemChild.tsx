import React from "react";
import { cn } from "@/lib/utils";

type NavItemChildProps = {
  active?: boolean;
  label: string;
  icon: React.ReactNode;
};

export default function NavItemChild({
  active = false,
  label,
  icon,
}: NavItemChildProps) {
  return (
    <div
      className={cn(
        "w-full h-[69px] text-[16px] flex justify-center items-center gap-4 text-gray-400 hover:text-black font-semibold",
        active && " text-black"
      )}>
      <div className="flex justify-start items-center w-1/2">
        {icon}
        <span className="font-semibold text-[18px] pl-4">{label}</span>
      </div>
    </div>
  );
}
