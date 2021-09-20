import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
    const response = await fetch(url);
    return response.json();
};

export function InfinitePeople() {
    const { data, hasNextPage, fetchNextPage, isLoading, isError, error } = useInfiniteQuery(
        "people",
        ({ pageParam = initialUrl }) => fetchUrl(pageParam),
        {
            getNextPageParam: (lastPage) => lastPage.next || undefined,
        }
    );
    // TODO: get data for InfiniteScroll via React Query
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>{error.toString()}</div>;
    return (
        <InfiniteScroll
            hasMore={hasNextPage}
            loadMore={fetchNextPage}
            loader={<div key={0}>Loading.....</div>}
        >
            {data.pages.map((pageData) =>
                pageData.results.map((p) => (
                    <Person
                        name={p.name}
                        hairColor={p.hairColor}
                        eyeColor={p.eyeColor}
                        key={p.name}
                    />
                ))
            )}
        </InfiniteScroll>
    );
}
