type CircleProps = {
  color?: string;
  gradient?: string;
  onClick?: () => void;
  stroke?: string;
};

const Circle: React.FC<CircleProps> = ({
  color,
  gradient,
  onClick,
  stroke,
}) => {
  const colorType = color
    ? { backgroundColor: color }
    : gradient
    ? { backgroundImage: gradient }
    : {};
  return (
    <div
      className="w-[60px] h-[60px] rounded-full m-2"
      style={{ ...colorType, border: stroke }}
      onClick={onClick}></div>
  );
};

export default Circle;
