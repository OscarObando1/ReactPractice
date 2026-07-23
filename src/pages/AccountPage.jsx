import { useState } from "react";
import { MyAccount } from "@components";
import notify from "@components/Toaster/notify";
import { PROFILE } from "@/data/demo";

/** Standalone account route, reached from the header/breadcrumb navigation. */
function AccountPage() {
  const [profile, setProfile] = useState(PROFILE);

  return (
    <MyAccount
      profile={profile}
      onSave={(next) => {
        setProfile(next);
        notify.success("Profile updated");
      }}
    />
  );
}

export default AccountPage;
