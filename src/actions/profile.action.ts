"use server";

import { auth } from "@/auth";
import { createServerClient } from "@/lib/supabases/supabase";

import { Session } from "next-auth";
import { Database } from "@/types/database";

export type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

export const updateProfile = async ({
  profile,
  session,
}: {
  profile: ProfileUpdate;
  session: Session;
}): Promise<void> => {
  if (!session?.user?.id) return;

  const supabase = await createServerClient();

  const { error } = await supabase.from("profiles").upsert({
    ...profile,
    user_id: session.user.id,
    id: session.user.id,
  });

  if (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }

  console.log("Profile updated successfully");
};

export const getMyProfile = async (user_id: string) => {
  const session = await auth();

  if (!session?.user?.id) return;

  const supabase = await createServerClient();

  const { data: profileData, error } = await supabase
    .from("profiles")
    .select(
      `
      *,
      font:fonts(*)
      `
    )
    .eq("user_id", user_id)
    .single();

  if (profileData) {
    const { data: linksData, error } = await supabase
      .from("profile_links")
      .select("*")
      .eq("profile_id", profileData.id);
    return { ...profileData, links: linksData };
  }
};
