"use client";

import fontSVGs from "@/lib/fontSVGs";
import SkinsNav from "@/components/skinPage/SkinsNav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import PageContent from "@/components/PageContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFont } from "@/actions/font.action";

import { useSession } from "next-auth/react";
import { ProfileParams } from "@/types";
import { useToast } from "@/hooks/use-toast";

const fonts = [
  "Pretendard",
  "Inter",
  "Black Han Sans",
  "Bagel Fat One",
  "Gowun Batang",
];

export default function FontEdit() {
  const [activeIndex, setActiveIndex] = useState<number>();
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // const cachedData = queryClient.getQueryData(["profile", session?.user.id]);

  // console.log(cachedData);

  const { mutate: updateFontMutate, isSuccess } = useMutation({
    mutationFn: updateFont,
    onSuccess: () =>
      toast({
        title: "Updated Font!",
        description: "폰트가 정상적으로 변경되었습니다.",
      }),
  });

  const handleFontSelect = (i: number) => {
    queryClient.setQueryData(
      ["profile", session?.user.id],
      (data: ProfileParams) => {
        return {
          ...data,
          font: { font_name: fonts[i] },
        };
      }
    );

    return i === activeIndex ? null : setActiveIndex(i);
  };

  useEffect(() => {
    const data = queryClient.getQueryData<ProfileParams>([
      "profile",
      session?.user.id,
    ]);
    if (data) {
      setActiveIndex(fonts.findIndex((f) => f === data.font?.font_name));
    }
  }, [queryClient]);

  return (
    <>
      <PageTitle>
        <SkinsNav />
      </PageTitle>
      <PageContent>
        <h2 className="font-semibold text-[18px] mb-[30px] block">폰트 선택</h2>
        <ul className="flex flex-col gap-[18px]">
          {Object.values(fontSVGs).map((getSVGComponent, i) => (
            <Button
              key={i}
              className={cn(
                "max-w-[500px] h-[52px] p-[17px] rounded-[10px] bg-white text-primary-900 ring-2 ring-[#D8D8D8] hover:bg-white hover:ring-2 hover:ring-primary-900 hover:scale-105",
                activeIndex === i ? "ring-black ring-2" : ""
              )}
              onClick={() => handleFontSelect(i)}
            >
              {getSVGComponent()}
            </Button>
          ))}
        </ul>
        <Button
          onClick={() =>
            updateFontMutate(fonts.filter((_, i) => i === activeIndex)[0])
          }
          size={"lg"}
          className="w-full mt-16"
        >
          프로필 업데이트
        </Button>
      </PageContent>
    </>
  );
}
