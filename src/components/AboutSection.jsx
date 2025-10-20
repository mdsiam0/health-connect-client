import React from "react";
import { FaHeartbeat, FaUsers, FaChartLine } from "react-icons/fa";

const AboutSection = () => {
  return (
    <section id="about" className="mt-30">
      <div className="max-w-[1500px] mx-auto  text-center px-4">
        <h2 className="text-4xl font-bold mb-4">About HealthConnect</h2>
        <p className=" max-w-3xl mx-auto mb-10">
          HealthConnect is a modern Medical Camp Management System built to bridge the gap 
          between organizers, healthcare professionals, 
          and participants.  
          Our goal is to make organizing and joining medical camps effortless, transparent, 
          and impactful for communities everywhere.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {/* CARD 1 */}
          <div className="bg-base-200 rounded-2xl p-8 hover:scale-105 transition-transform duration-300 shadow-lg">
            <FaHeartbeat className="text-blue-400 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
            <p >
              To simplify healthcare access by connecting patients with medical camps 
              organized by professionals who care. HealthConnect helps communities 
              stay informed, healthy, and supported.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-base-200 rounded-2xl p-8 hover:scale-105 transition-transform duration-300 shadow-lg">
            <FaUsers className="text-green-400 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">What We Do</h3>
            <p>
              We empower organizers to manage camps efficiently — from registrations 
              and payments to participant analytics — while giving participants a 
              seamless experience joining, paying, and sharing feedback.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-base-200 rounded-2xl p-8 hover:scale-105 transition-transform duration-300 shadow-lg">
            <FaChartLine className="text-purple-400 text-5xl mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
            <p >
              We aim to build a transparent and data-driven ecosystem for medical 
              camp management — where every participant’s health journey matters, 
              and every organizer’s impact is measurable.
            </p>
          </div>
        </div>

        <div className="mt-12  text-sm">
          <p>
            🌍 Empowering communities with accessible healthcare — one camp at a time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
