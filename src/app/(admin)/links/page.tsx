import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import PageTitle from "@/components/PageTitle";
import Link from "next/link";
import PageContent from "@/components/PageContent";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { auth } from "@/auth";
import { getProfileLinks } from "@/actions/link.action";
import LinkList from "./_components/LinkList";

export default async function Links() {
  const session = await auth();

  const queryClient = new QueryClient();
  if (session?.user?.id) {
    await queryClient.prefetchQuery({
      queryKey: ["profile_links", session.user.id],
      queryFn: () => getProfileLinks(),
    });
  }
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <PageTitle>링크 관리</PageTitle>
      <PageContent>
        <HydrationBoundary state={dehydratedState}>
          <LinkList session={session} />
        </HydrationBoundary>
        <Link
          href="/links/create"
          type="button"
          className={cn("w-full mt-8", buttonVariants({ size: "lg" }))}
        >
          새로운 링크 추가
        </Link>
      </PageContent>
    </>
  );
}
