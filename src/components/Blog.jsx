import React from "react";
import { Link } from "react-router";

const blogs = [
  {
    id: 1,
    title: "How to Prepare for a Health Checkup",
    description:
      "Learn how to make the most out of your next medical camp visit with these simple preparation tips.",
    image: "https://i.ibb.co/FqgcDfs/healthcheck.jpg",
  },
  {
    id: 2,
    title: "Top 5 Benefits of Attending Medical Camps",
    description:
      "Discover the key health and community benefits of participating in medical camps.",
    image: "https://i.ibb.co/4N7w1nR/benefits.jpg",
  },
  {
    id: 3,
    title: "How Regular Screenings Can Save Lives",
    description:
      "Regular health screenings help detect diseases early. Here’s why they’re essential.",
    image: "https://i.ibb.co/jzPhDYJ/screening.jpg",
  },
];

const Blog = () => {
  return (
    <section className=" mt-10  py-16 px-6">
      <div className="max-w-[1500px] mx-auto px-4">
        <h2 className="text-4xl font-bold mb-10 text-center font-main">
          Health Awareness Articles
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-base-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-semibold">{blog.title}</h3>
                <p className=" text-sm">{blog.description}</p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-blue-400 hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
