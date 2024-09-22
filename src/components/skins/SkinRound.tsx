import React from "react";

interface SkinRoundProps {
  bg_color?: string;
  bg_gradient?: string;
  bg_image?: string;
  style?: React.CSSProperties;
}

const SkinRound: React.FC<SkinRoundProps> = ({
  bg_color,
  bg_gradient,
  bg_image,
  style,
}) => {
  const extractColors = (gradientString: string) => {
    const colorRegex = /#([0-9A-F]{6})/gi;
    const matches = Array.from(gradientString.matchAll(colorRegex));
    return matches.map((match) => match[0]);
  };
  const colors = bg_gradient ? extractColors(bg_gradient) : [];

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 553 250" // 너비를 553으로 증가
      preserveAspectRatio="xMidYMin slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ ...style, position: "absolute", top: 0, left: 0 }}>
      <defs>
        {bg_gradient && colors.length >= 2 && (
          <linearGradient id="gradRound" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: colors[0], stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: colors[1], stopOpacity: 1 }}
            />
          </linearGradient>
        )}
        {bg_image && (
          <pattern
            id="imgPatternRound"
            patternUnits="userSpaceOnUse"
            width="100%"
            height="100%">
            <image
              href={bg_image}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        )}
      </defs>
      <path
        d="M553 0C553 138.071 429.42 250 276.5 250C123.58 250 0 138.071 0 0H553Z"
        fill={
          bg_image
            ? "url(#imgPatternRound)"
            : bg_gradient
            ? "url(#gradRound)"
            : bg_color
        }
      />
    </svg>
  );
};

export default SkinRound;
