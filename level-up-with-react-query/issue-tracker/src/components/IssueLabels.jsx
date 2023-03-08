import { useState } from "react";
import { GoGear } from "react-icons/go";
import { useLabels } from "../hooks/useFetchApis";
import { useMutateIssueLabels } from "../hooks/useMutateApis";

export default function IssueLabels({ labels, issueNumber }) {
  const labelsQuery = useLabels();
  const issueLabelsMutate = useMutateIssueLabels(issueNumber);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="issue-options">
      <div>
        <span>Labels</span>
        {labelsQuery.isLoading
          ? null
          : labels.map((label) => {
              const labelObj = labelsQuery.data.find(
                (queryLabel) => queryLabel.id === label
              );
              return (
                <span key={labelObj?.id} className={`label ${labelObj?.color}`}>
                  {labelObj?.name}
                </span>
              );
            })}
      </div>
      <GoGear
        onClick={() => !labelsQuery.isLoading && setMenuOpen((open) => !open)}
      />
      {menuOpen && (
        <div className="picker-menu labels">
          {labelsQuery.data?.map((label) => {
            const selected = labels.includes(label.id);
            return (
              <div
                key={label.id}
                className={selected ? "selected" : ""}
                onClick={() => {
                  const newLabels = labels.includes(label.id)
                    ? labels.filter(
                        (existingLabel) => existingLabel !== label.id
                      )
                    : [...labels, label.id];
                  issueLabelsMutate.mutate(newLabels);
                }}
              >
                <span
                  className="label-dot"
                  style={{ backgroundColor: label.color }}
                ></span>
                {label.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
