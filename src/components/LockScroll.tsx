"use client";
import React, { useEffect } from "react";

export default function LockScroll() {
  useEffect(() => {
    document.body.classList.add("overflow-hidden:desktop");
    return () => {
      document.body.classList.remove("overflow-hidden:desktop");
    };
  });
  return <></>;
}
