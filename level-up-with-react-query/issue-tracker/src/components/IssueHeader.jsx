import { GoIssueClosed, GoIssueOpened } from "react-icons/go";
import { closedStatus, statuses } from "../helpers/constants";
import { useUser } from "../hooks/useFetchApis";
import { relativeDate } from "../helpers/relativeDate";

export default function IssueHeader({
  title,
  number,
  createdBy,
  createdDate,
  comments,
  status = "todo",
}) {
  const isClosed = closedStatus.includes(status);
  const statusItem = statuses.find((item) => item.id === status);
  const createdByQuery = useUser(createdBy);

  return (
    <header>
      <h2>
        {title} <span>#{number}</span>
      </h2>
      <div>
        <span className={isClosed ? "closed" : "open"}>
          {isClosed ? <GoIssueClosed /> : <GoIssueOpened />}
          {statusItem?.label}
        </span>
        <span className="created-by">
          {createdByQuery.isSuccess && createdByQuery.data.name}
        </span>
        {` opened this issue ${relativeDate(createdDate)} · ${
          comments.length
        } comments`}
      </div>
    </header>
  );
}
