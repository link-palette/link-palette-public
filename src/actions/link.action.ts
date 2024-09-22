"use server";

import { createServerClient } from "@/lib/supabases/supabase";
import { auth } from "@/auth";
import { AddLinkParams, UpdateLinkParams } from "@/types";

export const addLink = async (link: AddLinkParams) => {
  const session = await auth();

  if (!session?.user?.id) return;

  const supabase = await createServerClient();
  await supabase.from("profile_links").insert({
    ...link,
    profile_id: session.user.id,
    user_id: session.user.id,
  });

  new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, 2500);
  });
};

export const updateLink = async (link: UpdateLinkParams) => {
  const session = await auth();
  if (!session?.user?.id) return;
  if (!link.id) return;

  const supabase = await createServerClient();
  await supabase.from("profile_links").update(link).eq("id", link.id);
};

export const deleteLink = async (id: number | string) => {
  const supabase = await createServerClient();
  const res = await supabase.from("profile_links").delete().eq("id", id);
  return res?.data;
};

export const getProfileLinks = async () => {
  const session = await auth();

  if (!session?.user?.id) return;

  const supabase = await createServerClient();
  const res = await supabase
    .from("profile_links")
    .select("*")
    .eq("profile_id", session.user.id);
  return res.data;
};

export const getProfileLink = async (id: number | string) => {
  const supabase = await createServerClient();
  const res = await supabase
    .from("profile_links")
    .select("*")
    .eq("id", id)
    .single();
  return res.data;
};
