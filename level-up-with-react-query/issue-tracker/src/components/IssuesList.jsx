import IssueItem from "./IssueItem";
import Loader from "./Loader";
import { useIssueList } from "../hooks/useFetchApis";

export default function IssuesList({ labels, status }) {
  const issueListQuery = useIssueList({ labels, status });

  return (
    <div>
      <h2>Issues List</h2>
      {issueListQuery.isLoading ? (
        <Loader />
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
