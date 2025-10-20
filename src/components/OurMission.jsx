// src/components/OurMission.jsx
import React from "react";
import CountUp from "react-countup";

const stats = [
  {
    label: "Volunteers",
    target: 150,
    suffix: "+",
    icon: "👥",
    color: "text-green-500",
  },
  {
    label: "Successful Camps",
    target: 50,
    suffix: "+",
    icon: "🏥",
    color: "text-blue-500",
  },
  {
    label: "Lives Touched",
    target: 10000,
    suffix: "+",
    icon: "❤️",
    color: "text-red-500",
  },
];

const StatisticCard = ({ stat }) => {
  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl transition duration-300 transform hover:scale-[1.03] flex flex-col items-center text-center border-b-4 border-t-2 border-gray-100">
      <div
        className={`text-5xl mb-4 ${stat.color} p-2 bg-gray-50 rounded-full inline-block shadow-inner`}
      >
        {stat.icon}
      </div>
      <div className="text-sm font-semibold uppercase text-gray-500 tracking-wider mb-2">
        {stat.label}
      </div>
      <div className="text-4xl md:text-5xl font-extrabold text-gray-800">
        <CountUp
          start={0}
          end={stat.target}
          duration={2.5}
          separator=","
          suffix={stat.suffix}
          enableScrollSpy
          scrollSpyDelay={100}
        />
      </div>
    </div>
  );
};

const OurMission = () => {
  return (
    <section id="impact-stats" className="mb-30 mt-30">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
        Our Mission in Action
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        A glimpse into the growing impact we are making in the community through
        dedicated medical camps.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1500px] px-4 mx-auto">
        {stats.map((stat, index) => (
          <StatisticCard key={index} stat={stat} />
        ))}
      </div>
    </section>
  );
};

export default OurMission;
