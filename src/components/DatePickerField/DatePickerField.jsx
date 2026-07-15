import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "../icons/Icons";
import "./DatePickerField.css";

/**
 * Thin wrapper around `react-datepicker` that matches the app's field styling.
 *
 * @param {object} props
 * @param {string} [props.label]
 * @param {Date|null} props.selected
 * @param {(date:Date|null) => void} props.onChange
 * @param {string} [props.placeholder="Select a date"]
 * @param {string} [props.error]
 * @param {boolean} [props.required]
 */
function DatePickerField({
  label,
  selected,
  onChange,
  placeholder = "Select a date",
  error,
  required = false,
}) {
  const hasError = Boolean(error);
  return (
    <div className={`field ${hasError ? "field--error" : ""} datepicker-field`}>
      {label && (
        <label className="field__label">
          {label}
          {required && <span className="field__required"> *</span>}
        </label>
      )}
      <div className="field__control">
        <span className="field__icon field__icon--left">
          <CalendarIcon />
        </span>
        <DatePicker
          selected={selected}
          onChange={onChange}
          placeholderText={placeholder}
          dateFormat="dd MMM yyyy"
          showPopperArrow={false}
          className="field__input"
          wrapperClassName="datepicker-field__wrapper"
        />
      </div>
      {hasError && <p className="field__error">{error}</p>}
    </div>
  );
}

export default DatePickerField;
