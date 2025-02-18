
import './index.css'
import { App } from './App'
import React from "react";
import ReactDOM from "react-dom/client";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);





// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
  




// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { trpc, trpcClient } from './lib/trpc';
// import './index.css';
// import App from './App';
// // import { httpBatchLink } from '@trpc/client';

// const queryClient = new QueryClient();


// const trpcClient = trpc.createClient({
//   links: [
//     httpBatchLink({
//       url: 'http://localhost:3000/trpc',
//     })
   
//     ]
  
// });

// createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <QueryClientProvider client={queryClient}>
//       <trpc.Provider client={trpcClient} queryClient={queryClient}>
//         <App />
//       </trpc.Provider>
//     </QueryClientProvider>
//   </React.StrictMode>
// );