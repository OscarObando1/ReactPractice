import "./TextField.css";

/**
 * Reusable labeled input with error state and optional adornments.
 *
 * @param {object} props
 * @param {string} props.label
 * @param {string} [props.name]
 * @param {string} [props.type="text"]
 * @param {string} [props.value]
 * @param {(e) => void} [props.onChange]
 * @param {string} [props.placeholder]
 * @param {string} [props.error] - Error message; also toggles error styling.
 * @param {boolean} [props.required]
 * @param {React.ReactNode} [props.iconLeft]
 * @param {React.ReactNode} [props.iconRight]
 */
function TextField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  iconLeft,
  iconRight,
  ...rest
}) {
  const hasError = Boolean(error);
  return (
    <div className={`field ${hasError ? "field--error" : ""}`}>
      {label && (
        <label className="field__label" htmlFor={name}>
          {label}
          {required && <span className="field__required"> *</span>}
        </label>
      )}
      <div className="field__control">
        {iconLeft && <span className="field__icon field__icon--left">{iconLeft}</span>}
        <input
          id={name}
          name={name}
          type={type}
          className="field__input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={hasError || undefined}
          {...rest}
        />
        {iconRight && (
          <span className="field__icon field__icon--right">{iconRight}</span>
        )}
      </div>
      {hasError && <p className="field__error">{error}</p>}
    </div>
  );
}

export default TextField;
