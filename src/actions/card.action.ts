"use server";

import { createServerClient } from "@/lib/supabases/supabase";
import { auth } from "@/auth";
export const updateCardLayout = async ({
  index,
  color,
}: {
  index: number;
  color: string;
}) => {
  const session = await auth();
  if (!session?.user.id) return;

  const supabase = await createServerClient();

  const { data, error } = await supabase
    .from("profiles")
    .update({
      card_layout: index,
      card_color: color,
    })
    .eq("user_id", session.user.id)
    .select(`*`)
    .single();

  return data;
};
