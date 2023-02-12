import { useQuery } from "react-query";
import IssueItem from "./IssueItem";
import { useIssueList } from "../hooks/useFetchApis";

export default function IssuesList() {
  const issueListQuery = useIssueList();

  return (
    <div>
      <h2>Issues List</h2>
      {issueListQuery.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul className="issues-list">
          {issueListQuery.data.map((issue) => (
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
          ))}
        </ul>
      )}
    </div>
  );
}
