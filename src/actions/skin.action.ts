"use server";

import { createServerClient } from "@/lib/supabases/supabase";
import { auth } from "@/auth";

export const updateProfile = async (params: {
  bgSkin: number;
  color: string;
  isGradient: boolean;
  avatarEnabled: boolean;
  bgImage?: string;
}) => {
  const { bgSkin, color, isGradient, avatarEnabled, bgImage } = params;

  const session = await auth();
  if (!session?.user?.id) {
    console.error("세션에서 사용자 ID를 찾을 수 없습니다.");
    return null;
  }

  const supabase = await createServerClient();

  let updateData: {
    bg_skin: number;
    bg_color: string | null;
    bg_gradient: string | null;
    avatar_enabled: boolean;
    bg_image: string | null;
  } = {
    bg_skin: bgSkin,
    avatar_enabled: avatarEnabled,
    bg_color: null,
    bg_gradient: null,
    bg_image: null,
  };

  if (bgImage) {
    updateData.bg_image = bgImage;
  } else if (isGradient) {
    if (typeof color === "string" && color.startsWith("linear-gradient(")) {
      updateData.bg_gradient = color;
    } else {
      console.error("그라데이션 형식이 올바르지 않습니다.");
      return null;
    }
  } else {
    if (typeof color === "string") {
      const hexColor = color.startsWith("#") ? color : `#${color}`;
      if (/^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
        updateData.bg_color = hexColor;
      } else {
        console.error("단색 형식이 올바르지 않습니다.");
        return null;
      }
    } else {
      console.error("단색 형식이 올바르지 않습니다.");
      return null;
    }
  }

  const { data, error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", session.user.id);

  if (error) {
    console.error("프로필 업데이트 오류:", error.message);
    throw error;
  }

  return data;
};
