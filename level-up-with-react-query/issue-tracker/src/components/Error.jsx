export default function Error({ error }) {
  return (
    <div className="error">
      {error.message || "An error occurred. Please try again."}
    </div>
  );
}
