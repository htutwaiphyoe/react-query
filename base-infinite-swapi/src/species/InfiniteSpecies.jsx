import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
    const response = await fetch(url);
    return response.json();
};

export function InfiniteSpecies() {
    const { data, fetchNextPage, hasNextPage, isLoading, isError, error } = useInfiniteQuery(
        "species",
        ({ pageParam = initialUrl }) => fetchUrl(pageParam),
        {
            getNextPageParam: (lastPage) => lastPage.next || undefined,
        }
    );
    if (isLoading) return <div>Loading...........</div>;
    if (isError) return <div>{error.toString()}</div>;
    // TODO: get data for InfiniteScroll via React Query
    return (
        <InfiniteScroll
            hasMore={hasNextPage}
            loadMore={fetchNextPage}
            loader={<div key={0}>Loading..............</div>}
        >
            {data.pages.map((pageData) =>
                pageData.results.map((s) => (
                    <Species
                        name={s.name}
                        language={s.language}
                        averageLifespan={s.average_lifespan}
                        key={s.name}
                    />
                ))
            )}
        </InfiniteScroll>
    );
}
