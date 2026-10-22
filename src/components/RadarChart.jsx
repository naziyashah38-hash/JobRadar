import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RadarChart({ applications }) {
  const statusCounts = {
    applied: applications.filter((app) => app.status === "applied").length,
    interview: applications.filter((app) => app.status === "interview").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
    offer: applications.filter((app) => app.status === "offer").length,
  };

  const total = Object.values(statusCounts).reduce((a, b) => a + b, 0);

  const data = {
    labels: ["Applied", "Interview", "Rejected", "Offer"],
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: [
          "#6366f1", // indigo-500
          "#f59e0b", // amber-500
          "#ef4444", // rose-500
          "#10b981", // emerald-500
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          usePointStyle: true,
          font: { size: 12 },
          color: "#64748b", // slate-500
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw || 0;
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: "70%",
  };

  if (total === 0) return null;

  return (
    <div className="glass rounded-xl p-6 mb-6">
      <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-50 mb-4">
        Application Status
      </h2>
      <div className="h-48">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}