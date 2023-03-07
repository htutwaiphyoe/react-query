import { addIssueMutate } from "../hooks/useMutateApis";

export default function AddIssue() {
  const addIssue = addIssueMutate();
  return (
    <div className="add-issue">
      <h2>Add Issue</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addIssue.mutate({
            title: e.target.title.value,
            comment: e.target.comment.value,
          });
        }}
      >
        <label htmlFor="title">Title</label>
        <input type="text" id="title" placeholder="Title" name="title" />
        <label htmlFor="comment">Comment</label>
        <textarea
          name="comment"
          id="comment"
          placeholder="Comment"
          cols="30"
          rows="10"
        />
        <button type="submit" disabled={addIssue.isLoading}>
          {addIssue.isLoading ? "Loading... " : "Add issue"}
        </button>
      </form>
    </div>
  );
}
