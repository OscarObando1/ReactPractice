import "./Button.css";

/**
 * Reusable Button component.
 *
 * @param {object} props
 * @param {"prime"|"secondary"|"important"} [props.variant="prime"] - Visual style.
 * @param {"sm"|"md"|"lg"} [props.size="md"] - Button size.
 * @param {React.ReactNode} [props.icon] - Optional leading icon.
 * @param {React.ReactNode} [props.iconRight] - Optional trailing icon.
 * @param {boolean} [props.fullWidth] - Stretch to container width.
 * @param {boolean} [props.loading] - Show spinner and disable interaction.
 * @param {boolean} [props.disabled] - Disable the button.
 * @param {"button"|"submit"|"reset"} [props.type="button"] - Native button type.
 * @param {React.ReactNode} props.children - Button label.
 */
function Button({
  variant = "prime",
  size = "md",
  icon,
  iconRight,
  fullWidth = false,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "btn",
    `btn--${variant}`,
    `btn--${size}`,
    fullWidth ? "btn--full" : "",
    loading ? "btn--loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="btn__spinner" aria-hidden="true" />}
      {!loading && icon && <span className="btn__icon">{icon}</span>}
      <span className="btn__label">{children}</span>
      {!loading && iconRight && <span className="btn__icon">{iconRight}</span>}
    </button>
  );
}

export default Button;
