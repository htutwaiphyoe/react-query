# Infinite SWAPI

## Features

-   infinite scroll

### Infinite scorll

infinite scroll => fetching new data just in time as the user scroll, more efficient than fetching all at once

two ways to implement infinite scorll: click load more button and scroll to certain point on the page

use useInfiniteQuery hook, unlike pagination, it tracks next query which is returned as part of data

data that return from useInfiniteQuery is different from useQuery. it has two properties, pages which is an array whose elements are each page of data and pageParams which are params for each page

every query has its own elements in the pages array and that element represent data for that query.
pageParams tracks the keys of queries that have been retrieved.

pageParam is a parameter passed to the query function

useInfiniteQuery(queryKey, ({pageParam = defaultValue}) => fetchFuncton(pageParam))

current value of pageParam is maintained by React Query. it is done by getNextPageParam option which is a function that return next page param either from data of last page or all pages. it updates pageParam with returned data

useInfiniteQuery returns all properties of useQuery and additions properties.

fetchNextPage is a function to fetch next data.
hasNextPage is a boolean value which is a returned value of getNextPageParam, if undefined, no more data and it will be false
isFetchingNextPage is status for fetching next data to show loader

data from useInfiniteQuery is undefined when component is mounted, it fetch first page with default value of pageParam in query function and it stores returned data in the pages property of data object data.pages[0]. then react query runs getNextPageParam to update pageParam, then check updated pageParam for hasNextPage. if hasNextPage is true and the user takes actions to get next data, fetchNextPage function is triggered and it will run query function with updated pageParam. then the returned data is stored in the next element of data.pages array.

use react-infinite-scroller to work with useInfiniteQuery, it takes props

loadMore is a function to load next data (fetchNextPage)
hasMore is a boolen to check whether there are more data to be loaded (hasNextPage)