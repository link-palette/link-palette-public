"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/actions/profile.action";
import PageContent from "../PageContent";
import PageTitle from "../PageTitle";
import ProfileNav from "./ProfileNav";
import SelectProfile from "./SelectProfile";
import WriteProfile from "./WirteProfile";
import useStore from "@/stores/profile-store";
import { useSession } from "next-auth/react";
import { ProfileParams } from "@/types";
import getBrowserClient from "@/lib/supabases/supabaseClient";
import { v4 as uuidv4 } from "uuid";

export default function HOC() {
  const {
    postImage,
    activeIndex,
    description,
    nickname,
    nickname_color,
    description_color,
  } = useStore();

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const getAvatarUrl = () => {
    if (
      postImage &&
      activeIndex !== null &&
      activeIndex >= 0 &&
      activeIndex < postImage.length
    ) {
      const file = postImage[activeIndex];
      if (file instanceof File) {
        return URL.createObjectURL(file);
      }
    }
    return "";
  };
  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      const file = postImage[activeIndex!] as File;

      if (file && session) {
        const supabase = getBrowserClient(session);
        const userId = session.user.id; // userId랑 동일한 폴더에만 업로드 권한이 존재. 이하 원하는 폴더 경로 및 파일명 정의
        const folderName = "profile-avatar";
        const profileId = session.user.id;
        const fileName = `${profileId}_avatar_${uuidv4()}.${
          file.type.split("/")[1]
        }`;

        const res = await supabase.storage
          .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
          .upload([userId, folderName, fileName].join("/"), file);

        const avatar_image = res.data!.path;

        return updateProfile({
          profile: {
            avatar: avatar_image,
            nickname,
            nickname_color,
            description,
            description_color,
          },
          session: session!,
        });
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ["profile", session?.user.id],
        (data: ProfileParams) => {
          return {
            ...data,
            avatar: getAvatarUrl(),
            nickname,
            nickname_color,
            description,
            description_color,
          };
        }
      );
    },
    onError: (error) => {
      console.error("프로필 업데이트 중 오류 발생:", error);
    },
  });

  return (
    <>
      <PageTitle>
        <ProfileNav />
      </PageTitle>
      <PageContent>
        <SelectProfile />
        <WriteProfile
          updateProfileMutation={updateProfileMutation}
          avatar={getAvatarUrl()}
        />
      </PageContent>
    </>
  );
}
