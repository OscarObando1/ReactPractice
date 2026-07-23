import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Navigation from "../Navigation/Navigation";
import UserMenu from "../UserMenu/UserMenu";
import { LogoIcon, MenuIcon } from "../icons/Icons";
import "./Header.css";

/**
 * Application header: logo, main navigation and auth actions.
 * Unauthorized users see "Sign In" / "Join Us"; authorized users see their
 * avatar, which opens the UserMenu dropdown.
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

  // Close the mobile drawer when the viewport crosses into desktop width.
  // Listening to the breakpoint (not every resize event) keeps this free of
  // per-pixel side effects and avoids a lingering overlay after resizing.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 600px)");
    const handleChange = (e) => {
      if (e.matches) setNavOpen(false);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

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

        <Link className="header__logo" to="/">
          <LogoIcon className="header__logo-icon" />
          <span>learn</span>
        </Link>

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
              <UserMenu
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
              <Button variant="ghost" size="sm" onClick={onSignIn}>
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
