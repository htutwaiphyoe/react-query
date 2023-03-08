import { useParams } from "react-router-dom";
import { useIssue, useIssueComments } from "../hooks/useFetchApis";
import Loader from "./Loader";
import IssueHeader from "./IssueHeader";
import Comment from "./Comment";
import IssueStatus from "./IssueStatus";
import IssueAssignee from "./IssueAssignee";
import IssueLabels from "./IssueLabels";
import InfiniteScroll from "react-infinite-scroll-component";

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
                <InfiniteScroll
                  hasMore={issueCommentsQuery.hasNextPage}
                  dataLength={issueCommentsQuery.data?.pages.length}
                  next={issueCommentsQuery.fetchNextPage}
                  loader={<Loader />}
                >
                  {issueCommentsQuery.data?.pages.map((page) =>
                    page?.map((comment) => (
                      <Comment key={comment.id} {...comment} />
                    ))
                  )}
                </InfiniteScroll>
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
