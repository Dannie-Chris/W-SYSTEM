import { useState, useEffect } from 'react';
import { Users, DollarSign, FileText, TrendingUp, RefreshCw } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock API functions - replace with real API calls
const fetchDashboardData = async () => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return {
    stats: {
      totalMembers: 25,
      activeMembers: 20,
      totalCollected: 50000,
      monthlyExpected: 50000,
      pendingRequests: 3,
      approvedRequests: 12,
    },
    monthlyContributions: [
      { month: 'Jan', amount: 45000, target: 50000 },
      { month: 'Feb', amount: 48000, target: 50000 },
      { month: 'Mar', amount: 50000, target: 50000 },
      { month: 'Apr', amount: 47000, target: 50000 },
      { month: 'May', amount: 50000, target: 50000 },
    ],
    membershipGrowth: [
      { month: 'Jan', members: 18 },
      { month: 'Feb', members: 20 },
      { month: 'Mar', members: 22 },
      { month: 'Apr', members: 23 },
      { month: 'May', members: 25 },
    ],
    requestsByType: [
      { name: 'Medical', value: 8, color: '#3b82f6' },
      { name: 'Education', value: 5, color: '#10b981' },
      { name: 'Funeral', value: 3, color: '#f59e0b' },
      { name: 'Emergency', value: 4, color: '#8b5cf6' },
    ],
    recentActivities: [
      { id: 1, type: 'payment', message: 'John Kamau paid May contribution', time: '2 hours ago' },
      { id: 2, type: 'request', message: 'Mary Wanjiru submitted welfare request', time: '3 hours ago' },
      { id: 3, type: 'approval', message: 'Admin approved Peter\'s request (KSh 15,000)', time: '5 hours ago' },
      { id: 4, type: 'member', message: 'New member Sarah Njeri registered', time: '1 day ago' },
    ]
  };
};

export default function NewDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  const loadData = async () => {
    setLoading(true);
    try {
      const dashboardData = await fetchDashboardData();
      setData(dashboardData);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Auto-refresh every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const collectionRate = Math.round((data.stats.totalCollected / data.stats.monthlyExpected) * 100);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time welfare group overview</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Total Members</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{data.stats.totalMembers}</p>
              <p className="text-sm text-green-600 mt-2">
                {data.stats.activeMembers} active
              </p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Monthly Collection</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                KSh {data.stats.totalCollected.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 mt-2">{collectionRate}% of target</p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Welfare Requests</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{data.stats.pendingRequests}</p>
              <p className="text-sm text-gray-600 mt-2">{data.stats.approvedRequests} approved</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">Collection Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{collectionRate}%</p>
              <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                +5% from last month
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Contributions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.monthlyContributions} id="new-dashboard-contributions">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#10b981" name="Collected (KSh)" />
              <Bar dataKey="target" fill="#3b82f6" name="Target (KSh)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Membership Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.membershipGrowth} id="new-dashboard-growth">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="members" stroke="#3b82f6" strokeWidth={2} name="Members" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Requests by Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart id="new-dashboard-requests">
              <Pie
                data={data.requestsByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.requestsByType.map((entry: any) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {data.recentActivities.map((activity: any) => (
              <div key={activity.id} className="flex items-start">
                <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                  activity.type === 'payment' ? 'bg-green-500' :
                  activity.type === 'request' ? 'bg-blue-500' :
                  activity.type === 'approval' ? 'bg-purple-500' :
                  'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left">
            <Users className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-medium text-gray-900">Add New Member</p>
            <p className="text-sm text-gray-600">Register a new welfare member</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left">
            <DollarSign className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-medium text-gray-900">Record Payment</p>
            <p className="text-sm text-gray-600">Log a contribution payment</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-left">
            <FileText className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-medium text-gray-900">Review Requests</p>
            <p className="text-sm text-gray-600">Check pending welfare requests</p>
          </button>
        </div>
      </div>
    </div>
  );
}
