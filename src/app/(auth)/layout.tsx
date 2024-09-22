"use server";
import Image from "next/image";
import bg_ken_burns1 from "/public/images/bg_ken_burns2.jpeg";
import NewLogo from "/public/images/NewLogo.svg";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DEFAULT_PAGE_AFTER_LOGIN } from "@/lib/constants";
import TypingAnimation from "@/components/TypingAnimation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session) {
    return redirect(DEFAULT_PAGE_AFTER_LOGIN);
  }

  return (
    <>
      <div className="min-h-screen flex w-full">
        <div className="w-1/2 h-screen flex items-center justify-center">
          {children}
        </div>
        <div className="absolute top-0 left-0 p-10">
          <Image src={NewLogo} alt="New Logo" width={200} height={100} />
        </div>
        <div className="w-1/2 h-screen relative">
          <Image
            src={bg_ken_burns1}
            alt="phone 이미지"
            layout="fill"
            objectFit="cover"
            className="absolute left-0 top-0"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <TypingAnimation
              texts={[
                "링크 관리, 이제는 스마트하게!",
                "클릭 몇번으로 완성하는 나만의 스타일",
                "쉽고 빠르게 시작하는 링크 관리",
                "Boomco X NextJs Camp",
              ]}
              typingSpeed={150}
              deletingSpeed={50}
              delayBeforeDeleting={2000}
              delayBetweenPhrases={1000}
            />
          </div>
        </div>
      </div>
    </>
  );
}
