import { ProfileParams } from "@/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type TPreviewActions = {
  setStore: (state: ProfileParams) => void;
  setFont: (
    font: string & { created_at: string; font_name: string | null; id: string }
  ) => void;
  setBgImage: (bg_image: string) => void; // 배경 이미지 설정 함수 추가
};

type TPreviewStore = ProfileParams & TPreviewActions;

const initialState: ProfileParams = {
  avatar: "",
  nickname: "",
  nickname_color: "",
  description: "",
  description_color: "",
  bg_skin: 0,
  bg_color: "",
  bg_gradient: "",
  bg_image: "",
  font: null,
  card_layout: 0,
  card_color: "",
  avatar_enabled: null,
  created_at: "",
  id: "",
  updated_at: null,
  user_id: "",
  profile_id: 0,
  links: [],
};

type SetStateAction<T> = T | Partial<T> | ((state: T) => T | Partial<T>);

type SetState<T> = (
  partial: SetStateAction<T>,
  replace?: boolean | undefined
) => void;

const store = (set: SetState<TPreviewStore>): TPreviewStore => ({
  ...initialState,
  setStore: (state) =>
    set({
      ...state,
    }),
  setFont: (font) => set(font),
  setBgImage: (bg_image) => set({ bg_image }), // 배경 이미지 설정 구현
});

type StoreCreator = (
  set: (
    partial:
      | TPreviewStore
      | Partial<TPreviewStore>
      | ((state: TPreviewStore) => TPreviewStore | Partial<TPreviewStore>),
    replace?: boolean | undefined
  ) => void
) => TPreviewStore;

export const usePreviewStore = create<TPreviewStore>(
  (process.env.NODE_ENV === "development"
    ? devtools(store)
    : store) as StoreCreator
);
