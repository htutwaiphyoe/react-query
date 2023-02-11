import { useQuery } from "react-query";

export function useUser(userId) {
  const userQuery = useQuery(["users", userId], () =>
    fetch(`/api/users/${userId}`).then((res) => res.json())
  );
  return userQuery;
}

export function useIssueList() {
  const issueListQuery = useQuery(["issues"], () =>
    fetch("/api/issues").then((res) => res.json())
  );
  return issueListQuery;
}
