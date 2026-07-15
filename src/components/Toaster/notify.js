import { toast } from "react-toastify";

/**
 * Thin wrapper around react-toastify so call sites don't depend on the lib
 * directly. Render <ToastContainer /> once near the app root (see App.jsx).
 */
export const notify = {
  success: (message, options) => toast.success(message, options),
  error: (message, options) => toast.error(message, options),
  info: (message, options) => toast.info(message, options),
  warning: (message, options) => toast.warning(message, options),
};

export default notify;
