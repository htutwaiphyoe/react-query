import { useParams } from "react-router-dom";
import { useIssue, useIssueComments } from "../hooks/useFetchApis";
import Loader from "./Loader";
import IssueHeader from "./IssueHeader";
import Comment from "./Comment";

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
            <aside></aside>
          </main>
        </>
      )}
    </div>
  );
}
