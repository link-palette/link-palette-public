import { getImageUrl } from "@/lib/utils";
import { AddLinkParams, ProfileParams } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function CardLayout0({
  data,
}: {
  data: Readonly<ProfileParams>;
}) {
  return (
    <>
      <ul className="flex flex-col justify-center gap-[12px] w-full h-full">
        {data?.links
          ? data?.links.map((link: AddLinkParams, index: number) => (
              <Link key={index} href={link.url || ""} target="_blank">
                <li
                  className="flex w-full rounded-lg border border-slate-200"
                  style={{
                    background: data?.card_color!,
                  }}
                >
                  <Image
                    src={
                      link.provider_image
                        ? getImageUrl(link.provider_image)
                        : `/images/app_icon_${link.provider}.svg`
                    }
                    alt="Provider Logo"
                    width={50}
                    height={50}
                    className="w-[50px] h-[50px] rounded-md"
                  />
                  <div className="flex flex-col justify-between pl-1 py-2 overflow-hidden">
                    <h6 className="text-sm">{link.title}</h6>
                    <span className="text-[9px]">{link.url}</span>
                  </div>
                </li>
              </Link>
            ))
          : null}
      </ul>
    </>
  );
}
