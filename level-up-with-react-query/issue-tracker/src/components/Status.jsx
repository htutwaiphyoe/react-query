import { statuses } from "../helpers/constants";

export function Status({ value, onChange, noEmpty = false }) {
  return (
    <div>
      <h3>Status</h3>
      <select
        name="status"
        id="status"
        value={value}
        onChange={onChange}
        className="status-select"
      >
        {noEmpty && <option value="">Select a status to filter</option>}
        {statuses.map((item) => (
          <option value={item.id} key={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
