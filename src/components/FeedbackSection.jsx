import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "./Loading";

const fetchFeedbacks = async () => {
  const res = await axios.get("https://mcms-server-three.vercel.app/feedback");
  return res.data;
};

const FeedbackSection = () => {
  const { data: feedbacks = [], isLoading, error } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
  });

    console.log("Fetched feedbacks:", feedbacks);

  if (isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Error loading feedback.</p>;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1500px] mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          Feedback & Ratings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.length > 0 ? (
            feedbacks.map((fb) => (
              <div
                key={fb._id}
                className="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4 mb-3">
                 
                  <div>
                    <h3 className="font-semibold text-lg">{fb.participantName}</h3>
                    <p className="text-gray-500 text-sm">
                      {new Date(fb.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{fb.feedback}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No feedback available yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
