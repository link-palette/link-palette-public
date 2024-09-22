import { getImageUrl } from "@/lib/utils";
import { AddLinkParams, ProfileParams } from "@/types";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";

export default function CardLayout1({
  data,
}: {
  data: Readonly<ProfileParams>;
}) {
  return (
    <>
      <ScrollArea className="h-full w-full">
        <ul className="flex justify-center gap-[12px] w-full h-full mb-3">
          {data?.links
            ? data?.links.map((link: AddLinkParams, index: number) => (
                <li
                  key={index}
                  className="w-[140px] h-[180px] flex flex-col justify-around items-center rounded-lg border border-slate-200"
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
                  <div className="flex flex-col justify-center items-center gap-5">
                    <h6 className="text-sm">{link.title}</h6>
                    <Link
                      href={link.url || ""}
                      target="_blank"
                      className="text-[9px] block border-2 border-red-500 rounded-xl p-1 px-2 text-red-500 cursor-pointer"
                    >
                      Reading
                    </Link>
                  </div>
                </li>
              ))
            : null}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
