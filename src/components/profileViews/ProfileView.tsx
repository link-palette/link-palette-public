"use client";

import { fonts } from "@/app/fonts";
import { cn, getImageUrl } from "@/lib/utils";
import { Session } from "next-auth";

import Image from "next/image";
import Loading from "../Loading";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyProfile } from "@/actions/profile.action";

import { createClient } from "@/lib/supabases/client";
import { AddLinkParams } from "@/types";

import SkinStraight from "../skins/SkinStraight";
import SkinkSlant from "../skins/SkinSlant";
import SkinRound from "../skins/SkinRound";
import SkinBlob from "../skins/SkinBlob";
import { useState } from "react";
import CardLayout0 from "../cardLayoutPage/CardLayout0";
import CardLayout1 from "../cardLayoutPage/CardLayout1";
import CardLayout2 from "../cardLayoutPage/CardLayout2";
import CardLayout3 from "../cardLayoutPage/CardLayout3";
import { Car } from "lucide-react";
import CardLayout4 from "../cardLayoutPage/CardLayout4";
import CardLayout5 from "../cardLayoutPage/CardLayout5";

type SkinComponentType = {
  1: typeof SkinStraight;
  2: typeof SkinkSlant;
  3: typeof SkinRound;
  4: typeof SkinBlob;
};

const skinComponents: SkinComponentType = {
  1: SkinStraight,
  2: SkinkSlant,
  3: SkinRound,
  4: SkinBlob,
};

export default function ProfileView({
  session,
  profile_id,
}: Readonly<{
  session?: Session;
  profile_id?: string;
}>) {
  const getPublicProfile = async (profile_id: string) => {
    const supabase = createClient();

    const { data: profileData, error } = await supabase
      .from("profiles")
      .select(
        `
      *,
      font:fonts(*)
      `
      )
      .eq("profile_id", profile_id)
      .single();

    console.log("Profile data:", profileData);

    if (profileData) {
      const { data: linksData } = await supabase
        .from("profile_links")
        .select("*")
        .eq("profile_id", profileData.id);

      return { ...profileData, links: linksData };
    }
  };

  const { data, isLoading } = useQuery(
    profile_id
      ? {
          queryKey: ["profile", profile_id],
          queryFn: () => getPublicProfile(profile_id!),
        }
      : {
          queryKey: ["profile", session?.user.id],
          queryFn: () => getMyProfile(session?.user.id!),
        }
  );

  // 모바일 뷰 규격 (iPhone 14 기준)
  const previewWidth = "390px";
  const previewHeight = "844px";

  const skinKey = data?.bg_skin as keyof SkinComponentType;
  const SkinComponent = skinComponents[skinKey];

  return isLoading ? (
    <Loading />
  ) : (
    <div
      className={cn(
        data?.font?.font_name && fonts[data?.font.font_name].className,
        "w-full h-full flex flex-col items-center pt-10" // flex-col과 pt-10 추가
      )}
    >
      <div
        className="border border-gray-200 flex flex-col items-center bg-white"
        style={{
          width: previewWidth,
          height: previewHeight,
          borderRadius: "32px",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          transform: "scale(0.6)",
          transformOrigin: "top center",
        }}
      >
        {/* 상단 배경 이미지 또는 색상 영역 */}
        <div
          className="w-full flex flex-col justify-center items-center"
          style={{
            position: "relative",
            overflow: "hidden",

            height: "45%",
          }}
        >

          {SkinComponent && (
            <SkinComponent
              bg_color={data?.bg_color}
              bg_gradient={data?.bg_gradient}
              bg_image={data?.bg_image}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
              }}
            />
          )}
          {/* 아바타와 닉네임을 상대적 위치에 렌더링, 레이어 상위 */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

            }}>
            {data?.avatar_enabled ? (
              <Image
                src={
                  data?.avatar
                    ? getImageUrl(data?.avatar)
                    : "/images/default_avatar.png"
                }
                alt="Profile Avatar"
                className="w-[80px] h-[80px] rounded-full object-cover"
                width={80}
                height={80}
              />
            ) : null}
 
            <h1
              className="text-xl font-semibold text-center mt-3"
              style={{ color: data?.nickname_color }}
            >
              {data?.nickname}
            </h1>
            <p
              className="text-center text-sm font-medium mt-2"
              style={{
                color: data?.description_color,
              }}
            >
              {data?.description}
            </p>
          </div>
        </div>

        {/* 하단 콘텐츠 영역 */}
        <div
          className="w-full px-6 mt-6 flex flex-col items-center"
          style={{
            height: "55%", // 상단 영역과 맞춰 조정
            overflowY: "scroll",
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE and Edge
          }}
        >
          {/* 카드 리스트 */}
          <div style={{ width: "100%" }}>
            {data?.card_layout === 0 && <CardLayout0 data={data} />}
            {data?.card_layout === 1 && <CardLayout1 data={data} />}
            {data?.card_layout === 2 && <CardLayout2 data={data} />}
            {data?.card_layout === 3 && <CardLayout3 data={data} />}
            {data?.card_layout === 4 && <CardLayout4 data={data} />}
            {data?.card_layout === 5 && <CardLayout5 data={data} />}
          </div>
        </div>
      </div>
    </div>
  );
}
