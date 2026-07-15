import { ChevronRightIcon } from "../icons/Icons";
import "./Breadcrumbs.css";

/**
 * Breadcrumb trail showing the user's location. The last item is rendered as
 * the current (non-clickable) page.
 *
 * @param {object} props
 * @param {Array<{label:string, id?:string}>} props.items
 * @param {(id:string) => void} [props.onNavigate]
 */
function Breadcrumbs({ items = [], onNavigate }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.id ?? item.label} className="breadcrumbs__item">
              {isLast ? (
                <span className="breadcrumbs__current" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <>
                  <button
                    type="button"
                    className="breadcrumbs__link"
                    onClick={() => onNavigate?.(item.id)}
                  >
                    {item.label}
                  </button>
                  <ChevronRightIcon className="breadcrumbs__sep" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
