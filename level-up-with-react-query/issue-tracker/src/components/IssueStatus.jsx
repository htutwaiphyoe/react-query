import { Status as StatusSelect } from "./Status";
import { useUpdateStatus } from "../hooks/useMutateApis";

export default function IssueStatus({ status, issueNumber }) {
  const updateStatusMutate = useUpdateStatus();

  return (
    <div className="issue-options">
      <StatusSelect
        noEmpty
        value={status}
        onChange={(e) =>
          updateStatusMutate.mutate({ issueNumber, status: e.target.value })
        }
      />
    </div>
  );
}
