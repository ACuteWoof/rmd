import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeCallouts from "rehype-callouts";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Render({
  searchParams,
  thetext,
}: {
  searchParams: { [key: string]: string | undefined };
  thetext: string;
}) {
  const rehypePlugins = [remarkGfm, rehypeKatex, rehypeCallouts];

  return (
    <ReactMarkdown
      rehypePlugins={
        searchParams.html === "true"
          ? [...rehypePlugins, rehypeRaw]
          : rehypePlugins
      }
      remarkPlugins={[remarkMath]}
      skipHtml={searchParams.html !== "true"}
      components={{
        a(props) {
          const { href, children, className } = props;
          return (
            <a href={href as string} className={className} target="_blank">
              {children}
            </a>
          );
        },
        pre(props) {
          const { children } = props;
          return <span>{children}</span>;
        },
        code(props) {
          const { children, className, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter PreTag="pre" language={match[1]} style={theme}>
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
  );
}
