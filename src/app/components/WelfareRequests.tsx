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
    userId: "",
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
      userId: Number(formData.userId), // ⚠️ replace later with logged-in user ID
      requestType: formData.requestType,
      amount: Number(formData.amount),
      reason: formData.reason,
      priority: formData.priority,
    });

    fetchRequests();
    setShowSubmitModal(false);

    setFormData({
      userId: "",
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

  // FILTER REQUESTS
  const filteredRequests = requestsData.filter((req) => {

  const matchesSearch =
    req.user?.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()) ||

    req.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

  const matchesStatus =
    statusFilter === "All" ||
    req.status === statusFilter;

  const matchesType =
    typeFilter === "All" ||
    req.title === typeFilter;

  return (
    matchesSearch &&
    matchesStatus &&
    matchesType
  );
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

    pending: requestsData.filter(
      (r) => r.status === "Pending"
    ).length,

    approved: requestsData.filter(
      (r) => r.status === "Approved"
    ).length,

    totalAmount: requestsData.reduce(
      (sum, r) => sum + (r.amount || 0),
      0
    ),
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading requests...
      </div>
    );
  }
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
          <p className="text-sm text-gray-600">
            Total Requests
          </p>

          <p className="text-2xl font-bold mt-1">
            {stats.total}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">
            Pending
          </p>

          <p className="text-2xl font-bold text-yellow-600 mt-1">
            {stats.pending}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">
            Approved
          </p>

          <p className="text-2xl font-bold text-green-600 mt-1">
            {stats.approved}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">
            Total Amount
          </p>

          <p className="text-2xl font-bold text-blue-600 mt-1">
            KSh {stats.totalAmount.toLocaleString()}
          </p>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow border">

        {/* FILTERS */}
        <div className="p-4 border-b flex flex-col lg:flex-row gap-4">

          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="px-4 py-2 border rounded-lg"
            >
              <option value="All">All Status</option>

              <option value="Pending">
                Pending
              </option>

              <option value="Approved">
                Approved
              </option>

              <option value="Rejected">
                Rejected
              </option>

              <option value="Disbursed">
                Disbursed
              </option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) =>
                setTypeFilter(e.target.value)
              }
              className="px-4 py-2 border rounded-lg"
            >
              <option value="All">All Types</option>

              <option value="Medical">
                Medical
              </option>

              <option value="Education">
                Education
              </option>

              <option value="Emergency">
                Emergency
              </option>

              <option value="Funeral">
                Funeral
              </option>
            </select>
          </div>

        </div>

        {/* REQUESTS */}
        <div className="divide-y">

          {filteredRequests.map((request) => (

            <div
              key={request.id}
              className="p-6 hover:bg-gray-50"
            >
             <button
  onClick={() => approveRequest(request.id)}
  className="bg-green-500 text-white px-3 py-1 rounded"
>
  Approve
</button> 

              <div className="flex items-start justify-between">

                <div className="flex items-start gap-4 flex-1">

                  <div className="mt-1">
                    {getStatusIcon(request.status)}
                  </div>

                  <div className="flex-1">

                    <div className="flex items-center gap-3 mb-2">

                      <h3 className="text-lg font-semibold">
  {request.user?.name || "Unknown User"}
</h3>

                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                          request.status
                        )}`}
                      >
                        {request.status}
                      </span>

                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">

                      <span>
                        Type: {request.requestType}
                      </span>

                      <span>
                        Amount: KSh{" "}
                        {request.amount?.toLocaleString()}
                      </span>

                      <span>
                        Priority: {request.priority}
                      </span>

                    </div>

                    <p className="text-sm text-gray-700">
                      {request.reason}
                    </p>

                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(
                        request.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t">
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {filteredRequests.length}
            </span>{" "}
            of{" "}
            <span className="font-medium">
              {requestsData.length}
            </span>{" "}
            requests
          </p>
        </div>

      </div>

      {/* MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">

            <div className="flex items-center justify-between p-6 border-b">

              <h2 className="text-2xl font-bold">
                Submit Request
              </h2>

              <button
                onClick={() =>
                  setShowSubmitModal(false)
                }
              >
                <X className="w-6 h-6" />
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="p-6 space-y-4"
            >

              <input
  type="number"
  name="userId"
  value={formData.userId}
  onChange={handleChange}
  placeholder="Enter User ID"
  className="w-full px-3 py-2 border rounded-lg"
  required
/>

              <select
                name="requestType"
                value={formData.requestType}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                required
              >
                <option value="">
                  Select Type
                </option>

                <option value="Medical">
                  Medical
                </option>

                <option value="Education">
                  Education
                </option>

                <option value="Emergency">
                  Emergency
                </option>

                <option value="Funeral">
                  Funeral
                </option>
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
                <option value="">
                  Select Priority
                </option>

                <option value="High">
                  High
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="Low">
                  Low
                </option>
              </select>

              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Reason"
                rows={4}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />

              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowSubmitModal(false)
                  }
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