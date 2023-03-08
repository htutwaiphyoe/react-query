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
      return fetchWithError(`/api/issues/${issueNumber}`, {
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

export const useUpdateAssignee = (issueNumber) => {
  const queryClient = useQueryClient();

  const updateAssigneeMutate = useMutation(
    (assignee) => {
      return fetchWithError(`/api/issues/${issueNumber}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ assignee }),
      });
    },
    {
      onMutate: (assignee) => {
        const oldAssignee = queryClient.getQueryData([
          "issues",
          issueNumber,
        ]).assignee;

        queryClient.setQueryData(["issues", issueNumber], (data) => ({
          ...data,
          assignee,
        }));

        return () => {
          queryClient.setQueryData(["issues", issueNumber], (data) => ({
            ...data,
            assignee: oldAssignee,
          }));
        };
      },
      onError: (data, variables, rollback) => {
        rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries(["issues", issueNumber], { exact: true });
      },
    }
  );

  return updateAssigneeMutate;
};

export const useMutateIssueLabels = (issueNumber) => {
  const queryClient = useQueryClient();

  const issueLabelsMutate = useMutation(
    (labels) => {
      return fetchWithError(`/api/issues/${issueNumber}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ labels }),
      });
    },
    {
      onMutate: (labels) => {
        const oldLabels = queryClient.getQueryData([
          "issues",
          issueNumber,
        ]).labels;

        queryClient.setQueryData(["issues", issueNumber], (data) => ({
          ...data,
          labels,
        }));

        return () => {
          queryClient.setQueryData(["issues", issueNumber], (data) => ({
            ...data,
            labels: oldLabels,
          }));
        };
      },
      onError: (data, variables, rollback) => {
        rollback();
      },
      onSettled: () => {
        queryClient.invalidateQueries(["issues", issueNumber], { exact: true });
      },
    }
  );

  return issueLabelsMutate;
};
