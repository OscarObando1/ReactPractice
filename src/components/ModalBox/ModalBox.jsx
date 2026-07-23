import { useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "../Button/Button";
import { CloseIcon } from "../icons/Icons";
import "./ModalBox.css";

/**
 * Confirmation modal-box rendered through a React portal and fully controlled
 * by the `isOpen` prop — React owns mount/unmount, so there are no library
 * import-time side effects and nothing to lose track of across updates.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onClose
 * @param {string} props.title
 * @param {React.ReactNode} props.children - Body content.
 * @param {string} [props.confirmLabel="Confirm"]
 * @param {string} [props.cancelLabel="Cancel"]
 * @param {"prime"|"secondary"|"important"|"ghost"} [props.confirmVariant="important"]
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
  // Close on Escape and lock body scroll while open. The effect keys off
  // `isOpen`, so subscription lifecycle tracks the modal's visibility exactly.
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", handleKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = overflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="modal-box__overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-box"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
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
          <Button variant="prime" className="modal-box__cancel" onClick={onClose}>
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
      </div>
    </div>,
    document.body
  );
}

export default ModalBox;
