"use client";
import { useState } from "react";
import SelectColor from "@/components/skinPage/SelectColor";
import SelectBgImage from "@/components/skinPage/SelectBgImage";

interface SelectBgOptionProps {
  onColorChange: (color: string, isGradient: boolean) => void;
  onBgImageChange: (imageUrl: string) => void;
}

export default function SelectBgOption({
  onColorChange,
  onBgImageChange,
}: SelectBgOptionProps) {
  const [selectedOption, setSelectedOption] = useState("color");

  const handleColorClick = () => {
    setSelectedOption("color");
  };

  const handleImageClick = () => {
    setSelectedOption("image");
  };

  return (
    <>
      <span
        className="font-semibold text-[18px] mb-[14px] mr-3 cursor-pointer"
        onClick={handleColorClick}
        style={{ color: selectedOption === "color" ? "black" : "#acacac" }}>
        배경 색상
      </span>
      <span
        className="font-semibold text-[18px] mb-[14px] cursor-pointer"
        onClick={handleImageClick}
        style={{ color: selectedOption === "image" ? "black" : "#acacac" }}>
        배경 이미지
      </span>

      <div className="mt-4">
        {selectedOption === "color" && (
          <SelectColor onColorChange={onColorChange} />
        )}
        {selectedOption === "image" && (
          <SelectBgImage onBgImageChange={onBgImageChange} />
        )}
      </div>
    </>
  );
}
