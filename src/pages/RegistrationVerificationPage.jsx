import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@components";
import notify from "@components/Toaster/notify";
import { PATHS } from "@/routes/paths";

const CODE_LENGTH = 6;

/** Post-registration route: confirm the account with an emailed code. */
function RegistrationVerificationPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCode(e.target.value);
    if (error) setError(undefined);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.trim().length !== CODE_LENGTH) {
      setError(`Enter the ${CODE_LENGTH}-digit code`);
      return;
    }
    setLoading(true);
    await new Promise((res) => setTimeout(res, 700));
    setLoading(false);
    notify.success("Account verified — you can sign in now");
    navigate(PATHS.login);
  };

  return (
    <div className="auth-page">
      <form className="stack-form" onSubmit={handleSubmit} noValidate>
        <header className="page-head">
          <h1 className="page-head__title">Verify your account</h1>
          <p className="page-head__subtitle">
            We sent a {CODE_LENGTH}-digit code to your email. Enter it below to
            activate your account.
          </p>
        </header>

        <TextField
          label="Verification code"
          name="code"
          value={code}
          onChange={handleChange}
          placeholder="123456"
          error={error}
          inputMode="numeric"
          maxLength={CODE_LENGTH}
          autoComplete="one-time-code"
        />

        <Button type="submit" variant="prime" fullWidth loading={loading}>
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </form>
    </div>
  );
}

export default RegistrationVerificationPage;
