import { createTRPCReact } from "@trpc/react-query";
import type { trpcRouter } from "../../../backend/src/trpc/trpc";
import { httpBatchLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// eslint-disable-next-line react-refresh/only-export-components
export const trpc = createTRPCReact<trpcRouter>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/trpc",
    }),
  ],
});

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};


//  const trpcClient = trpc.createClient({
//     links: [
//       httpBatchLink({
//         url: 'http://localhost:3000/trpc', 
//         headers() {
//           const token = localStorage.getItem('token');
//           return {
//             Authorization: `Bearer ${token}`,
//           }
//         }
//       }),
//     ],
//   });
