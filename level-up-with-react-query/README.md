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

for same component, can use refetch method
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