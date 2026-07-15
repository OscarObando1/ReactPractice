import { useState } from "react";
import Button from "../Button/Button";
import Navigation from "../Navigation/Navigation";
import MiniProfile from "../MiniProfile/MiniProfile";
import { LogoIcon, MenuIcon } from "../icons/Icons";
import "./Header.css";

/**
 * Application header: logo, main navigation and auth actions.
 * Unauthorized users see "Sign In" / "Join Us"; authorized users see their
 * avatar, which opens the MiniProfile dropdown.
 *
 * @param {object} props
 * @param {boolean} [props.authenticated]
 * @param {object} [props.user] - {name,email,avatar}
 * @param {string} props.activeId
 * @param {(id:string) => void} props.onNavigate
 * @param {() => void} [props.onSignIn]
 * @param {() => void} [props.onJoinUs]
 * @param {() => void} [props.onSignOut]
 * @param {boolean} [props.nightMode]
 * @param {(v:boolean) => void} [props.onToggleNight]
 */
function Header({
  authenticated = false,
  user,
  activeId,
  onNavigate,
  onSignIn,
  onJoinUs,
  onSignOut,
  nightMode,
  onToggleNight,
}) {
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <button
          className="header__burger"
          aria-label="Open navigation"
          onClick={() => setNavOpen(true)}
        >
          <MenuIcon />
        </button>

        <a
          className="header__logo"
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.("home");
          }}
        >
          <LogoIcon className="header__logo-icon" />
          <span>learn</span>
        </a>

        <div className="header__nav">
          <Navigation
            activeId={activeId}
            onSelect={onNavigate}
            open={navOpen}
            onClose={() => setNavOpen(false)}
            user={authenticated ? user : undefined}
            showAccountItem={authenticated}
          />
        </div>

        <div className="header__actions">
          {authenticated && user ? (
            <div className="header__profile">
              <button
                className="header__avatar-btn"
                aria-label="Open profile menu"
                aria-expanded={profileOpen}
                onClick={() => setProfileOpen((v) => !v)}
              >
                <img src={user.avatar} alt="" />
              </button>
              <MiniProfile
                user={user}
                open={profileOpen}
                onClose={() => setProfileOpen(false)}
                onMyAccount={() => onNavigate?.("account")}
                onSignOut={onSignOut}
                nightMode={nightMode}
                onToggleNight={onToggleNight}
              />
            </div>
          ) : (
            <>
              <Button
                variant="prime"
                size="sm"
                className="header__signin"
                onClick={onSignIn}
                style={{
                  background: "transparent",
                  color: "var(--color-text)",
                }}
              >
                Sign in
              </Button>
              <Button variant="prime" size="sm" onClick={onJoinUs}>
                Join us
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
