"use server";
import ReactMarkdown from "react-markdown";
import { serif } from "./fonts";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeCallouts from "rehype-callouts";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { url: string; html: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { searchParams }: Props,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const url =
    searchParams.url ??
    "Load a file by adding ?url=<your url here> to the address.";

  return {
    title: url?.toString().split("/")[url.toString().split("/").length - 1],
  };
}

export default async function Content({
  searchParams,
}: {
  params: { url: string; html: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const url = searchParams.url ?? "https://raw.githubusercontent.com/ACuteWoof/rmd/refs/heads/main/README.md"

  const res = await fetch(url as string);
  const thetext = await res.text();

  let rehypePlugins = [remarkGfm, rehypeKatex, rehypeCallouts];

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
