"use server";

import { createServerClient } from "@/lib/supabases/supabase";
import { auth } from "@/auth";

export const updateFont = async (font_name: string) => {
  const session = await auth();
  if (!session?.user?.id) return;

  const supabase = await createServerClient();

  const { data: fontData } = await supabase
    .from("fonts")
    .select(`*`)
    .eq("font_name", font_name)
    .single();

  if (fontData) {
    const res = await supabase
      .from("profiles")
      .update({
        font: fontData.id,
      })
      .eq("user_id", session.user.id)
      .select(
        `
      *,
      font:fonts(*)
      `
      );

    return res.data![0];
  }
};
