import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@components";
import { LockIcon } from "@components/icons/Icons";
import notify from "@components/Toaster/notify";
import { PATHS } from "@/routes/paths";

const INITIAL_VALUES = { current: "", next: "", confirm: "" };
const MIN_LENGTH = 8;

/** Private route (guarded): change the current user's password. */
function ChangePasswordPage() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!values.current.trim()) next.current = "Current password is required";
    if (values.next.length < MIN_LENGTH)
      next.next = `Use at least ${MIN_LENGTH} characters`;
    if (values.confirm !== values.next)
      next.confirm = "Passwords do not match";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    await new Promise((res) => setTimeout(res, 700));
    setLoading(false);
    notify.success("Password updated");
    navigate(PATHS.myAccount);
  };

  return (
    <div className="auth-page">
      <form className="stack-form" onSubmit={handleSubmit} noValidate>
        <header className="page-head">
          <h1 className="page-head__title">Change password</h1>
        </header>

        <TextField
          label="Current password"
          name="current"
          type="password"
          value={values.current}
          onChange={handleChange}
          error={errors.current}
          iconLeft={<LockIcon />}
          autoComplete="current-password"
        />
        <TextField
          label="New password"
          name="next"
          type="password"
          value={values.next}
          onChange={handleChange}
          error={errors.next}
          iconLeft={<LockIcon />}
          autoComplete="new-password"
        />
        <TextField
          label="Confirm new password"
          name="confirm"
          type="password"
          value={values.confirm}
          onChange={handleChange}
          error={errors.confirm}
          iconLeft={<LockIcon />}
          autoComplete="new-password"
        />

        <Button type="submit" variant="prime" fullWidth loading={loading}>
          {loading ? "Saving..." : "Update password"}
        </Button>
      </form>
    </div>
  );
}

export default ChangePasswordPage;
