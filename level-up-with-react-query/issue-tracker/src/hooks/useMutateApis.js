import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import fetchWithError from "../helpers/fetchWithError";

export const useAddIssue = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const addIssueMutate = useMutation(
    (payload) =>
      fetchWithError("/api/issues", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }),
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["issues"], { exact: true });
        queryClient.setQueryData(["issues", data.number.toString()], data);
        navigate(`/issue/${data.number}`);
      },
    }
  );
  return addIssueMutate;
};

export const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  const updateStatusMutate = useMutation(
    ({ issueNumber, status }) => {
      fetchWithError(`/api/issues/${issueNumber}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });
    },
    {
      onMutate: ({ issueNumber, status }) => {
        const oldStatus = queryClient.getQueryData([
          "issues",
          issueNumber,
        ]).status;
        queryClient.setQueryData(["issues", issueNumber], (data) => ({
          ...data,
          status,
        }));

        return () => {
          queryClient.setQueryData(["issues", issueNumber], (data) => ({
            ...data,
            status: oldStatus,
          }));
        };
      },
      onError: (data, variables, rollback) => {
        rollback();
      },
      onSettled: (data, error, { issueNumber, status }) => {
        queryClient.invalidateQueries(["issues", issueNumber], { exact: true });
      },
    }
  );

  return updateStatusMutate;
};
