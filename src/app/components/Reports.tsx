import { useEffect, useState } from "react";
import API from "../../api/api";

import {
  Users,
  DollarSign,
  FileText,
  TrendingUp
} from "lucide-react";

export default function Reports() {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // FETCH REPORTS
  const fetchReports = async () => {
    try {

      const res = await API.get("/reports");

      setData(res.data);

    } catch (error) {

      console.log("Failed to fetch reports", error);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading || !data) {
    return (
      <div className="p-6">
        Loading reports...
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Reports & Analytics
        </h1>

        <p className="text-gray-600 mt-1">
          Real system statistics
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white rounded-lg shadow p-6 border">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-600">
                Total Beneficiaries
              </p>

              <p className="text-2xl font-bold mt-2">
                {data.totalBeneficiaries}
              </p>

            </div>

            <Users className="w-8 h-8 text-blue-600" />

          </div>

        </div>

        <div className="bg-white rounded-lg shadow p-6 border">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-600">
                Total Disbursed
              </p>

              <p className="text-2xl font-bold mt-2">
                KSh {data.totalDisbursed}
              </p>

            </div>

            <DollarSign className="w-8 h-8 text-green-600" />

          </div>

        </div>

        <div className="bg-white rounded-lg shadow p-6 border">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-600">
                Applications
              </p>

              <p className="text-2xl font-bold mt-2">
                {data.totalApplications}
              </p>

            </div>

            <FileText className="w-8 h-8 text-purple-600" />

          </div>

        </div>

        <div className="bg-white rounded-lg shadow p-6 border">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-gray-600">
                Approval Rate
              </p>

              <p className="text-2xl font-bold mt-2">
                {data.approvalRate}%
              </p>

            </div>

            <TrendingUp className="w-8 h-8 text-orange-600" />

          </div>

        </div>

      </div>

    </div>
  );
}