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

import useQuery from react-query, useQuery accepts arguments, first is query key which must be unique and a function that returns promise and options object

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

staleTime vs cacheTime

Data refetch only triggers for stale data. but there is more conditions such as component remount and window refocus. but data must be stale. staleTime is maximun age of data, how long wait the data being out of date. to add staleTime, pass third arguments in useQuery as an option. if data is fresh, react query will not trigger refetch.

if staleTime is 0ms, this means data is always out of date and it needs to be refetched from the server.

stateTime is for refetching.

cache is for data that might be re-used later, if there is no active useQuery, data goes into cold storage and cache data expires after cacheTime (default is five mins), it shows how long it's been since the last active useQuery for a particular query, after cache expires, the data is garbage collected. cache is backup data to display while fetching, keep from having a blank page

## Query keys

every query uses the same key. data for queries with **known** keys only refetch upon triggers which are component remount, window refocus, running refetch function manually, automated refetch at a given interval, invalidation after mutations.

query keys can be strings, arrays and nested objects.As long as the query key is serializable, and unique to the query's data.

String keys is used for Generic List/Index resources and Non-hierarchical resources
Array keys is Hierarchical or nested resources and Queries with additional parameters

array query keys treat as dependency array. if they change, new query is created, so any value that is used in query function to fetch data should be part of query keys.

if query is not in use, it becomes inactive and the data in the cache will be stayed until it is garbage collected.

## Pagination

track current page in component state, query keys need to include page number, update current page state when next/prev button is clicked and trigger new query, return data should include information for pagination

