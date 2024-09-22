import { getImageUrl } from "@/lib/utils";
import { AddLinkParams, ProfileParams } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { MdArrowRight } from "react-icons/md";

export default function CardLayout4({
  data,
}: {
  data: Readonly<ProfileParams>;
}) {
  return (
    <>
      <ul className="w-full h-full flex flex-col gap-[12px]">
        {data?.links
          ? data?.links.map((link: AddLinkParams, index: number) => (
              <Link key={index} href={link.url || ""} target="_blank">
                <li
                  className="w-full h-10 flex justify-between items-center rounded-lg border border-slate-200"
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
                    width={35}
                    height={35}
                    className="w-[35px] h-[35px] rounded-full -translate-x-1/2"
                  />

                  <h6 className="w-full text-[12px] text-center">
                    {link.title}
                  </h6>

                  <MdArrowRight className="size-7" />
                </li>
              </Link>
            ))
          : null}
      </ul>
    </>
  );
}
