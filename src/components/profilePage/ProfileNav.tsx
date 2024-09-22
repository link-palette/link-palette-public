import Image from "next/image";
import profileIcon from "/public/images/profileIcon.png";
export default function ProfileNav() {
  return (
    <>
      <nav className=" ml-[19px] flex items-center gap-4  w-full ">
        <Image src={profileIcon} alt="프로필 아이콘" width={30} height={30} />
        <section className="  ">프로필 관리</section>
      </nav>
    </>
  );
}
