import { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Application {
  id: string;
  applicantName: string;
  program: string;
  submittedDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Under Review';
  priority: 'High' | 'Medium' | 'Low';
  documents: number;
}

const applicationsData: Application[] = [
  { id: 'APP001', applicantName: 'David Koech', program: 'Food Assistance', submittedDate: '2026-05-10', status: 'Pending', priority: 'High', documents: 4 },
  { id: 'APP002', applicantName: 'Jennifer Kennedy', program: 'Housing Support', submittedDate: '2026-05-09', status: 'Under Review', priority: 'High', documents: 6 },
  { id: 'APP003', applicantName: 'Thomas Mungai', program: 'Healthcare', submittedDate: '2026-05-08', status: 'Approved', priority: 'Medium', documents: 5 },
  { id: 'APP004', applicantName: 'Ronald Karauri', program: 'Education', submittedDate: '2026-05-07', status: 'Pending', priority: 'Medium', documents: 3 },
  { id: 'APP005', applicantName: 'Christopher Mochere', program: 'Food Assistance', submittedDate: '2026-05-06', status: 'Rejected', priority: 'Low', documents: 2 },
  { id: 'APP006', applicantName: 'Kevin Wesonga', program: 'Housing Support', submittedDate: '2026-05-05', status: 'Approved', priority: 'High', documents: 7 },
  { id: 'APP007', applicantName: 'Daniel Chege', program: 'Healthcare', submittedDate: '2026-05-04', status: 'Under Review', priority: 'Medium', documents: 5 },
  { id: 'APP008', applicantName: 'Maria Nyaboke', program: 'Food Assistance', submittedDate: '2026-05-03', status: 'Pending', priority: 'High', documents: 4 },
];

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');

  const filteredApplications = applicationsData.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.program.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || app.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || app.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
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
      case 'Under Review': return <Clock className="w-5 h-5 text-blue-600" />;
      default: return null;
    }
  };

  const stats = {
    total: applicationsData.length,
    pending: applicationsData.filter(a => a.status === 'Pending').length,
    approved: applicationsData.filter(a => a.status === 'Approved').length,
    rejected: applicationsData.filter(a => a.status === 'Rejected').length,
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
        <p className="text-gray-600 mt-1">Review and manage benefit applications</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Applications</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats.approved}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Rejected</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.rejected}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search applications..."
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
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredApplications.map((app) => (
            <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="mt-1">
                    {getStatusIcon(app.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{app.applicantName}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                      <span className={`text-xs font-semibold ${getPriorityColor(app.priority)}`}>
                        {app.priority} Priority
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>ID: {app.id}</span>
                      <span>•</span>
                      <span>Program: {app.program}</span>
                      <span>•</span>
                      <span>Submitted: {app.submittedDate}</span>
                      <span>•</span>
                      <span>{app.documents} documents</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {app.status === 'Pending' || app.status === 'Under Review' ? (
                    <>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                        Approve
                      </button>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                        Reject
                      </button>
                    </>
                  ) : (
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      View Details
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredApplications.length}</span> of <span className="font-medium">{applicationsData.length}</span> applications
          </div>
        </div>
      </div>
    </div>
  );
}
