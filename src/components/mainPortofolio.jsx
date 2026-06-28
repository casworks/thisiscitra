import React, { useState } from "react";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MainPortofolio = () => {
  const [lang, setLang] = useState("id");
const navigate = useNavigate();

  const content = {
    id: {
      title: "Portofolio",
      back: "Kembali",
      sections: {
        features: "Fitur",
        projects: "Proyek",
        products: "Produk",
        business: "Bisnis",
      },
    },
    en: {
      title: "Portfolio",
      back: "Back",
      sections: {
        features: "Features",
        projects: "Projects",
        products: "Products",
        business: "Business",
      },
    },
  };

  const t = content[lang];

  const features = [
    { name: "Fitur A", description: "Deskripsi fitur A" },
    { name: "Fitur B", description: "Deskripsi fitur B" },
  ];

  const projects = [
    {
      name: "POS System",
      description: "Sistem kasir dengan React & Django",
      status: "Development",
      link: "https://github.com/example/pos",
      notes: "Integrasi Google Charts & QRIS",
    },
    {
      name: "Website Budaya",
      description: "Website budaya Nusantara dengan toko online",
      status: "Done",
      link: "https://nusantara.io",
      notes: "Pakai Next.js + Firebase",
    },
  ];

  return (
    <div className="min-h-screen p-6 bg-white text-gray-800 scroll-smooth">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)} // ✅ Kembali ke halaman sebelumnya
          className="flex items-center gap-2 text-sm hover:underline text-indigo-600"
        >
          <ArrowLeft size={16} />
          {t.back}
        </button>


        <div className="space-x-2">
          <button
            className={`px-2 py-1 rounded ${
              lang === "id" ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}
            onClick={() => setLang("id")}
          >
            ID
          </button>
          <button
            className={`px-2 py-1 rounded ${
              lang === "en" ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}
            onClick={() => setLang("en")}
          >
            EN
          </button>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold mb-4">{t.title}</h1>

      {/* Navigation */}
      <div className="flex gap-4 flex-wrap mb-6">
        {Object.entries(t.sections).map(([key, label]) => (
          <a
            key={key}
            href={`#${key}`}
            className="text-indigo-600 hover:underline text-sm"
          >
            {label}
          </a>
        ))}
      </div>

      {/* Sections */}
      <div className="grid gap-8">
        {/* Fitur Section */}
        <section id="features">
          <h2 className="text-xl font-semibold mb-2">{t.sections.features}</h2>
          <div className="grid gap-4">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg shadow-sm bg-gray-50"
              >
                <h3 className="font-bold">{f.name}</h3>
                <p className="text-sm text-gray-600">{f.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <h2 className="text-xl font-semibold mb-2">{t.sections.projects}</h2>
          <div className="grid gap-4">
            {projects.map((p, i) => (
              <div
                key={i}
                className="p-4 border rounded-lg shadow-sm bg-gray-50"
              >
                <h3 className="font-bold">{p.name}</h3>
                <p>{p.description}</p>
                <p className="text-sm italic text-gray-600">
                  Status: {p.status}
                </p>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 text-sm hover:underline"
                >
                  Link
                </a>
                <p className="text-sm mt-2">{p.notes}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section id="products">
          <h2 className="text-xl font-semibold mb-2">{t.sections.products}</h2>
          <p className="text-sm text-gray-600">Belum ada produk yang ditampilkan.</p>
        </section>

        {/* Business Section */}
        <section id="business">
          <h2 className="text-xl font-semibold mb-2">{t.sections.business}</h2>
          <p className="text-sm text-gray-600">Konten bisnis akan ditambahkan nanti.</p>
        </section>
      </div>
    </div>
  );
};

export default MainPortofolio;
