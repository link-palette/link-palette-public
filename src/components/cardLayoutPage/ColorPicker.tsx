"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import plusIcon from "../../../public/images/plusIcon.png";
import { HexColorInput, HexColorPicker } from "react-colorful";
import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ProfileParams } from "@/types";

export default function ColorPicker({
  activeColor,
  setActiveColor,
}: {
  activeColor: string;
  setActiveColor: (color: string) => void;
}) {
  const [color, setColor] = useState("");
  const [openColor, setOpenColor] = useState(false);

  const [colorArr, setColorArr] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const { data: session } = useSession();

  const colorHandle = () => {
    setOpenColor(!openColor);
    if (openColor && color) {
      setColorArr((prevColors) => {
        const newColors = [...prevColors];
        if (newColors.length >= 1) {
          newColors.shift();
        }
        newColors.push(color);
        return newColors;
      });
      setActiveColor(color);
    }
  };

  const ChangeColor = (NewColor: string) => {
    queryClient.setQueryData(
      ["profile", session?.user.id],
      (data: ProfileParams) => {
        return {
          ...data,
          card_color: NewColor,
        };
      }
    );
  };

  const handleColorClick = (color: string) => {
    ChangeColor(color);
    setActiveColor(color);
  };

  const circleStyle =
    " rounded-full border-[#CCCCCC] border-[2px] w-[88px] h-[88px] relative cursor-pointer hover:border-black";

  return (
    <>
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
            backgroundColor: "#FF9100",
            borderColor: activeColor === "#FF9100" ? "black" : "#CCCCCC",
          }}
          onClick={() => handleColorClick("#FF9100")}
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
        <section className="relative">
          <div
            className={`rounded-full border-[#CCCCCC] border-[2px] w-[88px] h-[88px] cursor-pointer hover:border-black relative`}
            style={{ backgroundColor: color }}
            onClick={colorHandle}
          >
            <Image
              src={plusIcon}
              alt="plusIcon"
              className="absolute inset-0 m-auto w-1/2 h-1/2 object-contain"
              width={50}
              height={50}
            />
          </div>
          {openColor && (
            <div className="absolute top-full left-0 mt-2">
              <HexColorPicker color={color} onChange={setColor} />
              <HexColorInput
                color={color}
                onChange={setColor}
                placeholder="Type a color"
                prefixed
                alpha
                className="mt-2 p-2 border-[2px] rounded-xl hover:border-black"
              />
            </div>
          )}
        </section>
      </section>
    </>
  );
}
