import React from 'react';
import { MdEmail } from "react-icons/md";
import { FaSquarePhone } from "react-icons/fa6";


const ContactSection = () => {
  return (
    <section id="contact" className="bg-white mt-40 mb-30">
      <div className="max-w-[1500px] mx-auto grid md:grid-cols-2 gap-10 md:gap-30 px-4 items-start">
        
        {/* LEFT SIDE */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 flex items-center gap-2">
             Contact HealthConnect Team
          </h2>
          <p className=" mb-6">
            Have questions about our medical camps or partnership opportunities?  
            Reach out — our support team is here to help you 24/7.
          </p>

          <div className="space-y-2 ">
            <p className="flex items-center gap-2">
              <MdEmail className="text-primary" />
              support@mcms-health.org
            </p>
            <p className="flex items-center gap-2">
              <FaSquarePhone className="text-primary" />
              +880 1760-208010
            </p>
          </div>
        </div>

        {/* RIGHT SIDE (FORM) */}
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          className="space-y-4"
        >
          <input
            type="hidden"
            name="access_key"
            value="a6c3e03d-5bd2-4ef0-a6f1-9e9ed8fcac6d"
          />

          <div>
            <input
              type="text"
              name="name"
              required
              className="w-full p-3 rounded-lg bg-base-200 border border-gray-700 focus:outline-none "
              placeholder="Your full name"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              required
              className="w-full p-3 rounded-lg bg-base-200 border border-gray-700 focus:outline-none "
              placeholder="Your email address"
            />
          </div>

          <div>
            <textarea
              name="message"
              rows="5"
              required
              className="w-full p-3 rounded-lg bg-base-200 border border-gray-700 focus:outline-none "
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full md:max-w-30 btn btn-primary py-3 px-8 rounded-lg "
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
