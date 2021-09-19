import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Person } from "./Person";

const initialUrl = "https://swapi.dev/api/people/";
const fetchUrl = async (url) => {
    const response = await fetch(url);
    return response.json();
};

export function InfinitePeople() {
    const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useInfiniteQuery(
        "peoples",
        ({ pageParam = initialUrl }) => fetchUrl(pageParam),
        {
            getNextPageParam: (lastPage) => lastPage.next,
        }
    );
    // TODO: get data for InfiniteScroll via React Query
    if (isLoading) return <h1>Loading...</h1>;
    if (isError) return <h1>{error.toString()}</h1>;

    return (
        <InfiniteScroll
            loadMore={fetchNextPage}
            hasMore={hasNextPage}
            loader={<div>Loading...</div>}
        >
            {data.pages.map((pageData) =>
                pageData.results.map((person) => (
                    <Person
                        name={person.name}
                        hairColor={person.hairColor}
                        eyeColor={person.eyeColor}
                    />
                ))
            )}
        </InfiniteScroll>
    );
}
