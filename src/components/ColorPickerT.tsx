import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  isGradient: boolean;
  newColor: string;
  gradientColor1?: string;
  gradientColor2?: string;
  onColorChange: (color: string) => void;
  onGradientColorChange?: (color: string, index: number) => void;
  onSelect?: () => void; // 선택하기 버튼 클릭 이벤트 핸들러, 선택적으로 만듦
}

export default function ColorPickerT({
  isGradient,
  newColor,
  gradientColor1,
  gradientColor2,
  onColorChange,
  onGradientColorChange,
  onSelect,
}: ColorPickerProps) {
  return (
    <div className="w-[100%] rounded-lg bg-white shadow-lg p-4">
      {isGradient ? (
        <div className="flex space-x-4">
          <div className="flex-1">
            <HexColorPicker
              color={gradientColor1}
              onChange={(color) =>
                onGradientColorChange && onGradientColorChange(color, 1)
              }
              style={{ width: "100%", height: "100px" }}
            />
            <input
              type="text"
              value={gradientColor1}
              onChange={(e) =>
                onGradientColorChange &&
                onGradientColorChange(e.target.value, 1)
              }
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
          <div className="flex-1">
            <HexColorPicker
              color={gradientColor2}
              onChange={(color) =>
                onGradientColorChange && onGradientColorChange(color, 2)
              }
              style={{ width: "100%", height: "100px" }}
            />
            <input
              type="text"
              value={gradientColor2}
              onChange={(e) =>
                onGradientColorChange &&
                onGradientColorChange(e.target.value, 2)
              }
              className="mt-2 p-2 w-full border border-gray-300 rounded"
            />
          </div>
        </div>
      ) : (
        <>
          <HexColorPicker
            color={newColor}
            onChange={onColorChange}
            style={{ width: "100%", height: "100px" }}
          />
          <input
            type="text"
            value={newColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="mt-2 p-2 w-full border border-gray-300 rounded"
            placeholder="#RRGGBB"
          />
        </>
      )}
      {onSelect && (
        <button
          onClick={onSelect}
          className="mt-4 w-full p-2 h-[44px] bg-slate-800 text-white rounded-lg">
          선택하기
        </button>
      )}
    </div>
  );
}
