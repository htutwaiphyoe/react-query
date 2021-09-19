import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

async function fetchPosts(page) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
    );
    return response.json();
}

export function Posts() {
    const queryClient = useQueryClient();

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        if (currentPage < maxPostPage) {
            const nextPage = currentPage + 1;
            queryClient.prefetchQuery(["posts", nextPage], () => fetchPosts(nextPage));
        }
    }, [currentPage, queryClient]);

    // replace with useQuery
    const { data, isLoading, isError, error } = useQuery(
        ["posts", currentPage],
        () => fetchPosts(currentPage),
        {
            staleTime: 5000,
            keepPreviousData: true,
        }
    );
    if (isLoading) return <h1>Loading..</h1>;

    if (isError) return <h1>{error.toString()}</h1>;
    return (
        <>
            <ul>
                {data.map((post) => (
                    <li key={post.id} className="post-title" onClick={() => setSelectedPost(post)}>
                        {post.title}
                    </li>
                ))}
            </ul>
            <div className="pages">
                <button
                    disabled={currentPage <= 1}
                    onClick={() => {
                        setCurrentPage((prevPage) => prevPage - 1);
                    }}
                >
                    Previous page
                </button>
                <span>Page {currentPage}</span>
                <button
                    disabled={currentPage >= maxPostPage}
                    onClick={() => {
                        setCurrentPage((prevPage) => prevPage + 1);
                    }}
                >
                    Next page
                </button>
            </div>
            <hr />
            {selectedPost && <PostDetail post={selectedPost} />}
        </>
    );
}
