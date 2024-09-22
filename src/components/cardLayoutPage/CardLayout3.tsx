import { getImageUrl } from "@/lib/utils";
import { AddLinkParams, ProfileParams } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function CardLayout3({
  data,
}: {
  data: Readonly<ProfileParams>;
}) {
  return (
    <>
      <ul className="grid grid-cols-3 justify-center gap-[12px] w-full h-full">
        {data?.links
          ? data?.links.map((link: AddLinkParams, index: number) => (
              <Link key={index} href={link.url || ""} target="_blank">
                <li
                  className="flex flex-col w-full aspect-square justify-center items-center rounded-lg border border-slate-200"
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
                    width={25}
                    height={25}
                    className="w-[25px] h-[25px] rounded-lg mb-2"
                  />
                  <h6 className="w-full text-[12px] text-center">
                    {link.title}
                  </h6>
                </li>
              </Link>
            ))
          : null}
      </ul>
    </>
  );
}
