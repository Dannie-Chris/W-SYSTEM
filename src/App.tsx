import { useState } from 'react';
import LoginPage from './app/components/LoginPage';
import AdminPortal from './app/components/AdminPortal';

export default function App() {
  const [userRole, setUserRole] = useState<'admin' | 'member' | null>(null);

  const handleLogin = (role: 'admin' | 'member') => {
    setUserRole(role);
  };

  const handleLogout = () => {
    setUserRole(null);
  };

  return (
    <div className="size-full">
      {userRole ? (
        <AdminPortal onLogout={handleLogout} userRole={userRole} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}