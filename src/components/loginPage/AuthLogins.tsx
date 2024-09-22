import { googleLogin, kakaoLogin, naverLogin } from "@/actions/auth.action";
import Image from "next/image";
import googleLogo from "/public/images/google.svg";
import kakaoLogo from "/public/images/kakao.png";
import naverLogo from "/public/images/naver.png";

export default function AuthLogins() {
  return (
    <main className="flex flex-col gap-4 justify-center text-center mt-1 w-[500px]">
      <h1 className="font-black text-[30px] text-left ">로그인하기</h1>
      <h3 className="font-normal text-[20px] mt-0 text-left">
        간편하게 로그인하고 서비스를 이용해보세요.
      </h3>
      <hr className="border-dashed border-gray-300 my-6" /> {/* 구분선  */}
      <form
        action={googleLogin as any}
        className="flex flex-col items-center gap-2">
        <button
          type="submit"
          className="relative flex items-center w-full h-11 border-2 rounded-full">
          <Image
            src={googleLogo}
            alt="구글 로그인"
            width={40}
            height={40}
            className="absolute left-2"
          />{" "}
          <span className="text-[16px] w-full text-center font-semibold">
            구글 로그인
          </span>
        </button>
      </form>
      <form
        action={kakaoLogin as any}
        className="flex flex-col items-center gap-2">
        <button
          type="submit"
          className="relative flex items-center w-full h-11 bg-[#FAE300] rounded-full">
          <Image
            src={kakaoLogo}
            alt="카카오 로그인"
            width={40}
            height={40}
            className="absolute left-2"
          />{" "}
          <span className="text-[16px] w-full text-center font-semibold">
            카카오 로그인
          </span>
        </button>
      </form>
      <form
        action={naverLogin as any}
        className="flex flex-col items-center gap-2">
        <button
          type="submit"
          className="relative flex items-center w-full h-11 rounded-full bg-gradient-to-b ">
          <Image
            src={naverLogo}
            alt="네이버 로그인"
            width={40}
            height={40}
            className="absolute left-2"
          />{" "}
          <span className="text-[16px] w-full text-center font-semibold text-white">
            네이버 로그인
          </span>
        </button>
      </form>
    </main>
  );
}
