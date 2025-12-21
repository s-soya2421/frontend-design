const initialsFromName = (name) => {
  if (!name) return "";
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

export default function Avatar({ name, tone = "mint" }) {
  return (
    <div className={`avatar avatar--${tone} unit unit-atom`} aria-label={name}>
      {initialsFromName(name)}
    </div>
  );
}
