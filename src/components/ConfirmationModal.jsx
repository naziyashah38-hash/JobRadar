import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "warning", // "warning", "success", "error"
}) {
  const icons = {
    warning: AlertTriangle,
    success: CheckCircle,
    error: AlertCircle,
  };
  const Icon = icons[type] || AlertTriangle;

  const colors = {
    warning: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300",
    success: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300",
    error: "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/50 dark:bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`glass rounded-xl p-6 w-full max-w-md shadow-xl ${colors[type]}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-4">
              <Icon className="w-6 h-6 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-50">
                  {title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  {message}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 ml-auto"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors font-medium"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={`px-4 py-2 rounded-lg text-white font-medium transition-colors ${
                  type === "warning"
                    ? "bg-amber-500 hover:bg-amber-600"
                    : type === "success"
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : "bg-rose-500 hover:bg-rose-600"
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}