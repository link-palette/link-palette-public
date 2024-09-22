'use client';
import { Database } from "@/types/database";
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import {Session} from "next-auth";

let supabase: SupabaseClient;
const getBrowserClient = (session: Session) => {
  if(supabase) {
    return supabase;
  }
  supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: {
        headers: {
          Authorization: `Bearer ${session?.supabaseAccessToken}`,
        },
      },
    }
  )
  return supabase;
}

export default getBrowserClient