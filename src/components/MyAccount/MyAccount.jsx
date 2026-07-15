import { useState } from "react";
import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import { CheckCircleIcon } from "../icons/Icons";
import "./MyAccount.css";

const FIELDS = [
  { name: "firstName", label: "First Name" },
  { name: "lastName", label: "Last Name" },
  { name: "userName", label: "User Name" },
  { name: "dateOfBirth", label: "Date of birth" },
  { name: "address", label: "Address" },
  { name: "email", label: "Email" },
];

/**
 * Personal dashboard. Shows current details and lets the user switch to
 * "Edit Profile" mode to update them.
 *
 * @param {object} props
 * @param {object} props.profile - Current profile data (see FIELDS keys + avatar/active).
 * @param {(profile:object) => void} [props.onSave]
 */
function MyAccount({ profile, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(profile);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraft((d) => ({ ...d, [name]: value }));
  };

  const startEdit = () => {
    setDraft(profile);
    setEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSave?.(draft);
    setEditing(false);
  };

  if (editing) {
    return (
      <form className="account account--edit" onSubmit={handleSave}>
        <h2 className="account__title">Edit profile</h2>

        <div className="account__photo">
          <img src={draft.avatar} alt="" className="account__avatar" />
          <div>
            <p className="account__photo-label">Upload your photo</p>
            <p className="account__photo-hint">
              Your photo should be in PNG or JPG format
            </p>
            <div className="account__photo-actions">
              <Button type="button" variant="prime" size="sm">
                Choose image
              </Button>
              <button type="button" className="account__remove">
                Remove
              </button>
            </div>
          </div>
        </div>

        {FIELDS.map((f) => (
          <TextField
            key={f.name}
            label={f.label}
            name={f.name}
            value={draft[f.name] ?? ""}
            onChange={handleChange}
          />
        ))}

        <label className="account__active">
          <span>Active</span>
          <span className="toggle">
            <input
              type="checkbox"
              checked={Boolean(draft.active)}
              onChange={(e) =>
                setDraft((d) => ({ ...d, active: e.target.checked }))
              }
            />
            <span className="toggle__track" />
          </span>
        </label>

        <div className="account__actions">
          <Button type="submit" variant="prime">
            Save changes
          </Button>
          <Button
            type="button"
            variant="prime"
            className="account__cancel"
            onClick={() => setEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  return (
    <section className="account">
      <header className="account__head">
        <h2 className="account__title">My profile</h2>
        <div className="account__status">
          <span className="account__status-label">Status</span>
          <span
            className={`account__badge ${
              profile.active ? "account__badge--active" : ""
            }`}
          >
            <CheckCircleIcon /> {profile.active ? "Active" : "Inactive"}
          </span>
        </div>
      </header>

      <img src={profile.avatar} alt="" className="account__avatar" />

      <dl className="account__list">
        {FIELDS.map((f) => (
          <div className="account__row" key={f.name}>
            <dt>{f.label}</dt>
            <dd>{profile[f.name] || "—"}</dd>
          </div>
        ))}
      </dl>

      <Button variant="prime" onClick={startEdit}>
        Edit profile
      </Button>
    </section>
  );
}

export default MyAccount;
