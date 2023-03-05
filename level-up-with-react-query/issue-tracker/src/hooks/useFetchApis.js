import { useQuery } from "react-query";
import fetchWithError from "../helpers/fetchWithError";

export function useUser(userId) {
  const userQuery = useQuery(
    ["users", userId],
    ({ signal }) => fetchWithError(`/api/users/${userId}`, { signal }),
    { staleTime: 1000 * 60 * 5, useErrorBoundary: false }
  );
  return userQuery;
}

export function useIssueList({ labels, status }) {
  const issueListQuery = useQuery(
    ["issues", { labels, status }],
    async ({ signal }) => {
      const labelQueryString = labels
        .map((label) => `labels[]=${label}`)
        .join("&");
      const statusQueryString = status ? `&status=${status}` : "";
      return fetchWithError(
        `/api/issues?${labelQueryString}${statusQueryString}`,
        { signal }
      );
    }
  );
  return issueListQuery;
}

export function useLabels() {
  const labelsQuery = useQuery(
    ["labels"],
    ({ signal }) => fetchWithError("/api/labels", { signal }),
    {
      staleTime: 1000 * 60 * 60,
    }
  );
  return labelsQuery;
}

export function useIssue(issueNo) {
  const issueQuery = useQuery(["issues", issueNo], ({ signal }) =>
    fetchWithError(`/api/issues/${issueNo}`, { signal })
  );
  return issueQuery;
}

export function useIssueComments(issueNo) {
  const issueCommentsQuery = useQuery(
    ["issues", issueNo, "comments"],
    ({ signal }) =>
      fetchWithError(`/api/issues/${issueNo}/comments`, { signal })
  );
  return issueCommentsQuery;
}

export function useSearchQuery(search) {
  const useSearchQuery = useQuery(
    ["issues", "search", search],
    ({ signal }) =>
      fetchWithError(`/api/search/issues?q=${search}`, { signal }),
    { enabled: !!search }
  );
  return useSearchQuery;
}
