import React from "react";
import { Link } from "react-router";

const BlogPreviewSection = () => {
  return (
    <section className="bg-base-300 mt-30  py-20 px-6">
      <div className="max-w-[1500px] mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 font-main">
          Health Awareness Blogs
        </h2>
        <p className=" max-w-2xl mx-auto mb-10">
          Stay informed with health tips and wellness guides from our experts.
          Explore our latest articles on healthcare, prevention, and wellness.
        </p>

        <Link
          to="/blog"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Read All Blogs
        </Link>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
