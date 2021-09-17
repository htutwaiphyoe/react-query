# React Query - Server State Management For React

React Query maintains cache of server data on client. When fetching server data via React Query, let React Query know when to refresh data in the cache. Two ways to do that. immediately, by invalidating data and marking data as stale and configuring triggers to refetch

React Query also provides

-   Loading and Error states when data is being fetched
-   Pagination
-   Infinite Scroll
-   Prefetching
-   Mutations
-   Deduplication of requests
-   Retry on Error
-   Callbacks