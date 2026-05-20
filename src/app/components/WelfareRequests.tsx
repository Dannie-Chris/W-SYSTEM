import { useState } from 'react';
import { Search, Plus, Filter, CheckCircle, XCircle, Clock, X } from 'lucide-react';

interface WelfareRequest {
  id: string;
  memberName: string;
  memberForm: string;
  requestType: string;
  amount: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Disbursed';
  submittedDate: string;
  reviewedDate?: string;
  reviewedBy?: string;
  disbursementDate?: string;
  priority: 'High' | 'Medium' | 'Low';
}

const requestsData: WelfareRequest[] = [
  {
    id: 'REQ001',
    memberName: 'John Kamau',
    memberForm: 'MF-2024-001',
    requestType: 'Medical',
    amount: 10000,
    reason: 'Hospital bill for surgery',
    status: 'Approved',
    submittedDate: '2026-05-10',
    reviewedDate: '2026-05-12',
    reviewedBy: 'Admin User',
    priority: 'High'
  },
  {
    id: 'REQ002',
    memberName: 'Mary Wanjiru',
    memberForm: 'MF-2024-002',
    requestType: 'Education',
    amount: 5000,
    reason: 'School fees for child',
    status: 'Pending',
    submittedDate: '2026-05-14',
    priority: 'Medium'
  },
  {
    id: 'REQ003',
    memberName: 'Peter Ochieng',
    memberForm: 'MF-2024-003',
    requestType: 'Funeral',
    amount: 15000,
    reason: 'Funeral expenses for family member',
    status: 'Approved',
    submittedDate: '2026-05-13',
    reviewedDate: '2026-05-14',
    reviewedBy: 'Admin User',
    disbursementDate: '2026-05-15',
    priority: 'High'
  },
  {
    id: 'REQ004',
    memberName: 'Grace Akinyi',
    memberForm: 'MF-2024-004',
    requestType: 'Emergency',
    amount: 8000,
    reason: 'House repair after damage',
    status: 'Pending',
    submittedDate: '2026-05-15',
    priority: 'High'
  },
  {
    id: 'REQ005',
    memberName: 'David Mwangi',
    memberForm: 'MF-2024-005',
    requestType: 'Medical',
    amount: 3000,
    reason: 'Medication costs',
    status: 'Rejected',
    submittedDate: '2026-05-08',
    reviewedDate: '2026-05-09',
    reviewedBy: 'Admin User',
    priority: 'Low'
  },
];

export default function WelfareRequests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const filteredRequests = requestsData.filter(req => {
    const matchesSearch = req.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         req.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
    const matchesType = typeFilter === 'All' || req.requestType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Disbursed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'Rejected': return <XCircle className="w-5 h-5 text-red-600" />;
      case 'Pending': return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'Disbursed': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default: return null;
    }
  };

  const stats = {
    total: requestsData.length,
    pending: requestsData.filter(r => r.status === 'Pending').length,
    approved: requestsData.filter(r => r.status === 'Approved').length,
    totalAmount: requestsData.filter(r => r.status === 'Approved' || r.status === 'Disbursed').reduce((sum, r) => sum + r.amount, 0),
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welfare Requests</h1>
          <p className="text-gray-600 mt-1">Manage member welfare assistance requests</p>
        </div>
        <button
          onClick={() => setShowSubmitModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Submit Request
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Requests</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Pending Review</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Disbursed</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">KSh {stats.totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Disbursed">Disbursed</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Types</option>
              <option value="Medical">Medical</option>
              <option value="Education">Education</option>
              <option value="Funeral">Funeral</option>
              <option value="Emergency">Emergency</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredRequests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {getStatusIcon(request.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{request.memberName}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                      <span className={`text-xs font-semibold ${getPriorityColor(request.priority)}`}>
                        {request.priority} Priority
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>ID: {request.id}</span>
                      <span>•</span>
                      <span>Type: {request.requestType}</span>
                      <span>•</span>
                      <span>Amount: KSh {request.amount.toLocaleString()}</span>
                      <span>•</span>
                      <span>Submitted: {request.submittedDate}</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-2"><strong>Reason:</strong> {request.reason}</p>
                    {request.reviewedDate && (
                      <p className="text-xs text-gray-500">
                        Reviewed by {request.reviewedBy} on {request.reviewedDate}
                        {request.disbursementDate && ` • Disbursed on ${request.disbursementDate}`}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {request.status === 'Pending' && (
                    <>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                        Reject
                      </button>
                    </>
                  )}
                  {request.status === 'Approved' && !request.disbursementDate && (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Disburse
                    </button>
                  )}
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredRequests.length}</span> of <span className="font-medium">{requestsData.length}</span> requests
          </div>
        </div>
      </div>

      {/* Submit Request Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Submit Welfare Request</h2>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Request Type *</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select type</option>
                    <option value="Medical">Medical</option>
                    <option value="Education">Education</option>
                    <option value="Funeral">Funeral</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount Requested (KSh) *</label>
                  <input
                    type="number"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Request *</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Provide detailed reason for the welfare request..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supporting Documents</label>
                <input
                  type="file"
                  multiple
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Upload relevant documents (receipts, bills, etc.)</p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
