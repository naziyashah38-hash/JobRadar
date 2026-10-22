import { Search } from "react-feather";
import { motion } from "framer-motion";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12 px-4"
    >
      <div className="mx-auto w-24 h-24 bg-indigo-50 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
        <Search className="w-12 h-12 text-indigo-500 dark:text-indigo-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">
        No applications yet
      </h3>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
        Start tracking your job applications to stay organized. Click the "+" button to add your first one.
      </p>
    </motion.div>
  );
}