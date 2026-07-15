import { useState } from "react";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import { UserIcon, LockIcon, EyeIcon, EyeOffIcon } from "../icons/Icons";
import "./LoginForm.css";

/**
 * Login form with not-empty validation and a loading state on submit.
 *
 * @param {object} props
 * @param {(credentials:{username:string,password:string}) => Promise<void>|void} [props.onSubmit]
 * @param {() => void} [props.onSignUp]
 */
function LoginForm({ onSubmit, onSignUp }) {
  const [values, setValues] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.username.trim()) next.username = "Username is required";
    if (!values.password.trim()) next.password = "Password is required";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    try {
      setLoading(true);
      // Simulate a network request when no handler is provided.
      await (onSubmit
        ? onSubmit(values)
        : new Promise((res) => setTimeout(res, 1200)));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit} noValidate>
      <header className="login-form__head">
        <h1 className="login-form__title">Sign In</h1>
        <p className="login-form__subtitle">Welcome back</p>
      </header>

      <TextField
        label="User name"
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder="Enter email"
        error={errors.username}
        iconLeft={<UserIcon />}
        autoComplete="username"
      />

      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={values.password}
        onChange={handleChange}
        placeholder="Enter password"
        error={errors.password}
        iconLeft={<LockIcon />}
        autoComplete="current-password"
        iconRight={
          <span
            role="button"
            tabIndex={0}
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") &&
              setShowPassword((v) => !v)
            }
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </span>
        }
      />

      <Button type="submit" variant="prime" fullWidth loading={loading}>
        {loading ? "Loading..." : "Sign In"}
      </Button>

      <div className="login-form__divider">or</div>

      <p className="login-form__signup">
        Don&apos;t have an account?{" "}
        <button type="button" className="login-form__link" onClick={onSignUp}>
          Sign up
        </button>
      </p>
    </form>
  );
}

export default LoginForm;
