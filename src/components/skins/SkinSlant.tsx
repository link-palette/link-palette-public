import React from "react";

interface SkinkSlantProps {
  bg_color?: string;
  bg_gradient?: string;
  bg_image?: string;
  style?: React.CSSProperties;
}

const SkinkSlant: React.FC<SkinkSlantProps> = ({
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
      viewBox="0 0 460 309"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}>
      <defs>
        {bg_gradient && colors.length >= 2 && (
          <linearGradient id="gradSlant" x1="0%" y1="0%" x2="100%" y2="0%">
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
            id="imgPatternSlant"
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
        d="M0 0H460V183L0 308.5V0Z"
        fill={
          bg_image
            ? "url(#imgPatternSlant)"
            : bg_gradient
            ? "url(#gradSlant)"
            : bg_color
        }
      />
    </svg>
  );
};

export default SkinkSlant;
