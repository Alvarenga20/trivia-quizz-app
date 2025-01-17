import React from "react";
import { Icons, IconName, DefaultIcon } from "./Icons";

interface FloatingElementProps {
  size?: string;
  animationClass?: string;
  iconName?: IconName;
  opacity?: string;
  position?: {
    top: string;
    left: string;
  };
}

const FloatingElProps: React.FC<FloatingElementProps> = ({
  size = "text-6xl",
  animationClass = "animate-float-random",
  iconName = "question",
  opacity = "opacity-80",
  position,
}) => {
  const selectedIcon = Icons[iconName] || ((size: string) => DefaultIcon(size));
  const top = position?.top || `${Math.floor(Math.random() * 85)}%`;
  const left = position?.left || `${Math.floor(Math.random() * 85)}%`;

  return (
    <div
      className={`fixed ${animationClass} ${opacity} flex items-center justify-center`}
      style={{
        top,
        left,
      }}
    >
      {selectedIcon(size)}
    </div>
  );
};

export default FloatingElProps;
