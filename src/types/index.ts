import { Database } from "@/types/database";

export type AddLinkParams = Omit<
  Database["public"]["Tables"]["profile_links"]["Insert"],
  "profile_id" | "user_id"
>;
export type UpdateLinkParams = Omit<
  Database["public"]["Tables"]["profile_links"]["Update"],
  "profile_id" | "user_id"
>;
export type UpdateFontParams = Omit<
  Database["public"]["Tables"]["fonts"]["Update"],
  "user_id"
>;

export type ProfileParams = Omit<
  Database["public"]["Tables"]["profiles"]["Row"],
  "font"
> & {
  font:
    | (string & { created_at: string; font_name: string | null; id: string })
    | null;
} & {
  links: AddLinkParams[];
};
