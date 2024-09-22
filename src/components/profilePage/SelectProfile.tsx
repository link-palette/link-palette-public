"use client";
import { useState } from "react";
import Image from "next/image";
import plusIcon from "../../../public/images/plusIcon.png";
import { Button } from "@/components/ui/button";
import useStore from "../../stores/profile-store";

export default function SelectProfile() {
  const {
    postImage,
    setPostImage,
    previewImg,
    setPreviewImg,
    activeIndex,
    setActiveIndex,
  } = useStore();

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const filesArray = Array.from(files);
    const newImages = [...postImage, ...filesArray];
    setPostImage(newImages);

    const fileUrls: string[] = [];
    const fileReaders: Promise<void>[] = [];

    filesArray.forEach((file) => {
      const fileReader = new FileReader();
      const fileReaderPromise = new Promise<void>((resolve) => {
        fileReader.onload = () => {
          if (fileReader.result) {
            fileUrls.push(fileReader.result as string);
            resolve();
          }
        };
        fileReader.readAsDataURL(file);
      });

      fileReaders.push(fileReaderPromise);
    });

    Promise.all(fileReaders).then(() => {
      const newImg = [...previewImg, ...fileUrls];
      if (newImg.length >= 8) {
        setPreviewImg(newImg.slice(-8));
      } else {
        setPreviewImg(newImg);
      }
    });

    e.target.value = "";
  };
  const ImageDelete = (index: number) => {
    const updatedPostImages = postImage.filter((_, i) => i !== index);
    setPostImage(updatedPostImages);

    const updatedPreviewImages = previewImg.filter((_, i) => i !== index);
    setPreviewImg(updatedPreviewImages);

    setActiveIndex(null);
  };

  return (
    <>

      <section className="flex items-center gap-[26px] mb-6">
        <div className="font-semibold text-[18px]">프로필 이미지 선택</div>

        {previewImg.length > 0 && (
          <Button
            variant="outline"
            className="rounded-[8px] bg-black text-white font-semibold text-base h-[30px] px-4 py-[6px]"
            onClick={() => activeIndex !== null && ImageDelete(activeIndex)}>
            프로필 삭제하기
          </Button>
        )}
      </section>
      <div className="flex flex-wrap w-[500px] h-[300px] gap-4">
        {previewImg.length > 0 &&
          previewImg.slice(0, 8).map((img, index) => (
            <div
              key={index}
              className={`rounded-full border border-[#CCCCCC] w-[100px] h-[100px] relative cursor-pointer hover:border-black ${
                activeIndex === index ? "border-black border-4" : ""
              }`}
              onClick={() =>
                setActiveIndex(index === activeIndex ? null : index)
              }>
              <Image
                src={img}
                alt="uploaded image"
                className="absolute inset-0 m-auto rounded-full w-full h-full object-cover"
                width={80}
                height={80}
              />
            </div>
          ))}
        {previewImg.length < 8 && (
          <label className="cursor-pointer flex items-center justify-center w-[100px] h-[100px] border rounded-full hover:bg-black ">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={uploadFile}
              className="hidden"
            />
            <Image
              src={plusIcon}
              alt="plusIcon"
              className="w-1/2 h-1/2 object-contain"
              width={50}
              height={50}
            />
          </label>
        )}
      </div>
    </>
  );
}
