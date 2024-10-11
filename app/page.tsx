"use server";
import ReactMarkdown from "react-markdown";
import { serif } from "./fonts";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeCallouts from "rehype-callouts";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: { url: string; html: string };
  searchParams: { [key: string]: string | string[] | undefined };
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
    <main className={"w-full " + serif.className}>
      <header className="py-4 px-8 flex justify-between">
        <div />
        <Link target="_blank" href={url as string}>
          View raw
        </Link>
      </header>
      <div className="px-8 py-12 w-full">
        <article className="mx-auto prose prose-neutral dark:prose-invert text-wrap break-words">
          <ReactMarkdown
            rehypePlugins={
              searchParams.html === "true"
                ? [...rehypePlugins, rehypeRaw]
                : rehypePlugins
            }
            remarkPlugins={[remarkMath]}
            skipHtml={searchParams.html !== "true"}
            components={{
              pre(props) {
                const { children } = props;
                return <span>{children}</span>;
              },
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    PreTag="pre"
                    language={match[1]}
                    style={theme}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {thetext}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  );
}
