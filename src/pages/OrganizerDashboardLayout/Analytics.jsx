import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const fetchRegistrations = async (email) => {
  const res = await axios.get(`http://localhost:5000/registrations/participant/${email}`);
  return res.data;
};

const ParticipantAnalytics = () => {
  const { user } = useAuth();

  const { data: registrations = [], isLoading, error } = useQuery({
    queryKey: ["registrations", user?.email],
    queryFn: () => fetchRegistrations(user.email),
    enabled: !!user?.email,
  });

  if (isLoading) return <p>Loading analytics...</p>;
  if (error) return <p className="text-red-500">Error fetching data.</p>;

  const chartData = registrations.map((camp) => ({
    name: camp.campName.length > 15 ? camp.campName.slice(0, 15) + "…" : camp.campName, // shorten long names
    fees: camp.campFees,
  }));

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Camp Analytics</h2>

      {chartData.length === 0 ? (
        <p className="text-gray-500">No registered camps to display.</p>
      ) : (
        <div className="w-full h-[400px] sm:h-[500px] md:h-[400px] lg:h-[450px] bg-white p-4 rounded-lg shadow">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12 }}
                interval={0}
                angle={-35}
                textAnchor="end"
                height={60} // ensures labels don’t get cut off
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="fees" name="Camp Fees ($)" fill="#1d4ed8" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default ParticipantAnalytics;
