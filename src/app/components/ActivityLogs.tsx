import { useState } from 'react';
import { Activity, Filter, Search } from 'lucide-react';

interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  entityType: string;
  entityId?: string;
  details: string;
  ipAddress?: string;
}

const logsData: ActivityLog[] = [
  {
    id: 'LOG001',
    timestamp: '2026-05-15 14:30:25',
    user: 'Admin User',
    userRole: 'Admin',
    action: 'CREATE',
    entityType: 'Member',
    entityId: 'MEM006',
    details: 'Created new member: Sarah Njeri (MF-2024-006)',
    ipAddress: '192.168.1.100'
  },
  {
    id: 'LOG002',
    timestamp: '2026-05-15 14:15:10',
    user: 'Admin User',
    userRole: 'Admin',
    action: 'UPDATE',
    entityType: 'Contribution',
    entityId: 'CON005',
    details: 'Recorded payment for David Mwangi - May 2026 (KSh 1,000)',
    ipAddress: '192.168.1.100'
  },
  {
    id: 'LOG003',
    timestamp: '2026-05-15 13:45:00',
    user: 'John Kamau',
    userRole: 'Member',
    action: 'VIEW',
    entityType: 'Contribution',
    details: 'Viewed personal contribution history',
    ipAddress: '192.168.1.105'
  },
  {
    id: 'LOG004',
    timestamp: '2026-05-15 13:30:15',
    user: 'Admin User',
    userRole: 'Admin',
    action: 'APPROVE',
    entityType: 'Welfare Request',
    entityId: 'REQ003',
    details: 'Approved welfare request from Mary Wanjiru (KSh 5,000)',
    ipAddress: '192.168.1.100'
  },
  {
    id: 'LOG005',
    timestamp: '2026-05-15 12:20:30',
    user: 'Mary Wanjiru',
    userRole: 'Member',
    action: 'CREATE',
    entityType: 'Welfare Request',
    entityId: 'REQ003',
    details: 'Submitted welfare request for medical assistance (KSh 5,000)',
    ipAddress: '192.168.1.110'
  },
  {
    id: 'LOG006',
    timestamp: '2026-05-15 11:10:45',
    user: 'Admin User',
    userRole: 'Admin',
    action: 'UPDATE',
    entityType: 'Settings',
    details: 'Updated monthly contribution amount to KSh 2,000',
    ipAddress: '192.168.1.100'
  },
  {
    id: 'LOG007',
    timestamp: '2026-05-15 10:05:20',
    user: 'Peter Ochieng',
    userRole: 'Member',
    action: 'LOGIN',
    entityType: 'Authentication',
    details: 'User logged in successfully',
    ipAddress: '192.168.1.115'
  },
  {
    id: 'LOG008',
    timestamp: '2026-05-15 09:30:00',
    user: 'Admin User',
    userRole: 'Admin',
    action: 'DELETE',
    entityType: 'Member',
    entityId: 'MEM010',
    details: 'Deleted inactive member: Test User (MF-2024-010)',
    ipAddress: '192.168.1.100'
  },
];

export default function ActivityLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState<string>('All');
  const [entityFilter, setEntityFilter] = useState<string>('All');

  const filteredLogs = logsData.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'All' || log.action === actionFilter;
    const matchesEntity = entityFilter === 'All' || log.entityType === entityFilter;
    return matchesSearch && matchesAction && matchesEntity;
  });

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE': return 'bg-green-100 text-green-800';
      case 'UPDATE': return 'bg-blue-100 text-blue-800';
      case 'DELETE': return 'bg-red-100 text-red-800';
      case 'VIEW': return 'bg-gray-100 text-gray-800';
      case 'LOGIN': return 'bg-purple-100 text-purple-800';
      case 'APPROVE': return 'bg-teal-100 text-teal-800';
      case 'REJECT': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Activity Logs</h1>
          <p className="text-gray-600 mt-1">System activity and audit trail</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Activity className="w-5 h-5" />
          <span>Live monitoring</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Total Activities Today</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{logsData.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">User Logins</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">
            {logsData.filter(l => l.action === 'LOGIN').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Data Modifications</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {logsData.filter(l => ['CREATE', 'UPDATE', 'DELETE'].includes(l.action)).length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4 border border-gray-200">
          <p className="text-sm text-gray-600">Active Users</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {new Set(logsData.map(l => l.user)).size}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Actions</option>
              <option value="CREATE">Create</option>
              <option value="UPDATE">Update</option>
              <option value="DELETE">Delete</option>
              <option value="VIEW">View</option>
              <option value="LOGIN">Login</option>
              <option value="APPROVE">Approve</option>
              <option value="REJECT">Reject</option>
            </select>
            <select
              value={entityFilter}
              onChange={(e) => setEntityFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Entities</option>
              <option value="Member">Member</option>
              <option value="Contribution">Contribution</option>
              <option value="Welfare Request">Welfare Request</option>
              <option value="Settings">Settings</option>
              <option value="Authentication">Authentication</option>
            </select>
          </div>
        </div>

        {/* Logs List */}
        <div className="divide-y divide-gray-200">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getActionColor(log.action)}`}>
                      {log.action}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{log.entityType}</span>
                    {log.entityId && (
                      <span className="text-xs text-gray-500">ID: {log.entityId}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-900 mb-2">{log.details}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3" />
                      {log.user} ({log.userRole})
                    </span>
                    <span>•</span>
                    <span>{log.timestamp}</span>
                    {log.ipAddress && (
                      <>
                        <span>•</span>
                        <span>IP: {log.ipAddress}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredLogs.length}</span> of <span className="font-medium">{logsData.length}</span> activities
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
