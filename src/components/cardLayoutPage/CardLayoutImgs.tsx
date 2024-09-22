"use client";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

export type CardLayoutImgsProp = {
  title: string;
  src: StaticImageData;
  alt: string;
} & React.ComponentPropsWithoutRef<"section">;

export default function CardLayoutImgs({
  className,
  title,
  src,
  alt,
  ...rest
}: CardLayoutImgsProp) {
  return (
    <section
      className={cn(
        `flex flex-col gap-3  px-[18px] pt-[14px] pb-5 hover:bg-slate-600 hover:text-white hover:rounded-lg`,
        className
      )}
      style={{ cursor: "pointer" }}
      {...rest}
    >
      <Image src={src} alt={alt} width={140} height={140} />

      <span className="font-medium text-center text-[16px]">{title}</span>
    </section>
  );
}
