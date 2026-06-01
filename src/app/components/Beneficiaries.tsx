import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Beneficiaries() {

  const [beneficiaries, setBeneficiaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH BENEFICIARIES
  const fetchBeneficiaries = async () => {
    try {

      const res = await API.get("/beneficiaries");

      setBeneficiaries(res.data);

    } catch (error) {

      console.log("Failed to fetch beneficiaries", error);

    } finally {

      setLoading(false);

    }
  };

  // LOAD DATA
  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="p-6">
        Loading beneficiaries...
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Beneficiaries
        </h1>

        <p className="text-gray-600 mt-2">
          Manage welfare beneficiaries
        </p>
      </div>

      {/* BENEFICIARIES LIST */}
      <div className="space-y-4">

        {beneficiaries.map((beneficiary) => (

          <div
            key={beneficiary.id}
            className="bg-white rounded-lg shadow border p-4"
          >

            <h2 className="text-xl font-bold text-gray-900">
              {beneficiary.name}
            </h2>

            <p className="text-gray-600">
              Email: {beneficiary.email}
            </p>

            <p className="text-gray-600">
              Phone: {beneficiary.phone}
            </p>

            <p className="text-gray-600">
              Relationship: {beneficiary.relationship}
            </p>

            <p className="text-gray-600">
              Added:
              {" "}
              {new Date(
                beneficiary.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}