import { useState } from 'react';
import { LayoutDashboard, Users, DollarSign, FileText, Activity, Settings as SettingsIcon, Menu, X, LogOut, Heart } from 'lucide-react';
import NewDashboard from './NewDashboard';
import Members from './Members';
import Contributions from './Contributions';
import WelfareRequests from './WelfareRequests';
import ActivityLogs from './ActivityLogs';
import Settings from './Settings';

type Page = 'dashboard' | 'members' | 'contributions' | 'requests' | 'activity' | 'settings';

interface AdminPortalProps {
  onLogout: () => void;
  userRole: 'admin' | 'member';
}

export default function AdminPortal({ onLogout, userRole }: AdminPortalProps) {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navigation = [
    { id: 'dashboard' as Page, name: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'member'] },
    { id: 'members' as Page, name: 'Members', icon: Users, roles: ['admin'] },
    { id: 'contributions' as Page, name: 'Contributions', icon: DollarSign, roles: ['admin', 'member'] },
    { id: 'requests' as Page, name: 'Welfare Requests', icon: Heart, roles: ['admin', 'member'] },
    { id: 'activity' as Page, name: 'Activity Logs', icon: Activity, roles: ['admin'] },
    { id: 'settings' as Page, name: 'Settings', icon: SettingsIcon, roles: ['admin'] },
  ].filter(item => item.roles.includes(userRole));

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <NewDashboard />;
      case 'members':
        return <Members />;
      case 'contributions':
        return <Contributions />;
      case 'requests':
        return <WelfareRequests />;
      case 'activity':
        return <ActivityLogs />;
      case 'settings':
        return <Settings />;
      default:
        return <NewDashboard />;
    }
  };

  return (
    <div className="size-full flex bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`bg-gray-900 text-white transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          {sidebarOpen && (
            <h1 className="text-xl font-bold">Welfare Admin</h1>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.name}</span>}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          {sidebarOpen ? (
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{userRole === 'admin' ? 'Admin User' : 'Member User'}</p>
                  <p className="text-xs text-gray-400">{userRole}@welfare.com</p>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="w-full flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onLogout}
              className="w-full p-2 rounded-lg hover:bg-gray-800 transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5 mx-auto" />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              {navigation.find(item => item.id === currentPage)?.name}
            </h2>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <span className="text-sm text-gray-600">May 12, 2026</span>
            </div>
          </div>
        </div>

        <div className="min-h-[calc(100vh-73px)]">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
