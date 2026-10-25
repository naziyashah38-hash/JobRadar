import { motion } from "framer-motion";

const statusConfig = {
  applied: { color: "bg-indigo-500", pulse: true },
  interview: { color: "bg-amber-500", pulse: true },
  ghosted: { color: "bg-purple-500", pulse: false },   // NEW
  withdrawn: { color: "bg-gray-500", pulse: false }, // NEW
  rejected: { color: "bg-rose-500", pulse: false },
  offer: { color: "bg-emerald-500", pulse: false },
};

export default function StatusPulse({ status }) {
  const config = statusConfig[status] || { color: "bg-slate-500", pulse: false };

  return (
    <div className="flex items-center gap-2">
      <motion.div
        className={`w-2 h-2 rounded-full ${config.color}`}
        animate={config.pulse ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className="text-sm font-medium capitalize first-letter:uppercase">
        {status}
      </span>
    </div>
  );
}