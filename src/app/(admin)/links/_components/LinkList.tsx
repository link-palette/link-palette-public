"use client";
import { getProfileLinks } from "@/actions/link.action";
import LinkItem from "./LinkItem";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Session } from "next-auth";

export default function LinkList({ session }: { session: Session | null }) {
  const { data: linkItemList = [], isSuccess } = useQuery({
    queryKey: ["profile_links", session?.user.id],
    queryFn: () => getProfileLinks(),
    enabled: !!session?.user.id,
  });

  if (isSuccess && linkItemList && linkItemList.length === 0) {
    return (
      <p className="text-center font-medium text-[18px]">
        링크 추가 버튼을 눌러 새로운 링크를 추가해보세요!
      </p>
    );
  }
  return (
    <>
      {linkItemList &&
        linkItemList.map(
          ({ id, title, url, provider, provider_image }, index: number) => (
            <LinkItem
              title={title}
              url={url}
              provider={provider}
              provider_image={provider_image}
              className={cn(index > 0 && "mt-4")}
              key={id}
              id={id}
            />
          )
        )}
    </>
  );
}
