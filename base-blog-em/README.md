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

useQuery returns an object which contains a bunch of useful informations such as data, isLoading, isError, isFetching.

data means returned data from the query function.
error means retured error from the query function.
isFetching means the async query function has not yet resolved.
isLoading means no cache data and plus isFetching.
isError means there is an error from query function

useQuery tries three times before it decides that it cannot get data
react query refetches data when refoucsing the window.

react query has devtool which is a component that shows the status of queries in the development mode. it shows queries by query key, status of queries and last updated timestamp. it also has data explorer and query explorer. by default, it is not included in production mode, no need to exclude.

import devtools from react-query/devtools package and add it in the App
