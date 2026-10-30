import { Filter, ArrowUpDown } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "ghosted", label: "Ghosted" }, 
  { value: "withdrawn", label: "Withdrawn" },
  { value: "rejected", label: "Rejected" },
  { value: "offer", label: "Offer" },
];

const WORK_MODE_OPTIONS = [
  { value: "all", label: "All Work Modes" },
  { value: "onsite", label: "Onsite" },
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
];

export default function FilterBar({
  filter,
  setFilter,
  sortBy,
  setSortBy,
  workModeFilter,
  setWorkModeFilter,
}) {
  return (
    <div className="glass rounded-xl p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Filter className="w-5 h-5 text-indigo-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full rounded-lg bg-slate-100 p-3 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3 flex-1">
          <ArrowUpDown className="w-5 h-5 text-indigo-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-3"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="company-asc">Company (A-Z)</option>
            <option value="company-desc">Company (Z-A)</option>
          </select>
        </div>
        <div className="flex items-center gap-2 flex-1">
          <span className="w-5 h-5 text-indigo-500">🏢</span>
          <select
            value={workModeFilter}
            onChange={(e) => setWorkModeFilter(e.target.value)}
            className="w-full rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-3"
          >
            {WORK_MODE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}