export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  children,
  ...props
}) {
  const classes = `btn btn--${variant} btn--${size} unit unit-atom ${className}`.trim();

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
