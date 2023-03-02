import { useQuery } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

export function useUser(userId) {
  const userQuery = useQuery(
    ["users", userId],
    () => fetchWithError(`/api/users/${userId}`),
    { staleTime: 1000 * 60 * 5 }
  );
  return userQuery;
}

export function useIssueList({ labels, status }) {
  const issueListQuery = useQuery(
    ["issues", { labels, status }],
    async () => {
      const labelQueryString = labels
        .map((label) => `labels[]=${label}`)
        .join("&");
      const statusQueryString = status ? `&status=${status}` : "";
      return fetchWithError(
        `/api/issues?${labelQueryString}${statusQueryString}`
      );
    },
    { staleTime: 1000 * 60, useErrorBoundary: true }
  );
  return issueListQuery;
}

export function useLabels() {
  const labelsQuery = useQuery(
    ["labels"],
    () => fetchWithError("/api/labels"),
    {
      staleTime: 1000 * 60 * 60,
      useErrorBoundary: true,
    }
  );
  return labelsQuery;
}

export function useIssue(issueNo) {
  const issueQuery = useQuery(
    ["issues", issueNo],
    () => fetchWithError(`/api/issues/${issueNo}`),
    { useErrorBoundary: true }
  );
  return issueQuery;
}

export function useIssueComments(issueNo) {
  const issueCommentsQuery = useQuery(
    ["issues", issueNo, "comments"],
    () => fetchWithError(`/api/issues/${issueNo}/comments`),
    { useErrorBoundary: true }
  );
  return issueCommentsQuery;
}

export function useSearchQuery(search) {
  const useSearchQuery = useQuery(
    ["issues", "search", search],
    () => fetchWithError(`/api/search/issues?q=${search}`),
    { enabled: !!search, useErrorBoundary: true }
  );
  return useSearchQuery;
}
