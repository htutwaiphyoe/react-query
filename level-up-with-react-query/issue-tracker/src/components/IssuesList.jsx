import IssueItem from "./IssueItem";
import Loader from "./Loader";
import { useIssueList, useSearchQuery } from "../hooks/useFetchApis";
import { useState } from "react";

const renderIssueItem = (issue) => (
  <IssueItem
    key={issue.id}
    title={issue.title}
    number={issue.number}
    assignee={issue.assignee}
    commentCount={issue.comments.length}
    createdBy={issue.createdBy}
    createdDate={issue.createdDate}
    labels={issue.labels}
    status={issue.status}
  />
);

export default function IssuesList({ labels, status }) {
  const [search, setSearch] = useState("");
  const issueListQuery = useIssueList({ labels, status });
  const searchQuery = useSearchQuery(search);

  const isSearchDisabled =
    searchQuery.fetchStatus === "idle" && searchQuery.isLoading;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearch(e.target.elements.search.value);
        }}
      >
        <label htmlFor="search">Search issues</label>
        <input
          type="search"
          name="search"
          placeholder="search"
          id="search"
          onChange={(e) => {
            if (!e.target.value) setSearch(e.target.value);
          }}
        />
      </form>
      {issueListQuery.isLoading ? (
        <Loader />
      ) : isSearchDisabled ? (
        <>
          <h2>Issue list</h2>
          <ul className="issues-list">
            {issueListQuery.data.map(renderIssueItem)}
          </ul>
        </>
      ) : searchQuery.isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>Search results: {searchQuery.data.count}</h2>
          <ul className="issues-list">
            {searchQuery.data.items.map(renderIssueItem)}
          </ul>
        </>
      )}
    </div>
  );
}
