import { motion } from "framer-motion";
import { Edit2, Trash2, ExternalLink } from "react-feather";
import StatusPulse from "./StatusPulse";

export default function ApplicationCard({ app, onUpdate, onDelete, statusOptions }) {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      applied: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300",
      interview: "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300",
      rejected: "bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-300",
      offer: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300",
    };
    return colors[status] || "bg-slate-100 dark:bg-slate-800";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className={`glass rounded-xl p-5 card-hover ${getStatusColor(app.status)}`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-50">
            {app.role}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            {app.company}
          </p>
        </div>
        <StatusPulse status={app.status} />
      </div>

      <div className="flex flex-wrap gap-3 mb-3 text-sm">
        <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatDate(app.date)}
        </span>
        {app.link && (
          <a
            href={app.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            <ExternalLink className="w-4 h-4" />
            Job Post
          </a>
        )}
      </div>

      {app.notes && (
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
          {app.notes}
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => onUpdate(app.id)}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"
        >
          <Edit2 className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => onDelete(app.id)}
          className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20 rounded-lg hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}