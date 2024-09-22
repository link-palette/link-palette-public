import React, { useId, useRef, useState } from "react";
import Image from "next/image";
import { cn, getImageUrl } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

type LinkProvider = {
  id: string;
  image?: string;
  file?: File;
};

type LinkProviderSelectProps = {
  selectedProviderId: string | undefined;
  onValueChange: (provider: LinkProvider) => void;
  concatProviderList?: LinkProvider[];
};

function LinkProviderSelect({
  selectedProviderId,
  onValueChange,
  concatProviderList = [],
}: LinkProviderSelectProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputId = useId();
  const linkProviderBtnClassName =
    "rounded-lg border-transparent overflow-hidden border-[3px]";

  const [linkProviderList, setLinkProviderList] = useState<LinkProvider[]>([
    { id: "twitter" },
    { id: "kakao" },
    { id: "youtube" },
    { id: "facebook" },
    { id: "naver_blog" },
    { id: "instagram" },
    ...concatProviderList,
    // { id: "custom_xxx", provider: "custom", image: "", file: null },
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files![0]) {
      const newCustomProvider: LinkProvider = {
        id: `custom_${uuidv4()}`,
        image: URL.createObjectURL(e.target.files![0]),
        file: e.target.files![0],
      };

      setLinkProviderList([...linkProviderList, newCustomProvider]);

      onValueChange(newCustomProvider);

      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-wrap -mx-[22.5px] -my-3">
      {linkProviderList.map((provider) => (
        <button
          key={provider.id}
          onClick={() => onValueChange(provider)}
          type="button"
          className="mx-[22.5px] my-3"
        >
          <Image
            src={
              provider.image
                ? getImageUrl(provider.image)
                : `/images/app_icon_${provider.id}.svg`
            }
            width={64}
            height={64}
            alt=""
            className={cn(
              linkProviderBtnClassName,
              "object-contain h-[64px]",
              selectedProviderId === provider.id && "border-primary-900"
            )}
          />
        </button>
      ))}
      <label htmlFor={fileInputId} className="mx-[22.5px] my-3">
        <Image
          src={`/images/app_icon_add.svg`}
          width={64}
          height={64}
          alt="추가"
          className={cn(linkProviderBtnClassName, "cursor-pointer")}
        />
      </label>
      <input
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleFileChange}
        ref={fileInputRef}
        id={fileInputId}
        hidden
      />
    </div>
  );
}

export default React.memo(LinkProviderSelect);
