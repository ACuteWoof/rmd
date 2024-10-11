"use server";
import { serif } from "./fonts";

import type { Metadata } from "next";
import Link from "next/link";
import Render from "./renderer/render";
import RenderClient from "./renderer/renderclient";

type Props = {
  params: { url: string; html: string; nossr: string; noheader: string };
  searchParams: { [key: string]: string | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const url =
    searchParams.url ?? "A markdown reader; does this really need a title";

  const desc = searchParams.url ?? "Renders markdown files passed to the site.";

  return {
    title: url?.toString().split("/")[url.toString().split("/").length - 1],
    description: desc.toString(),
  };
}

export default async function Page({ searchParams }: Props) {
  const url: string =
    searchParams.url ??
    "https://raw.githubusercontent.com/ACuteWoof/rmd/refs/heads/main/README.md";

  const nossr: boolean = searchParams.nossr === "true";
  const noheader: boolean = searchParams.noheader === "true";

  const res = await fetch(url as string);
  const thetext = await res.text();

  return (
    <main className={"w-full " + serif.className}>
      {!noheader && (
        <header className="py-4 px-8 flex justify-between">
          <div />
          <Link target="_blank" href={url as string}>
            View raw
          </Link>
        </header>
      )}
      <div className="px-8 py-12 w-full">
        <article className="mx-auto prose prose-neutral dark:prose-invert text-wrap break-words">
          {nossr ? (
            <RenderClient searchParams={searchParams} url={url} />
          ) : (
            <Render thetext={thetext} searchParams={searchParams} />
          )}
        </article>
      </div>
    </main>
  );
}
