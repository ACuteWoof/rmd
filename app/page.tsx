"use server";
import { serif } from "./fonts";

import type { Metadata } from "next";
import Link from "next/link";
import Render from "./renderer/render";
import RenderClient from "./renderer/renderclient";
import { IoMdSettings } from "react-icons/io";
import { Button } from "@/components/ui/button";

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

  const nossr: boolean = searchParams.nossr === "true" || !searchParams.url;
  const noheader: boolean = searchParams.noheader === "true";
  const html: boolean = searchParams.html === "true" || !searchParams.url;

  const res = await fetch(url as string);
  const thetext = await res.text();

  return (
    <main className={"w-full " + serif.className}>
      {!noheader && (
        <header className="py-4 px-8 flex justify-between">
          <div />
          <div className="flex gap-4 items-center">
            <Link target="_blank" href={url as string} className="exception">
              <Button size="sm" variant="outline">
                View raw
              </Button>
            </Link>
            <details className="menu">
              <summary className="shadow-sm border !border-border rounded-full h-8 w-8 flex flex-col items-center justify-center hover:!bg-accent hover:!text-accent-foreground">
                <IoMdSettings />
              </summary>
              <div className="popover-content mt-2">
                <ul className="max-h-[300px] overflow-y-auto overflow-x-hidden flex flex-col gap-1">
                  <li className="popover-link">
                    <Link
                      href={`/?url=${url}&html=${html ? "true" : "false"}&nossr=${!nossr ? "true" : "false"}&noheader=${noheader ? "true" : "false"}`}
                      className="w-full exception"
                    >
                      {nossr ? "Enable" : "Disable"} server side rendering
                    </Link>
                  </li>
                  <li className="popover-link">
                    <Link
                      href={`/?url=${url}&html=${!html ? "true" : "false"}&nossr=${nossr ? "true" : "false"}&noheader=${noheader ? "true" : "false"}`}
                      className="w-full exception"
                    >
                      {html ? "Disable" : "Enable"} embedded HTML rendering
                    </Link>
                  </li>
                  <li className="popover-link">
                    <Link
                      href={`/?url=${url}&html=${html ? "true" : "false"}&nossr=${nossr ? "true" : "false"}&noheader=${!noheader ? "true" : "false"}`}
                      className="w-full exception"
                    >
                      {noheader ? "Show" : "Hide"} header
                    </Link>
                  </li>
                  <hr />
                  <li className="popover-link">
                    <Link href="/" className="w-full exception">
                      How to use
                    </Link>
                  </li>
                  <li className="popover-link">
                    <Link
                      href={`/?url=https://raw.githubusercontent.com/ACuteWoof/ACuteWoof/refs/heads/main/README.md&html=true`}
                      className="w-full exception"
                    >
                      About me
                    </Link>
                  </li>
                  <li className="popover-link">
                    <Link
                      href="https://github.com/acutewoof/rmd"
                      className="w-full exception"
                    >
                      Github
                    </Link>
                  </li>
                </ul>
              </div>
            </details>
          </div>
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
