import { useState, useEffect } from "react";
import { Moon, Sun, Target } from "react-feather";
import { motion } from "framer-motion";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-between items-center mb-8"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <Target className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            JobRadar
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track your job applications
          </p>
        </div>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-amber-500" />
        ) : (
          <Moon className="w-5 h-5 text-slate-600" />
        )}
      </button>
    </motion.nav>
  );
}