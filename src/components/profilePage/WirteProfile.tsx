"use client";
import { useState, Dispatch, SetStateAction } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import ColorPickerT from "../ColorPickerT";
import useStore from "../../stores/profile-store";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { ProfileUpdate, updateProfile } from "@/actions/profile.action";
import { useSession } from "next-auth/react";

interface WriteProfileProps {
  updateProfileMutation: UseMutationResult<void, Error, void>;
  avatar: string;
}
export default function WriteProfile({
  avatar,
  updateProfileMutation,
}: WriteProfileProps) {
  const queryClient = useQueryClient();
  const {
    nickname,
    setNickname,
    nicknameError,
    setNicknameError,
    error,
    setError,
    introError,
    setIntroError,
    description,
    setDescription,
    nicknameColor,
    setNicknameColor,
    introColor,
    setIntroColor,
    nickname_color,
    setNickname_color,
    description_color,
    setDescription_color,
  } = useStore();

  const nicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);

    if (e.target.value.length > 0) {
      setNicknameError("");
    }
  };
  const introChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    if (e.target.value.length >= 2) {
      setIntroError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nickname === "") {
      setError(true);
      setNicknameError("닉네임을 작성해주셔야 합니다.");
      return;
    }

    if (description === "") {
      setIntroError("자기소개를 작성해주셔야 합니다.");
      return;
    } else if (description.length < 2) {
      setIntroError("자기소개는 2글자 이상 작성해야 합니다.");
      return;
    }

    await updateProfileMutation.mutateAsync();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <section>
          <label
            htmlFor="nickname"
            className={`  font-semibold text-[18px] text-[${nicknameColor}]`}>
            닉네임 컬러 및 선택
          </label>

          <Input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            minLength={1}
            value={nickname}
            onChange={nicknameChange}
            error={error}
            errorMessage={nicknameError}
            className="font-medium text-base border-[2px] mt-5 "
            style={{ color: nickname_color || nicknameColor }}
          />
          <ColorPickerT
            isGradient={false}
            newColor={nickname_color || nicknameColor}
            onColorChange={setNickname_color}
          />
        </section>
        <section className="flex flex-col mt-20 ">
          <label htmlFor="introduce" className="font-semibold text-[18px]  ">
            자기소개 입력칸
          </label>
          <Textarea
            id="introduce"
            placeholder="자기소개를 입력해주세요"
            value={description}
            onChange={introChange}
            className="font-medium text-base mt-5  border-[2px]" // marginBottom 조정
            error={error}
            errorMessage={introError}
            style={{ color: description_color || introColor }}
          />

          <ColorPickerT
            isGradient={false}
            newColor={description_color || introColor}
            onColorChange={setDescription_color}
          />
        </section>
        <Button type="submit" className="mt-[50px] w-full mb-[55px]">
          프로필 업데이트 하기
        </Button>
      </form>
    </>
  );
}
