import { useState } from "react";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import DatePickerField from "../DatePickerField/DatePickerField";
import "./RegistrationForm.css";

const SPECIALIZATIONS = [
  "Frontend Development",
  "Backend Development",
  "UX/UI Design",
  "Data Science",
  "DevOps",
];

/** Generate throwaway credentials to mimic a successful API response. */
function generateCredentials(firstName = "user") {
  const base = firstName.toLowerCase().replace(/[^a-z0-9]/g, "") || "user";
  const suffix = Math.floor(1000 + Math.random() * 9000);
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const password = Array.from(
    { length: 10 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return { username: `${base}_${suffix}`, password };
}

/**
 * Role-based registration form. Fields adapt to the selected role.
 * On success it reveals generated username + password.
 *
 * @param {object} props
 * @param {"student"|"trainer"} [props.role="student"]
 * @param {string} [props.image] - Optional side illustration.
 * @param {(data:object) => Promise<object>|object} [props.onSubmit]
 */
function RegistrationForm({ role = "student", image, onSubmit }) {
  const isTrainer = role === "trainer";
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    dob: null,
    address: "",
    specialization: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(null);

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const handleChange = (e) => setField(e.target.name, e.target.value);

  const validate = () => {
    const next = {};
    if (!values.firstName.trim()) next.firstName = "First name is required";
    if (!values.lastName.trim()) next.lastName = "Last name is required";
    if (isTrainer && !values.specialization)
      next.specialization = "Specialization is required";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setLoading(true);
      const result = onSubmit
        ? await onSubmit({ role, ...values })
        : await new Promise((res) =>
            setTimeout(() => res(generateCredentials(values.firstName)), 1000)
          );
      setCredentials(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="registration">
      {image && (
        <div className="registration__media">
          <img src={image} alt="" />
        </div>
      )}

      <div className="registration__panel">
        <header className="registration__head">
          <h2 className="registration__title">Registration</h2>
          <span className="registration__role">
            {isTrainer ? "Trainer" : "Student"}
          </span>
        </header>

        {credentials ? (
          <div className="registration__success">
            <h3>Account created 🎉</h3>
            <p className="registration__success-note">
              Use these credentials to sign in next time.
            </p>
            <div className="registration__cred">
              <span className="registration__cred-label">Username</span>
              <code>{credentials.username}</code>
            </div>
            <div className="registration__cred">
              <span className="registration__cred-label">Password</span>
              <code>{credentials.password}</code>
            </div>
          </div>
        ) : (
          <form className="registration__form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="First name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              placeholder="Text..."
              error={errors.firstName}
              required
            />
            <TextField
              label="Last name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              placeholder="Input text"
              error={errors.lastName}
              required
            />

            {isTrainer ? (
              <div className={`field ${errors.specialization ? "field--error" : ""}`}>
                <label className="field__label" htmlFor="specialization">
                  Specialization<span className="field__required"> *</span>
                </label>
                <div className="field__control">
                  <select
                    id="specialization"
                    name="specialization"
                    className="field__input"
                    value={values.specialization}
                    onChange={handleChange}
                  >
                    <option value="">Please select</option>
                    {SPECIALIZATIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.specialization && (
                  <p className="field__error">{errors.specialization}</p>
                )}
              </div>
            ) : (
              <>
                <DatePickerField
                  label="Date of birth"
                  selected={values.dob}
                  onChange={(date) => setField("dob", date)}
                  placeholder="Optional"
                />
                <TextField
                  label="Address"
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  placeholder="Optional"
                />
              </>
            )}

            <Button type="submit" variant="prime" fullWidth loading={loading}>
              {loading ? "Loading..." : "Submit"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

export default RegistrationForm;
