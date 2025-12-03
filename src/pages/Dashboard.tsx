import { useAuth } from "../context/AuthContext";
import { DashboardLayout } from "../components/DashboardLayout";

export function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Welcome back, {user?.displayName?.split(" ")[0] || "User"}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here is what is happening with your projects today.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              label: "Active Projects",
              value: "0",
              color: "text-blue-600 dark:text-blue-400",
            },
            {
              label: "Total Views",
              value: "0",
              color: "text-green-600 dark:text-green-400",
            },
            {
              label: "Storage Used",
              value: "0%",
              color: "text-purple-600 dark:text-purple-400",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm"
            >
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {stat.label}
              </p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Empty State */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
            No projects yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            Get started by creating your first project. It only takes a few
            minutes.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition-colors">
            Create New Project
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
