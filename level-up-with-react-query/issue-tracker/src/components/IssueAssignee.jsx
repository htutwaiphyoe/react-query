import { useUser } from "../hooks/useFetchApis";
import { GoGear } from "react-icons/go";
import { useState } from "react";
import { useUsers } from "../hooks/useFetchApis";
import { useUpdateAssignee } from "../hooks/useMutateApis";

export default function IssueAssignee({ issueNumber, assignee }) {
  const userQuery = useUser(assignee);
  const usersQuery = useUsers();
  const updateAssigneeMutate = useUpdateAssignee(issueNumber);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="issue-options">
      <div>
        <span>Assignee</span>
        {userQuery.isSuccess && (
          <div>
            <img
              src={userQuery.data.profilePictureUrl}
              alt={userQuery.data.name}
            />
            {userQuery.data.name}
          </div>
        )}
      </div>
      <GoGear
        onClick={() => !usersQuery.isLoading && setMenuOpen((open) => !open)}
      />
      {menuOpen && (
        <div className="picker-menu">
          {usersQuery.data?.map((user) => (
            <div
              key={user.id}
              onClick={() => updateAssigneeMutate.mutate(user.id)}
            >
              <img src={user.profilePictureUrl} alt={user.name} />
              {user.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
