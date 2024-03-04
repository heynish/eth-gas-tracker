import { fetchGasHistory, fetchLatestGas } from "@/services/gas";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { LatestDataWrapper } from "./components/latest/latest";
import { HistoryDataWrapper } from "./components/history";
import { getFrameMetadata } from "frog/next";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api`
  );
  return {
    other: frameTags,
  };
}

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["gas", "latest"],
    queryFn: fetchLatestGas,
  });

  await queryClient.prefetchQuery({
    queryKey: ["gas", "history"],
    queryFn: fetchGasHistory,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex flex-col items-center gap-4">
        <h1 className="text-3xl my-4">⛽ Ethereum Gas Tracker</h1>
        
        <LatestDataWrapper />

        <HistoryDataWrapper />
      </main>
    </HydrationBoundary>
  );
}
