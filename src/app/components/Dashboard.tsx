import { Users, DollarSign, FileText, TrendingUp } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const statsData = [
  { title: 'Total Beneficiaries', value: '12,458', change: '+12.5%', icon: Users, color: '#3b82f6' },
  { title: 'Active Programs', value: '24', change: '+3', icon: FileText, color: '#10b981' },
  { title: 'Total Disbursed', value: '$2.4M', change: '+8.2%', icon: DollarSign, color: '#f59e0b' },
  { title: 'Applications', value: '342', change: '+24', icon: TrendingUp, color: '#8b5cf6' },
];

const monthlyData = [
  { month: 'Jan', amount: 185000, beneficiaries: 980 },
  { month: 'Feb', amount: 195000, beneficiaries: 1020 },
  { month: 'Mar', amount: 210000, beneficiaries: 1150 },
  { month: 'Apr', amount: 225000, beneficiaries: 1280 },
  { month: 'May', amount: 240000, beneficiaries: 1350 },
];

const programDistribution = [
  { name: 'Food Assistance', value: 35, color: '#3b82f6' },
  { name: 'Housing Support', value: 25, color: '#10b981' },
  { name: 'Healthcare', value: 20, color: '#f59e0b' },
  { name: 'Education', value: 15, color: '#8b5cf6' },
  { name: 'Others', value: 5, color: '#ef4444' },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of welfare programs and beneficiaries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-green-600 mt-2">{stat.change}</p>
                </div>
                <div className="p-3 rounded-full" style={{ backgroundColor: `${stat.color}20` }}>
                  <Icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Disbursements</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData} id="monthly-disbursements-chart">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#3b82f6" name="Amount ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Beneficiary Growth</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData} id="beneficiary-growth-chart">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="beneficiaries" stroke="#10b981" strokeWidth={2} name="Beneficiaries" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Program Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart id="program-distribution-chart">
              <Pie
                data={programDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {programDistribution.map((entry) => (
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
            <div className="flex items-start">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New application received</p>
                <p className="text-xs text-gray-500">Sarah Johnson - Food Assistance Program</p>
                <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Payment processed</p>
                <p className="text-xs text-gray-500">Michael Brown - Kshs 45,000 disbursed</p>
                <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Program updated</p>
                <p className="text-xs text-gray-500">Housing Support eligibility criteria revised</p>
                <p className="text-xs text-gray-400 mt-1">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Beneficiary registered</p>
                <p className="text-xs text-gray-500">Emily Davis added to Healthcare program</p>
                <p className="text-xs text-gray-400 mt-1">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
