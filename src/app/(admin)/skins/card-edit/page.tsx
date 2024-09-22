"use client";


import CardLayoutImgs from "@/components/cardLayoutPage/CardLayoutImgs";
import ColorPickerT from "@/components/ColorPickerT";

import SelectColor from "@/components/profilePage/SelectColor";
import SkinsNav from "@/components/skinPage/SkinsNav";
import { Button } from "@/components/ui/button";
import PageTitle from "@/components/PageTitle";
import layoutImg1 from "../../../../../public/images/preview_card01_layout_normal.png";
import layoutImg2 from "../../../../../public/images/preview_card02_layout_normal.png";
import layoutImg3 from "../../../../../public/images/preview_card03_layout_normal.png";
import layoutImg4 from "../../../../../public/images/preview_card04_layout_normal.png";
import layoutImg5 from "../../../../../public/images/preview_card05_layout_normal.png";
import layoutImg6 from "../../../../../public/images/preview_card06_layout_normal.png";
import layoutActiveImg1 from "../../../../../public/images/preview_card01_layout_select.png";
import layoutActiveImg2 from "../../../../../public/images/preview_card02_layout_select.png";
import layoutActiveImg3 from "../../../../../public/images/preview_card03_layout_select.png";
import layoutActiveImg4 from "../../../../../public/images/preview_card04_layout_select.png";
import layoutActiveImg5 from "../../../../../public/images/preview_card05_layout_select.png";
import layoutActiveImg6 from "../../../../../public/images/preview_card06_layout_select.png";

import PageContent from "@/components/PageContent";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { updateCardLayout } from "@/actions/card.action";
import { ProfileParams } from "@/types";

const layouts = [
  layoutImg1,
  layoutImg2,
  layoutImg3,
  layoutImg4,
  layoutImg5,
  layoutImg6,
];

const activeLayouts = [
  layoutActiveImg1,
  layoutActiveImg2,
  layoutActiveImg3,
  layoutActiveImg4,
  layoutActiveImg5,
  layoutActiveImg6,
];

const clickStyle = "ring-2 ring-black rounded-lg";

export default function CardEdit() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [activeColor, setActiveColor] = useState<string>("");
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate: updateCardLayoutMutate, isSuccess } = useMutation({
    mutationFn: updateCardLayout,
    onSuccess: () =>
      toast({
        title: "Updated Card Layout!",
        description: "카드 레이아웃이 정상적으로 변경되었습니다.",
      }),
  });

  const ChangeIndex = (i: number) => {
    queryClient.setQueryData(
      ["profile", session?.user.id],
      (data: ProfileParams) => {
        return {
          ...data,
          card_layout: i,
        };
      }
    );
  };

  // 색상 변경 핸들러
  const handleColorChange = (color: string) => {
    setActiveColor(color);
    // 캐시에 저장된 프로필 데이터 업데이트
    queryClient.setQueryData(
      ["profile", session?.user.id],
      (data: ProfileParams) => {
        return {
          ...data,
          card_color: activeColor,
        };
      }
    );
  };

  useEffect(() => {
    const data = queryClient.getQueryData<ProfileParams>([
      "profile",
      session?.user.id,
    ]);

    if (data) {
      setActiveIndex(data.card_layout || 0);
      setActiveColor(data.card_color || "");
    }
  }, [queryClient]);

  return (
    <>
      <PageTitle>
        <SkinsNav />
      </PageTitle>
      <PageContent>
        <section className="mb-[84px]">
          <span className="font-semibold text-[18px] mb-[30px] block ">
            카드 레이아웃
          </span>
          <div className=" flex gap-10 mb-[10px] ">
            {layouts.slice(0, 3).map((layout, i) => (
              <CardLayoutImgs
                key={i}
                src={i === activeIndex ? activeLayouts[i] : layout}
                alt={`레이아웃${i + 1}`}
                title={`레이아웃${i + 1}`}
                onClick={() => {
                  setActiveIndex(i);
                  ChangeIndex(i);
                }}
                className={i === activeIndex ? clickStyle : ""}
              />
            ))}
          </div>
          <div className=" flex gap-10 ">
            {layouts.slice(3).map((layout, i) => (
              <CardLayoutImgs
                key={i + 3}
                src={i + 3 === activeIndex ? activeLayouts[i + 3] : layout}
                alt={`레이아웃${i + 3 + 1}`}
                title={`레이아웃${i + 3 + 1}`}
                onClick={() => {
                  setActiveIndex(i + 3);
                  ChangeIndex(i + 3);
                }}
                className={i + 3 === activeIndex ? clickStyle : ""}
              />
            ))}
          </div>
        </section>
        <section className="mb-[140px]">
          <span className="font-semibold text-[18px] ">카드 컬러</span>
          <div className="mt-4">
            <ColorPickerT
              isGradient={false}
              newColor={activeColor}
              gradientColor1={""} // 기본값 추가
              gradientColor2={""} // 기본값 추가
              onGradientColorChange={() => {}} // 빈 함수로 기본값 추가
              onColorChange={handleColorChange}
            />
          </div>
        </section>
        <Button
          className="w-full font-semibold text-base py-4 mb-[75px] h-[52px]"
          onClick={() =>
            updateCardLayoutMutate({ index: activeIndex, color: activeColor })
          }>
          프로필 업데이트
        </Button>
      </PageContent>
    </>
  );
}
