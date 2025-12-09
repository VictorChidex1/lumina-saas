import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { type Project } from "@/lib/projects";
import { useMemo } from "react";

interface UsageChartProps {
  projects: Project[];
}

export function UsageChart({ projects }: UsageChartProps) {
  const data = useMemo(() => {
    // 1. Initialize last 7 days
    const days: { date: string; name: string; words: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push({
        date: d.toISOString().split("T")[0], // YYYY-MM-DD
        name: d.toLocaleDateString("en-US", { weekday: "short" }),
        words: 0,
      });
    }

    // 2. Aggregate words from projects
    projects.forEach((project) => {
      // Skip if no creation date
      if (!project.createdAt) return;

      // Handle Firebase Timestamp or standard Date or serialized date
      let date: Date;
      if (
        project.createdAt &&
        typeof (project.createdAt as any).seconds === "number"
      ) {
        date = new Date((project.createdAt as any).seconds * 1000);
      } else {
        date = new Date(project.createdAt as any);
      }

      const dateString = date.toISOString().split("T")[0];
      const dayEntry = days.find((d) => d.date === dateString);

      if (dayEntry) {
        // Use words count or default to 500 if missing (mock fallback for old data)
        const wordCount = project.words || 0;
        dayEntry.words += wordCount;
      }
    });

    return days;
  }, [projects]);

  const totalWords = data.reduce((acc, curr) => acc + curr.words, 0);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Words Generated
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totalWords.toLocaleString()} words in the last 7 days
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1 rounded-full">
          <span>Active</span>
          <span className="text-gray-500 dark:text-gray-400 font-normal">
            Status
          </span>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorWords" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
              className="dark:stroke-gray-800"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "12px",
                border: "none",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              }}
              itemStyle={{ color: "#4f46e5", fontWeight: "bold" }}
            />
            <Area
              type="monotone"
              dataKey="words"
              stroke="#6366f1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorWords)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
