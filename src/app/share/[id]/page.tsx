import { auth } from "@/auth";
import { redirect } from "next/navigation";

import ProfileView from "@/components/profileViews/ProfileView";

export default async function UserProfile({
  params: { id },
}: Readonly<{ children: React.ReactNode; params: { id: string } }>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <ProfileView profile_id={id} />
    </div>
  );
}
