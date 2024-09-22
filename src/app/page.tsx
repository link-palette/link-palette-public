import React from "react";
import "./landing.css";
import LockScroll from "@/components/LockScroll";
import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/auth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DEFAULT_PAGE_AFTER_LOGIN } from "@/lib/constants";
export default async function page() {
  const randomCnt = Math.floor(Math.random() * 2) + 1;
  const session = await auth();

  const url = session ? DEFAULT_PAGE_AFTER_LOGIN : "/login";

  return (
    <div className="landing">
      <div
        className="landing__bg"
        style={{
          backgroundImage: `url('/images/bg_ken_burns${randomCnt}.jpeg');`,
        }}
      >
        <div className="landing__bg-layer"></div>
      </div>
      <div className="container">
        <div className="landing__text">
          <h1 className="landing__title">LinkPalette</h1>
          <p className="landing__subtitle mt-3">
            모든 링크를 하나로, 더 간편하게!
            <br />
            링크팔레트와 함께 하나의 링크로 모든 것을 연결하세요.
          </p>
          <Link
            href={url}
            type="button"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 h-[60px] text-[21px] landing__cta-btn"
            )}
          >
            {session ? "계속 편집하기" : "지금 시작하기"}
          </Link>
        </div>
        <div className="landing__mockup"></div>
      </div>
      <LockScroll />
    </div>
  );
}
