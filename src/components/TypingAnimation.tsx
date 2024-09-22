"use client";
import React, { useState, useEffect } from "react";

interface TypingAnimationProps {
  texts: string[];
  typingSpeed: number;
  deletingSpeed: number;
  delayBeforeDeleting: number;
  delayBetweenPhrases: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  texts,
  typingSpeed,
  deletingSpeed,
  delayBeforeDeleting,
  delayBetweenPhrases,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isDeleting && index < texts[textIndex].length) {
      timeoutId = setTimeout(() => {
        setCurrentText((prev) => prev + texts[textIndex].charAt(index));
        setIndex((prev) => prev + 1);
        setTypingComplete(false);
      }, typingSpeed);
    } else if (isDeleting && index > 0) {
      timeoutId = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
        setIndex((prev) => prev - 1);
      }, deletingSpeed);
    }

    if (index === texts[textIndex].length && !isDeleting) {
      setTypingComplete(true);
      setTimeout(() => {
        setIsDeleting(true);
      }, delayBeforeDeleting + 2000); // 문장 완료 후 2초 동안 깜빡임, 그 후 삭제 시작
    } else if (index === 0 && isDeleting) {
      setTimeout(() => {
        setIsDeleting(false);
        setIndex(0);
        setCurrentText("");
        setTextIndex((prev) => (prev + 1) % texts.length);
        setTypingComplete(false);
      }, delayBetweenPhrases);
    }

    return () => clearTimeout(timeoutId);
  }, [
    currentText,
    isDeleting,
    index,
    texts,
    textIndex,
    typingSpeed,
    deletingSpeed,
    delayBeforeDeleting,
    delayBetweenPhrases,
    typingComplete,
  ]);

  return (
    <div className="text-white text-3xl font-bold overflow-hidden flex">
      {currentText}
      <span
        className={`inline-block w-0.5 bg-white ${
          typingComplete && !isDeleting ? "animate-blinkCaret" : ""
        }`}></span>
    </div>
  );
};

export default TypingAnimation;
