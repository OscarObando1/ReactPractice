import { useEffect, useRef } from "react";
import { AccountIcon, MoonIcon, SignOutIcon } from "../icons/Icons";
import "./UserMenu.css";

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
function UserMenu({
  user,
  open,
  onClose,
  onMyAccount,
  onSignOut,
  nightMode = false,
  onToggleNight,
}) {
  const ref = useRef(null);
  // Keep the latest onClose in a ref so the outside-click/escape effect only
  // re-subscribes when `open` changes, not on every parent re-render that
  // hands us a new onClose identity.
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return undefined;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onCloseRef.current?.();
    };
    const handleKey = (e) => e.key === "Escape" && onCloseRef.current?.();
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="user-menu" ref={ref} role="menu">
      <header className="user-menu__head">
        <img
          className="user-menu__avatar"
          src={user.avatar}
          alt={`${user.name} avatar`}
        />
        <div className="user-menu__id">
          <p className="user-menu__name">{user.name}</p>
          <p className="user-menu__email">{user.email}</p>
        </div>
      </header>

      <button
        className="user-menu__item"
        role="menuitem"
        onClick={() => {
          onMyAccount?.();
          onClose?.();
        }}
      >
        <AccountIcon className="user-menu__icon" />
        <span>My Account</span>
      </button>

      <div className="user-menu__item user-menu__item--static">
        <MoonIcon className="user-menu__icon" />
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
        className="user-menu__item user-menu__item--danger"
        role="menuitem"
        onClick={() => {
          onSignOut?.();
          onClose?.();
        }}
      >
        <SignOutIcon className="user-menu__icon" />
        <span>Sign out</span>
      </button>
    </div>
  );
}

export default UserMenu;
