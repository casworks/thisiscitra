import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaArrowLeft, FaUniversity, FaMapMarkerAlt, FaGlobe,
  FaBook, FaLaptopCode, FaFlask, FaUsers, FaChartLine,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';

const KAMPUS = {
  nama:    'Universitas Wijaya Kusuma Surabaya',
  singkat: 'UWKS',
  jurusan: 'Teknik Informatika',
  fakultas:'Fakultas Teknik',
  masuk:   '2021',
  est:     '2027',
  website: 'https://www.uwks.ac.id',
  maps:    'https://maps.google.com/?q=Universitas+Wijaya+Kusuma+Surabaya',
  alamat:  'Jl. Dukuh Kupang XXV No.54, Surabaya',
};

const MATAKULIAH = [
  { group: 'Pemrograman & Rekayasa Perangkat Lunak', Icon: FaLaptopCode, items: ['Algoritma & Pemrograman', 'Pemrograman Web', 'Rekayasa Perangkat Lunak', 'Pemrograman Berorientasi Objek', 'Mobile Computing'] },
  { group: 'Basis Data & Sistem', Icon: FaChartLine,  items: ['Basis Data', 'Sistem Manajemen Basis Data', 'Data Mining', 'Data Warehouse', 'Teknik Informatika Manajemen'] },
  { group: 'Kecerdasan Buatan & Riset', Icon: FaFlask, items: ['Kecerdasan Buatan', 'Machine Learning', 'Metodologi Penelitian', 'Statistika', 'Analisis & Perancangan Sistem'] },
  { group: 'Desain & Interaksi', Icon: FaBook,        items: ['Interaksi Manusia & Komputer', 'Desain UI/UX', 'Grafika Komputer', 'Multimedia'] },
  { group: 'Jaringan & Keamanan', Icon: FaUsers,      items: ['Jaringan Komputer', 'Keamanan Teknik Informatika', 'Cloud Computing', 'Sistem Terdistribusi'] },
];

const PROJECT_MATKUL = [
  {
    matkul: 'Rekayasa Perangkat Lunak',
    name:   'Teknik Informatika Manajemen Inventaris',
    desc:   'Aplikasi web untuk manajemen stok barang. CRUD dengan role-based access control.',
    stack:  ['PHP', 'MySQL', 'Bootstrap'],
    tahun:  '2022',
  },
  {
    matkul: 'Pemrograman Web',
    name:   'Personal Blog & Portfolio',
    desc:   'Website personal responsif. Awal dari eksplorasi frontend yang berlanjut ke React.',
    stack:  ['HTML', 'CSS', 'JavaScript'],
    tahun:  '2022',
  },
  {
    matkul: 'Basis Data',
    name:   'Database Sistem Perpustakaan',
    desc:   'Perancangan ERD, normalisasi, dan implementasi sistem peminjaman buku.',
    stack:  ['MySQL', 'ERD', 'SQL'],
    tahun:  '2022',
  },
  {
    matkul: 'Interaksi Manusia & Komputer',
    name:   'Redesign UI Aplikasi Kampus',
    desc:   'Riset UX dan prototype redesign aplikasi akademik kampus berbasis Figma.',
    stack:  ['Figma', 'UX Research', 'Prototyping'],
    tahun:  '2023',
  },
  {
    matkul: 'Data Mining',
    name:   'Klasifikasi Sentimen Review Produk',
    desc:   'Implementasi Naive Bayes dan SVM untuk klasifikasi sentimen ulasan e-commerce.',
    stack:  ['Python', 'Scikit-learn', 'Pandas'],
    tahun:  '2023',
  },
  {
    matkul: 'Skripsi',
    name:   'Sistem Rekomendasi Restock Cerdas',
    desc:   'Hybrid ML (Random Forest + SVM) untuk UMKM. Integrasi data POS, BMKG, dan kalender Hijri.',
    stack:  ['Python', 'Random Forest', 'SVM', 'BMKG API'],
    tahun:  '2024–2025',
    featured: true,
  },
];

export default function AkademikPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('overview');

  return (
    <div className="mk-page">
      {/* topbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <button type="button" className="mk-pro-btn" onClick={() => navigate('/profesional')}>
          <FaArrowLeft style={{ fontSize: 11 }} /> Kembali
        </button>
        <span style={{ fontSize: 11, color: '#444', letterSpacing: '0.06em' }}>AKADEMIK</span>
      </div>

      {/* hero */}
      <div className="mk-card" style={{ padding: 24, marginBottom: 16 }}>
        <p className="mk-label">Pendidikan formal</p>
        <div style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 500, color: '#f0f0f0', marginBottom: 4 }}>
          {KAMPUS.nama}
        </div>
        <div style={{ fontSize: 13, color: '#7c7cff', marginBottom: 16 }}>
          {KAMPUS.jurusan} · {KAMPUS.fakultas}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
          {[
            { Icon: MdSchool,         label: `Angkatan ${KAMPUS.masuk}` },
            { Icon: FaUniversity,     label: `Est. lulus ${KAMPUS.est}` },
            { Icon: FaMapMarkerAlt,   label: KAMPUS.alamat },
          ].map(({ Icon, label }) => (
            <span key={label} className="mk-inner" style={{ fontSize: 11, color: '#666', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Icon size={11} /> {label}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <a href={KAMPUS.website} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 11, color: '#7c7cff', border: '0.5px solid #3a3a6a', borderRadius: 20, padding: '4px 12px', background: '#1a1a2e', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
            <FaGlobe size={10} /> Website kampus <FaExternalLinkAlt size={8} />
          </a>
          <a href={KAMPUS.maps} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 11, color: '#555', border: '0.5px solid #2a2a2e', borderRadius: 20, padding: '4px 12px', background: '#16161a', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
            <FaMapMarkerAlt size={10} /> Google Maps <FaExternalLinkAlt size={8} />
          </a>
        </div>
      </div>

      {/* tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {[
          { key: 'overview', label: 'Overview' },
          { key: 'matkul',   label: 'Mata Kuliah' },
          { key: 'project',  label: 'Project Matkul' },
          { key: 'kegiatan', label: 'Kegiatan' },
        ].map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            style={{ fontSize: 11, color: tab === key ? '#c8c4ff' : '#555', border: `0.5px solid ${tab === key ? '#4a4a8a' : '#2a2a2e'}`, borderRadius: 20, padding: '5px 13px', background: tab === key ? '#1e1e2e' : '#16161a', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* overview */}
      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
          {[
            { label: 'Program studi', val: KAMPUS.jurusan,      note: KAMPUS.fakultas },
            { label: 'Status',        val: 'Aktif',              note: `Masuk ${KAMPUS.masuk} · Est. lulus ${KAMPUS.est}` },
            { label: 'Kampus',        val: KAMPUS.singkat,       note: KAMPUS.alamat },
            { label: 'Skripsi',       val: 'In progress',        note: 'Hybrid ML untuk UMKM · 2024–2025' },
            { label: 'Target jurnal', val: 'JTIIK · SINTA Q2',  note: 'In progress 2025' },
            { label: 'IPK',           val: '— / 4.00',           note: 'Diisi saat lulus' },
          ].map(({ label, val, note }) => (
            <div key={label} className="mk-inner" style={{ padding: '12px 14px' }}>
              <div style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 500, color: '#e0e0e0' }}>{val}</div>
              <div style={{ fontSize: 10, color: '#555', marginTop: 2 }}>{note}</div>
            </div>
          ))}
        </div>
      )}

      {/* matkul */}
      {tab === 'matkul' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {MATAKULIAH.map(({ group, Icon: GroupIcon, items }) => (
            <div key={group} className="mk-card" style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 10 }}>
                <GroupIcon size={13} style={{ color: '#7c7cff' }} />
                <span style={{ fontSize: 11, color: '#7c7cff', fontWeight: 600, letterSpacing: '0.04em' }}>{group}</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {items.map((item) => (
                  <span key={item} className="mk-inner" style={{ fontSize: 11, color: '#666', padding: '3px 9px' }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* project matkul */}
      {tab === 'project' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
          {PROJECT_MATKUL.map((p) => (
            <div key={p.name} className="mk-card" style={{ padding: 16, position: 'relative', borderColor: p.featured ? '#3a3a6a' : undefined }}>
              {p.featured && (
                <span style={{ fontSize: 9, color: '#7c7cff', border: '0.5px solid #3a3a6a', borderRadius: 8, padding: '2px 7px', background: '#1a1a2e', position: 'absolute', top: 10, right: 10 }}>
                  ⭐ Skripsi
                </span>
              )}
              <div style={{ fontSize: 9, color: '#555', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{p.matkul} · {p.tahun}</div>
              <div style={{ fontSize: 13, color: '#ccc', fontWeight: 500, marginBottom: 5 }}>{p.name}</div>
              <div style={{ fontSize: 11, color: '#555', lineHeight: 1.6, marginBottom: 8 }}>{p.desc}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {p.stack.map((s) => (
                  <span key={s} className="mk-inner" style={{ fontSize: 10, color: '#555', padding: '2px 7px' }}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* kegiatan */}
      {tab === 'kegiatan' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div className="mk-card" style={{ padding: 20, textAlign: 'center', color: '#444' }}>
            <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.4 }}>📷</div>
            <div style={{ fontSize: 12, color: '#555' }}>Foto kegiatan kampus</div>
            <div style={{ fontSize: 11, color: '#3a3a3a', marginTop: 4, lineHeight: 1.6 }}>
              Tersedia · wajah sudah diblur sesuai ketentuan
            </div>
            <div style={{ marginTop: 12, fontSize: 10, color: '#333', border: '0.5px dashed #2a2a2e', borderRadius: 8, padding: '8px 14px', display: 'inline-block' }}>
              Tambahkan foto via edit halaman ini
            </div>
          </div>
          <div className="mk-card" style={{ padding: 16 }}>
            <p className="mk-label">Organisasi & kepanitiaan</p>
            <div style={{ fontSize: 11, color: '#444', lineHeight: 1.8 }}>
              Tambahkan organisasi atau kepanitiaan yang pernah diikuti di sini.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
