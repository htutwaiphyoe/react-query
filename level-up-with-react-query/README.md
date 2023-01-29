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

5. Setting up react query

create client instance, fetch issues list and render issue item