export default function DashboardLayout({ primary, secondary }) {
  return (
    <div className="layout unit unit-template">
      <div className="layout-main">{primary}</div>
      <div className="layout-side">{secondary}</div>
    </div>
  );
}
