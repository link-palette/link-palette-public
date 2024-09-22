import { getImageUrl } from "@/lib/utils";
import { AddLinkParams, ProfileParams } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default function CardLayout5({
  data,
}: {
  data: Readonly<ProfileParams>;
}) {
  return (
    <>
      <ul className="w-full h-full grid grid-cols-3 gap-6">
        {data?.links
          ? data?.links.map((link: AddLinkParams, index: number) => (
              <Link key={index} href={link.url || ""} target="_blank">
                <li>
                  <Image
                    src={
                      link.provider_image
                        ? getImageUrl(link.provider_image)
                        : `/images/app_icon_${link.provider}.svg`
                    }
                    alt="Provider Logo"
                    width={35}
                    height={35}
                    className="w-full aspect-square object-cover rounded-full"
                  />
                </li>
              </Link>
            ))
          : null}
      </ul>
    </>
  );
}
