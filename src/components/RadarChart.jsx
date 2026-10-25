import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function RadarChart({ applications }) {
  // Define status order EXPLICITLY to ensure color matching
  const statusOrder = ["applied", "interview", "ghosted", "withdrawn", "rejected", "offer"];
  const statusLabels = ["Applied", "Interview", "Ghosted", "Withdrawn", "Rejected", "Offer"];
  const statusColors = ["#6366f1", "#f59e0b", "#64748b", "#9ca3af", "#ef4444", "#10b981"];

  // Count applications per status (in the SAME order as statusOrder)
  const statusCounts = statusOrder.map(status =>
    applications.filter(app => app.status === status).length
  );

  const total = statusCounts.reduce((a, b) => a + b, 0);

  const data = {
    labels: statusLabels,
    datasets: [
      {
        data: statusCounts,
        backgroundColor: statusColors, // Colors match the order of statusCounts
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
          color: "#64748b",
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

  // Hide chart if no applications
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