import Button from "../Button/Button";
import "./JoinUsBox.css";

const DEFAULT_DESCRIPTION =
  "Do consectetur proident proident id eiusmod deserunt consequat pariatur ad ex velit do Lorem reprehenderit.";

/**
 * Promo box to select a registration flow (trainer / student).
 * Content is fully driven by props and reuses the shared Button.
 *
 * @param {object} props
 * @param {string} props.role - e.g. "Trainer" or "Student". Fills the title.
 * @param {string} [props.description] - Body text.
 * @param {string} [props.image] - Side image URL.
 * @param {string} [props.buttonLabel="Join us"]
 * @param {() => void} [props.onJoin] - Click handler for the button.
 */
function JoinUsBox({
  role = "Trainer",
  description = DEFAULT_DESCRIPTION,
  image,
  buttonLabel = "Join us",
  onJoin,
}) {
  return (
    <section className="join-box">
      <div className="join-box__content">
        <h2 className="join-box__title">Register as {role}</h2>
        <p className="join-box__desc">{description}</p>
        <Button variant="prime" size="md" onClick={onJoin}>
          {buttonLabel}
        </Button>
      </div>
      {image && (
        <div className="join-box__media">
          <img src={image} alt={`Register as ${role}`} loading="lazy" />
        </div>
      )}
    </section>
  );
}

export default JoinUsBox;
