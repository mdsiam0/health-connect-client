import React from "react";
import { useParams, Link } from "react-router";

const blogData = {
  1: {
    title: "How to Prepare for a Health Checkup",
    content: `
      Preparing for a medical checkup can make your experience smoother and more accurate.
      - Get enough sleep before the test day.
      - Avoid heavy meals and caffeine before fasting tests.
      - Bring your medical records and prescriptions.
      - Stay hydrated and wear comfortable clothes.
      Attending medical camps prepared ensures better diagnosis and care!
    `,
  },
  2: {
    title: "Top 5 Benefits of Attending Medical Camps",
    content: `
      Medical camps provide several benefits:
      1️⃣ Free or low-cost health screenings
      2️⃣ Early detection of chronic diseases
      3️⃣ Health education and awareness
      4️⃣ Access to expert advice
      5️⃣ Community bonding over shared wellness goals
      Participating actively helps you and others stay healthy.
    `,
  },
  3: {
    title: "How Regular Screenings Can Save Lives",
    content: `
      Regular health screenings detect health issues early.
      Early detection allows treatment before complications arise,
      preventing severe illnesses like diabetes, hypertension, or cancer.
      Stay proactive—schedule regular medical camp visits to protect your health!
    `,
  },
};

const BlogDetails = () => {
  const { id } = useParams();
  const blog = blogData[id];

  if (!blog) {
    return (
      <div className="text-center text-white py-20">
        <h2 className="text-3xl font-bold mb-4">Blog Not Found</h2>
        <Link to="/blog" className="text-blue-400 underline">
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <section className=" mt-10 py-16 px-6">
      <div className="max-w-[1000px] mx-auto">
        <h2 className="text-4xl font-bold mb-6 font-main">{blog.title}</h2>
        <p className=" whitespace-pre-line leading-relaxed">
          {blog.content}
        </p>

        <div className="mt-10">
          <Link
            to="/blog"
            className="text-primary hover:underline text-sm flex items-center gap-1"
          >
            ← Back to All Articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
