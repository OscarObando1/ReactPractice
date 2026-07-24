import { useState } from "react";
import { Link } from "react-router-dom";
import { RegistrationForm, Button } from "@components";
import { PATHS } from "@/routes/paths";

const ROLES = [
  { id: "student", label: "Student" },
  { id: "trainer", label: "Trainer" },
];

/** Registration route with a role switch; reuses the shared RegistrationForm. */
function RegistrationPage() {
  const [role, setRole] = useState("student");

  return (
    <div className="auth-page auth-page--wide">
      <div className="role-tabs" role="tablist" aria-label="Registration role">
        {ROLES.map((option) => (
          <Button
            key={option.id}
            variant={role === option.id ? "prime" : "ghost"}
            size="sm"
            onClick={() => setRole(option.id)}
          >
            {option.label}
          </Button>
        ))}
      </div>

      <RegistrationForm
        role={role}
        image="https://picsum.photos/id/1005/300/400"
      />

      <p className="page-more">
        Already have a code?{" "}
        <Link className="page-link" to={PATHS.registrationVerification}>
          Verify your account
        </Link>
      </p>
    </div>
  );
}

export default RegistrationPage;
