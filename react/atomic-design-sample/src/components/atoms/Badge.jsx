export default function Badge({ tone = "sand", className = "", children }) {
  const classes = `badge badge--${tone} unit unit-atom ${className}`.trim();

  return <span className={classes}>{children}</span>;
}
