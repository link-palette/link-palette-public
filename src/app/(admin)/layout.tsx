import { getMyProfile } from "@/actions/profile.action";
import { auth } from "@/auth";
import LockScroll from "@/components/LockScroll";
import ProfileView from "@/components/profileViews/ProfileView";
import Sidebar from "@/components/Sidebar";

import { ProfileParams } from "@/types";
import { QueryClient } from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar session={session} />
      <main className="flex-grow flex flex-col h-screen">{children}</main>
      <div className="bg-white flex flex-col w-[460px] border-l-2">
        <h3 className="text-center min-h-[74px] h-[74px] flex justify-center items-center border-b font-semibold ">
          미리보기
        </h3>

        <div className="min-w-[200px] mb-[29px]">
          <ProfileView session={session} />
        </div>
      </div>
      <LockScroll />
    </div>
  );
}
