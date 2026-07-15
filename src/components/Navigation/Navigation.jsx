import { CloseIcon } from "../icons/Icons";
import "./Navigation.css";

const DEFAULT_ITEMS = [
  { id: "blog", label: "Blog" },
  { id: "pricing", label: "Pricing" },
  { id: "about", label: "About Us" },
];

/**
 * Main navigation. Horizontal on desktop; slides in from the left on mobile.
 *
 * @param {object} props
 * @param {Array<{id:string,label:string}>} [props.items]
 * @param {string} props.activeId - Currently active item id.
 * @param {(id:string) => void} props.onSelect
 * @param {boolean} [props.open] - Mobile drawer open state.
 * @param {() => void} [props.onClose]
 * @param {{name:string,email:string,avatar?:string}} [props.user] - Shown in mobile drawer header.
 * @param {boolean} [props.showAccountItem] - Append "My Account" entry (mobile).
 */
function Navigation({
  items = DEFAULT_ITEMS,
  activeId,
  onSelect,
  open = false,
  onClose,
  user,
  showAccountItem = false,
}) {
  const allItems = showAccountItem
    ? [...items, { id: "account", label: "My Account" }]
    : items;

  const handleSelect = (id) => {
    onSelect?.(id);
    onClose?.();
  };

  return (
    <>
      {open && <div className="nav__overlay" onClick={onClose} />}
      <nav
        className={`nav ${open ? "nav--open" : ""}`}
        aria-label="Main navigation"
      >
        {user && (
          <div className="nav__drawer-head">
            <div className="nav__user">
              <img
                className="nav__avatar"
                src={user.avatar}
                alt=""
                aria-hidden="true"
              />
              <div>
                <p className="nav__user-name">{user.name}</p>
                <p className="nav__user-email">{user.email}</p>
              </div>
            </div>
            <button
              className="nav__close"
              onClick={onClose}
              aria-label="Close navigation"
            >
              <CloseIcon />
            </button>
          </div>
        )}
        <ul className="nav__list">
          {allItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className={`nav__link ${
                  activeId === item.id ? "nav__link--active" : ""
                }`}
                onClick={() => handleSelect(item.id)}
                aria-current={activeId === item.id ? "page" : undefined}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export default Navigation;
