// SelectColor.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { HexColorPicker, HexColorInput } from "react-colorful";
import plusIcon from "/public/images/plusIcon.png";
import useStore from "@/stores/profile-store";

interface SelectColorProps {
  color: string;
  setColor: (color: string) => void;
  activeColor: string | null;
  setActiveColor: (color: string | null) => void;
}

export default function SelectColor({
  color,
  setColor,
  activeColor,
  setActiveColor,
}: SelectColorProps) {
  const [openColor, setOpenColor] = useState(false);
  const { colorArr, setColorArr } = useStore();

  const circleStyle =
    "rounded-full border-[#CCCCCC] border-[2px] w-10 h-10 relative cursor-pointer hover:border-black";

  const colorHandle = () => {
    setOpenColor(!openColor);
    if (openColor && color) {
      const newColors = [...colorArr];
      if (newColors.length >= 1) {
        newColors.shift();
      }
      newColors.push(color);
      setColorArr(newColors);
      setActiveColor(color);
    }
  };

  const handleColorClick = (color: string) => {
    setActiveColor(color);
  };

  return (
    <main className="relative">
      <section className="flex gap-[49px]">
        <div
          className={`${circleStyle}`}
          style={{
            backgroundColor: "red",
            borderColor: activeColor === "red" ? "black" : "#CCCCCC",
          }}
          onClick={() => handleColorClick("red")}
        ></div>
        <div
          className={`${circleStyle}`}
          style={{
            backgroundColor: "orange",
            borderColor: activeColor === "orange" ? "black" : "#CCCCCC",
          }}
          onClick={() => handleColorClick("orange")}
        ></div>
        <div
          className={`${circleStyle}`}
          style={{
            backgroundColor: "green",
            borderColor: activeColor === "green" ? "black" : "#CCCCCC",
          }}
          onClick={() => handleColorClick("green")}
        ></div>
        <div
          className={`${circleStyle}`}
          style={{
            backgroundColor: "purple",
            borderColor: activeColor === "purple" ? "black" : "#CCCCCC",
          }}
          onClick={() => handleColorClick("purple")}
        ></div>

        {colorArr.slice(-1).map((c, index) => (
          <div
            key={index}
            className={`${circleStyle} ${
              activeColor === c ? "border-black" : ""
            }`}
            onClick={() => handleColorClick(c)}
            style={{ backgroundColor: c }}
          ></div>
        ))}
        <div>
          <div
            className={`${circleStyle} relative`}
            onClick={colorHandle}
            style={{ backgroundColor: color }}
          >
            <Image
              src={plusIcon}
              alt="plusIcon"
              className="absolute inset-0 m-auto w-1/2 h-1/2 object-contain"
              width={50}
              height={50}
            />
          </div>
        </div>
      </section>
      {openColor && (
        <section className="mt-4 absolute top-full left-0 border-slate-600 border-[2px] rounded-lg z-10 bg-white p-1">
          <HexColorPicker color={color} onChange={setColor} />
          <HexColorInput
            color={color}
            onChange={setColor}
            placeholder="Type a color"
            prefixed
            alpha
            className="mt-2 p-2 border-[2px] rounded-xl hover:border-black w-[199px]"
          />
        </section>
      )}
    </main>
  );
}
