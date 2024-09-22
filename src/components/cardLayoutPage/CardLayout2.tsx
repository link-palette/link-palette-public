import { getImageUrl } from "@/lib/utils";
import { AddLinkParams, ProfileParams } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function CardLayout2({
  data,
}: {
  data: Readonly<ProfileParams>;
}) {
  return (
    <>
      <ul className="grid grid-cols-2 justify-center gap-[12px] w-full h-full mb-3">
        {data?.links
          ? data?.links.map((link: AddLinkParams, index: number) => (
              <Link
                key={index}
                href={link.url || ""}
                target="_blank"
                className="overflow-hidden"
              >
                <li
                  className="flex flex-col justify-around rounded-lg border border-slate-200"
                  style={{
                    background: data?.card_color!,
                  }}
                >
                  <div className="flex w-full justify-between items-center my-2">
                    <Image
                      src={
                        link.provider_image
                          ? getImageUrl(link.provider_image)
                          : `/images/app_icon_${link.provider}.svg`
                      }
                      alt="Provider Logo"
                      width={35}
                      height={35}
                      className="w-[35px] h-[35px] rounded-full m-1 mr-0"
                    />
                    <h6 className="w-full text-sm text-center">{link.title}</h6>
                  </div>
                  <span className="text-[8px] py-1 text-center">
                    {link.url}
                  </span>
                </li>
              </Link>
            ))
          : null}
      </ul>
    </>
  );
}
