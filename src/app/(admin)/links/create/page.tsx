"use client";
import React from "react";
import LinkEditForm from "../_components/LinkEditForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addLink } from "@/actions/link.action";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function LinkCreate() {
  const { data: session } = useSession();

  const queryClient = useQueryClient();
  const { mutate: addLinkMutate, isSuccess } = useMutation({
    mutationFn: addLink,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["profile_links", session?.user.id],
      });

      await queryClient.refetchQueries();
    },
  });

  if (isSuccess) {
    redirect("/links");
  }

  return <LinkEditForm session={session} onSubmit={addLinkMutate} />;
}
