# Level up with React Query

1. Why React Query

Traditional

Browser => url => Server

Server => Fetch Data => HTML => Browser

Browser => Render the HTML file

Ajax

Gmail in 2005

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
- multi clients can edit at any time
- stored remotely (no control by client)
- asynchronous (time from server to client)
- owned by many clients
- data can be out of date

React manages only client state.

useState, useReducer

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
