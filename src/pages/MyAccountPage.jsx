import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MyAccount, Button } from "@components";
import notify from "@components/Toaster/notify";
import { PROFILE } from "@/data/demo";
import { PATHS } from "@/routes/paths";

/** Private account route (guarded). Shows and edits the current profile. */
function MyAccountPage() {
  const [profile, setProfile] = useState(PROFILE);
  const navigate = useNavigate();

  return (
    <div className="account-page">
      <MyAccount
        profile={profile}
        onSave={(next) => {
          setProfile(next);
          notify.success("Profile updated");
        }}
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(PATHS.changePassword)}
      >
        Change password
      </Button>
    </div>
  );
}

export default MyAccountPage;
