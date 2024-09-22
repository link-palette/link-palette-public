import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function PageContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ScrollArea className="overflow-auto px-8">
      <div className="w-[500px] mx-auto h-full py-8">{children}</div>
    </ScrollArea>
  );
}
