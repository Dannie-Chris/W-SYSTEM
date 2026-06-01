import { useEffect, useState } from "react";
import API from "../../api/api";
import { Activity, Filter, Search } from "lucide-react";

export default function ActivityLogs() {
  const [logsData, setLogsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("All");

  // FETCH LOGS
  const fetchLogs = async () => {
    try {
      const res = await API.get("/activity");
      setLogsData(res.data);
    } catch (error) {
      console.log("Failed to fetch logs", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // FILTER LOGS
  const filteredLogs = logsData.filter((log) => {
    const matchesSearch =
      (log.user?.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (log.details?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesAction =
      actionFilter === "All" || log.action === actionFilter;

    return matchesSearch && matchesAction;
  });

  // ACTION COLORS
  const getActionColor = (action: string) => {
    switch (action) {
      case "CREATE":
        return "bg-green-100 text-green-800";
      case "UPDATE":
        return "bg-blue-100 text-blue-800";
      case "DELETE":
        return "bg-red-100 text-red-800";
      case "LOGIN":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div className="p-6">Loading activity logs...</div>;
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Activity Logs
          </h1>
          <p className="text-gray-600 mt-1">
            System activity monitoring
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Activity className="w-5 h-5" />
          <span>Realtime Monitoring</span>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">Total Logs</p>
          <p className="text-2xl font-bold mt-1">
            {logsData.length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">Logins</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {logsData.filter((l) => l.action === "LOGIN").length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">Updates</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {logsData.filter((l) => l.action === "UPDATE").length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {new Set(logsData.map((l) => l.user?.name)).size}
          </p>
        </div>
      </div>

      {/* FILTERS */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b flex flex-col lg:flex-row gap-4">

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />

            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="All">All Actions</option>
              <option value="CREATE">CREATE</option>
              <option value="UPDATE">UPDATE</option>
              <option value="DELETE">DELETE</option>
              <option value="LOGIN">LOGIN</option>
            </select>
          </div>

        </div>

        {/* LOGS */}
        <div className="divide-y">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-6 hover:bg-gray-50">

              <div className="flex items-start justify-between">

                <div className="flex-1">

                  <div className="flex items-center gap-3 mb-2">

                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getActionColor(
                        log.action
                      )}`}
                    >
                      {log.action}
                    </span>

                    <span className="text-sm font-medium">
                      {log.entityType}
                    </span>

                  </div>

                  <p className="text-sm text-gray-900 mb-2">
                    {log.details}
                  </p>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">

                    <span>{log.user?.name}</span>
                    <span>{log.user?.role}</span>

                    <span>
                      {new Date(log.createdAt).toLocaleString()}
                    </span>

                    {log.ipAddress && (
                      <span>IP: {log.ipAddress}</span>
                    )}

                  </div>

                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}