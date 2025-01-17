import { useMemo, useState, useEffect } from "react";
import FloatingElProps from "./FloatingElProps";

export const FloatingEl = () => {
  const [repeats, setRepeats] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;
      setRepeats(isLargeScreen ? 11 : 5);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const floatingElements = useMemo(
    () => [
      { iconName: "star" },
      { iconName: "trophy" },
      { iconName: "question" },
      { iconName: "lightbulb" },
      { iconName: "campaign" },
    ],
    []
  );

  const repeatedElements = useMemo(
    () => floatingElements.flatMap((el) => Array(repeats).fill(el)),
    [floatingElements, repeats]
  );

  const textSizes = useMemo(
    () => [
      "text-sm",
      "text-lg",
      "text-xl",
      "text-2xl",
      "text-4xl",
      "text-6xl",
      "text-7xl",
    ],
    []
  );

  const elementsWithAttributes = useMemo(() => {
    return repeatedElements.map(() => ({
      position: {
        top: `${Math.floor(Math.random() * 85)}%`,
        left: `${Math.floor(Math.random() * 85)}%`,
      },
      size: textSizes[Math.floor(Math.random() * textSizes.length)],
    }));
  }, [repeatedElements, textSizes]);

  return (
    <div style={{ position: "relative", zIndex: 0 }}>
      {repeatedElements.map((el, index) => (
        <FloatingElProps
          key={index}
          iconName={el.iconName}
          size={elementsWithAttributes[index].size}
          position={elementsWithAttributes[index].position}
        />
      ))}
    </div>
  );
};

export default FloatingEl;
