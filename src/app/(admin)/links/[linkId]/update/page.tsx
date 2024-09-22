"use client";
import React from "react";
import LinkEditForm from "../../_components/LinkEditForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Database } from "@/types/database";

type LinkType = Database["public"]["Tables"]["profile_links"]["Row"];
import { deleteLink, getProfileLink, updateLink } from "@/actions/link.action";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";

export default function LinkUpdate() {
  const { data: session } = useSession();
  const params: { linkId: string } = useParams();

  const { data: link } = useQuery({
    queryKey: ["profile_links", session?.user.id, params.linkId],
    queryFn: () => getProfileLink(params.linkId),
    enabled: Boolean(session?.user.id && params.linkId),
  });

  const queryClient = useQueryClient();
  const { mutate: updateLinkMutate, isSuccess } = useMutation({
    mutationFn: updateLink,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["profile_links", session?.user.id],
      });
      await queryClient.refetchQueries();
    },
  });

  const { mutate: deleteLinkMutate, isSuccess: isDeleteSuccess } = useMutation({
    mutationFn: deleteLink,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["profile_links", session?.user.id],
      });

      await queryClient.refetchQueries();
    },
  });

  if (isSuccess || isDeleteSuccess) {
    redirect("/links");
  }

  // console.log("linkItem", link);

  return (
    link && (
      <LinkEditForm
        initialFormData={link as LinkType}
        session={session}
        onSubmit={updateLinkMutate}
        onDelete={() => deleteLinkMutate(parseInt(params.linkId))}
        selectedProvider={{
          id: link.provider || "",
          image: link.provider_image || "",
        }}
      />
    )
  );
}
