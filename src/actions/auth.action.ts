"use server";

import { signIn, signOut } from "@/auth";

export async function logout() {
  await signOut();
}

export async function googleLogin() {
  await signIn("google");
}

export async function kakaoLogin() {
  await signIn("kakao");
}
export async function naverLogin() {
  await signIn("naver");
}
