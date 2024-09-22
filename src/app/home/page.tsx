import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import logoBg from "../../../public/images/logoBg.png";
import ShareLink from "@/components/homePage/ShareLink";
import Img1 from "../../../public/images/userImgexam1.png";
import Img2 from "../../../public/images/userImgexam2.png";
import Img3 from "../../../public/images/userImgexam3.png";

export default function Home() {
  return (
    // 전체 페이지
    <div className="relative h-screen w-screen">
      {/* 로고 이미지 */}
      <section className="  mt-[148px] flex items-center justify-center  gap-4 mb-[169px]">
        <div className="relative w-[59px] h-[62px]">
          <Image
            src={logoBg}
            alt="로고배경이미지"
            className="absolute inset-0 w-full  object-cover"
            width={66}
            height={70}
          />
          <Image
            src={logo}
            alt="로고"
            className="absolute inset-0 m-auto object-contain"
            width={40.84}
            height={39}
          />
        </div>

        {/* "IN MY LINK" 텍스트 부분입니다 */}
        <div className=" font-semibold text-[64px] whitespace-nowrap text-center ">
          IN MY LINK
        </div>
      </section>
      <section className="flex justify-center gap-[144px]">
        <ShareLink src={Img1} altText="user1" userName="User1" />
        <ShareLink src={Img2} altText="user2" userName="User2" />
        <ShareLink src={Img3} altText="user3" userName="User3" />
      </section>
    </div>
  );
}
