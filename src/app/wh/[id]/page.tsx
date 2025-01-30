"use client";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import useSWR from "swr";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function WebhookPage() {
  const pathname = usePathname();
  const wId = pathname.split("/")[2];

  const { data, isLoading } = useSWR(
    `/api/webhook/${wId}`,
    (url) => fetch(url).then((res) => res.json()),
    { refreshInterval: 5000 } // Poll every 5s
  );

  console.log("data", data);

  return (
    <div className="p-10">
      {isLoading && <p>Loading...</p>}
      <Button variant={"link"}>
        <Link href={"/"}>
          <ChevronLeft className="h-4 w-4" /> BACK
        </Link>
      </Button>
      <h1>Webhook URL: {wId}</h1>
      <div className="m-10">
        {data?.length > 0 &&
          data.map((request: any) => (
            <div
              className="p-4 border border-gray-200 rounded-lg my-4 text-xs"
              key={request.timestamp}
            >
              <pre key={request.timestamp}>
                {JSON.stringify(request.headers, null, 2)}
              </pre>
              <pre key={request.timestamp}>
                {JSON.stringify(request.body, null, 2)}
              </pre>
            </div>
          ))}
      </div>
    </div>
  );
}
