import React, { useState } from 'react';
import { MdEmail, MdLocationOn } from 'react-icons/md';
import { FaMobileAlt, FaGlobe } from 'react-icons/fa';

const CVATS = () => {
  const [language, setLanguage] = useState('id');
  
  // Data for both languages
  const cvData = {
    en: {
      header: {
        name: "Citra Amalia Shiva",
        title: "Informatics Student | Web Developer | Educator",
        contacts: [
          { Icon: MdEmail,      text: "citraamaliashiva.work@gmail.com" },
          { Icon: FaMobileAlt,  text: "+62 897 9876 543" },
          { Icon: FaGlobe,      text: "https://midori.io", link: true },
          { Icon: MdLocationOn, text: "Surabaya, Indonesia" }
        ]
      },
      sections: {
        summary: {
          title: "Professional Summary",
          content: "Informatics student with expertise in web development and education. Experienced in creating responsive web applications and developing AI-based personal assistant technologies."
        },
        skills: {
          title: "Skills",
          categories: [
            {
              name: "Technical",
              items: ["React.js", "Tailwind CSS", "JavaScript", "React", "MySQL", "Django"]
            },
            {
              name: "Languages",
              items: ["English (Professional)", "Indonesian (Native)"]
            }
          ]
        },
        experience: {
          title: "Work Experience",
          items: [
            {
              role: "Frontend Developer Intern",
              company: "Gojek",
              period: "2021",
              details: [
                "Developed UI components using React.js",
                "Collaborated with UX designers"
              ]
            },
            {
              role: "Master Teacher",
              company: "Private Institution",
              period: "2021-Present",
              details: [
                "Teaching programming fundamentals",
                "Curriculum development"
              ]
            }
          ]
        },
        education: {
          title: "Education",
          items: [
            {
              degree: "Informatics Engineering",
              institution: "University of Wijaya Kusuma Surabaya",
              period: "2022-Present"
            }
          ]
        }
      }
    },
    id: {
      header: {
        name: "Citra Amalia Shiva",
        title: "Mahasiswa Informatika | Web Developer | Pengajar",
        contacts: [
          { Icon: MdEmail,      text: "citraamaliashiva.work@gmail.com" },
          { Icon: FaMobileAlt,  text: "+62 897 9876 543" },
          { Icon: FaGlobe,      text: "https://midori.io", link: true },
          { Icon: MdLocationOn, text: "Surabaya, Indonesia" }
        ]
      },
      sections: {
        summary: {
          title: "Ringkasan Profesional",
          content: "Mahasiswa informatika dengan keahlian dalam pengembangan web dan pendidikan. Berpengalaman dalam membuat aplikasi web responsif dan mengembangkan teknologi asisten pribadi berbasis AI."
        },
        skills: {
          title: "Keahlian",
          categories: [
            {
              name: "Teknis",
              items: ["React.js", "Tailwind CSS", "JavaScript", "React", "MySQL", "Django"]
            },
            {
              name: "Bahasa",
              items: ["Inggris (Profesional)", "Indonesia (Native)"]
            }
          ]
        },
        experience: {
          title: "Pengalaman Kerja",
          items: [
            {
              role: "Magang Frontend Developer",
              company: "Gojek",
              period: "2021",
              details: [
                "Mengembangkan komponen UI menggunakan React.js",
                "Bekerja sama dengan desainer UX"
              ]
            },
            {
              role: "Pengajar Master",
              company: "Lembaga Privat",
              period: "2021-Sekarang",
              details: [
                "Mengajar dasar-dasar pemrograman",
                "Pengembangan kurikulum"
              ]
            }
          ]
        },
        education: {
          title: "Pendidikan",
          items: [
            {
              degree: "Teknik Informatika",
              institution: "Universitas Wijaya Kusuma Surabaya",
              period: "2022-Sekarang"
            }
          ]
        }
      }
    }
  };

  const data = cvData[language];

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8 lg:p-10 font-sans bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Language switcher */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
          className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {language === 'id' ? 'Switch to EN' : 'Ganti ke ID'}
        </button>
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{data.header.name}</h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">{data.header.title}</p>
        <div className="mt-4 flex flex-wrap gap-4">
          {data.header.contacts.map((contact, index) => (
            contact.link ? (
              <a 
                key={index}
                href={`https://${contact.text}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <contact.Icon size={14} />
                <span className="underline">{contact.text}</span>
              </a>
            ) : (
              <div key={index} className="flex items-center gap-1 text-gray-700">
                <contact.Icon size={14} />
                <span>{contact.text}</span>
              </div>
            )
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Summary */}
        <section className="space-y-2">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            {data.sections.summary.title}
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.sections.summary.content}
          </p>
        </section>

        {/* Skills */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            {data.sections.skills.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.sections.skills.categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-lg font-medium text-gray-700">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            {data.sections.experience.title}
          </h2>
          <div className="space-y-6">
            {data.sections.experience.items.map((exp, index) => (
              <div key={index} className="space-y-1">
                <div className="flex flex-col md:flex-row md:justify-between">
                  <h3 className="text-lg font-medium text-gray-800">
                    {exp.role} • <span className="text-blue-600">{exp.company}</span>
                  </h3>
                  <span className="text-gray-500 text-sm">{exp.period}</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-1 pl-3">
                  {exp.details.map((detail, detailIndex) => (
                    <li key={detailIndex}>{detail}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-2">
            {data.sections.education.title}
          </h2>
          <div className="space-y-4">
            {data.sections.education.items.map((edu, index) => (
              <div key={index} className="space-y-1">
                <h3 className="text-lg font-medium text-gray-800">
                  {edu.degree} • <span className="text-blue-600">{edu.institution}</span>
                </h3>
                <p className="text-gray-500">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CVATS;
