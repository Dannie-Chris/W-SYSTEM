import { useEffect, useState } from "react";
import API from "../../api/api";

export default function Programs() {

  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH PROGRAMS
  const fetchPrograms = async () => {
    try {

      const res = await API.get("/programs");

      setPrograms(res.data);

    } catch (error) {

      console.log("Failed to fetch programs", error);

    } finally {

      setLoading(false);

    }
  };

  // LOAD DATA
  useEffect(() => {
    fetchPrograms();
  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="p-6">
        Loading programs...
      </div>
    );
  }

  return (
    <div className="p-6">

      {/* PAGE HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Programs
        </h1>

        <p className="text-gray-600 mt-2">
          Manage welfare programs
        </p>
      </div>

      {/* PROGRAMS LIST */}
      <div className="space-y-4">

        {programs.map((program) => (

          <div
            key={program.id}
            className="bg-white rounded-lg shadow border p-4"
          >

            <h2 className="text-xl font-bold text-gray-900">
              {program.name}
            </h2>

            <p className="text-gray-600">
              Description: {program.description}
            </p>

            <p className="text-gray-600">
              Budget:
              {" "}
              KSh {program.budget}
            </p>

            <p className="text-gray-600">
              Status: {program.status}
            </p>

            <p className="text-gray-600">
              Created:
              {" "}
              {new Date(
                program.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}