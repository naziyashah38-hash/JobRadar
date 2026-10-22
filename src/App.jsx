import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "react-feather";
import Navbar from "./components/Navbar";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationCard from "./components/ApplicationCard";
import FilterBar from "./components/FilterBar";
import EmptyState from "./components/EmptyState";
import RadarChart from "./components/RadarChart";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [applications, setApplications] = useLocalStorage("jobradar-apps", []);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  const addApplication = (app) => {
    setApplications([...applications, { ...app, id: Date.now() }]);
  };

  const updateApplication = (id, updates) => {
    setApplications(
      applications.map((app) => (app.id === id ? { ...app, ...updates } : app))
    );
    setEditingApp(null);
    setIsFormOpen(false);
  };

  const deleteApplication = (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      setApplications(applications.filter((app) => app.id !== id));
    }
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setIsFormOpen(true);
  };

  const handleSubmit = (data) => {
    if (editingApp) {
      updateApplication(editingApp.id, data);
    } else {
      addApplication(data);
    }
  };

  // Filter logic
  const filteredApps = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  // Sort logic
  const sortedApps = [...filteredApps].sort((a, b) => {
    if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
    if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
    if (sortBy === "company-asc") return a.company.localeCompare(b.company);
    if (sortBy === "company-desc") return b.company.localeCompare(a.company);
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Navbar />
        <RadarChart applications={applications} />
        <FilterBar filter={filter} setFilter={setFilter} sortBy={sortBy} setSortBy={setSortBy} />

        {sortedApps.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              {sortedApps.map((app) => (
                <ApplicationCard
                  key={app.id}
                  app={app}
                  onUpdate={() => handleEdit(app)}
                  onDelete={() => deleteApplication(app.id)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}

        <ApplicationForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingApp(null);
          }}
          onSubmit={handleSubmit}
          initialData={editingApp}
        />

        {/* Floating Action Button */}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingApp(null);
            setIsFormOpen(true);
          }}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg flex items-center justify-center text-white hover:from-indigo-600 hover:to-purple-700 transition-all z-40"
        >
          <Plus className="w-7 h-7" />
        </motion.button>
      </div>
    </div>
  );
}