"use client";
import { useState } from "react";
import SkinOption from "./SkinOption";

import Skin1 from "/public/images/bg_straight_normal.png";
import Skin2 from "/public/images/bg_slant_normal.png";
import Skin3 from "/public/images/bg_round_normal.png";
import Skin4 from "/public/images/bg_blob_normal.png";

interface SelectSkinProps {
  onSkinChange: (skinValue: number) => void;
}

//스킨 옵션 배열의 value를 숫자
const skins = [
  { normal: Skin1, label: "직선", value: 1 },
  { normal: Skin2, label: "사선", value: 2 },
  { normal: Skin3, label: "곡선", value: 3 },
  { normal: Skin4, label: "블롭", value: 4 },
];

export default function SelectSkin({ onSkinChange }: SelectSkinProps) {
  const [selectedSkin, setSelectedSkin] = useState<number | null>(null);

  const handleImageClick = (skinValue: number) => {
    setSelectedSkin(skinValue);
    onSkinChange(skinValue);
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-2 justify-between w-[500px] mt-3">
        {skins.map((skin, index) => (
          <SkinOption
            key={index}
            skin={skin}
            selectedSkin={selectedSkin}
            handleClick={handleImageClick}
            label={skin.label}
          />
        ))}
      </div>
    </>
  );
}
