import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEmail } from 'react-icons/md';
import {
  FaLinkedinIn, FaGithub, FaWhatsapp,
  FaCode, FaPalette, FaClipboardList, FaChartBar,
  FaHeadset, FaGlobe, FaGraduationCap, FaBook, FaMicrophone,
  FaExternalLinkAlt, FaFileAlt,
} from 'react-icons/fa';

const CV_VARIANTS = [
  { Icon: FaCode,          label: 'IT · Developer',             cv: '/cv/it-cv.html',        ats: '/cv/it-ats.html' },
  { Icon: FaPalette,       label: 'Desain · Kreatif',           cv: '/cv/desain-cv.html',    ats: '/cv/desain-ats.html' },
  { Icon: FaClipboardList, label: 'Administrasi · Sekretaris',  cv: '/cv/admin-cv.html',     ats: '/cv/admin-ats.html' },
  { Icon: FaChartBar,      label: 'Data Entry · Back Office',   cv: '/cv/dataentry-cv.html', ats: '/cv/dataentry-ats.html' },
  { Icon: FaHeadset,       label: 'Customer Service',           cv: '/cv/cs-cv.html',        ats: '/cv/cs-ats.html' },
  { Icon: FaGlobe,         label: 'Virtual Assistant · Remote', cv: null,                    ats: '/cv/va-ats.html' },
  { Icon: FaBook,          label: 'Pengajar · Tutor',           cv: '/cv/pengajar-cv.html',  ats: '/cv/pengajar-ats.html' },
  { Icon: FaMicrophone,    label: 'MC · Presenter',             cv: '/cv/mc-cv.html',        ats: null },
  { Icon: FaChartBar,      label: 'Bisnis · Operasional',       cv: '/cv/bisnis-cv.html',    ats: '/cv/bisnis-ats.html' },
];

const PROJECTS = [
  {
    featured: true,
    badge: 'Featured · Skripsi',
    name: 'Sistem Rekomendasi Restock Cerdas',
    desc: 'Hybrid ML (Random Forest + SVM) untuk UMKM Indonesia. Integrasi data POS, cuaca BMKG, dan kalender nasional Hijri.',
    stack: ['Python', 'Random Forest', 'SVM', 'BMKG API'],
    links: [{ Icon: FaFileAlt, href: '#' }],
  },
  {
    type: 'POS System',
    name: 'Liov POS',
    desc: 'Aplikasi kasir dengan cloud catalog service (Datum). Solo developer, multi-project parallel.',
    stack: ['Laravel', 'MySQL', 'Tailwind'],
    links: [{ Icon: FaGithub, href: '#' }],
  },
  {
    type: 'Web App',
    name: 'Hion',
    desc: 'Personal life management app. Target integrasi dengan Lumi (psychology journal).',
    stack: ['JavaScript', 'API'],
    links: [],
  },
  {
    type: 'Web App',
    name: 'Lumi',
    desc: 'Psychology journal app. Dirancang untuk kesehatan mental, akan terintegrasi dengan Hion.',
    stack: ['UI/UX', 'Laravel'],
    links: [],
  },
  {
    type: 'Cloud Service',
    name: 'Datum · Cloud Produk Katalog',
    desc: 'Layanan cloud catalog terintegrasi dengan Liov POS. Manajemen produk terpusat multi-outlet via REST API.',
    stack: ['REST API', 'Laravel', 'MySQL'],
    links: [],
  },
  {
    type: 'Mini · POS Module',
    name: 'Liov POS — Mini',
    desc: 'Modul kasir ringan untuk UMKM. Transaksi, riwayat, dan laporan harian. Terintegrasi Datum.',
    stack: ['Laravel', 'Tailwind', 'Alpine.js'],
    links: [{ Icon: FaGithub, href: '#' }],
  },
];

const EXPERIENCE = [
  {
    current: true,
    role: 'Solo Developer · Freelance',
    place: 'Independent',
    period: '2022 – Sekarang',
    desc: 'Membangun multiple software project secara paralel. Liov POS, Hion, Lumi, dan personal website.',
  },
  {
    current: false,
    role: 'Peneliti · Skripsi',
    place: 'Universitas Wijaya Kusuma Surabaya',
    period: '2024 – 2025',
    desc: 'Riset sistem rekomendasi restock untuk UMKM berbasis hybrid ML. Target publikasi JTIIK (SINTA Q2).',
  },
];

const ACADEMIC = [
  {
    badge: 'Skripsi · S1',
    title: 'Sistem Rekomendasi Restock Cerdas untuk UMKM Berbasis Hybrid Machine Learning',
    sub: 'UWKS · Teknik Informatika · 2024–2025',
  },
  {
    badge: 'Jurnal · SINTA Q2',
    title: 'Target publikasi JTIIK – metodologi hybrid RF + SVM dengan integrasi BMKG & kalender Hijri',
    sub: 'In progress · 2025',
  },
  {
    badge: 'Pendidikan',
    title: 'S1 Teknik Informatika',
    sub: 'Universitas Wijaya Kusuma Surabaya · Est. lulus 2025',
  },
];

const NAV_TABS = [
  { label: 'Overview',   id: 'sec-overview'   },
  { label: 'Projects',   id: 'sec-projects'   },
  { label: 'Experience', id: 'sec-experience' },
  { label: 'Akademik',   id: 'sec-akademik'   },
];

export default function ProfessionalPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('sec-overview');

  useEffect(() => {
    const observers = [];
    NAV_TABS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveTab(id); },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="pro-pg">
      {/* Top bar */}
      <div className="pro-topbar">
        <span className="pro-logo">
          thisiscitra
        </span>
        <div className="pro-nav">
          {NAV_TABS.map(({ label, id }) => (
            <button
              key={id}
              type="button"
              className={`pro-nav-btn${activeTab === id ? ' active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Bento grid */}
      <div className="pro-bento">

        {/* HERO — Overview */}
        <div id="sec-overview" className="pro-card pro-hero">
          <p className="pro-lbl">Profil profesional</p>
          <div className="pro-open-badge">
            <span className="pro-dot" /> Open to work · Surabaya &amp; remote
          </div>
          <div className="pro-name">Citra Amalia Shiva</div>
          <div className="pro-role">IT · Desain · Administrasi · Akademik</div>
          <p className="pro-bio">
            Mahasiswa tingkat akhir Universitas Wijaya Kusuma Surabaya, jurusan Teknik Informatika.
            Berpengalaman di pengembangan software, riset akademik, dan desain.
            Sedang aktif mencari peluang kerja maupun freelance.
          </p>
          <div className="pro-contacts">
            {[
              { icon: <MdEmail size={13} />, label: 'citraamaliashiva@gmail.com', href: 'mailto:citraamaliashiva@gmail.com' },
              { icon: <FaLinkedinIn size={12} />, label: 'LinkedIn', href: '#' },
              { icon: <FaGithub size={12} />, label: 'GitHub', href: '#' },
              { icon: <FaWhatsapp size={12} />, label: 'WhatsApp', href: '#' },
            ].map(({ icon, label, href }) => (
              <a key={label} href={href} className="pro-pill">{icon} {label}</a>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div className="pro-card pro-sta">
          <p className="pro-lbl">Sekilas</p>
          <div className="pro-sta-grid">
            <div className="pro-sta-box">
              <div className="pro-sta-val">2027</div>
              <div className="pro-sta-lbl">Estimasi lulus</div>
            </div>
            <div className="pro-sta-box">
              <div className="pro-sta-val">3+</div>
              <div className="pro-sta-lbl">Tahun coding</div>
            </div>
            <div className="pro-sta-box">
              <div className="pro-sta-val">S1</div>
              <div className="pro-sta-lbl">Teknik Informatika · UWKS</div>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className="pro-card pro-skl">
          <p className="pro-lbl">Skills &amp; teknologi</p>
          <div className="pro-skl-inner">
            {[
              {
                group: 'Development',
                tags: [
                  { label: 'Python',     hi: true },
                  { label: 'React',        hi: true },
                  { label: 'JavaScript', hi: true },
                  { label: 'Laravel',    hi: false },
                  { label: 'MySQL',      hi: false },
                  { label: 'REST API',   hi: false },
                ],
              },
              {
                group: 'Desain & UI',
                tags: [
                  { label: 'Figma',        hi: true },
                  { label: 'Tailwind CSS', hi: false },
                  { label: 'Canva',        hi: false },
                ],
              },
              {
                group: 'Riset & data',
                tags: [
                  { label: 'Machine Learning', hi: true },
                  { label: 'Random Forest',    hi: false },
                  { label: 'SVM',              hi: false },
                  { label: 'Data Analysis',    hi: false },
                ],
              },
              {
                group: 'Tools',
                tags: [
                  { label: 'Git',               hi: false },
                  { label: 'VS Code',           hi: false },
                  { label: 'Microsoft Office',  hi: false },
                  { label: 'Google Workspace',  hi: false },
                ],
              },
            ].map(({ group, tags }) => (
              <div key={group} className="pro-skl-group">
                <div className="pro-skl-group-lbl">{group}</div>
                <div className="pro-skl-tags">
                  {tags.map(({ label, hi }) => (
                    <span key={label} className={`pro-stag${hi ? ' hi' : ''}`}>{label}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PROJECTS */}
        <div id="sec-projects" className="pro-card pro-prj">
          <p className="pro-lbl">Projects</p>
          <div className="pro-prj-grid">
            {PROJECTS.map((p) => (
              <div key={p.name} className="pro-prj-card">
                {p.featured && <div className="pro-featured-badge">{p.badge}</div>}
                {p.type && <div className="pro-prj-type">{p.type}</div>}
                <div className="pro-prj-name">{p.name}</div>
                <div className="pro-prj-desc">{p.desc}</div>
                <div className="pro-prj-stack">
                  {p.stack.map((s) => <span key={s} className="pro-prj-s">{s}</span>)}
                </div>
                {p.links.length > 0 && (
                  <div className="pro-prj-links">
                    {p.links.map(({ Icon, href }, i) => (
                      <a key={i} href={href} className="pro-prj-link"><Icon size={12} /></a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* EXPERIENCE */}
        <div id="sec-experience" className="pro-card pro-exp">
          <p className="pro-lbl">Pengalaman</p>
          <div className="pro-exp-list">
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="pro-exp-item">
                <div className="pro-exp-dot-col">
                  <div className={`pro-exp-dot${e.current ? ' cur' : ''}`} />
                  {i < EXPERIENCE.length - 1 && <div className="pro-exp-line" />}
                </div>
                <div className="pro-exp-body">
                  <div className="pro-exp-role">{e.role}</div>
                  <div className="pro-exp-place">{e.place}</div>
                  <div className="pro-exp-period">{e.period}</div>
                  <div className="pro-exp-desc">{e.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ACADEMIC */}
        <div id="sec-akademik" className="pro-card pro-aca">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <p className="pro-lbl" style={{ margin: 0 }}>Akademik</p>
            <button
              type="button"
              onClick={() => navigate('/akademik')}
              style={{ fontSize: 10, color: '#7c7cff', background: 'none', border: '0.5px solid #3a3a6a', borderRadius: 20, padding: '3px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              Detail <FaExternalLinkAlt size={8} />
            </button>
          </div>
          <div className="pro-aca-list">
            {ACADEMIC.map((a) => (
              <div
                key={a.badge}
                className="pro-aca-card"
                onClick={() => navigate('/akademik')}
                style={{ cursor: 'pointer' }}
              >
                <span className="pro-aca-badge">{a.badge}</span>
                <div className="pro-aca-title">{a.title}</div>
                <div className="pro-aca-sub">{a.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CV + ATS side by side */}
        <div className="pro-card pro-cv">
          <p className="pro-lbl">Unduh CV / Resume</p>
          <div className="pro-cv-cols">

            {/* CV Foto */}
            <div className="pro-cv-panel">
              <div className="pro-cv-panel-hd">
                <span className="pro-cv-panel-title">CV</span>
                <span className="pro-cv-panel-sub">Desain · foto · visual</span>
              </div>
              {CV_VARIANTS.map(({ Icon, label, cv }) => cv ? (
                <a key={label} href={cv} target="_blank" rel="noopener noreferrer" className="pro-cv-item">
                  <span className="pro-cv-item-icon"><Icon size={12} /></span>
                  <span className="pro-cv-item-lbl">{label}</span>
                  <FaExternalLinkAlt size={9} className="pro-cv-item-arrow" />
                </a>
              ) : (
                <div key={label} className="pro-cv-item disabled">
                  <span className="pro-cv-item-icon"><Icon size={12} /></span>
                  <span className="pro-cv-item-lbl">{label}</span>
                  <span className="pro-cv-item-arrow">—</span>
                </div>
              ))}
            </div>

            <div className="pro-cv-divider" />

            {/* ATS Resume */}
            <div className="pro-cv-panel">
              <div className="pro-cv-panel-hd">
                <span className="pro-cv-panel-title">ATS Resume</span>
                <span className="pro-cv-panel-sub">Plain · ATS-friendly · machine readable</span>
              </div>
              {CV_VARIANTS.map(({ Icon, label, ats }) => ats ? (
                <a key={label} href={ats} target="_blank" rel="noopener noreferrer" className="pro-cv-item ats">
                  <span className="pro-cv-item-icon"><Icon size={12} /></span>
                  <span className="pro-cv-item-lbl">{label}</span>
                  <FaExternalLinkAlt size={9} className="pro-cv-item-arrow" />
                </a>
              ) : (
                <div key={label} className="pro-cv-item disabled">
                  <span className="pro-cv-item-icon"><Icon size={12} /></span>
                  <span className="pro-cv-item-lbl">{label}</span>
                  <span className="pro-cv-item-arrow">—</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
