import { Filter, ArrowUpDown } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "applied", label: "Applied" },
  { value: "interview", label: "Interview" },
  { value: "rejected", label: "Rejected" },
  { value: "offer", label: "Offer" },
];

const SORT_OPTIONS = [
  { value: "date-desc", label: "Newest First" },
  { value: "date-asc", label: "Oldest First" },
  { value: "company-asc", label: "Company (A-Z)" },
  { value: "company-desc", label: "Company (Z-A)" },
];

export default function FilterBar({ filter, setFilter, sortBy, setSortBy }) {
  return (
    <div className="glass rounded-xl p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex items-center gap-2 flex-1">
          <Filter className="w-5 h-5 text-indigo-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2 flex-1">
          <ArrowUpDown className="w-5 h-5 text-indigo-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {SORT_OPTIONS.map((opt) => (
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