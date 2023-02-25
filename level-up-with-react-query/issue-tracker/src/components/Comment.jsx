import { useUser } from "../hooks/useFetchApis";
import { relativeDate } from "../helpers/relativeDate";

export default function Comment({ comment, createdBy, createdDate }) {
  const createdByQuery = useUser(createdBy);

  return (
    <div className="comment">
      {createdByQuery.isLoading ? (
        <>
          <div>
            <div className="comment-header">Loading...</div>
          </div>
        </>
      ) : (
        <>
          <img src={createdByQuery?.data?.profilePictureUrl} alt="commenter" />
          <div>
            <div className="comment-header">
              <span>{createdByQuery?.data?.name}</span> commented{" "}
              <span>{relativeDate(createdDate)}</span>
            </div>
            <div className="comment-body">{comment}</div>
          </div>
        </>
      )}
    </div>
  );
}
