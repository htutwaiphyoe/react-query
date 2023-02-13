import { status } from "../helpers/constants";

export function Status({ value, onChange }) {
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
        <option value="">Select a status to filter</option>
        {status.map((item) => (
          <option value={item.id} key={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
