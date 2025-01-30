"use client";

import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { userId } = useUser();

  const [endpoints, setEndpoints] = useState([]);

  const router = useRouter();

  const createEndpointHandler = async () => {
    const response = await fetch("/api/endpoints/create", {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    router.push(data.url);
  };

  const getUserEndpoints = async () => {
    const response = await fetch(`/api/endpoints?user_id=${userId}`);

    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
      setEndpoints(data);
    } else {
      console.log("error", response.statusText);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserEndpoints();
    }
  }, [userId]);

  return (
    <div className="p-20">
      <h1 className="text-2xl font-bold">testing webhooks implementation</h1>
      <p>user id : {userId}</p>
      <h3 className="">Enpoints</h3>
      {endpoints.map((endpoint: any) => (
        <div
          key={endpoint.id}
          className="flex items-center gap-4 my-2 bg-gray-50 p-2 border"
        >
          <p>{endpoint.id}</p>
          <p>{endpoint.expires_at}</p>
          <Button variant={"link"} size={"sm"} asChild>
            <Link href={`/wh/${endpoint.id}`}>View</Link>
          </Button>
        </div>
      ))}
      <div className="mt-6 w-[50%] flex flex-col gap-4">
        {/* <Input type="text" placeholder="Create the url" /> */}
        <Button onClick={createEndpointHandler} className="w-fit">
          Create
        </Button>
      </div>
    </div>
  );
}
