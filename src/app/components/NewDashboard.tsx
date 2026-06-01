import { useEffect, useState } from "react";
import API from "../../api/api";
import {
  Users,
  DollarSign,
  FileText,
  TrendingUp,
  RefreshCw,
} from "lucide-react";

export default function NewDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalMembers: 0,
    totalContributions: 0,
    totalRequests: 0,
    pendingRequests: 0,
    approvedRequests: 0,
  });

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await API.get("/dashboard");

      setStats(res.data);
    } catch (error) {
      console.log("Failed to fetch dashboard", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-lg">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-1">
            Welfare Management Overview
          </p>
        </div>

        <button
          onClick={fetchDashboard}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* MEMBERS */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Total Members
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.totalMembers}
              </h2>
            </div>

            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* CONTRIBUTIONS */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Contributions
              </p>

              <h2 className="text-3xl font-bold mt-2">
                KSh {stats.totalContributions.toLocaleString()}
              </h2>
            </div>

            <div className="bg-green-100 p-3 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        {/* REQUESTS */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Total Requests
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.totalRequests}
              </h2>
            </div>

            <div className="bg-yellow-100 p-3 rounded-full">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* APPROVED */}
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                Approved Requests
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {stats.approvedRequests}
              </h2>

              <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                Pending: {stats.pendingRequests}
              </p>
            </div>

            <div className="bg-purple-100 p-3 rounded-full">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* QUICK INFO */}
      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          System Summary
        </h2>

        <div className="space-y-3 text-gray-700">
          <p>
            Total Registered Members:
            <span className="font-semibold ml-2">
              {stats.totalMembers}
            </span>
          </p>

          <p>
            Total Welfare Requests:
            <span className="font-semibold ml-2">
              {stats.totalRequests}
            </span>
          </p>

          <p>
            Pending Requests:
            <span className="font-semibold ml-2 text-yellow-600">
              {stats.pendingRequests}
            </span>
          </p>

          <p>
            Approved Requests:
            <span className="font-semibold ml-2 text-green-600">
              {stats.approvedRequests}
            </span>
          </p>

          <p>
            Total Contributions Collected:
            <span className="font-semibold ml-2 text-blue-600">
              KSh {stats.totalContributions.toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}