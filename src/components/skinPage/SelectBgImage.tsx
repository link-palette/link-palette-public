"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { usePreviewStore } from "@/stores/preview-store";
import { useSession } from "next-auth/react";
import getBrowserClient from "@/lib/supabases/supabaseClient";
import { Upload } from "lucide-react";

interface SelectBgImageProps {
  onBgImageChange: (imageUrl: string) => void;
}

export default function SelectBgImage({ onBgImageChange }: SelectBgImageProps) {
  const { setBgImage, bg_image } = usePreviewStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && session) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        setPreviewImage(dataUrl);
        setBgImage(dataUrl);

        const userId = session.user.id;
        const folderName = "bg_image";
        const fileExtension = file.name.split(".").pop();
        const fileName = `${userId}_custom_${new Date().getTime()}.${fileExtension}`;

        const path = [userId, folderName, fileName].join("/");

        const supabaseClient = getBrowserClient(session);
        const { error, data } = await supabaseClient.storage
          .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
          .upload(path, file);

        if (error) {
          console.error("업로드 실패:", error);
        } else {
          console.log("업로드 성공:", path);
          const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${path}`;
          onBgImageChange(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div className="flex items-center space-x-4 mb-4">
        {previewImage && (
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-cover"
              width={96}
              height={96}
            />
          </div>
        )}
        <div
          className="flex-grow h-24 border-2 border-solid border-gray-300 bg-white cursor-pointer flex items-center justify-center rounded-lg hover:border-gray-400 transition-colors"
          onClick={handleButtonClick}>
          <Upload className="mr-2" size={24} />
          <p className="text-gray-500">이미지를 선택하세요</p>
        </div>
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleImageUpload}
      />
    </div>
  );
}
