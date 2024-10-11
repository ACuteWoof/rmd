"use client";
import { useEffect, useState } from "react";
import Render from "./render";
import { Skeleton } from "@/components/ui/skeleton";

export default function RenderClient({
  searchParams,
  url,
}: {
  searchParams: { [key: string]: string | undefined };
  url: string;
}) {
  const [thetext, setThetext] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const fetchUrl: string = searchParams.url ?? url;
      const res = await fetch(fetchUrl as string);
      const thetext = await res.text();
      setLoading(false);
      setThetext(thetext);
    })();
  }, [url, searchParams]);

  return (
    <div>
      {loading ? (
        <div className="h-full w-full flex flex-col gap-2">
          <Skeleton className="w-full h-[40vh] rounded-xl" />
          <Skeleton className="w-full h-[20px] rounded-full" />
          <Skeleton className="w-[90%] h-[20px] rounded-full" />
          <Skeleton className="w-[95%] h-[20px] rounded-full" />
          <Skeleton className="w-[80%] h-[20px] rounded-full" />
        </div>
      ) : (
        <Render searchParams={searchParams} thetext={thetext} />
      )}
    </div>
  );
}
