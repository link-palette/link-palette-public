"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useMemo, useState } from "react";
import LinkProviderSelect from "../_components/LinkProviderSelect";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import PageTitle from "@/components/PageTitle";
import PageContent from "@/components/PageContent";
import { Session } from "next-auth";
import { DEFAULT_PROVIDER_NAME } from "@/lib/constants";
import { Database } from "@/types/database";
import { UseMutateFunction } from "@tanstack/react-query";
import { AddLinkParams } from "@/types";
import { useSession } from "next-auth/react";
import getBrowserClient from "@/lib/supabases/supabaseClient";

type LinkProvider = {
  id: string;
  image?: string;
  file?: File;
};

const formSchema = z.object({
  title: z.string().min(1, {
    message: "타이틀을 입력하세요.",
  }),
  url: z.string().min(4, {
    message: "링크를 입력하세요.",
  }),
});

type IinitialFormData = Partial<
  Database["public"]["Tables"]["profile_links"]["Row"]
>;

export default function LinkEditForm({
  initialFormData = {},
  onSubmit: _onSubmit,
  onDelete,
  loading = false,
  selectedProvider,
}: {
  initialFormData?: IinitialFormData;
  session: Session | null;
  onSubmit: UseMutateFunction<void, Error, AddLinkParams, unknown>;
  onDelete?: UseMutateFunction<void, Error, string | number, unknown>;
  loading?: boolean;
  selectedProvider?: LinkProvider;
}) {
  const [isUploading, setIsUploading] = useState(false);
  const { data: session } = useSession();
  const [selectedLinkProvider, setSelectedLinkProvider] =
    useState<LinkProvider>({
      id: initialFormData?.provider || "",
      image: initialFormData?.provider_image || "",
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialFormData?.title || "",
      url: initialFormData?.url || "",
    },
  });

  const { formState } = form;

  const onSubmit = async ({ title, url }: z.infer<typeof formSchema>) => {
    let provider_image = initialFormData?.provider_image || "";
    if (selectedLinkProvider.file && session) {
      setIsUploading(true);
      const supabase = getBrowserClient(session);

      const userId = session.user.id; // userId랑 동일한 폴더에만 업로드 권한이 존재. 이하 원하는 폴더 경로 및 파일명 정의
      const folderName = "link-provider";
      const profileId = session.user.id;
      const fileName = `${profileId}_${selectedLinkProvider.id}.${
        selectedLinkProvider.file.type.split("/")[1]
      }`;

      const res = await supabase.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
        .upload(
          [userId, folderName, fileName].join("/"),
          selectedLinkProvider.file
        );

      if (res?.data?.path) {
        provider_image = res.data.path;
      }
      setIsUploading(false);
    }

    _onSubmit({
      title: title,
      url: url,
      provider: selectedLinkProvider?.id,
      provider_image,
      ...(initialFormData?.id && { id: initialFormData.id }),
    });
  };

  const handleLinkProviderChange = (provider: LinkProvider) => {
    if (form.getValues("title") === "" && DEFAULT_PROVIDER_NAME[provider.id]) {
      form.setValue("title", DEFAULT_PROVIDER_NAME[provider.id]);
    } else if (
      DEFAULT_PROVIDER_NAME[selectedLinkProvider.id] === form.getValues("title")
    ) {
      form.setValue("title", DEFAULT_PROVIDER_NAME[provider.id]);
    }

    setSelectedLinkProvider(provider);
  };

  const concatProviderList: LinkProvider[] = useMemo(() => {
    if (initialFormData.provider && initialFormData.provider_image) {
      return [
        {
          id: initialFormData.provider,
          image: initialFormData.provider_image,
        },
      ];
    }
    return [];
  }, [initialFormData]);

  return (
    <>
      <PageTitle>링크 업데이트</PageTitle>
      <PageContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <LinkProviderSelect
              selectedProviderId={selectedLinkProvider?.id}
              onValueChange={handleLinkProviderChange}
              concatProviderList={concatProviderList}
            />
            {formState.isSubmitted && !selectedLinkProvider && (
              <FormMessage className="mt-4 absolute">
                링크 제공자를 선택하세요.
              </FormMessage>
            )}
            <div className="mt-32">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-semibold">링크 타이틀</FormLabel>
                    <FormControl>
                      <Input
                        className="mt-2"
                        placeholder="타이틀을 입력하세요"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="mt-8">
                    <FormLabel className={"font-semibold"}>링크 URL</FormLabel>
                    <FormControl>
                      <Input
                        className={cn("mt-2")}
                        placeholder="링크를 입력하세요"
                        {...field}
                        onFocus={() => form.setValue("url", "https://")}
                        onBlur={() =>
                          form.getValues("url") === "https://" &&
                          form.setValue("url", "")
                        }
                      />
                    </FormControl>
                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
            </div>

            <Button size="lg" type="submit" className="w-full mt-16">
              링크 업데이트
            </Button>
            {!!onDelete && (
              <Button
                type="button"
                size="lg"
                variant="secondary"
                className="w-full mt-4"
                onClick={() =>
                  initialFormData.id && onDelete(initialFormData.id)
                }
              >
                링크 삭제
              </Button>
            )}
          </form>
        </Form>
      </PageContent>
    </>
  );
}
