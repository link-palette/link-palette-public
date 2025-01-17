import { auth } from "@/auth";
import { Database } from "@/types/database";
import { createClient } from "@supabase/supabase-js";

export const createServerClient = async () => {
  const session = await auth();
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${session?.supabaseAccessToken}`,
        },
      },
    }
  );
};
