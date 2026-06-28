import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaArrowLeft, FaChevronDown, FaMapMarkerAlt,
  FaMoon, FaMobileAlt, FaLaptop, FaCamera,
  FaHome, FaUtensils, FaCar, FaTshirt, FaMosque,
  FaGlobeEurope,
} from 'react-icons/fa';
import { MdTempleHindu } from 'react-icons/md';

/* ── Data ─────────────────────────────────────────────────────────── */
const PRIORITY = {
  dream:   { color: '#7c7cff', label: { id: 'Impian besar',  en: 'Big dream'   } },
  soon:    { color: '#4ade80', label: { id: 'Ingin segera',  en: 'Want soon'   } },
  someday: { color: '#888',    label: { id: 'Suatu hari',    en: 'Someday'     } },
};

/* travel items that have detail pages */
const TRAVEL_SLUGS = { japan: true, middleeast: true, europe: true };

const WISH_ITEMS = [
  {
    id: 'japan',
    cat: 'travel',
    Icon: MdTempleHindu,
    name:    { id: 'Jepang',        en: 'Japan'          },
    sub:     { id: 'Impian terbesar', en: 'Biggest dream' },
    priority: 'dream',
    expandable: true,
    detail: {
      id: {
        destinasi: 'Tokyo, Kyoto, Osaka',
        spot: 'Fushimi Inari, Shibuya Crossing, Arashiyama',
        kuliner: 'Ramen Ichiran, matcha Uji, takoyaki Dotonbori',
      },
      en: {
        destinasi: 'Tokyo, Kyoto, Osaka',
        spot: 'Fushimi Inari, Shibuya Crossing, Arashiyama',
        kuliner: 'Ramen Ichiran, matcha Uji, takoyaki Dotonbori',
      },
      budget: [
        { key: 'a', id: 'Plan A · full trip', en: 'Plan A · full trip' },
        { key: 'b', id: 'Plan B · 10 hari',   en: 'Plan B · 10 days'   },
        { key: 'c', id: 'Plan C · 5 hari',    en: 'Plan C · 5 days'    },
      ],
    },
  },
  {
    id: 'middleeast',
    cat: 'travel',
    Icon: FaMosque,
    name:    { id: 'Timur Tengah',             en: 'Middle East'         },
    sub:     { id: 'Dubai · Qatar · Turki',    en: 'Dubai · Qatar · Turkey' },
    priority: 'dream',
    expandable: true,
    detail: {
      id: {
        spot: 'Burj Khalifa, Cappadocia, Blue Mosque',
        kuliner: 'Shawarma Istanbul, mandi Dubai, kanafeh',
      },
      en: {
        spot: 'Burj Khalifa, Cappadocia, Blue Mosque',
        kuliner: 'Shawarma Istanbul, mandi Dubai, kunafa',
      },
      budget: [
        { key: 'a', id: 'Plan A · 3 negara', en: 'Plan A · 3 countries' },
        { key: 'b', id: 'Plan B · Turki only', en: 'Plan B · Turkey only' },
        { key: 'c', id: 'Plan C · Dubai only', en: 'Plan C · Dubai only'  },
      ],
    },
  },
  {
    id: 'europe',
    cat: 'travel',
    Icon: FaGlobeEurope,
    name:    { id: 'Eropa',            en: 'Europe'        },
    sub:     { id: 'Suatu hari nanti', en: 'Someday'       },
    priority: 'someday',
    expandable: true,
    detail: {
      id: {
        destinasi: 'Paris, Roma, Amsterdam, Swiss',
        spot: 'Eiffel, Colosseum, tulip fields',
        kuliner: 'Croissant Paris, gelato Roma, stroopwafel',
      },
      en: {
        destinasi: 'Paris, Rome, Amsterdam, Switzerland',
        spot: 'Eiffel Tower, Colosseum, tulip fields',
        kuliner: 'Paris croissant, Roman gelato, stroopwafel',
      },
      budget: [
        { key: 'a', id: 'Plan A · 4 negara', en: 'Plan A · 4 countries' },
        { key: 'b', id: 'Plan B · 2 negara', en: 'Plan B · 2 countries' },
        { key: 'c', id: 'Plan C · 1 negara', en: 'Plan C · 1 country'   },
      ],
    },
  },
  {
    id: 'haji',
    cat: 'ibadah',
    Icon: FaMoon,
    name:  { id: 'Naik Haji',                    en: 'Hajj Pilgrimage'          },
    sub:   { id: 'Impian tulus · dalam doa',      en: 'Sincere dream · in prayer' },
    priority: 'dream',
    expandable: false,
  },
  {
    id: 'iphone',
    cat: 'tech',
    Icon: FaMobileAlt,
    name:  { id: 'iPhone terbaru',                    en: 'Latest iPhone'              },
    sub:   { id: 'Di tahun itu, versi terbaru',        en: 'Latest version at that time' },
    priority: 'soon',
    expandable: false,
  },
  {
    id: 'macbook',
    cat: 'tech',
    Icon: FaLaptop,
    name:  { id: 'MacBook + setup konten',         en: 'MacBook + content setup'  },
    sub:   { id: 'MacBook Pro · mic · ring light', en: 'MacBook Pro · mic · ring light' },
    priority: 'soon',
    expandable: false,
  },
  {
    id: 'digicam',
    cat: 'tech',
    Icon: FaCamera,
    name:  { id: 'Digicam Olympus FE',    en: 'Olympus FE digicam'   },
    sub:   { id: 'Aesthetic film look',   en: 'Aesthetic film look'  },
    priority: 'soon',
    expandable: false,
  },
  {
    id: 'house',
    cat: 'home',
    Icon: FaHome,
    name:  { id: 'Rumah impian',                                    en: 'Dream house'                      },
    sub:   { id: 'Modern arsi · walk-in closet · bathtub · area konten', en: 'Modern archi · walk-in closet · bathtub · content space' },
    priority: 'dream',
    expandable: false,
  },
  {
    id: 'kitchen',
    cat: 'home',
    Icon: FaUtensils,
    name:  { id: 'Dapur impian',           en: 'Dream kitchen'       },
    sub:   { id: 'Clean aesthetic · fungsional', en: 'Clean aesthetic · functional' },
    priority: 'dream',
    expandable: false,
  },
  {
    id: 'car',
    cat: 'life',
    Icon: FaCar,
    name:  { id: 'Honda HR-V',                      en: 'Honda HR-V'               },
    sub:   { id: 'Atau versi terbaru di tahun itu', en: 'Or latest version at that time' },
    priority: 'dream',
    expandable: false,
  },
  {
    id: 'fashion',
    cat: 'life',
    Icon: FaTshirt,
    name:  { id: 'Fashion & lifestyle',       en: 'Fashion & lifestyle'    },
    sub:   { id: 'Tas · sepatu · skincare · makeup', en: 'Bag · shoes · skincare · makeup' },
    priority: 'soon',
    expandable: false,
  },
];

const TABS = [
  { key: 'all',    id: 'Semua',         en: 'All'           },
  { key: 'travel', id: 'Traveling',     en: 'Traveling'     },
  { key: 'tech',   id: 'Teknologi',     en: 'Technology'    },
  { key: 'home',   id: 'Rumah & Dapur', en: 'Home & Kitchen'},
  { key: 'life',   id: 'Gaya Hidup',    en: 'Lifestyle'     },
  { key: 'ibadah', id: 'Ibadah',        en: 'Worship'       },
];

const NOW_ITEMS = [
  { key: 'kuliah',   id: { label: 'Kuliah',  value: 'Semester akhir · skripsi'               }, en: { label: 'Study',    value: 'Final semester · thesis'              }, accent: true },
  { key: 'dengerin', id: { label: 'Dengerin',value: 'Spotify'   }, en: { label: 'Listening',value: 'Spotify'  }, accent: false },
  { key: 'bacaan',   id: { label: 'Bacaan',  value: 'Alpha Woman'                            }, en: { label: 'Reading',  value: 'Alpha Woman'                          }, accent: false },
  { key: 'status',   id: { label: 'Status',  value: 'Sedang bangkit'                         }, en: { label: 'Status',   value: 'Rising up'                            }, live: true },
];

/* ── Expandable Wish Card ─────────────────────────────────────────── */
function WishCard({ item, lang, openId, setOpenId }) {
  const isOpen = openId === item.id;
  const p = PRIORITY[item.priority];
  const hasDetailPage = item.cat === 'travel' && TRAVEL_SLUGS[item.id];

  const toggle = () => {
    if (!item.expandable) return;
    setOpenId(isOpen ? null : item.id);
  };

  return (
    <div
      className={`mk-card${item.expandable ? ' wish-expandable' : ''}`}
      style={{ cursor: item.expandable ? 'pointer' : 'default', position: 'relative', borderRadius: 12, padding: 14 }}
      onClick={toggle}
    >
      {/* detail badge for travel */}
      {hasDetailPage && (
        <Link
          to={`/wishlist/${item.id}`}
          onClick={(e) => e.stopPropagation()}
          style={{ position: 'absolute', top: 10, right: item.expandable ? 32 : 10, fontSize: 9, color: '#7c7cff', border: '0.5px solid #3a3a6a', borderRadius: 10, padding: '2px 7px', background: '#1a1a2e', textDecoration: 'none', zIndex: 1 }}
        >
          {lang === 'id' ? 'detail →' : 'detail →'}
        </Link>
      )}

      {/* chevron for expandable */}
      {item.expandable && (
        <FaChevronDown
          style={{ position: 'absolute', bottom: 12, right: 12, fontSize: 11, color: '#444', transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}
        />
      )}

      {/* main content */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <item.Icon size={17} style={{ color: '#666', flexShrink: 0 }} />
        <span style={{ fontSize: 13, color: '#ccc', fontWeight: 500 }}>{item.name[lang]}</span>
      </div>
      <div style={{ fontSize: 11, color: '#555', lineHeight: 1.5 }}>
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.color, display: 'inline-block', marginRight: 5, verticalAlign: 'middle' }} />
        {item.sub[lang]}
      </div>

      {/* expand panel */}
      {item.expandable && isOpen && item.detail && (
        <div
          style={{ marginTop: 12, paddingTop: 10, borderTop: '0.5px solid #2a2a2e' }}
          onClick={(e) => e.stopPropagation()}
        >
          {Object.entries(item.detail[lang] ?? {}).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: '#444', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{k}</span>
              <span style={{ fontSize: 11, color: '#777', textAlign: 'right', maxWidth: '60%', lineHeight: 1.5 }}>{v}</span>
            </div>
          ))}
          {item.detail.budget && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
              {item.detail.budget.map((b) => (
                <span key={b.key} style={{ fontSize: 10, padding: '3px 8px', borderRadius: 10, border: '0.5px solid #2a2a2e', color: b.key === 'a' ? '#4ade80' : b.key === 'b' ? '#facc15' : '#f87171', background: b.key === 'a' ? '#111d17' : b.key === 'b' ? '#1a1a0e' : '#1d1111' }}>
                  {b[lang]}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Embeddable content (used both inline & on /wishlist page) ────── */
export function WishlistContent({ lang }) {
  const [tab, setTab]       = useState('all');
  const [openId, setOpenId] = useState(null);

  const filtered = tab === 'all' ? WISH_ITEMS : WISH_ITEMS.filter((w) => w.cat === tab);

  return (
    <div>
      {/* ── Sekarang Lagi ──────────────────────────────────────────── */}
      <div className="mk-card" style={{ marginBottom: 20 }}>
        <p className="mk-label">{lang === 'id' ? 'Sekarang lagi' : 'Right now'}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px 20px' }}>
          {NOW_ITEMS.map((item) => {
            const d = item[lang];
            return (
              <div key={item.key}>
                <div style={{ fontSize: 10, color: '#444', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5 }}>
                  {d.label}
                </div>
                <div style={{ fontSize: 13, color: item.accent ? '#7c7cff' : '#999', lineHeight: 1.5 }}>
                  {item.live && <span className="dot-live" style={{ marginRight: 5 }} />}
                  {d.value}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Wishlist ───────────────────────────────────────────────── */}
      <p className="mk-label" style={{ marginBottom: 10 }}>Wishlist</p>

      {/* Tab filter */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => { setTab(t.key); setOpenId(null); }}
            style={{
              fontSize: 11,
              color: tab === t.key ? '#c8c4ff' : '#555',
              border: `0.5px solid ${tab === t.key ? '#4a4a8a' : '#2a2a2e'}`,
              borderRadius: 20,
              padding: '5px 12px',
              background: tab === t.key ? '#1e1e2e' : '#16161a',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {t[lang]}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
        {filtered.map((item) => (
          <WishCard key={item.id} item={item} lang={lang} openId={openId} setOpenId={setOpenId} />
        ))}
      </div>

      {/* Priority legend */}
      <div style={{ display: 'flex', gap: 16, marginTop: 16, paddingLeft: 2 }}>
        {Object.entries(PRIORITY).map(([key, p]) => (
          <span key={key} style={{ fontSize: 10, color: '#444', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
            {p.label[lang]}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Standalone page at /wishlist ────────────────────────────────── */
export default function WishlistPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('id');

  return (
    <div className="mk-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <button type="button" className="mk-pro-btn" onClick={() => navigate('/')}>
          <FaArrowLeft style={{ fontSize: 11 }} />
          {lang === 'id' ? 'Kembali ke beranda' : 'Back to home'}
        </button>
        <div style={{ display: 'flex', gap: 6 }}>
          {['id', 'en'].map((l) => (
            <button key={l} type="button" className={`mk-lang-btn ${lang === l ? 'active' : ''}`} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
      <WishlistContent lang={lang} />
    </div>
  );
}
