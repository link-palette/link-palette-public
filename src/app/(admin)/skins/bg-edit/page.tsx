"use client";

import { useState } from "react";
import SelectSkin from "@/components/skinPage/SelectSkin";
import SkinsNav from "@/components/skinPage/SkinsNav";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import SelectBgOption from "@/components/skinPage/SelectBgOption";
import PageContent from "@/components/PageContent";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { updateProfile } from "@/actions/skin.action";
import { useSession } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export default function BgEdit() {
  const { data: session } = useSession(); // 세션 데이터 사용
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedSkin, setSelectedSkin] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("#aabbcc");
  const [isGradient, setSelectedGradient] = useState(false);
  const [avatarEnabled, setAvatarEnabled] = useState<boolean | null>(null);
  const [selectedBgImage, setSelectedBgImage] = useState<string | null>(null);

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      toast({
        title: "Updated Font!",
        description: "프로필이 업데이트 되었습니다",
      });
      // 프로필 데이터 쿼리를 무효화하고 새로운 데이터로 리패치

      queryClient.invalidateQueries({
        queryKey: ["profile", session?.user?.id],
        exact: true, //undefined일 수 있기 때문에, 이를 처리하는 로직을 추가
      });
    },
    onError: (error: Error) => {
      console.error("프로필 업데이트 실패:", error);
    },
  });

  const handleAvatarEnabled = (enabled: boolean) => {
    setAvatarEnabled(enabled);
    queryClient.setQueryData(["profile", session?.user.id], (oldData: any) => {
      return {
        ...oldData,
        avatar_enabled: enabled,
      };
    });
  };

  const handleUpdateProfile = () => {
    if (selectedSkin !== null && avatarEnabled !== null) {
      updateProfileMutation.mutate({
        bgSkin: selectedSkin,
        color: selectedColor,
        isGradient: isGradient,
        avatarEnabled: avatarEnabled,
        bgImage: selectedBgImage || undefined,
      });
    } else {
      console.error("모든 필드를 선택해야 합니다.");
      toast({
        title: "업데이트 실패",
        description: "모든 필드를 선택해야 합니다",
        style: { backgroundColor: "red", color: "white" },
      });
    }
  };

  // 스킨 변경 핸들러
  const handleSkinChange = (skinValue: number) => {
    setSelectedSkin(skinValue);
    queryClient.setQueryData(["profile", session?.user.id], (oldData: any) => {
      console.log("Updating skin in cache", skinValue);
      return {
        ...oldData,
        bg_skin: skinValue,
      };
    });
  };

  // 색상 변경 핸들러
  const handleColorChange = (color: string, isGradient: boolean) => {
    setSelectedColor(color);
    setSelectedGradient(isGradient);
    setSelectedBgImage(null); // 이미지 선택 상태 초기화
    queryClient.setQueryData(["profile", session?.user.id], (oldData: any) => {
      console.log("Updating color in cache", color, isGradient);
      if (isGradient) {
        return {
          ...oldData,
          bg_gradient: color,
          bg_color: null,
          bg_image: null,
        };
      } else {
        return {
          ...oldData,
          bg_color: color,
          bg_gradient: null,
          bg_image: null,
        };
      }
    });
  };

  // 배경 이미지 변경 핸들러
  const handleBgImageChange = (imageUrl: string) => {
    setSelectedBgImage(imageUrl);
    setSelectedColor(""); // 색상 선택 상태 초기화
    setSelectedGradient(false); // 그래디언트 선택 상태 초기화
    queryClient.setQueryData(["profile", session?.user.id], (oldData: any) => {
      console.log("Updating bg_image in cache", imageUrl);
      return {
        ...oldData,
        bg_image: imageUrl,
        bg_color: null,
        bg_gradient: null,
      };
    });
  };

  return (
    <QueryClientProvider client={queryClient}>
      <PageTitle>
        <SkinsNav />
      </PageTitle>
      <PageContent>
        <section className="mb-[84px]">
          <span className="font-semibold text-[18px] mb-[14px] block">
            배경 스킨 선택
          </span>
          <div className="flex gap-10 mb-[10px]">
            <SelectSkin onSkinChange={handleSkinChange} />
          </div>
        </section>
        <section className="mb-[140px]">
          <SelectBgOption
            onColorChange={handleColorChange}
            onBgImageChange={handleBgImageChange}
          />
        </section>
        <section>
          <span className="font-semibold text-[18px]">프로필 표시 여부</span>
          <div className="flex justify-between mt-5 mb-[102px]">
            <Button
              className={`w-[240px] h-[52px] font-semibold text-base py-4 ${
                avatarEnabled === true
                  ? "bg-black text-white"
                  : "bg-[#E4E4E4] text-black"
              }`}
              onClick={() => handleAvatarEnabled(true)}>
              표시
            </Button>
            <Button
              className={`w-[240px] h-[52px] font-semibold text-base py-4 ${
                avatarEnabled === false
                  ? "bg-black text-white"
                  : "bg-[#E4E4E4] text-black"
              }`}
              onClick={() => handleAvatarEnabled(false)}>
              표시 안함
            </Button>
          </div>
        </section>
        <Button
          className="w-full font-semibold text-base py-4 mb-[75px] h-[52px]"
          onClick={handleUpdateProfile}>
          프로필 업데이트
        </Button>
      </PageContent>
    </QueryClientProvider>
  );
}
