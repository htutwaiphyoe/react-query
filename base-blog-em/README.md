# Blog-em Ipsum

## Features

-   Fetching data
-   Loading and Error states
-   React Query DevTools
-   Pagination
-   Prefetching
-   Mutations

## Integration

-   npm install react-query
-   create query client
    -   client that manages queries and cache
-   apply QueryProvider
    -   provides cache and client configs to children
    -   takes query client as a value
-   run useQuery
    -   hook that queries the server

import QueryClient and QueryClientProvider from react-query, create new queryClient object, wrap App component with QueryClientProvider and pass queryClient object as the value of client props.

import useQuery from react-query, useQuery accepts arguments, first is query key which must be unique and a function that returns promise
