import { Users, Activity, LogOut, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen p-6 md:p-8 page-bg">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={20} />
            <span className="text-sm font-semibold text-brand-700 dark:text-brand-300">Admin Panel</span>
          </div>
          <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-muted mt-2">Welcome back, {user?.name || "Admin"}</p>
        </div>

        <button onClick={handleLogout} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm">
          <LogOut size={16} />
          Logout
        </button>
      </div>

      <div className="card p-5 mb-6">
        <h2 className="font-semibold mb-4">Admin Information</h2>
        <div className="space-y-2 text-sm">
          <p><span className="text-muted">Name: </span>{user?.name}</p>
          <p><span className="text-muted">Email: </span>{user?.email}</p>
          <p><span className="text-muted">Role: </span>{user?.role}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <Users size={20} />
            <h3 className="font-semibold">Users</h3>
          </div>
          <p className="text-sm text-muted">View and manage registered users.</p>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-3 mb-3">
            <Activity size={20} />
            <h3 className="font-semibold">Platform Activity</h3>
          </div>
          <p className="text-sm text-muted">View habit and application activity.</p>
        </div>
      </div>
    </div>
  );
}