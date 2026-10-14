"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5 phút cache
            gcTime: 10 * 60 * 1000, // 10 phút dọn cache
            retry: (failureCount, error) => {
              // Không retry lỗi validation 4xx
              if (
                error.message.includes("400") ||
                error.message.includes("404")
              ) {
                return false;
              }
              return failureCount < 3; // Retry tối đa 2 lần cho lỗi mạng/5xx
            },
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 3000), // 1s, 2s
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
