import React, { useState } from "react";

export default function CVATSReact() {
  const [lang, setLang] = useState("en");

  const cvData = {
    en: {
      summary:
        "An informatics student with a strong interest in web development, education, and Indonesian culture. And also develop POS cashier apps and AI-based personal assistant technology.",
      experience: [
        {
          title: "Senior Software Engineer",
          company: "Tech Solutions Inc.",
          date: "Jan 2020 - Present",
          description: [
            "Lead development of customer-facing web applications using React and Node.js",
            "Implemented CI/CD pipelines reducing deployment time by 40%",
            "Mentored junior developers and conducted code reviews"
          ]
        },
        {
          title: "Software Engineer",
          company: "Digital Innovations LLC",
          date: "Jun 2017 - Dec 2019",
          description: [
            "Developed and maintained RESTful APIs using Express.js",
            "Collaborated with UX team to implement responsive designs",
            "Optimized database queries improving performance by 30%"
          ]
        }
      ],
      education: [
        {
          degree: "Master of Computer Science",
          school: "University of Technology",
          date: "2015 - 2017"
        },
        {
          degree: "Bachelor of Science in IT",
          school: "State University",
          date: "2011 - 2015"
        }
      ],
      skills: {
        technical: ["JavaScript", "React.js", "Node.js", "Express", "MongoDB", "SQL", "Git", "Docker", "AWS", "CI/CD"],
        language: ["English (Professional)", "Indonesian (Native)"],
        design: ["Figma", "Adobe XD", "Canva", "CapCut"],
        other: ["Public Speaking", "Team Collaboration", "Problem Solving"]
      },
      sections: {
        summary: "Professional Summary",
        experience: "Work Experience",
        education: "Education",
        skills: "Skills"
      }
    },
    id: {
      summary:
        "Seorang mahasiswa informatika dengan minat besar dalam pengembangan web, edukasi, dan budaya Nusantara. Dan juga mengembangkan aplikasi kasir POS dan teknologi personal assistant berbasis AI.",
      experience: [
        {
          title: "Senior Software Engineer",
          company: "Tech Solutions Inc.",
          date: "Jan 2020 - Sekarang",
          description: [
            "Memimpin pengembangan aplikasi web untuk pelanggan menggunakan React dan Node.js",
            "Mengimplementasikan pipeline CI/CD yang mengurangi waktu deployment sebesar 40%",
            "Membimbing pengembang junior dan melakukan code review"
          ]
        },
        {
          title: "Software Engineer",
          company: "Digital Innovations LLC",
          date: "Jun 2017 - Des 2019",
          description: [
            "Mengembangkan dan memelihara API RESTful menggunakan Express.js",
            "Bekerja sama dengan tim UX untuk menerapkan desain responsif",
            "Mengoptimalkan query database sehingga meningkatkan performa sebesar 30%"
          ]
        }
      ],
      education: [
        {
          degree: "Magister Ilmu Komputer",
          school: "Universitas Teknologi",
          date: "2015 - 2017"
        },
        {
          degree: "Sarjana Sains di bidang TI",
          school: "Universitas Negeri",
          date: "2011 - 2015"
        }
      ],
      skills: {
        technical: ["JavaScript", "React.js", "Node.js", "Express", "MongoDB", "SQL", "Git", "Docker", "AWS", "CI/CD"],
        language: ["Bahasa Inggris (Profesional)", "Bahasa Indonesia (Penutur Asli)"] ,
        design: ["Figma", "Adobe XD", "Canva", "CapCut"],
        other: ["Public Speaking", "Kolaborasi Tim", "Penyelesaian Masalah"]
      },
      sections: {
        summary: "Ringkasan Profesional",
        experience: "Pengalaman Kerja",
        education: "Pendidikan",
        skills: "Keahlian"
      }
    }
  };

  const data = cvData[lang];

  return (
    <div className="max-w-3xl mx-auto bg-white shadow p-8 font-sans text-gray-800">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-blue-900">Citra Amalia Shiva</h1>
        <button
          className="text-sm px-3 py-1 bg-blue-100 text-blue-800 rounded"
          onClick={() => setLang(lang === "en" ? "id" : "en")}
        >
          Switch to {lang === "en" ? "Indonesia" : "English"}
        </button>
      </div>
      <h2 className="text-lg text-gray-600 mb-2">
        {lang === 'id'
            ? 'Mahasiswa Informatika | Web Developer | Pengajar'
            : 'Informatics Student | Web Developer | Educator'
        }
      </h2>
      <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-700">
        <span>📧 <a href="mailto:citraamaliashiva.work@gmail.com">citraamaliashiva.work@gmail.com</a></span>

        <span>📞 <a href="https://wa.me/6285182290591">+62 851 8229 0591</a></span>
        <span>📍 <a href="https://maps.app.goo.gl/6AtQTNC2oRhStMcg9">
          {lang === 'id'
            ? 'Surabaya, Jawa Timur'
            : 'Surabaya, East Java'
          }</a></span>
        <span>🔗 <a href="https://www.linkedin.com/in/citraamaliashiva/">citraamaliashiva</a></span>
      </div>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-blue-600 border-b pb-1 mb-2">
          {data.sections.summary}
        </h3>
        <p>{data.summary}</p>
      </section>

        <section className="mb-6">
                <h3 className="text-xl font-semibold text-blue-600 border-b pb-1 mb-2">
                {data.sections.skills}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm">
                <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Technical</h4>
                    <div className="flex flex-wrap gap-2">
                    {data.skills.technical.map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">{skill}</span>
                    ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                    {data.skills.language.map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">{skill}</span>
                    ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Design Tools</h4>
                    <div className="flex flex-wrap gap-2">
                    {data.skills.design.map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">{skill}</span>
                    ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Other</h4>
                    <div className="flex flex-wrap gap-2">
                    {data.skills.other.map((skill, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">{skill}</span>
                    ))}
                    </div>
                </div>
                </div>
      </section>
      
      <section className="mb-6">
        <h3 className="text-xl font-semibold text-blue-600 border-b pb-1 mb-2">
          {data.sections.experience}
        </h3>
        {data.experience.map((exp, idx) => (
          <div key={idx} className="mb-4">
            <h4 className="font-bold text-md">{exp.title}</h4>
            <p className="text-sm font-medium text-gray-800">{exp.company}</p>
            <p className="text-sm text-gray-500">{exp.date}</p>
            <ul className="list-disc list-inside text-sm text-gray-700 mt-1 ml-4">
              {exp.description.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold text-blue-600 border-b pb-1 mb-2">
          {data.sections.education}
        </h3>
        {data.education.map((edu, idx) => (
          <div key={idx} className="mb-3">
            <p className="font-bold text-md">{edu.degree}</p>
            <p className="text-sm font-medium text-gray-800">{edu.school}</p>
            <p className="text-sm text-gray-500">{edu.date}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
