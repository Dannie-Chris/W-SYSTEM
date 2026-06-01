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

interface Request {
  id: number;
  memberName?: string;
  requestType: string;
  amount: number;
  reason: string;
  priority: string;
  status: string;
  createdAt: string;
}

export default function WelfareRequests() {
  const [requestsData, setRequestsData] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const [formData, setFormData] = useState({
    memberName: "",
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

  useEffect(() => {
    fetchRequests();
  }, []);

  // HANDLE INPUT
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
        userId: 1,
        requestType: formData.requestType,
        amount: Number(formData.amount),
        reason: formData.reason,
        priority: formData.priority,
      });

      fetchRequests();
      setShowSubmitModal(false);

      setFormData({
        memberName: "",
        requestType: "",
        amount: "",
        reason: "",
        priority: "",
      });
    } catch (error) {
      console.log("Failed to submit request", error);
    }
  };

  // APPROVE REQUEST
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

  // FILTER REQUESTS
  const filteredRequests = requestsData.filter((req) => {
    const matchesSearch =
      (req.memberName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (req.requestType?.toLowerCase() || "").includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || req.status === statusFilter;

    const matchesType =
      typeFilter === "All" || req.requestType === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // STATUS COLORS
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Disbursed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // STATUS ICONS
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "Rejected":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "Pending":
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case "Disbursed":
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const stats = {
    total: requestsData.length,
    pending: requestsData.filter((r) => r.status === "Pending").length,
    approved: requestsData.filter((r) => r.status === "Approved").length,
    totalAmount: requestsData.reduce((sum, r) => sum + (r.amount || 0), 0),
  };

  if (loading) {
    return <div className="p-6">Loading requests...</div>;
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welfare Requests</h1>
          <p className="text-gray-600">Manage welfare requests</p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Submit Request
        </button>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">

        <div className="p-4 bg-white shadow rounded">
          Total: {stats.total}
        </div>

        <div className="p-4 bg-white shadow rounded">
          Pending: {stats.pending}
        </div>

        <div className="p-4 bg-white shadow rounded">
          Approved: {stats.approved}
        </div>

        <div className="p-4 bg-white shadow rounded">
          KSh {stats.totalAmount.toLocaleString()}
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded shadow">

        <div className="p-4 flex gap-4">
          <input
            className="border p-2 flex-1"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Disbursed</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border p-2"
          >
            <option>All</option>
            <option>Medical</option>
            <option>Education</option>
            <option>Emergency</option>
            <option>Funeral</option>
          </select>
        </div>

        <div className="divide-y">
          {filteredRequests.map((req) => (
            <div key={req.id} className="p-4 flex justify-between">

              <div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(req.status)}
                  <b>{req.memberName}</b>
                  <span className={`px-2 text-xs rounded ${getStatusColor(req.status)}`}>
                    {req.status}
                  </span>
                </div>

                <p>{req.requestType} - KSh {req.amount}</p>
                <p className="text-sm text-gray-500">{req.reason}</p>
              </div>

              <button
                onClick={() => approveRequest(req.id)}
                className="text-green-600"
              >
                Approve
              </button>

            </div>
          ))}
        </div>

      </div>

      {/* MODAL (kept simple) */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded w-[500px]"
          >

            <input
              name="memberName"
              value={formData.memberName}
              onChange={handleChange}
              placeholder="Member Name"
              className="border p-2 w-full mb-2"
            />

            <input
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="border p-2 w-full mb-2"
            />

            <button className="bg-blue-600 text-white px-4 py-2 w-full">
              Submit
            </button>

          </form>

        </div>
      )}

    </div>
  );
}