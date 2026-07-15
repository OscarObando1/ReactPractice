import Modal from "react-modal";
import Button from "../Button/Button";
import { CloseIcon } from "../icons/Icons";
import "./ModalBox.css";

// Point react-modal at the app root for accessibility (aria-hidden handling).
if (typeof document !== "undefined") {
  Modal.setAppElement("#root");
}

/**
 * Confirmation modal-box built on `react-modal`.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {string} props.title
 * @param {React.ReactNode} props.children - Body content.
 * @param {string} [props.confirmLabel="Confirm"]
 * @param {string} [props.cancelLabel="Cancel"]
 * @param {"prime"|"secondary"|"important"} [props.confirmVariant="important"]
 * @param {() => void} [props.onConfirm]
 */
function ModalBox({
  isOpen,
  onClose,
  title,
  children,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  confirmVariant = "important",
  onConfirm,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal-box"
      overlayClassName="modal-box__overlay"
      contentLabel={title}
    >
      <div className="modal-box__head">
        <h3 className="modal-box__title">{title}</h3>
        <button
          className="modal-box__close"
          onClick={onClose}
          aria-label="Close"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="modal-box__body">{children}</div>

      <div className="modal-box__footer">
        <Button
          variant="prime"
          className="modal-box__cancel"
          onClick={onClose}
        >
          {cancelLabel}
        </Button>
        <Button
          variant={confirmVariant}
          onClick={() => {
            onConfirm?.();
            onClose?.();
          }}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}

export default ModalBox;
