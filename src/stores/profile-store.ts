import { create } from "zustand";

export type StoreProfile = {
  postImage: File[];
  setPostImage: (images: File[]) => void;
  previewImg: string[];
  setPreviewImg: (urls: string[]) => void;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  color: string;
  setColor: (color: string) => void;
  openColor: boolean;
  setOpenColor: (openColor: boolean) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
  nicknameError: string;
  setNicknameError: (error: string) => void;
  error: boolean;
  setError: (error: boolean) => void;
  introError: string;
  setIntroError: (error: string) => void;
  description: string;
  setDescription: (introduce: string) => void;
  nicknameColor: string;
  setNicknameColor: (color: string) => void;
  introColor: string;
  setIntroColor: (color: string) => void;
  nickname_color: string | null;
  setNickname_color: (color: string | null) => void;
  description_color: string | null;
  setDescription_color: (color: string | null) => void;
  colorArr: string[];
  setColorArr: (colorArr: string[]) => void;
};

const useStore = create<StoreProfile>((set) => ({
  postImage: [],
  setPostImage: (images) => set({ postImage: images }),
  previewImg: [],
  setPreviewImg: (urls) => set({ previewImg: urls }),
  activeIndex: null,
  setActiveIndex: (index) => set({ activeIndex: index }),
  color: "",
  setColor: (color) => set({ color }),
  openColor: false,
  setOpenColor: (openColor) => set({ openColor }),
  nickname: "",
  setNickname: (nickname) => set({ nickname }),
  nicknameError: "",
  setNicknameError: (error) => set({ nicknameError: error }),
  error: false,
  setError: (error) => set({ error }),
  introError: "",
  setIntroError: (error) => set({ introError: error }),
  description: "",
  setDescription: (description) => set({ description }),
  nicknameColor: "",
  setNicknameColor: (color) => set({ nicknameColor: color }),
  introColor: "",
  setIntroColor: (color) => set({ introColor: color }),
  nickname_color: null,
  setNickname_color: (color) => set({ nickname_color: color || "black" }),
  description_color: null,
  setDescription_color: (color) => set({ description_color: color || "black" }),
  colorArr: [],
  setColorArr: (colorArr) => set({ colorArr: colorArr }),
}));

export default useStore;
