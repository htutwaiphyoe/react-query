import { Link } from "react-router-dom";
import { GoIssueOpened, GoIssueClosed, GoComment } from "react-icons/go";
import { closedStatus } from "../helpers/constants";
import { relativeDate } from "../helpers/relativeDate";
import { useUser } from "../hooks/useFetchApis";
import Label from "./Label";
import { useQueryClient } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

const IssueItem = ({
  title,
  number,
  assignee,
  commentCount,
  createdBy,
  createdDate,
  labels,
  status,
}) => {
  const assigneeUser = useUser(assignee);
  const createdByUser = useUser(createdBy);
  const queryClient = useQueryClient();

  return (
    <li
      onMouseOver={() => {
        queryClient.prefetchQuery(["issues", number.toString()], () =>
          fetchWithError(`/api/issues/${number}`)
        );
        queryClient.prefetchQuery(
          ["issues", number.toString(), "comments"],
          () => fetchWithError(`/api/issues/${number}/comments`)
        );
      }}
    >
      <div>
        {closedStatus.includes(status) ? (
          <GoIssueClosed style={{ color: "red" }} />
        ) : (
          <GoIssueOpened style={{ color: "green" }} />
        )}
      </div>
      <div className="issue-content">
        <span>
          <Link to={`/issue/${number}`}>{title}</Link>
          {labels.map((label) => (
            <Label key={label} label={label} />
          ))}
        </span>
        <small>
          #{number} opened {relativeDate(createdDate)}{" "}
          {createdByUser.isSuccess && `by ${createdByUser.data.name}`}
        </small>
      </div>
      {assigneeUser.isSuccess && (
        <img
          className="assigned-to"
          src={assigneeUser.data.profilePictureUrl}
          alt={assigneeUser.data.name}
        />
      )}
      <span className="comment-count">
        <GoComment />
        {commentCount}
      </span>
    </li>
  );
};

export default IssueItem;
