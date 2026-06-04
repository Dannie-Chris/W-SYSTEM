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
        userId: 1, // replace with logged-in user id later
        requestType: formData.requestType,
        amount: Number(formData.amount),
        reason: formData.reason,
        priority: formData.priority,
      });

      await fetchRequests();

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

      await fetchRequests(); // important
    } catch (error) {
      console.log("Failed to approve request", error);
    }
  };

  // FILTER REQUESTS
  const filteredRequests = requestsData.filter((req) => {
    const matchesSearch =
      req.user?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

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

  // STATS
  const stats = {
    total: requestsData.length,
    pending: requestsData.filter((r) => r.status === "Pending").length,
    approved: requestsData.filter((r) => r.status === "Approved").length,
    totalAmount: requestsData.reduce(
      (sum, r) => sum + (r.amount || 0),
      0
    ),
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

        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">Total Requests</p>
          <p className="text-2xl font-bold mt-1">{stats.total}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {stats.pending}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {stats.approved}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">Total Amount</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            KSh {stats.totalAmount.toLocaleString()}
          </p>
        </div>
      </div>

      {/* REQUEST LIST */}
      <div className="bg-white rounded-lg shadow border divide-y">

        {filteredRequests.map((request) => (
          <div key={request.id} className="p-6 hover:bg-gray-50">

            {/* APPROVE BUTTON */}
            <button
              onClick={() => approveRequest(request.id)}
              className="bg-green-500 text-white px-3 py-1 rounded mb-3"
            >
              Approve
            </button>

            <div className="flex items-start gap-4">

              <div className="mt-1">
                {getStatusIcon(request.status)}
              </div>

              <div className="flex-1">

                <div className="flex items-center gap-3 mb-2">

                  <h3 className="text-lg font-semibold">
                    {request.user?.name}
                  </h3>

                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>

                </div>

                <div className="flex gap-4 text-sm text-gray-600 mb-2">
                  <span>Type: {request.requestType}</span>
                  <span>Amount: KSh {request.amount}</span>
                  <span>Priority: {request.priority}</span>
                </div>

                <p className="text-sm text-gray-700">
                  {request.reason}
                </p>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}