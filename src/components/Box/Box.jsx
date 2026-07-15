import "./Box.css";

/**
 * Card-style wrapper that brings shared styling to arbitrary content.
 * Can be used standalone or as a building block for other components.
 *
 * @param {object} props
 * @param {string} [props.image] - Optional cover image URL.
 * @param {string} [props.tag] - Small label above the title.
 * @param {string} [props.title] - Main title.
 * @param {string} [props.date] - Hardcoded/plain date string.
 * @param {string} [props.timeToRead] - e.g. "5 mins read".
 * @param {React.ReactNode} [props.children] - Extra content rendered below.
 */
function Box({ image, tag, title, date, timeToRead, children, className = "" }) {
  return (
    <article className={`box ${className}`.trim()}>
      {image && (
        <div className="box__media">
          <img src={image} alt={title || ""} loading="lazy" />
        </div>
      )}
      <div className="box__body">
        {tag && <span className="box__tag">{tag}</span>}
        {title && <h3 className="box__title">{title}</h3>}
        {children}
        {(date || timeToRead) && (
          <div className="box__meta">
            {date && <span className="box__date">{date}</span>}
            {timeToRead && <span className="box__read">{timeToRead}</span>}
          </div>
        )}
      </div>
    </article>
  );
}

export default Box;
