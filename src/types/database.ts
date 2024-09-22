export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      fonts: {
        Row: {
          created_at: string;
          font_name: string | null;
          id: string;
        };
        Insert: {
          created_at?: string;
          font_name?: string | null;
          id?: string;
        };
        Update: {
          created_at?: string;
          font_name?: string | null;
          id?: string;
        };
        Relationships: [];
      };
      profile_links: {
        Row: {
          created_at: string;
          id: number;
          image: string | null;
          position: number | null;
          profile_id: string;
          provider: string | null;
          provider_image: string | null;
          title: string | null;
          url: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          image?: string | null;
          position?: number | null;
          profile_id: string;
          provider?: string | null;
          provider_image?: string | null;
          title?: string | null;
          url?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          image?: string | null;
          position?: number | null;
          profile_id?: string;
          provider?: string | null;
          provider_image?: string | null;
          title?: string | null;
          url?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profile_links_user_id_fkey2";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      profiles: {
        Row: {
          avatar: string | null;
          avatar_enabled: boolean | null;
          bg_color: string | null;
          bg_image: string | null;
          bg_gradient: string | null;
          bg_skin: number | null;
          card_color: string | null;
          card_layout: number | null;
          created_at: string;
          description: string | null;
          description_color: string | null;
          font: string | null;
          id: string;
          nickname: string | null;
          nickname_color: string | null;
          profile_id: number;
          updated_at: string | null;
          user_id: string;
        };
        Insert: {
          avatar?: string | null;
          avatar_enabled?: boolean | null;
          bg_color?: string | null;
          bg_image?: string | null;
          bg_gradient?: string | null;
          bg_skin?: number | null;
          card_color?: string | null;
          card_layout?: number | null;
          created_at?: string;
          description?: string | null;
          description_color?: string | null;
          font?: string | null;
          id?: string;
          nickname?: string | null;
          nickname_color?: string | null;
          profile_id?: number;
          updated_at?: string | null;
          user_id: string;
        };
        Update: {
          avatar?: string | null;
          avatar_enabled?: boolean | null;
          bg_color?: string | null;
          bg_image?: string | null;
          bg_skin?: number | null;
          bg_gradient?: string | null;
          card_color?: string | null;
          card_layout?: number | null;
          created_at?: string;
          description?: string | null;
          description_color?: string | null;
          font?: string | null;
          id?: string;
          nickname?: string | null;
          nickname_color?: string | null;
          profile_id?: number;
          updated_at?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_font_fkey";
            columns: ["font"];
            isOneToOne: false;
            referencedRelation: "fonts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "profiles_user_id_fkey2";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          email: string | null;
          id: string;
          image: string | null;
          name: string | null;
        };
        Insert: {
          email?: string | null;
          id: string;
          image?: string | null;
          name?: string | null;
        };
        Update: {
          email?: string | null;
          id?: string;
          image?: string | null;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
