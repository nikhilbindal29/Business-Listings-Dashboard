import { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function SourceChart() {
  const [sourceData, setSourceData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/source-count")
      .then((res) => {
        const topSources = res.data
          .filter(
            (item) =>
              item.source &&
              item.source.trim() !== "" &&
              item.source.toLowerCase() !== "nan"
          )
          .sort((a, b) => b.total - a.total)
          .slice(0, 10);

        setSourceData(topSources);
      })
      .catch((err) => console.log(err));
  }, []);

  const colors = [
    "#1D4ED8",
    "#2563EB",
    "#3B82F6",
    "#60A5FA",
    "#93C5FD",
    "#BFDBFE",
    "#DBEAFE",
    "#C7D2FE",
    "#818CF8",
    "#4F46E5",
  ];

  const data = {
    labels: sourceData.map((item) => item.source),

    datasets: [
      {
        label: "Businesses",

        data: sourceData.map((item) => item.total),

        backgroundColor: sourceData.map(
          (_, index) => colors[index % colors.length]
        ),

        borderRadius: 12,
        borderSkipped: false,
        barThickness: 28,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    indexAxis: "y",

    plugins: {
      legend: {
        display: false,
      },

      title: {
        display: true,
        text: "Business Source Distribution",

        color: "#0F172A",

        font: {
          size: 22,
          weight: "bold",
        },

        padding: {
          bottom: 20,
        },
      },

      tooltip: {
        displayColors: false,

        backgroundColor: "#111827",

        titleColor: "#fff",

        bodyColor: "#fff",

        cornerRadius: 8,

        callbacks: {
          label: (context) =>
            `${context.raw} Businesses`,
        },
      },
    },

    scales: {
      x: {
        beginAtZero: true,

        max: 40,

        ticks: {
          stepSize: 2,

          color: "#475569",

          font: {
            size: 13,
            weight: "600",
          },
        },

        title: {
          display: true,

          text: "Number of Businesses",

          color: "#1E293B",

          font: {
            size: 16,
            weight: "bold",
          },
        },

        grid: {
          color: "#E2E8F0",
        },

        border: {
          display: false,
        },
      },

      y: {
        grid: {
          display: false,
        },

        border: {
          display: false,
        },

        ticks: {
          color: "#111827",

          font: {
            size: 14,
            weight: "600",
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "500px",
        background: "#fff",
        borderRadius: "18px",
        border: "1px solid #E2E8F0",
        padding: "24px",
        boxShadow: "0 10px 25px rgba(15,23,42,.08)",
      }}
    >
      {sourceData.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            fontSize: "18px",
            fontWeight: "600",
            color: "#64748B",
          }}
        >
          No Source Data Available
        </div>
      )}
    </div>
  );
}

export default SourceChart;