import Image from "next/image";
import React from "react";

function Loading() {
  return (
    <div className="h-screen w-full bg-white ">
      <div className="flex justify-center items-center h-full">
        <Image
          className="h-16 w-16"
          width={100}
          height={100}
          src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
          alt=""
        />
      </div>
    </div>
  );
}

export default Loading;
