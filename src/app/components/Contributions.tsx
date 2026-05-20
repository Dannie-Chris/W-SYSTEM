import { useState } from 'react';
import { DollarSign, TrendingUp, Users, Calendar, Plus, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

interface Contribution {
  id: string;
  memberName: string;
  memberForm: string;
  month: string;
  amount: number;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue' | 'Partial';
  paymentDate?: string;
  paymentMethod?: string;
  outstandingBalance: number;
}

const contributionsData: Contribution[] = [
  { id: 'CON001', memberName: 'John Kamau', memberForm: 'MF-2024-001', month: 'May 2026', amount: 2000, paymentStatus: 'Paid', paymentDate: '2026-05-05', paymentMethod: 'M-Pesa', outstandingBalance: 0 },
  { id: 'CON002', memberName: 'Mary Wanjiru', memberForm: 'MF-2024-002', month: 'May 2026', amount: 2000, paymentStatus: 'Pending', outstandingBalance: 2000 },
  { id: 'CON003', memberName: 'Peter Ochieng', memberForm: 'MF-2024-003', month: 'May 2026', amount: 2000, paymentStatus: 'Overdue', outstandingBalance: 2000 },
  { id: 'CON004', memberName: 'Grace Akinyi', memberForm: 'MF-2024-004', month: 'May 2026', amount: 2000, paymentStatus: 'Paid', paymentDate: '2026-05-01', paymentMethod: 'Bank Transfer', outstandingBalance: 0 },
  { id: 'CON005', memberName: 'David Mwangi', memberForm: 'MF-2024-005', month: 'May 2026', amount: 2000, paymentStatus: 'Partial', paymentDate: '2026-05-10', paymentMethod: 'M-Pesa', outstandingBalance: 1000 },
];

const monthlyTrend = [
  { month: 'Jan', collected: 45000, expected: 50000 },
  { month: 'Feb', collected: 48000, expected: 50000 },
  { month: 'Mar', collected: 50000, expected: 50000 },
  { month: 'Apr', collected: 47000, expected: 50000 },
  { month: 'May', collected: 6000, expected: 50000 },
];

export default function Contributions() {
  const [selectedMonth, setSelectedMonth] = useState('May 2026');
  const [showRecordModal, setShowRecordModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Partial': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalCollected: contributionsData.filter(c => c.paymentStatus === 'Paid' || c.paymentStatus === 'Partial').reduce((sum, c) => sum + (c.amount - c.outstandingBalance), 0),
    totalExpected: contributionsData.length * 2000,
    totalOutstanding: contributionsData.reduce((sum, c) => sum + c.outstandingBalance, 0),
    paidMembers: contributionsData.filter(c => c.paymentStatus === 'Paid').length,
    totalMembers: contributionsData.length,
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contributions Management</h1>
          <p className="text-gray-600 mt-1">Track and manage member contributions</p>
        </div>
        <button
          onClick={() => setShowRecordModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Record Payment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-sm text-gray-600">Total Collected</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">KSh {stats.totalCollected.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">of KSh {stats.totalExpected.toLocaleString()} expected</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-100 rounded-full">
              <DollarSign className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-sm text-gray-600">
              {Math.round((stats.totalOutstanding / stats.totalExpected) * 100)}%
            </span>
          </div>
          <p className="text-sm text-gray-600">Outstanding Balance</p>
          <p className="text-2xl font-bold text-red-600 mt-1">KSh {stats.totalOutstanding.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Pending payments</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-600">
              {Math.round((stats.paidMembers / stats.totalMembers) * 100)}%
            </span>
          </div>
          <p className="text-sm text-gray-600">Payment Rate</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{stats.paidMembers}/{stats.totalMembers}</p>
          <p className="text-xs text-gray-500 mt-2">Members paid</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600">Current Month</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{selectedMonth}</p>
          <p className="text-xs text-gray-500 mt-2">KSh 2,000 per member</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Collection Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyTrend} id="contributions-trend-chart">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="collected" stroke="#10b981" strokeWidth={2} name="Collected" />
              <Line type="monotone" dataKey="expected" stroke="#3b82f6" strokeWidth={2} name="Expected" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { status: 'Paid', count: contributionsData.filter(c => c.paymentStatus === 'Paid').length },
                { status: 'Pending', count: contributionsData.filter(c => c.paymentStatus === 'Pending').length },
                { status: 'Overdue', count: contributionsData.filter(c => c.paymentStatus === 'Overdue').length },
                { status: 'Partial', count: contributionsData.filter(c => c.paymentStatus === 'Partial').length },
              ]}
              id="contributions-status-chart"
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" name="Members" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Contributions Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Contribution Records - {selectedMonth}</h2>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="May 2026">May 2026</option>
              <option value="April 2026">April 2026</option>
              <option value="March 2026">March 2026</option>
              <option value="February 2026">February 2026</option>
              <option value="January 2026">January 2026</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Member</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Outstanding</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {contributionsData.map((contribution) => (
                <tr key={contribution.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{contribution.memberName}</div>
                    <div className="text-sm text-gray-500">{contribution.memberForm}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contribution.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    KSh {contribution.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(contribution.paymentStatus)}`}>
                      {contribution.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contribution.paymentDate || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {contribution.paymentMethod || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contribution.outstandingBalance > 0 ? (
                      <span className="text-sm font-medium text-red-600">
                        KSh {contribution.outstandingBalance.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {contribution.paymentStatus !== 'Paid' && (
                      <button className="text-blue-600 hover:text-blue-900 font-medium">
                        Record Payment
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Modal */}
      {showRecordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Record Payment</h2>
              <button
                onClick={() => setShowRecordModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member *</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select member</option>
                  <option value="MEM001">John Kamau (MF-2024-001)</option>
                  <option value="MEM002">Mary Wanjiru (MF-2024-002)</option>
                  <option value="MEM003">Peter Ochieng (MF-2024-003)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Month *</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select month</option>
                  <option value="May 2026">May 2026</option>
                  <option value="April 2026">April 2026</option>
                  <option value="March 2026">March 2026</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (KSh) *</label>
                <input
                  type="number"
                  required
                  defaultValue={2000}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
                <select
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select method</option>
                  <option value="M-Pesa">M-Pesa</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Date *</label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Reference</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., M-Pesa code"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowRecordModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
