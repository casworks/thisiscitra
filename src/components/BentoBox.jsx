import React, { useState, useEffect } from 'react';
import {
  FaYoutube, FaInstagram, FaTiktok,
  FaCamera, FaMusic, FaBook, FaLaptop, FaPalette,
  FaBriefcase,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { WishlistContent } from './WishlistPage';

/* ── World clock data ─────────────────────────────────────────────── */
const LOCATIONS = [
  { id: 'jkt', flag: '🇮🇩', city: 'Jakarta',   tz: 'Asia/Jakarta' },
  { id: 'nzl', flag: '🇳🇿', city: 'Auckland',  tz: 'Pacific/Auckland' },
  { id: 'nyc', flag: '🇺🇸', city: 'New York',  tz: 'America/New_York' },
  { id: 'ber', flag: '🇩🇪', city: 'Berlin',    tz: 'Europe/Berlin' },
];

function formatClock(tz) {
  const now = new Date();
  const time = now.toLocaleTimeString('id-ID', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false });
  const date = now.toLocaleDateString('id-ID', { timeZone: tz, weekday: 'short', day: 'numeric', month: 'short' });
  return { time, date };
}

function useTimes() {
  const [times, setTimes] = useState({});
  useEffect(() => {
    const update = () => {
      const next = {};
      LOCATIONS.forEach((l) => { next[l.id] = formatClock(l.tz); });
      setTimes(next);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return times;
}

/* ── Content strings ─────────────────────────────────────────────── */
const T = {
  id: {
    proBtn: 'Lihat sisi profesional',
    hello: 'Halo!',
    name: 'Citra Amalia Shiva',
    tagline: 'Developer · mahasiswi · sedang membangun sesuatu dari nol.\nSelamat datang di sudut personal saya di internet.',
    location: 'Surabaya, Indonesia',
    worldClock: 'Waktu dunia',
    gallery: 'Personality gallery',
    galleryItems: ['Foto', 'Musik', 'Bacaan', 'Setup', 'Estetika'],
    social: 'Konten & sosial',
    hobby: 'Hobi & minat',
    hobbies: ['Coding', 'Desain UI', 'Menulis', 'Traveling', 'Fotografi', 'Musik', 'Riset'],
    now: 'Sekarang lagi',
    nowItems: [
      { label: 'Kuliah',    value: 'Semester akhir · skripsi', accent: true },
      { label: 'Dengerin',  value: 'Spotify' },
      { label: 'Bacaan',    value: 'Alpha Woman' },
      { label: 'Status',    value: 'Sedang bangkit', live: true },
    ],
  },
  en: {
    proBtn: 'Professional side',
    hello: 'Hey!',
    name: 'Citra Amalia Shiva',
    tagline: 'Developer · student · building things from scratch.\nWelcome to my personal corner of the internet.',
    location: 'Surabaya, Indonesia',
    worldClock: 'World clock',
    gallery: 'Personality gallery',
    galleryItems: ['Photo', 'Music', 'Reading', 'Setup', 'Aesthetic'],
    social: 'Content & social',
    hobby: 'Hobbies & interests',
    hobbies: ['Coding', 'UI Design', 'Writing', 'Traveling', 'Photography', 'Music', 'Research'],
    now: 'Right now',
    nowItems: [
      { label: 'Study',       value: 'Final semester · thesis', accent: true },
      { label: 'Listening',   value: 'Spotify' },
      { label: 'Reading',     value: 'Alpha Woman' },
      { label: 'Status',      value: 'Rising up', live: true },
    ],
  },
};

const GALLERY_ICONS = [FaCamera, FaMusic, FaBook, FaLaptop, FaPalette];

/* ── Small reusable pieces ───────────────────────────────────────── */
function Label({ children }) {
  return <p className="mk-label">{children}</p>;
}

function ProBtn({ label }) {
  const navigate = useNavigate();
  return (
    <button type="button" className="mk-pro-btn" onClick={() => navigate('/profesional')}>
      <FaBriefcase style={{ fontSize: 13 }} />
      {label}
    </button>
  );
}

function LangBtn({ lang, setLang }) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {['id', 'en'].map((l) => (
        <button
          key={l}
          type="button"
          className={`mk-lang-btn ${lang === l ? 'active' : ''}`}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

/* ── PERSONAL MODE ───────────────────────────────────────────────── */
function PersonalView({ t, times, lang }) {
  return (
    <>
      <div className="mk-grid">

        {/* Hero */}
        <div className="mk-card mk-hero" style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>{t.hello}</Label>
          <p style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 500, color: '#f0f0f0', lineHeight: 1.2, marginBottom: 6 }}>
            {t.name}
          </p>
          <p style={{ fontSize: 'clamp(12px, 1.3vw, 13px)', color: '#666', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
            {t.tagline}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#555', marginTop: 'auto', paddingTop: 16 }}>
            <span className="dot-live" />
            <span>{t.location}</span>
          </div>
        </div>

        {/* World Clock */}
        <div className="mk-card mk-clock" style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>{t.worldClock}</Label>
          <div className="mk-clock-body">
            {LOCATIONS.map((loc) => (
              <div
                key={loc.id}
                className="mk-inner"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', minHeight: 44 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14 }}>{loc.flag}</span>
                  <span style={{ fontSize: 'clamp(10px, 1.1vw, 11px)', color: '#666', letterSpacing: '0.04em' }}>{loc.city}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 500, color: '#e0e0e0', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.02em' }}>
                    {times[loc.id]?.time ?? '--:--'}
                  </div>
                  <div style={{ fontSize: 10, color: '#444' }}>{times[loc.id]?.date ?? '—'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Personality Gallery */}
        <div className="mk-card mk-gallery" style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>{t.gallery}</Label>
          <div className="gallery-grid">
            {GALLERY_ICONS.map((Icon, i) => (
              <div
                key={i}
                className="mk-inner"
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, cursor: 'pointer', minHeight: 80 }}
              >
                <Icon style={{ fontSize: 20, color: '#555' }} />
                <span style={{ fontSize: 9, color: '#444', letterSpacing: '0.04em' }}>{t.galleryItems[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Social & Konten */}
        <div className="mk-card mk-social" style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>{t.social}</Label>
          <div className="mk-social-body">
            {[
              { Icon: FaYoutube,   color: '#ff4444', name: 'YouTube',   handle: '@citraamalia', href: 'https://youtube.com' },
              { Icon: FaInstagram, color: '#c13584', name: 'Instagram', handle: '@citraamalia', href: 'https://instagram.com' },
              { Icon: FaTiktok,    color: '#aaa',    name: 'TikTok',    handle: '@citraamalia', href: 'https://tiktok.com' },
            ].map(({ Icon, color, name, handle, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mk-inner"
                style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', textDecoration: 'none' }}
              >
                <Icon style={{ fontSize: 16, color, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, color: '#bbb' }}>{name}</div>
                  <div style={{ fontSize: 11, color: '#444' }}>{handle}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Hobi & Minat */}
        <div className="mk-card mk-hobby" style={{ display: 'flex', flexDirection: 'column' }}>
          <Label>{t.hobby}</Label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignContent: 'flex-start' }}>
            {t.hobbies.map((h) => (
              <span key={h} className="mk-tag">{h}</span>
            ))}
          </div>
        </div>

      </div>

      {/* Wishlist & now — below grid */}
      <div style={{ marginTop: 20 }}>
        <WishlistContent lang={lang} />
      </div>
    </>
  );
}

/* ── ROOT ────────────────────────────────────────────────────────── */
export default function BentoGrid() {
  const [lang, setLang] = useState('id');
  const times = useTimes();
  const t = T[lang];

  return (
    <div className="mk-page">
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <span style={{ fontSize: 15, fontWeight: 500, color: '#e8e8e8', letterSpacing: '0.02em' }}>
          thisiscitra
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LangBtn lang={lang} setLang={setLang} />
          <ProBtn label={t.proBtn} />
        </div>
      </div>

      <PersonalView t={t} times={times} lang={lang} />
    </div>
  );
}
