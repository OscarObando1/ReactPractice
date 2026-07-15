import { useEffect, useRef } from "react";
import { AccountIcon, MoonIcon, SignOutIcon } from "../icons/Icons";
import "./MiniProfile.css";

/**
 * Dropdown revealed by clicking the header avatar. Offers quick access to
 * "My Account", an optional Night mode toggle, and "Sign out".
 *
 * @param {object} props
 * @param {{name:string,email:string,avatar?:string}} props.user
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {() => void} [props.onMyAccount]
 * @param {() => void} [props.onSignOut]
 * @param {boolean} [props.nightMode]
 * @param {(value:boolean) => void} [props.onToggleNight]
 */
function MiniProfile({
  user,
  open,
  onClose,
  onMyAccount,
  onSignOut,
  nightMode = false,
  onToggleNight,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose?.();
    };
    const handleKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="mini-profile" ref={ref} role="menu">
      <header className="mini-profile__head">
        <img className="mini-profile__avatar" src={user.avatar} alt="" />
        <div className="mini-profile__id">
          <p className="mini-profile__name">{user.name}</p>
          <p className="mini-profile__email">{user.email}</p>
        </div>
      </header>

      <button
        className="mini-profile__item"
        role="menuitem"
        onClick={() => {
          onMyAccount?.();
          onClose?.();
        }}
      >
        <AccountIcon className="mini-profile__icon" />
        <span>My Account</span>
      </button>

      <div className="mini-profile__item mini-profile__item--static">
        <MoonIcon className="mini-profile__icon" />
        <span>Night mode</span>
        <label className="toggle">
          <input
            type="checkbox"
            checked={nightMode}
            onChange={(e) => onToggleNight?.(e.target.checked)}
          />
          <span className="toggle__track" />
        </label>
      </div>

      <button
        className="mini-profile__item mini-profile__item--danger"
        role="menuitem"
        onClick={() => {
          onSignOut?.();
          onClose?.();
        }}
      >
        <SignOutIcon className="mini-profile__icon" />
        <span>Sign out</span>
      </button>
    </div>
  );
}

export default MiniProfile;
