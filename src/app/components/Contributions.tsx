import { useEffect, useState } from "react";
import API from "../../api/api";

import {
  Search,
  Plus,
  Eye,
  Trash2
} from "lucide-react";

export default function Contributions() {

  const [contributions, setContributions] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [selectedUser, setSelectedUser] = useState("");

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // FETCH CONTRIBUTIONS
  const fetchContributions = async () => {
    try {

      const res = await API.get("/contributions");

      setContributions(res.data);

    } catch (error) {

      console.log("Failed to fetch contributions", error);

    } finally {

      setLoading(false);

    }
  };

  // FETCH USERS
  const fetchUsers = async () => {
    try {

      const res = await API.get("/members");

      setUsers(res.data);

    } catch (error) {

      console.log("Failed to fetch users", error);

    }
  };

  useEffect(() => {
    fetchContributions();
    fetchUsers();
  }, []);

  // FILTER
  const filteredContributions = contributions.filter((contribution) => {
    return (
      contribution.user?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||

      contribution.amount
        ?.toString()
        .includes(searchTerm)
    );
  });

  // ADD CONTRIBUTION
  const addContribution = async () => {

    if (!selectedUser) {
      alert("Please select a member");
      return;
    }

    try {

      const res = await API.post("/contributions", {
        userId: Number(selectedUser),
        month: "May",
        year: 2026,
        amount: 500,
        paymentStatus: "Paid",
        paymentMethod: "Mpesa",
        reference: "ABC123",
      });

      console.log(res.data);

      alert("Contribution added!");

      fetchContributions();

    } catch (error) {

      console.error("POST error:", error);

    }
  };

  if (loading) {
    return (
      <div className="p-6">
        Loading contributions...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Contributions
          </h1>

          <p className="text-gray-600 mt-1">
            Manage member contributions
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* MEMBER SELECT */}
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="border px-4 py-2 rounded-lg"
          >
            <option value="">
              Select Member
            </option>

            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {/* BUTTON */}
          <button
            onClick={addContribution}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-5 h-5" />
            Add Contribution
          </button>

        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">
            Total Contributions
          </p>

          <p className="text-2xl font-bold text-blue-600 mt-1">
            {contributions.length}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">
            Total Amount
          </p>

          <p className="text-2xl font-bold text-green-600 mt-1">
            KSh {
              contributions
                .reduce((sum, c) => sum + c.amount, 0)
                .toLocaleString()
            }
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-4 border">
          <p className="text-sm text-gray-600">
            Active Payments
          </p>

          <p className="text-2xl font-bold text-purple-600 mt-1">
            {
              contributions.filter(c => c.amount > 0).length
            }
          </p>
        </div>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-lg shadow border">

        {/* SEARCH */}
        <div className="p-4 border-b">

          <div className="relative">

            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search contribution..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />

          </div>

        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-50">

              <tr>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Contribution ID
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Member
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-200 bg-white">

              {filteredContributions.map((contribution) => (

                <tr
                  key={contribution.id}
                  className="hover:bg-gray-50"
                >

                  <td className="px-6 py-4">
                    CONTR-{contribution.id}
                  </td>

                  <td className="px-6 py-4">
                    {contribution.user?.name}
                  </td>

                  <td className="px-6 py-4">
                    KSh {contribution.amount}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(contribution.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center gap-3">

                      <button className="text-blue-600">
                        <Eye className="w-4 h-4" />
                      </button>

                      <button className="text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}