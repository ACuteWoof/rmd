"use server";
import ReactMarkdown from "react-markdown";
import { serif } from "./fonts";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeCallouts from "rehype-callouts";

import type { Metadata } from "next";

type Props = {
  params: { url: string; html: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { searchParams }: Props,
): Promise<Metadata> {
  const url =
    searchParams.url ?? "A markdown reader; does this really need a title";

  const desc = searchParams.url ?? "Renders markdown files passed to the site.";

  return {
    title: url?.toString().split("/")[url.toString().split("/").length - 1],
    description: desc.toString(),
  };
}

export default async function Content({
  searchParams,
}: {
  params: { url: string; html: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const url =
    searchParams.url ??
    "https://raw.githubusercontent.com/ACuteWoof/rmd/refs/heads/main/README.md";

  const res = await fetch(url as string);
  const thetext = await res.text();

  const rehypePlugins = [remarkGfm, rehypeKatex, rehypeCallouts];

  return (
    <main className={"py-24 w-full px-8 " + serif.className}>
      <article className="mx-auto prose prose-neutral dark:prose-invert text-wrap break-words">
        <ReactMarkdown
          rehypePlugins={
            searchParams.html === "true"
              ? [...rehypePlugins, rehypeRaw]
              : rehypePlugins
          }
          remarkPlugins={[remarkMath]}
          skipHtml={searchParams.html !== "true"}
        >
          {thetext}
        </ReactMarkdown>
      </article>
    </main>
  );
}
