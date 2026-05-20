import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, TrendingUp, Users, DollarSign, FileText } from 'lucide-react';

const programPerformance = [
  { program: 'Food Assistance', beneficiaries: 4520, budget: 2500000, utilized: 1875000 },
  { program: 'Housing Support', beneficiaries: 3210, budget: 4000000, utilized: 2800000 },
  { program: 'Healthcare', beneficiaries: 2850, budget: 3200000, utilized: 2100000 },
  { program: 'Education', beneficiaries: 1878, budget: 1800000, utilized: 950000 },
];

const quarterlyTrend = [
  { quarter: 'Q1 2025', beneficiaries: 9800, disbursed: 580000 },
  { quarter: 'Q2 2025', beneficiaries: 10500, disbursed: 630000 },
  { quarter: 'Q3 2025', beneficiaries: 11200, disbursed: 672000 },
  { quarter: 'Q4 2025', beneficiaries: 11800, disbursed: 708000 },
  { quarter: 'Q1 2026', beneficiaries: 12458, disbursed: 750000 },
];

const demographicData = [
  { category: 'Age 18-30', count: 2850 },
  { category: 'Age 31-45', count: 4120 },
  { category: 'Age 46-60', count: 3580 },
  { category: 'Age 60+', count: 1908 },
];

export default function Reports() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and statistical analysis</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          <Download className="w-5 h-5" />
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Total Beneficiaries</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">12,458</p>
          <p className="text-sm text-green-600 mt-2">+12.5% from last quarter</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Total Disbursed</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">$2.4M</p>
          <p className="text-sm text-green-600 mt-2">+8.2% from last quarter</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Applications Processed</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">1,245</p>
          <p className="text-sm text-green-600 mt-2">+15.3% from last quarter</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm text-gray-600">75%</span>
          </div>
          <p className="text-sm text-gray-600">Approval Rate</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">935</p>
          <p className="text-sm text-gray-600 mt-2">of 1,245 applications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Program Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={programPerformance} id="reports-program-performance">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" angle={-15} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="beneficiaries" fill="#3b82f6" name="Beneficiaries" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quarterly Growth Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={quarterlyTrend} id="reports-quarterly-trend">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="quarter" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="beneficiaries" stroke="#3b82f6" strokeWidth={2} name="Beneficiaries" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Budget Utilization by Program</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={programPerformance} id="reports-budget-utilization">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="program" angle={-15} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="budget" fill="#10b981" name="Budget" />
              <Bar dataKey="utilized" fill="#f59e0b" name="Utilized" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Beneficiary Demographics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={demographicData} layout="vertical" id="reports-demographics">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="category" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" name="Beneficiaries" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Program Efficiency Metrics</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Budget</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilized</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilization %</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Beneficiaries</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cost per Beneficiary</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {programPerformance.map((program) => {
                const utilization = Math.round((program.utilized / program.budget) * 100);
                const costPerBeneficiary = Math.round(program.utilized / program.beneficiaries);
                return (
                  <tr key={program.program} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{program.program}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${program.budget.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${program.utilized.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${utilization}%` }}></div>
                        </div>
                        <span className="text-gray-900">{utilization}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{program.beneficiaries.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${costPerBeneficiary}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
