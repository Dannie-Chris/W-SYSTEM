import { useState, useEffect } from "react";
import API from "../../api/api";
import { Search, Plus, Edit, Trash2, Eye, Filter, X } from "lucide-react";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  contributionStatus?: "Active" | "Inactive" | "Suspended";
  totalContributions?: number;
  outstandingBalance?: number;
}

export default function Members() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);

  const [membersData, setMembersData] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // FETCH MEMBERS
  const fetchMembers = async () => {
    try {
      const res = await API.get("/members");
      setMembersData(res.data);
    } catch (error) {
      console.log("Failed to fetch members", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // FORM CHANGE
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT MEMBER
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post("/members", formData);

      fetchMembers();
      setShowAddModal(false);

      setFormData({
        name: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.log("Failed to add member", error);
    }
  };

  // FILTER MEMBERS
  const filteredMembers = membersData.filter((member) => {
    const matchesSearch =
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone?.includes(searchTerm);

    const matchesStatus =
      statusFilter === "All" ||
      member.contributionStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // STATUS COLORS
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-yellow-100 text-yellow-800";
      case "Suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return <div className="p-6">Loading members...</div>;
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-600 mt-1">Manage welfare group members</p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-lg shadow">
          <p>Total Members</p>
          <p className="text-2xl font-bold">{membersData.length}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p>Active Members</p>
          <p className="text-2xl font-bold text-green-600">
            {membersData.filter(m => m.contributionStatus === "Active").length}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p>Total Contributions</p>
          <p className="text-2xl font-bold text-blue-600">
            KSh{" "}
            {membersData
              .reduce((sum, m) => sum + (m.totalContributions || 0), 0)
              .toLocaleString()}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <p>Outstanding Balance</p>
          <p className="text-2xl font-bold text-red-600">
            KSh{" "}
            {membersData
              .reduce((sum, m) => sum + (m.outstandingBalance || 0), 0)
              .toLocaleString()}
          </p>
        </div>

      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-lg shadow flex gap-4">

        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input
            className="w-full pl-10 border p-2 rounded"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">

        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Phone</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredMembers.map((member) => (
              <tr key={member.id} className="border-t">

                <td className="p-3">{member.name}</td>
                <td className="p-3">{member.email}</td>
                <td className="p-3">{member.phone}</td>

                <td className="p-3">
                  <span className={`px-2 py-1 rounded ${getStatusColor(member.contributionStatus)}`}>
                    {member.contributionStatus || "Active"}
                  </span>
                </td>

                <td className="p-3">
                  {member.createdAt
                    ? new Date(member.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>

                <td className="p-3 flex gap-2">
                  <Eye className="w-4 h-4 text-blue-600 cursor-pointer" />
                  <Edit className="w-4 h-4 text-green-600 cursor-pointer" />
                  <Trash2 className="w-4 h-4 text-red-600 cursor-pointer" />
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* MODAL (unchanged UI) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-[500px]">

            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Add Member</h2>
              <X onClick={() => setShowAddModal(false)} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 mt-4">

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-2"
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full border p-2"
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border p-2"
              />

              <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                Save
              </button>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}