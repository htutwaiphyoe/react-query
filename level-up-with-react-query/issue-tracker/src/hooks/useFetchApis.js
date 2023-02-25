import { useQuery } from "react-query";

export function useUser(userId) {
  const userQuery = useQuery(["users", userId], () =>
    fetch(`/api/users/${userId}`).then((res) => res.json())
  );
  return userQuery;
}

export function useIssueList({ labels, status }) {
  const issueListQuery = useQuery(["issues", { labels, status }], async () => {
    const labelQueryString = labels
      .map((label) => `labels[]=${label}`)
      .join("&");
    const statusQueryString = status ? `&status=${status}` : "";

    return fetch(`/api/issues?${labelQueryString}${statusQueryString}`).then(
      (res) => res.json()
    );
  });
  return issueListQuery;
}

export function useLabels() {
  const labelsQuery = useQuery(["labels"], () =>
    fetch("/api/labels").then((res) => res.json())
  );
  return labelsQuery;
}

export function useIssue(issueNo) {
  const issueQuery = useQuery(["issues", issueNo], () =>
    fetch(`/api/issues/${issueNo}`).then((res) => res.json())
  );
  return issueQuery;
}

export function useIssueComments(issueNo) {
  const issueCommentsQuery = useQuery(["issues", issueNo, "comments"], () =>
    fetch(`/api/issues/${issueNo}/comments`).then((res) => res.json())
  );
  return issueCommentsQuery;
}

export function useSearchQuery(search) {
  const useSearchQuery = useQuery(
    ["issues", "search", search],
    () => fetch(`/api/search/issues?q=${search}`).then((res) => res.json()),
    { enabled: !!search }
  );
  return useSearchQuery;
}
