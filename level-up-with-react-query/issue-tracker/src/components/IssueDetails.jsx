import { useParams } from "react-router-dom";
import { useIssue, useIssueComments } from "../hooks/useFetchApis";
import Loader from "./Loader";
import IssueHeader from "./IssueHeader";
import Comment from "./Comment";
import IssueStatus from "./IssueStatus";
import IssueAssignee from "./IssueAssignee";
import IssueLabels from "./IssueLabels";

export default function IssueDetails() {
  const { number } = useParams();
  const issueQuery = useIssue(number);
  const issueCommentsQuery = useIssueComments(number);

  return (
    <div className="issue-details">
      {issueQuery.isLoading ? (
        <Loader />
      ) : (
        <>
          <IssueHeader {...issueQuery.data} />
          <main>
            <section>
              {issueCommentsQuery.isLoading ? (
                <Loader />
              ) : (
                issueCommentsQuery.data?.map((comment) => (
                  <Comment key={comment.id} {...comment} />
                ))
              )}
            </section>
            <aside>
              <IssueStatus
                status={issueQuery.data.status}
                issueNumber={issueQuery.data.number.toString()}
              />
              <IssueAssignee
                issueNumber={issueQuery.data.number.toString()}
                assignee={issueQuery.data.assignee}
              />
              <IssueLabels
                issueNumber={issueQuery.data.number.toString()}
                labels={issueQuery.data.labels}
              />
            </aside>
          </main>
        </>
      )}
    </div>
  );
}
