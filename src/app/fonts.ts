import localFont from "next/font/local";
import {
  Inter,
  Black_Han_Sans,
  Bagel_Fat_One,
  Gowun_Batang,
} from "next/font/google";
import { NextFont } from "next/dist/compiled/@next/font";

export const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

export const inter = Inter({ subsets: ["latin"], display: "swap" });

export const black_han_sans = Black_Han_Sans({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
export const bagel_fat_one = Bagel_Fat_One({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const gowun_batang = Gowun_Batang({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const fonts: Record<string, NextFont> = {
  Pretendard: pretendard,
  Inter: inter,
  "Black Han Sans": black_han_sans,
  "Bagel Fat One": bagel_fat_one,
  "Gowun Batang": gowun_batang,
};
