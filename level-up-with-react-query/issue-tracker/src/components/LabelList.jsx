import { useLabels } from "../hooks/useFetchApis";
import Loader from "./Loader";

export default function LabelList({ labels, toggle }) {
  const labelsQuery = useLabels();

  return (
    <div className="labels">
      <h3>Labels</h3>
      {labelsQuery.isLoading ? (
        <Loader />
      ) : (
        <ul>
          {labelsQuery.data.map((label) => (
            <li key={label.id}>
              <button
                className={`label ${label.color} ${
                  labels.includes(label.id) ? "selected" : ""
                }`}
                onClick={() => toggle(label.id)}
              >
                {label.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
