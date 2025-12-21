export default function StatCard({ label, value, note }) {
  return (
    <div className="stat-card unit unit-molecule">
      <span>{label}</span>
      <strong>{value}</strong>
      <em>{note}</em>
    </div>
  );
}
