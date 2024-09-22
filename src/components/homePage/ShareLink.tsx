import Image, { StaticImageData } from "next/image";
import { Button } from "@/components/ui/button";
type ShareLinkProps = {
  src: StaticImageData;
  altText: string;
  userName: string;
  className?: string;
};
export default function ShareLink({
  src,
  altText,
  userName,
  className,
}: ShareLinkProps) {
  return (
    <section className="flex flex-col items-center">
      <div
        className={`
       bg-slate-500 rounded-full ${className}`}
      >
        <Image src={src} alt={altText} width={145} height={145} />
      </div>
      <span className="  font-semibold text-[20px] mt-6">{userName}</span>
      <Button className="rounded-[20px] mt-[18px] w-[145px] h-[40px] bg-[#FFFFFF] border-[3px] border-[#D8D8D8] text-[#D8D8D8] text-[16px]  hover:text-red-700">
        공유
      </Button>
    </section>
  );
}
