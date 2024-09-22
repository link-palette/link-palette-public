"use client";
import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import Circle from "./ColorCircle";
import Image from "next/image";
import plusIcon from "../../../public/images/plusIcon.png";
import ColorPicker from "../ColorPickerT";

interface SelectColorProps {
  onColorChange: (color: string, isGradient: boolean) => void;
}

export default function SelectColor({ onColorChange }: SelectColorProps) {
  const [colors, setColors] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [isPickerVisible, setIsPickerVisible] = useState(true);
  const [newColor, setNewColor] = useState("#aabbcc");
  const [hexInput, setHexInput] = useState(newColor);
  const [isGradient, setIsGradient] = useState(false);
  const [gradientColor1, setGradientColor1] = useState("#ffffff");
  const [gradientColor2, setGradientColor2] = useState("#000000");
  const [keyword, setKeyword] = useState("");
  const [recommendedColors, setRecommendedColors] = useState<string[]>([]);
  const [fetchError, setFetchError] = useState(false); // API 호출 실패 상태 추가

  const fetchColors = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/colors/${keyword}`
      );
      const data = await response.json();
      if (data.mainColor && data.subColors) {
        setColors([data.mainColor, ...data.subColors, ...data.gradientColors]);
        setFetchError(false); // 성공 시 에러 상태 초기화
      }
    } catch (error) {
      console.error("색상 추천 API 호출 실패:", error);
      setFetchError(true); // API 호출 실패 시 에러 상태 설정
    }
  };

  const handleFetchColors = () => {
    if (keyword) {
      fetchColors();
    }
  };

  const handleCircleClick = (index: number) => {
    setSelectedColor(index);
    const selectedColor = colors[index];
    const isGradient = selectedColor.startsWith("linear-gradient");
    onColorChange(selectedColor, isGradient);
  };

  const addColorAndClosePicker = () => {
    const newColorValue = isGradient
      ? `linear-gradient(to right, ${gradientColor1}, ${gradientColor2})`
      : newColor;
    const newColors = [...colors, newColorValue];
    setColors(newColors);
    setSelectedColor(newColors.length - 1);
    onColorChange(newColorValue, isGradient);
  };

  const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setHexInput(input);

    if (/^#[0-9A-Fa-f]{6}$/.test(input)) {
      setNewColor(input);
    }
  };

  const handleColorChange = (color: string) => {
    setNewColor(color);
    setHexInput(color);
  };

  const handleGradientColorChange = (color: string, index: number) => {
    if (index === 1) {
      setGradientColor1(color);
    } else {
      setGradientColor2(color);
    }
  };

  const addColor = () => {
    const newColorValue = isGradient
      ? `linear-gradient(to right, ${gradientColor1}, ${gradientColor2})`
      : newColor;
    const newColors = [...colors, newColorValue];
    setColors(newColors);
    setSelectedColor(newColors.length - 1);
    onColorChange(newColorValue, isGradient);
  };

  return (
    <>
      <div className="w-[500px] flex flex-wrap justify-start items-center gap-7 mb-10">
        {colors.length > 0 ? (
          colors.map((color, index) => (
            <Circle
              key={index}
              color={color.includes("gradient") ? undefined : color}
              gradient={color.includes("gradient") ? color : undefined}
              onClick={() => handleCircleClick(index)}
              stroke={selectedColor === index ? "5px solid black" : "none"}
            />
          ))
        ) : (
          <div className="w-full h-[100px] flex justify-center items-center border border-gray-300 rounded">
            <span className="text-gray-500">색상을 선택해주세요</span>
          </div>
        )}
      </div>
      <div className="mb-10">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="색상 키워드를 입력하세요"
          style={{ width: "100%" }}
          className="p-2 border border-gray-300 rounded-lg mb-3"
        />{" "}
        {fetchError && (
          <div className="text-red-500 mb-3">
            서버 상태를 확인해주세요. 실행이 되지 않는다면 직접 색상을
            선택해주세요.
          </div>
        )}
        <button
          onClick={handleFetchColors}
          style={{ width: "100%" }}
          className={`p-2 text-white rounded-lg h-[44px]  ${
            fetchError ? "bg-red-500" : "bg-slate-800"
          }`}>
          색상 추천 받기
        </button>
      </div>
      <div className="relative my-4">
        <hr className="border-t border-gray-300" />
        <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 bg-white px-4 text-sm text-gray-600">
          OR
        </div>
      </div>
      <div className="mt-10 w-[500px]">
        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isGradient}
              onChange={(e) => setIsGradient(e.target.checked)}
              className="form-checkbox"
            />
            <span className="text-gray-700">그라데이션 사용</span>
          </label>
        </div>
        <ColorPicker
          isGradient={isGradient}
          newColor={newColor}
          gradientColor1={gradientColor1}
          gradientColor2={gradientColor2}
          onColorChange={handleColorChange}
          onGradientColorChange={handleGradientColorChange}
          onSelect={addColor} // 선택하기 버튼 이벤트 핸들러 전달
        />
      </div>
    </>
  );
}
