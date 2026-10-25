import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import Navbar from "./components/Navbar";
import ApplicationForm from "./components/ApplicationForm";
import ApplicationCard from "./components/ApplicationCard";
import FilterBar from "./components/FilterBar";
import EmptyState from "./components/EmptyState";
import RadarChart from "./components/RadarChart";
import ConfirmationModal from "./components/ConfirmationModal"; // NEW
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [applications, setApplications] = useLocalStorage("jobradar-apps", []);
  const [filter, setFilter] = useState("all");
  const [workModeFilter, setWorkModeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date-desc");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  // NEW: Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
   const [toast, setToast] = useState({ show: false, message: "", type: "" });

    useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 3000); // 3000ms = 3 seconds
      return () => clearTimeout(timer);
    }
  }, [toast.show]);


  const addApplication = (app) => {
    setApplications([...applications, { ...app, id: Date.now() }]);
    setToast({ show: true, message: "Application added successfully!", type: "success" });
    setIsFormOpen(false);
  };

  const updateApplication = (id, updates) => {
    setApplications(
      applications.map((app) => (app.id === id ? { ...app, ...updates } : app))
    );
    setToast({ show: true, message: "Application updated!", type: "success" });
    setEditingApp(null);
    setIsFormOpen(false);
  };

  const deleteApplication = (id) => {
    setConfirmMessage(`Are you sure you want to delete this application? This action cannot be undone.`);
    setConfirmAction(() => () => {
      setApplications(applications.filter((app) => app.id !== id));
      setToast({ show: true, message: "Application deleted.", type: "error" });
    });
    setShowConfirmModal(true);
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

  // Filter and sort logic (unchanged)
  const filteredApps = applications.filter((app) => {
    const statusMatch = filter === "all" || app.status === filter;
    const workModeMatch = workModeFilter === "all" || app.workMode === workModeFilter;
    return statusMatch && workModeMatch;
  });

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
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          workModeFilter={workModeFilter}
          setWorkModeFilter={setWorkModeFilter}
        />

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
          className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-emerald-700 transition-all z-40"
        >
          <Plus className="w-7 h-7" />
        </motion.button>

        {/* NEW: Confirmation Modal */}
        <ConfirmationModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => {
            confirmAction();
            setShowConfirmModal(false);
          }}
          title="Confirm Action"
          message={confirmMessage}
          type="warning"
        />

        {/* NEW: Toast Notification */}
      <AnimatePresence>
  {toast.show && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className={`fixed bottom-20 right-6 px-4 py-3 rounded-lg shadow-lg text-white font-medium z-50 ${
        toast.type === "success"
          ? "bg-emerald-500"
          : toast.type === "error"
          ? "bg-rose-500"
          : "bg-indigo-500"
      }`}
    >
      {toast.message}
    </motion.div>
  )}
</AnimatePresence>

      </div>
    </div>
  );
}