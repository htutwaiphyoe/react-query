import { useLabels } from "../hooks/useFetchApis";

export default function Label({ label }) {
  const labelsQuery = useLabels();

  if (labelsQuery.isLoading) return null;

  const labelObj = labelsQuery.data.find(
    (queryLabel) => queryLabel.id === label
  );

  return labelObj ? (
    <span className={`label ${labelObj.color}`}>{labelObj.name}</span>
  ) : null;
}
