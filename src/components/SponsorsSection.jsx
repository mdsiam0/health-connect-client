import React from "react";

const partners = [
  { name: "Square Pharmaceuticals", url: "https://www.squarepharma.com.bd/" },
  { name: "Beximco Pharma", url: "https://www.beximco-pharma.com/" },
  { name: "Renata Ltd.", url: "https://www.renata-ltd.com/" },
  { name: "Healthcare Pharmaceuticals", url: "https://www.hplbd.com/index.php#" },
];

const SponsorsSection = () => {
  return (
    <section id="partners" className="py-20 px-6  ">
      <div className="max-w-[1300px] mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8 font-main">
          Our Sponsors & Partners
        </h2>
        <p className=" mb-12">
          We are proud to collaborate with leading health organizations in Bangladesh to bring better care & outreach.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-base-200 py-4 px-6 rounded-lg shadow hover:shadow-lg transition hover:bg-base-300"
            >
              <p className="font-semibold text-lg">{partner.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
