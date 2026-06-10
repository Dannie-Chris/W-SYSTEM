import { useEffect, useState } from "react";
import API from "../../api/api";
import { Save, Users, Palette, Bell } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Member";
  status: "Active" | "Inactive";
}

interface SettingsData {
  welfareName: string;
  contributionAmount: number;
  theme: "light" | "dark";
  currency: string;
  emailNotifications: boolean;
  smsNotifications: boolean;
}

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [users, setUsers] = useState<User[]>([]);

  const [form, setForm] = useState<SettingsData>({
    welfareName: "",
    contributionAmount: 500,
    theme: "light",
    currency: "KSh",
    emailNotifications: true,
    smsNotifications: false,
  });

  // =========================
  // FETCH SETTINGS + USERS
  // =========================
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [settingsRes, usersRes] = await Promise.all([
          API.get("/settings"),
          API.get("/users"),
        ]);

        setForm(settingsRes.data);
        setUsers(usersRes.data);
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (key: keyof SettingsData, value: any) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // =========================
  // SAVE SETTINGS
  // =========================
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      await API.put("/settings", form);
      alert("Settings updated successfully!");
    } catch (err) {
      console.error("Save failed:", err);
      alert("Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-600">Loading settings...</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">Configure your welfare system</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">

        {/* GENERAL SETTINGS */}
        <div className="bg-white shadow rounded-lg border">
          <div className="p-6 border-b">
            <h2 className="font-semibold text-lg">General Settings</h2>
          </div>

          <div className="p-6 space-y-4">
            <input
              className="w-full border p-2 rounded"
              value={form.welfareName}
              onChange={(e) => handleChange("welfareName", e.target.value)}
              placeholder="Welfare name"
            />

            <select
              className="w-full border p-2 rounded"
              value={form.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
            >
              <option value="KSh">KSh</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>

            <input
              type="number"
              className="w-full border p-2 rounded"
              value={form.contributionAmount}
              onChange={(e) =>
                handleChange("contributionAmount", Number(e.target.value))
              }
              placeholder="Monthly contribution"
            />
          </div>
        </div>

        {/* USERS */}
        <div className="bg-white shadow rounded-lg border">
          <div className="p-6 border-b flex items-center gap-2">
            <Users className="w-5 h-5" />
            <h2 className="font-semibold text-lg">User Management</h2>
          </div>

          <div className="p-6 overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2">Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-2">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="bg-white shadow rounded-lg border">
          <div className="p-6 border-b flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <h2 className="font-semibold text-lg">Notifications</h2>
          </div>

          <div className="p-6 space-y-4">
            <label className="flex justify-between items-center">
              Email Notifications
              <input
                type="checkbox"
                checked={form.emailNotifications}
                onChange={(e) =>
                  handleChange("emailNotifications", e.target.checked)
                }
              />
            </label>

            <label className="flex justify-between items-center">
              SMS Notifications
              <input
                type="checkbox"
                checked={form.smsNotifications}
                onChange={(e) =>
                  handleChange("smsNotifications", e.target.checked)
                }
              />
            </label>
          </div>
        </div>

        {/* SAVE */}
        <div className="flex justify-end">
          <button
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}