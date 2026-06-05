import { useEffect, useState } from "react";
import API from "../../api/api";
import {
  Search,
  Plus,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  X,
} from "lucide-react";

export default function WelfareRequests() {
  const [requestsData, setRequestsData] = useState<any[]>([]);
  const [membersData, setMembersData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [formData, setFormData] = useState({
    memberId: "",
    requestType: "",
    amount: "",
    reason: "",
    priority: "",
  });

  // FETCH REQUESTS
  const fetchRequests = async () => {
    try {
      const res = await API.get("/requests");
      setRequestsData(res.data);
    } catch (error) {
      console.log("Failed to fetch requests", error);
    } finally {
      setLoading(false);
    }
  };

  // FETCH MEMBERS
  const fetchMembers = async () => {
    try {
      const res = await API.get("/members");
      setMembersData(res.data);
    } catch (error) {
      console.log("Failed to fetch members", error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchMembers();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // SUBMIT REQUEST
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await API.post("/requests", {
        memberId: Number(formData.memberId),
        requestType: formData.requestType,
        amount: Number(formData.amount),
        reason: formData.reason,
        priority: formData.priority,
      });

      fetchRequests();
      setShowSubmitModal(false);

      setFormData({
        memberId: "",
        requestType: "",
        amount: "",
        reason: "",
        priority: "",
      });
    } catch (error) {
      console.log("Failed to submit request", error);
    }
  };

  // FILTER REQUESTS
  const filteredRequests = requestsData.filter((req) => {
    const matchesSearch =
      req.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.title?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || req.status === statusFilter;

    const matchesType =
      typeFilter === "All" || req.requestType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const approveRequest = async (id: number) => {
    try {
      await API.patch(`/requests/${id}/status`, {
        status: "Approved",
      });

      fetchRequests();
    } catch (error) {
      console.log("Failed to approve request", error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading requests...</div>;
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welfare Requests
          </h1>
          <p className="text-gray-600 mt-1">
            Manage welfare requests
          </p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Submit Request
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 border rounded">
          Total: {requestsData.length}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow border">

        {/* REQUESTS */}
        <div className="divide-y">

          {filteredRequests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50">

              <button
                onClick={() => approveRequest(request.id)}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Approve
              </button>

              <div className="mt-3">
                <h3 className="text-lg font-semibold">
                  {request.member?.name || "Unknown Member"}
                </h3>

                <p className="text-sm text-gray-600">
                  {request.reason}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">

            <div className="flex justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">
                Submit Request
              </h2>

              <button onClick={() => setShowSubmitModal(false)}>
                <X />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">

              {/* ✅ MEMBER DROPDOWN */}
              <select
                name="memberId"
                value={formData.memberId}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">Select Member</option>

                {membersData.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.name}
                  </option>
                ))}
              </select>

              <select
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">Select Type</option>
                <option value="Medical">Medical</option>
                <option value="Education">Education</option>
                <option value="Emergency">Emergency</option>
                <option value="Funeral">Funeral</option>
              </select>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">Priority</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Reason"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
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