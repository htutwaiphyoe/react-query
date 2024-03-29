# Level up with React Query

1. Why React Query

Traditional

Browser => url => Server

Server => Fetch Data => HTML => Browser

Browser => Render the HTML file

Ajax => Gmail in 2005

request data and update ui without reloading the page

Server => data => Browser => auto dynamic ui update with Javascript

React => SPA

Two states for React => Server and Client

handling Server state and Client state is different.

Client state

- stored in browser
- use React state management or library
- ui state like menu open/close
- ephemeral (loss after browser reload/close)
- synchronous (without a delay)
- owned by a client (stored locally)
- date is always up to date

Server state

- persistent stored on the server
- sent to client when client visits the page
- dynamic data like comments, posts
- multi clients can update server data at any time
- stored remotely (no control by client)
- asynchronous (time from server to client)
- owned by many clients
- data can be out of date

React manages only client state.

useState, useReducer => state management

useEffect => async operation

But some problems for

- rendering the same data across multiple components without doing refetch
- deduplication identical requests
- using a cache to limit the number of fetch requests
- automatically refetching to get the up to date data
- handling pagination
- update local data after mutation to the remote data
- orchestrating requests that depend on other requests

Redux => use global state management => treat server state as client state stored in global store

React Query => only for server state management => fully configurable

2. First React Query

npm i react-query

need a little bit of setup to use

react query provides cache for each one of the query.

import QueryClient and QueryClientProvider from react-query

QueryClient => foundation of react query => query cache + query state

QueryClientProvider => context provider for react query => to make query client available anywhere of the app

create instance of QueryClient and wrap the app with QueryClientProvider and pass our instance to its client

use useQuery hook => data fetching + caching => accepts two arguments (query key and query function)

query key => array of unique string to track query in the cache => if query key changes, refetch query function

query function => function to fetch data => function that anything that returns promise

useQuery returns a object with useful properties like data, isLoading, isError, refetch

3. (PRACTICE) YOUR FIRST QUERY

https://codesandbox.io/s/umwzlb?file=/App.js&from-sandpack=true

4. Project stater template

https://github.com/uidotdev/react-query-course

https://react-query-issue-tracker.ui.dev/

5. Issue list

create client instance, fetch issues list and render issue item

6. (PRACTICE) INDEX QUERY

https://codesandbox.io/s/2c7sf7?file=%2FApp.js&from-sandpack=true

7. (PRACTICE) QUERYING INDIVIDUAL RECORDS

https://codesandbox.io/s/y3oznw?file=%2FApp.js&from-sandpack=true

need to pass dependencies for each individual record in query key, react query does not fetch again if there is a cache for that query key, can pass new item in query key array

https://tanstack.com/query/v3/docs/react/guides/query-keys

8. Querying individual user

create reusable hooks for useQuery, render assignee and created by user

9. Parallel, Dependent and Deferred queries

Parallel queries => combining multiple apis  

1. multiple useQuery and load independently for each query and cache
2. single useQuery with single query function with Promise.all => one query
3. use useQueries hook for multiple queries => separate query => can have dynamic number of queries

depending queries => query depend on another query

1. fetch one query first and fetch depending query after that and return both data => waterfall effect
2. fetch one query and return data, then fetch depending query and return data
3. use two useQuery and let depending query wait while first query is loading => add extra configuration in third argument of useQuery => enabled option
4. to know query status like disabled (isLoading is true so loading state can be long), use fetchStatus (idle(disabled or already fetch), fetching(running) and paused(offline)) and use them to control the component rendering

fetchStatus => request state
status => result of query state

idle and isLoading => null
!idle and isLoading => loading
idle and !isLoading => success

handling api calling with user actions

for searching, useQuery can be called multiple times so use debounce or move to onSubmit (deferred query)

10. (PRACTICE) QUERYING FILTERED DATA

https://codesandbox.io/s/gnjn55?file=%2FApp.js&from-sandpack=true

pass object in query key for filtering

11. Filtering issues with labels

render label in issue and labels, filter issues with labels

12. Filtering issues with status

render status select and filter issue list with status in useIssueList

13. Issue details page

add issue details header and comment list

14. (PRACTICE) search queries

https://codesandbox.io/s/wypuno?file=%2FApp.js&from-sandpack=true

enable query if input has search filter, put data fetching to onSubmit for deferred query, check idle state of query for enable config, add search in query key

15. Issue search

add search input and search query. render search results if search query is enabled, handle search input clear

16. Cache state and Devtool

result of query state => error, loading, success
query state => idle, fetching, paused
internal cache state => fresh, stale (to know when to fetch)

react query is all about server state

loading => no data first time
fetching => every time query is fetched or re-fetched

if server data is updated, need to inform react query to refetch data

fresh => server state won't change soon
stale => might already out of date

by default, every query marks as stale, isStale state.

cache will be inactive if the component of the query is unmounted, data is kept in cache but might be removed later

React query dev tools gives the display of state transitions (current state of cache)

import ReactQueryDevtools from react-query/devtools and add inside of QueryClientProvider, automatically hide in production

can configure stateTime in each query, that will make cache as fresh in that time, after that cache is stale and eligible for refetching

stateTime: Infinity => fresh forever

to refetch stale query, there are four signals

1. refetchInterval
2. refetchIntervalInBackground
3. refetchOnMount => default true
4. refetchOnReconnect => default true
5. refetchOnWindowFocus => default true

Inactive query will be removed after 5 mins by default but can configure with cacheTime, no cache, react query reload from start

17. Integration devtool

added devtool and configure state time in some queries

18. Error Handling

Why query fails

1. Network error
2. Invalid query parameters
3. Server failures
4. Insufficient permission

every promise rejection is error in react query
fetch does not reject 500 error by default , use axios
use ErrorBoundary for global error handling, useErrorBoundary option (catch error, throw to react then pass to nearest ErrorBoundary)
onError callback for individual query for toast
isError property and error object for individual query

query fail at second time but still has cache => so show data first and then show error or show both cache data and error

19. (PRACTICE) error handling

x-error header => 50% error
update fetch function for error, show error message and callback

20. Integration error handling

reset means clear cache and refetch query, react query retry query 4 times automatically if the query fails and after that show error , configure retry with retry option, added error boundary

21. Query client

query client => query + cache => can overwrite default configurations or add in individual query

global configuration => individual can overwrite global configuration
can create default query function with query key params => useQuery without query function
query key makes every query unique => query key should be like REST Api endpoint so that query key can create URL => BASE_URL + queryKey.join("/") + "?" + new URLSearchParams(paramObjet).toString()

use this way if api endpoint is standard

react query is all about server state management

```js
const url = `/issues/${id}`
const key = ["issues", id]

new QueryClient({
    defaultOptions: {
        queries: {
            ...,
            queryFn: ({ queryKey }) => {}
        },
        mutations: {
            ...
        }
    }
})
```

can access queryClient directly for imperative scenario (programmatic approach) from useQueryClient hook, give instance of queryClient => queryClient has many methods for query
[query client methods](https://tanstack.com/query/v4/docs/react/reference/QueryClient)

22. Integration global configuration

added staleTime global configuration for one minute

23. Manual query refetching

active queries only refetch automatically
to manual refetch in background, there are two options.
use refetchQueries => refetch both active/inactive queries that matches query key (can cause unnecessary refetch)
use invalidateQueries => make both active/inactive queries query that matches query key as stale and refetch active queries only

changing inactive query to active query, stale cache only refetch

can configure react query to choose what queries to refetch based on query key and query filter

24. (PRACTICE) manual query invalidation

https://codesandbox.io/s/2lkzgw?file=/App.js&from-sandpack=true

refetch does not make cache as stale but invalidateQueries does

25. Query filters

to control the react query what to refetch

query key is also one of query filters

react query refetch every query that matches query key (not exact match)

no query key => refetch all queries

to refetch a query that matches query key exactly, pass filter object in second argument, {exact: true}

no need to pass query key and filter object is in first argument {stale: true, type: 'active'}

query filters can use any queryClient functions

[query filters](https://tanstack.com/query/v4/docs/react/guides/filters)

26. (PRACTICE) query filters

use refetch method if the query object can be accessed, else use queryClient

https://codesandbox.io/s/utn6xg?file=/App.js&from-sandpack=true

27. Query cancellation

every computation has costs, keep costs as low as possible to save server request

default auto cancel => component unmount and query key change

react query informs when query is cancel and need to make it cancel by using AbortController and its signal
react query creates AbortController and pass signal to query function, use that signal to stop request
signal.addEventListener("abort", () => {})

cancelling request is depend on the request type. eg. setTimeout and clearTimeout

use cancel flag for request that is hart to cancel

for fetch api, pass signal in second argument object, need to add proper error handling
  
manual cancel => queryClient.cancelQueries()

still show old cache data if query is cancelled, for the first time cancel, query will be idle state until refetch

28. Integrating query cancellation

add query cancellation with abort controller signal in all queries

29. isFetching and useIsFetching

isLoading shows when query is fetching first time, when it re-fetches, it shows cache data while refetching in background. To know background refetching state of specific query, use isFetching. For background fetching of any queries cross entire app, use useIsFetching hook and can pass query filters. It returns the number of queries that refetch in the background

30. (PRACTICE) Fetching states

[url constructor](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL)

https://codesandbox.io/s/0lqt92?file=/App.js&from-sandpack=true

31. Integration fetching state

show loader when query is refetching in background

32. Prefetching queries

can control the loading state that user see, react query provides cache so that no need to show loading again

placeholderData is like default value for data (same as default value when destructuring) and is not stored in cache. It is returned when query is fetching in background and after that it is replaced by actual data. 

isPlaceholderData is for checking data is placeholderData and use for depending queries to check not to use placeholder data in enable option

placeholder data is for fake data so that it is not stored in cache

to get real data in query and have in the cache, use initialData. real data means similar data on the server and default is stale

initialDataUpdatedAt is for the time when initialData is last updated and it is checked with stale time to refetch query again

can access cache data with query client, use list data cache for initial data of detail page

to preload initial data of previous query, give initial data as function so that can avoid heavy calculation every component render if use data directly and only called once when component is mounted, and use queryClient.getQueryData(queryFilters) to fetch cache data or undefined if no cache and then search detail item and return it, will still show loading if query is loaded before previous query

need to know initial data is stale or not depending on how long previous query is last fetched, queryClient.getQueryState(queryFilters) give state of the query and use dateUpdatedAt in initialDataUpdatedAt function so that stale time calculation is correct

pull => get cache data of previous query for initial data of individual query
push => store cache data for future queries if query can provide initial data for another queries

use queryClient.setQueryData(queryFilters) for setting data into the cache manually and dataUpdatedAt is the moment when call setQueryData

initial data also need to be fetched so use user action and preload eg. hover event or analytic data

queryClient.prefetchQuery(queryKey, queryFn) does not return data but stores in cache

can prefetch for next page in current page

prefetching needs query variables and tight coupling between queries

33. (PRACTICE) Placeholder data

https://codesandbox.io/s/r5zzci?file=%2FApp.js&from-sandpack=true

34. (PRACTICE) Initial data

initial or placeholder data match the structure of actual data

https://codesandbox.io/s/3npvt4?file=%2FApp.js&from-sandpack=true

35. (PRACTICE) Preloading data

https://codesandbox.io/s/y37rqq?file=%2FApp.js&from-sandpack=true

36. Integrating prefetching

use default placeholder data for label list, add push query for issue detail from issue list and prefetch issue detail when hover

react query key is sensitive with type

37. Mutations

state management library =>  get and update state

react query => useQuery for get and useMutation for update

mutation still have challenges like useQuery eg. loading, error and without react query it is like a hell

useMutation tracks state of mutation sent to the server

use mutate function to trigger the request

useQuery is declarative and useMutation is imperative

useMutation still get query state like useQuery and data means response of mutation

mutation can reset to clear returned data, reset() and onSuccess, onMutate, onError lifecycle callbacks are provided

useMutation is no need to pass mutation key and no cache. useMutation is not responsible for updated cache after mutation

depending on returned data refetch with invalidate or refetch

lifecycle callbacks get access to variables that pass to mutate function

update the cache manually + invalidate/refetch updated data in background

38. (PRACTICE) Mutations

https://codesandbox.io/s/ngh641?file=%2FApp.js&from-sandpack=true

update cache in onSuccess, invalidate/refetch in onSettled and show loading state and reset form for better UX

39. Add issue

create form, mutate on submit, invalidate, setQueryData and redirect to issue detail page

40. Optimistic updates

updating cache with fake data while mutation and faking like mutation success in ui due to api delay

use onMutate for optimistic updates with fake data by setQueryData

the problem are the fake one and the real one will be two records and the fake one is removed after invalidate success and when the mutation fails, the fake one is still showing

return rollback function(remove fake data back) onMutate to solve these problems and get preview data with getQueryData and set it in rollback function and access and call rollback function in onSuccess/onError with third arguments

41. Update issue status

render status select and mutate on change. add optimistic update and rollback onError and invalidate onSettled

42. Update issue assignee

render current assignee, assignee menu and mutate on click. add optimistic update and rollback onError and invalidate onSettled

43. Update issue labels

render current labels, labels menu and mutate on click. add optimistic update and rollback onError and invalidate onSettled

44. Paginated queries

single api should not return all data. paginated api for data, use page and perPage filter for pagination

pass page and perPage in filter object in query key

query function can access query key

previous button decrease page and disable when page is 1

next button increase page and disable there is no more data or less than perPage

pagination methods =>  offset-based pagination (per_page * page), cursor-based pagination

to show previous data while loading, use keepPreviousData option

user can press next button multiple times, to avoid disable with isPreviousData combine with keepPreviousData, isFetching will be disabled every background refetch

can prefetch next page when hover next button or current page data is loaded with useEffect using page dependencies

45. (PRACTICE) Paginated queries

https://codesandbox.io/s/iisrg2?file=%2FApp.js&from-sandpack=true

46. Integrating pagination in issues

reset pagination when filters change, pass page in filter object and create query string for page, render pagination buttons and show previous data while loading

47. Infinite queries

infinite page based on scroll or show more button, use useInfiniteQuery that take query kay and query function with pageParam parameter for pagination that pageParam comes from getNextPageParam callback which has last page of the list and all pages of the list and return data becomes value for pageParam of query function. for no next page, return undefined. Query returns data with pages and pageParams, pages contains arrays of all pages and params contains arrays of all page params. to load next page, use query.fetchNextPage function which calls getNextPageParam to get next pageParam and pass to query function and return result added in existing pages

to check the last page, use hasNextPage, isFetchingNextPage for disable button

refetching in infinite queries,refetching with original pageParam value can be problems like earlier records changes or wrong pageParams value due to data changed or duplicate or missing record. react query refetch one page at a time from page 1 to recent page and call getNextPageParam so that pageParam value is up to date
it also work with cursor based pagination

can also start pagination from middle so bidirectional infinite queries, to fetch previous page, use fetchPreviousPage, getPreviousPageParam, hasPreviousPage and isFetchingPreviousPage. return pageParam from query function and use it in getPreviousPageParam callback

48. (PRACTICE) Infinite queries

https://codesandbox.io/s/k57wsr?file=%2FApp.js&from-sandpack=true

use React.Fragment and give index as key for page and same query key for all pages

49. Integrating infinite queries for comments

add infinite queries for comments in issue details using InfiniteScroll component
there is different cache between useQuery and useInfiniteQuery, use prefetchInfiniteQuery for infinite query

50. React query with GraphQL

react query also works well with GraphQL, but can be duplicate cache due to query key. use Apollo client

use graphql-request with react query

51. Suspense mode

React query has built-in support for react suspense adding configs in useQuery, wrap component with Suspense and add {suspense: true} option in useQuery. when useQuery is loading, that sends signal to React and suspense the component will handle loading state

React suspense is not responsible for error so need to wrap with ErrorBoundary, suspense option auto true to useErrorBoundary option

the problem is the way to tell react to suspense, queries can be depending queries if queries are in same component

52. Render optimization

react query always render twice when isFetching true and false, react query tracks property of query object and render every time property changes and cannot remove track property, to control the track of property, use notifyOnChangeProps option but it will rerender only property in notifyOnChangeProps change

use select function to transform the response object and return data is query data

53. (PRACTICE) Render Optimization

https://codesandbox.io/s/xod1iz?file=%2FApp.js&from-sandpack=true

take required properties with select callback

react query takes care of optimization automatically

54. Server side rendering with NextJS

react app is bad at SEO, getSever or static => page => initial data of useQuery

can server add data in the cache with serialize format. create queryClient and use prefetchQuery to store in the cache and use dehydrate function and pass client to serialize and pass state of Hydrate component

55. React query with Typescript

useQuery<ReturnType, ErrorType, TransformationType, QueryKeyType>
ReturnType for data, ErrorType for error, TransformationType for return data select function and QueryKeyType for query key. query key can use as const so that type will be tuple type, query key parameter type is passed to query key of query function

don't destructure queryObject due to typescript to inference based program control flow

56. React query testing

use API mocking and make fake API calls, mocked response must same as actual response

react query testing => run in component and render it and check output, JEST, JSDOM, React Test Renderer

change default config for testing, retry false and remove error log in setLogger of react query, clean up query client in beforeEach
