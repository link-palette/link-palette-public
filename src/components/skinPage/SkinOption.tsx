"use client";
import Image from "next/image";

type StaticImageData = /*unresolved*/ any;

interface SkinOptionProps {
  skin: {
    normal: StaticImageData;
    label: string;
    value: number;
  };
  selectedSkin: number | null;
  handleClick: (value: number) => void;
  label: string;
}

export default function SkinOption({
  skin,
  selectedSkin,
  handleClick,
  label,
}: SkinOptionProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`${
          selectedSkin === skin.value ? "opacity-100" : "opacity-30"
        } transition-opacity duration-300`}>
        <Image
          src={skin.normal}
          alt={label}
          onClick={() => handleClick(skin.value)}
          className="cursor-pointer"
        />
      </div>
      <div>{label}</div>
    </div>
  );
}
