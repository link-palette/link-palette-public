import Image from "next/image";
import React from "react";
import { cn, getImageUrl } from "@/lib/utils";
import Link from "next/link";
import { Database } from "@/types/database";

type LinkItemProps = Pick<
  Database["public"]["Tables"]["profile_links"]["Row"],
  "id" | "title" | "url" | "provider" | "provider_image"
> & { className: string };

export default function LinkItem({
  id,
  title,
  url,
  provider,
  provider_image,
  className,
}: LinkItemProps) {
  return (
    <Link
      href={`/links/${id}/update`}
      className={cn("flex items-center cursor-pointer", className)}
    >
      <Image
        src={
          provider_image
            ? getImageUrl(provider_image)
            : `/images/app_icon_${provider}.svg`
        }
        width={78}
        height={78}
        alt=""
        className={cn("rounded-lg mr-4 h-[78px] object-contain")}
      />
      <div>
        <h4 className="font-semibold text-[18px]">{title}</h4>
        <p className="text-gray-500">{url}</p>
      </div>
    </Link>
  );
}
