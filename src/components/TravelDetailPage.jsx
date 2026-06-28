import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FaArrowLeft, FaClock, FaCalendarAlt, FaPlane, FaYenSign, FaEuroSign,
  FaWifi, FaCreditCard, FaTrain, FaLeaf, FaMoon, FaGift,
  FaTshirt, FaThermometerHalf, FaTicketAlt, FaExternalLinkAlt,
} from 'react-icons/fa';

/* ── Travel data per destination ────────────────────────────────── */
const TRAVEL_DATA = {
  japan: {
    name:    { id: 'Jepang',               en: 'Japan'               },
    sub:     { id: 'Tokyo · Kyoto · Osaka · Nara', en: 'Tokyo · Kyoto · Osaka · Nara' },
    meta: [
      { Icon: FaClock,       id: '10–14 hari ideal',           en: '10–14 days ideal'        },
      { Icon: FaCalendarAlt, id: 'Terbaik: Mar–Apr / Okt–Nov', en: 'Best: Mar–Apr / Oct–Nov' },
      { Icon: FaPlane,       id: '~4–5 jam dari Jakarta',       en: '~4–5 hrs from Jakarta'   },
      { Icon: FaYenSign,     id: '¥ · kurs ~Rp 105/¥',         en: '¥ · rate ~Rp 105/¥'     },
    ],
    stats: [
      { id: { label: 'Estimasi budget', val: 'Rp 15–35 jt',  note: 'tergantung plan'  }, en: { label: 'Budget estimate', val: 'Rp 15–35M', note: 'depends on plan' } },
      { id: { label: 'Destinasi',       val: '4 kota',         note: '+ day trips'     }, en: { label: 'Destinations',    val: '4 cities',  note: '+ day trips'    } },
    ],
    tabs: ['spots', 'food', 'budget', 'tips'],
    tabLabels: { id: ['Destinasi & spot foto', 'Kuliner', 'Budget plan', 'Tips perjalanan'], en: ['Destinations & photo spots', 'Food', 'Budget plan', 'Travel tips'] },
    spots: [
      { city: 'Kyoto',  icon: '⛩️', name: { id: 'Fushimi Inari',       en: 'Fushimi Inari'      }, desc: { id: 'Ribuan gerbang torii merah memanjang ke atas bukit. Golden hour pagi hari paling sepi.', en: 'Thousands of vermilion torii gates winding up a mountain. Early morning golden hour is the quietest.' }, tip: { id: 'Foto terbaik: 05.30–07.00', en: 'Best photos: 05:30–07:00' } },
      { city: 'Tokyo',  icon: '🌆', name: { id: 'Shibuya Crossing',     en: 'Shibuya Crossing'   }, desc: { id: 'Persimpangan paling ramai di dunia. Foto dari atas Shibuya Sky atau Magnet by Shibuya.', en: "World's busiest crossing. Shoot from Shibuya Sky or Magnet by Shibuya rooftop." }, tip: { id: 'Foto terbaik: malam hari', en: 'Best photos: at night' } },
      { city: 'Kyoto',  icon: '🎋', name: { id: 'Arashiyama Bamboo',    en: 'Arashiyama Bamboo'  }, desc: { id: 'Hutan bambu ikonik. Naik rickshaw atau jalan kaki ke Tenryu-ji setelahnya.', en: 'Iconic bamboo grove. Take a rickshaw or walk to Tenryu-ji temple afterwards.' }, tip: { id: 'Foto terbaik: pagi 06.00–08.00', en: 'Best photos: morning 06:00–08:00' } },
      { city: 'Hakone', icon: '🗻', name: { id: 'View Gunung Fuji',      en: 'Mount Fuji View'    }, desc: { id: 'Day trip dari Tokyo. Kawaguchiko atau Chureito Pagoda untuk shot Fuji klasik.', en: 'Day trip from Tokyo. Kawaguchiko lake or Chureito Pagoda for the classic Fuji shot.' }, tip: { id: 'Foto terbaik: cuaca cerah pagi', en: 'Best photos: clear morning weather' } },
      { city: 'Osaka',  icon: '🏮', name: { id: 'Dotonbori',             en: 'Dotonbori'          }, desc: { id: 'Pusat street food Osaka. Papan iklan Glico Run Man jadi ikon foto wajib.', en: "Osaka's street food hub. The Glico Running Man billboard is a must-photograph icon." }, tip: { id: 'Foto terbaik: dusk & malam', en: 'Best photos: dusk & night' } },
      { city: 'Nara',   icon: '🦌', name: { id: 'Nara Deer Park',        en: 'Nara Deer Park'     }, desc: { id: 'Rusa bebas berkeliaran. Beli senbei rusa untuk foto yang unik dan personal.', en: 'Free-roaming deer everywhere. Buy deer crackers (senbei) for unique, personal photos.' }, tip: { id: 'Foto terbaik: pagi & sore', en: 'Best photos: morning & afternoon' } },
    ],
    food: [
      { icon: '🍜', name: 'Ramen Ichiran',        place: { id: 'Tokyo · Osaka · Fukuoka',    en: 'Tokyo · Osaka · Fukuoka'   }, price: '¥980–1.200 · ~Rp 103–126 rb' },
      { icon: '🍵', name: 'Matcha Uji',            place: { id: 'Kyoto · Uji district',       en: 'Kyoto · Uji district'      }, price: '¥500–800 · ~Rp 53–84 rb'    },
      { icon: '🐙', name: 'Takoyaki Dotonbori',    place: { id: 'Osaka · Dotonbori',          en: 'Osaka · Dotonbori'         }, price: '¥500–700 · ~Rp 53–74 rb'    },
      { icon: '🧊', name: { id: 'Kakigori (es serut)', en: 'Kakigori (shaved ice)' }, place: { id: 'Seluruh Jepang · musim panas', en: 'All over Japan · summer' }, price: '¥400–800 · ~Rp 42–84 rb' },
      { icon: '🥩', name: 'Wagyu Yakiniku',         place: { id: 'Tokyo · Osaka',             en: 'Tokyo · Osaka'             }, price: '¥3.000–6.000 · ~Rp 315–630 rb' },
      { icon: '🍡', name: { id: 'Sakura Mochi & Dorayaki', en: 'Sakura Mochi & Dorayaki' }, place: { id: 'Convenience store & pasar', en: 'Convenience stores & markets' }, price: '¥150–300 · ~Rp 16–32 rb' },
      { icon: '🍣', name: { id: 'Sushi conveyor belt', en: 'Conveyor belt sushi' }, place: 'Sushiro, Kura Sushi', price: '¥110/piring · ~Rp 12 rb/piring' },
      { icon: '🥚', name: { id: 'Onsen tamago + konbini food', en: 'Onsen tamago + konbini food' }, place: '7-Eleven, Lawson, FamilyMart', price: '¥200–500 · ~Rp 21–53 rb' },
    ],
    budget: [
      {
        key: 'a',
        label: { id: 'Plan A · Full experience', en: 'Plan A · Full experience' },
        total: { id: 'Rp 30–35 juta / orang',  en: 'Rp 30–35M / person'      },
        note:  { id: 'Kelas ekonomi · hotel bintang 3 · fleksibel jajan', en: 'Economy class · 3-star hotel · flexible spending' },
        duration: { id: '14 hari · 2 orang', en: '14 days · 2 people' },
        color: '#4ade80',
        rows: [
          { id: { l: 'Tiket pesawat PP', v: 'Rp 8–12 jt',  n: 'Garuda / ANA via promo'      }, en: { l: 'Flights (RT)',      v: 'Rp 8–12M',    n: 'Garuda / ANA promo'       } },
          { id: { l: 'Akomodasi',        v: 'Rp 10–12 jt', n: 'Hotel 3★ · 13 malam'          }, en: { l: 'Accommodation',    v: 'Rp 10–12M',   n: '3-star hotel · 13 nights' } },
          { id: { l: 'Transportasi',     v: 'Rp 3–4 jt',   n: 'JR Pass 14 hari ~¥50.000'     }, en: { l: 'Local transport',  v: 'Rp 3–4M',     n: '14-day JR Pass ~¥50,000'  } },
          { id: { l: 'Makan',            v: 'Rp 4–5 jt',   n: 'Mix restoran & konbini'        }, en: { l: 'Food',            v: 'Rp 4–5M',     n: 'Mix of restaurants & konbini' } },
          { id: { l: 'Wisata & tiket',   v: 'Rp 2–3 jt',   n: 'Shibuya Sky, Fuji, dll'        }, en: { l: 'Attractions',     v: 'Rp 2–3M',     n: 'Shibuya Sky, Fuji, etc.'  } },
          { id: { l: 'Oleh-oleh',        v: 'Rp 3–5 jt',   n: 'Tergantung niat'               }, en: { l: 'Shopping',        v: 'Rp 3–5M',     n: 'Depends on willpower'     } },
        ],
      },
      {
        key: 'b',
        label: { id: 'Plan B · Balanced',       en: 'Plan B · Balanced'       },
        total: { id: 'Rp 18–25 juta / orang',  en: 'Rp 18–25M / person'      },
        note:  { id: 'Penerbangan promo · hostel · makan konbini mix', en: 'Promo flights · hostel · mix konbini meals' },
        duration: { id: '10 hari · 2 orang', en: '10 days · 2 people' },
        color: '#facc15',
        rows: [
          { id: { l: 'Tiket pesawat PP', v: 'Rp 6–8 jt',   n: 'Airasia / Scoot promo'       }, en: { l: 'Flights (RT)',   v: 'Rp 6–8M',   n: 'AirAsia / Scoot promo'    } },
          { id: { l: 'Akomodasi',        v: 'Rp 5–7 jt',   n: 'Guesthouse / capsule hotel'   }, en: { l: 'Accommodation', v: 'Rp 5–7M',   n: 'Guesthouse / capsule hotel' } },
          { id: { l: 'Transportasi',     v: 'Rp 2–3 jt',   n: 'IC Card (Suica) tanpa JR Pass'}, en: { l: 'Local transport',v: 'Rp 2–3M',   n: 'IC Card (Suica), no JR Pass' } },
          { id: { l: 'Makan',            v: 'Rp 2,5–3,5 jt', n: 'Mayoritas konbini + gyudon'  }, en: { l: 'Food',          v: 'Rp 2.5–3.5M', n: 'Mostly konbini + gyudon' } },
          { id: { l: 'Wisata & tiket',   v: 'Rp 1–2 jt',   n: 'Prioritas spot gratis'         }, en: { l: 'Attractions',   v: 'Rp 1–2M',   n: 'Priority on free spots'   } },
          { id: { l: 'Oleh-oleh',        v: 'Rp 1,5–2 jt', n: '100¥ shop & Daiso'             }, en: { l: 'Shopping',      v: 'Rp 1.5–2M', n: '100¥ shops & Daiso'       } },
        ],
      },
      {
        key: 'c',
        label: { id: 'Plan C · Budget hemat',   en: 'Plan C · Budget trip'    },
        total: { id: 'Rp 12–16 juta / orang',  en: 'Rp 12–16M / person'      },
        note:  { id: 'Flash trip · Tokyo atau Osaka saja · maksimal konbini', en: 'Flash trip · Tokyo or Osaka only · max konbini' },
        duration: { id: '5–7 hari · 2 orang', en: '5–7 days · 2 people' },
        color: '#f87171',
        rows: [
          { id: { l: 'Tiket pesawat PP', v: 'Rp 4–6 jt',     n: 'Promo jauh hari · low cost'     }, en: { l: 'Flights (RT)',   v: 'Rp 4–6M',     n: 'Early promo · low cost'   } },
          { id: { l: 'Akomodasi',        v: 'Rp 2,5–3,5 jt', n: 'Capsule hotel / hostel'          }, en: { l: 'Accommodation', v: 'Rp 2.5–3.5M', n: 'Capsule hotel / hostel'   } },
          { id: { l: 'Transportasi',     v: 'Rp 1–1,5 jt',   n: 'IC Card satu kota saja'          }, en: { l: 'Local transport',v: 'Rp 1–1.5M',   n: 'IC Card, one city only'   } },
          { id: { l: 'Makan',            v: 'Rp 1,5–2 jt',   n: 'Konbini · ramen murah'           }, en: { l: 'Food',          v: 'Rp 1.5–2M',   n: 'Konbini · cheap ramen'    } },
          { id: { l: 'Wisata',           v: 'Rp 500 rb–1 jt', n: 'Spot gratis & taman kota'       }, en: { l: 'Attractions',   v: 'Rp 500K–1M',  n: 'Free spots & city parks'  } },
          { id: { l: 'Oleh-oleh',        v: 'Rp 1–1,5 jt',   n: 'Pilih yang meaningful'           }, en: { l: 'Shopping',      v: 'Rp 1–1.5M',   n: 'Choose meaningful items'  } },
        ],
      },
    ],
    tips: [
      { Icon: FaWifi,            title: { id: 'Internet',          en: 'Internet'       }, body: { id: 'Sewa pocket wifi atau beli SIM card data di bandara Narita/Haneda. Jangan andalkan roaming.',          en: "Rent a pocket wifi or buy a data SIM at Narita/Haneda airport. Don't rely on roaming."          } },
      { Icon: FaCreditCard,      title: { id: 'Uang & bayar',      en: 'Cash & payment' }, body: { id: 'Jepang masih cash-heavy. Bawa yen tunai. ATM 7-Eleven dan Japan Post terima kartu asing.',            en: 'Japan is still cash-heavy. Bring yen. 7-Eleven and Japan Post ATMs accept foreign cards.'         } },
      { Icon: FaTrain,           title: { id: 'Transportasi',      en: 'Transport'      }, body: { id: 'Suica IC Card untuk metro. JR Pass worth it kalau keliling 3+ kota. Beli online sebelum berangkat.',  en: 'Suica IC Card for the metro. JR Pass is worth it if visiting 3+ cities. Buy online before you go.' } },
      { Icon: FaLeaf,            title: { id: 'Waktu terbaik',     en: 'Best time'      }, body: { id: 'Sakura: Maret–April. Koyo (daun merah): Oktober–November. Hindari Golden Week (29 Apr–5 Mei).',       en: 'Cherry blossoms: March–April. Autumn leaves: October–November. Avoid Golden Week (Apr 29–May 5).'  } },
      { Icon: FaMoon,            title: { id: 'Etika & budaya',    en: 'Etiquette'      }, body: { id: 'Pisahkan sampah. Tidak boleh makan sambil jalan. Bicara pelan di transportasi umum.',                 en: 'Separate your trash. No eating while walking. Speak quietly on public transport.'                  } },
      { Icon: FaGift,            title: { id: 'Oleh-oleh terbaik', en: 'Best souvenirs' }, body: { id: 'Kit Kat rasa unik, Pocky edisi khusus, skincare Hada Labo, peralatan dapur dari Daiso/Nitori.',       en: 'Unique Kit Kat flavors, special edition Pocky, Hada Labo skincare, Daiso/Nitori kitchenware.'       } },
    ],
  },

  middleeast: {
    name: { id: 'Timur Tengah', en: 'Middle East' },
    sub:  { id: 'Dubai · Qatar · Turki', en: 'Dubai · Qatar · Turkey' },
    meta: [
      { Icon: FaClock,       id: '7–14 hari ideal',              en: '7–14 days ideal'        },
      { Icon: FaCalendarAlt, id: 'Terbaik: Okt–Apr',             en: 'Best: Oct–Apr'           },
      { Icon: FaPlane,       id: '~9 jam dari Jakarta ke Dubai', en: '~9 hrs Jakarta to Dubai' },
    ],
    stats: [
      { id: { label: 'Estimasi budget', val: 'Rp 20–45 jt', note: 'tergantung negara'  }, en: { label: 'Budget estimate', val: 'Rp 20–45M', note: 'depends on country' } },
      { id: { label: 'Destinasi',       val: '3 negara',      note: 'atau pilih 1'      }, en: { label: 'Destinations',    val: '3 countries', note: 'or pick 1'        } },
    ],
    tabs: ['spots', 'food', 'tips'],
    tabLabels: { id: ['Destinasi & spot foto', 'Kuliner', 'Tips perjalanan'], en: ['Destinations & photo spots', 'Food', 'Travel tips'] },
    spots: [
      { city: 'Dubai',  icon: '🏙️', name: { id: 'Burj Khalifa',     en: 'Burj Khalifa'    }, desc: { id: 'Gedung tertinggi di dunia. Naik ke At the Top untuk view Dubai yang luar biasa.', en: "World's tallest building. Go to At the Top deck for incredible Dubai views." }, tip: { id: 'Terbaik: sunset atau malam',  en: 'Best: sunset or night'  } },
      { city: 'Turki',  icon: '🎈', name: { id: 'Cappadocia',        en: 'Cappadocia'      }, desc: { id: 'Balon udara panas di atas lanskap batuan vulkanik. Pengalaman paling iconic di Turki.', en: 'Hot air balloons over volcanic rock landscapes. The most iconic experience in Turkey.' }, tip: { id: 'Terbaik: sunrise dengan balon', en: 'Best: sunrise with balloons' } },
      { city: 'Turki',  icon: '🕌', name: { id: 'Blue Mosque',       en: 'Blue Mosque'     }, desc: { id: 'Masjid Sultan Ahmed yang megah di Istanbul. Interior biru Iznik yang memukau.', en: 'Magnificent Sultan Ahmed Mosque in Istanbul. Stunning blue Iznik tile interior.' }, tip: { id: 'Kunjungi di luar waktu sholat', en: 'Visit outside prayer times' } },
      { city: 'Qatar',  icon: '🏟️', name: { id: 'Museum of Islamic Art', en: 'Museum of Islamic Art' }, desc: { id: 'Arsitektur ikonik karya I.M. Pei di tepi laut Doha. Koleksi seni Islam terlengkap.', en: "Iconic architecture by I.M. Pei on Doha's waterfront. World's finest Islamic art collection." }, tip: { id: 'Foto terbaik: golden hour',   en: 'Best photos: golden hour' } },
    ],
    food: [
      { icon: '🥙', name: { id: 'Shawarma Istanbul', en: 'Istanbul Shawarma' }, place: { id: 'Turki · mana-mana', en: 'Turkey · everywhere' }, price: { id: '~50–100 lira', en: '~50–100 lira' } },
      { icon: '🍚', name: 'Mandi Dubai',             place: { id: 'Dubai · restoran Arab', en: 'Dubai · Arab restaurants' }, price: { id: '~AED 30–50', en: '~AED 30–50' } },
      { icon: '🧀', name: 'Kunafa',                  place: { id: 'Timur Tengah semua', en: 'Across Middle East' }, price: { id: '~AED 15–30', en: '~AED 15–30' } },
      { icon: '☕', name: 'Kopi Arab (Qahwa)',        place: { id: 'Seluruh kawasan', en: 'Across the region' }, price: { id: 'Gratis di tamu', en: 'Free when hosted' } },
    ],
    tips: [
      { Icon: FaTshirt,         title: { id: 'Berpakaian sopan', en: 'Dress modestly' }, body: { id: 'Di masjid dan area publik, tutup bahu dan lutut. Bawa pashmina/scarf.',  en: 'Cover shoulders and knees at mosques and public areas. Bring a pashmina/scarf.' } },
      { Icon: FaThermometerHalf,title: { id: 'Cuaca',            en: 'Weather'        }, body: { id: 'Hindari musim panas (Jun–Sep) karena sangat panas. Okt–Apr paling nyaman.', en: 'Avoid summer (Jun–Sep) due to extreme heat. Oct–Apr is most comfortable.'       } },
      { Icon: FaCreditCard,     title: { id: 'Uang & kartu',     en: 'Money & cards'  }, body: { id: 'Dubai & Qatar sangat card-friendly. Turki lebih baik pakai tunai lira.',   en: 'Dubai & Qatar are very card-friendly. Turkey is better with cash lira.'         } },
    ],
    budget: [],
  },

  europe: {
    name: { id: 'Eropa', en: 'Europe' },
    sub:  { id: 'Paris · Roma · Amsterdam · Swiss', en: 'Paris · Rome · Amsterdam · Switzerland' },
    meta: [
      { Icon: FaClock,       id: '14–21 hari ideal',       en: '14–21 days ideal'       },
      { Icon: FaCalendarAlt, id: 'Terbaik: Apr–Okt',        en: 'Best: Apr–Oct'           },
      { Icon: FaPlane,       id: '~14–16 jam dari Jakarta', en: '~14–16 hrs from Jakarta' },
    ],
    stats: [
      { id: { label: 'Estimasi budget', val: 'Rp 35–60 jt', note: 'sangat tergantung negara' }, en: { label: 'Budget estimate', val: 'Rp 35–60M', note: 'varies a lot by country' } },
      { id: { label: 'Destinasi',       val: '4 negara',     note: 'atau 2 tergantung waktu' }, en: { label: 'Destinations',    val: '4 countries', note: 'or 2, depends on time' } },
    ],
    tabs: ['spots', 'food', 'tips'],
    tabLabels: { id: ['Spot foto', 'Kuliner', 'Tips'], en: ['Photo spots', 'Food', 'Tips'] },
    spots: [
      { city: 'Paris',      icon: '🗼', name: { id: 'Menara Eiffel',     en: 'Eiffel Tower'   }, desc: { id: 'Ikon Paris. Naik ke lantai 2 untuk view terbaik, atau foto dari Trocadéro.', en: "Paris's icon. Ascend to floor 2 for the best view, or shoot from the Trocadéro." }, tip: { id: 'Terbaik: biru & malam berkilap', en: 'Best: blue hour & sparkling night' } },
      { city: 'Roma',       icon: '🏛️', name: { id: 'Colosseum',          en: 'Colosseum'       }, desc: { id: 'Amfiteater kuno terbesar di dunia. Beli tiket online jauh-jauh hari.', en: "World's largest ancient amphitheatre. Book tickets online well in advance." }, tip: { id: 'Terbaik: golden hour sore', en: 'Best: afternoon golden hour' } },
      { city: 'Amsterdam',  icon: '🌷', name: { id: 'Tulip fields (Keukenhof)', en: 'Keukenhof tulip fields' }, desc: { id: 'Taman bunga terbesar di dunia. Buka April–Mei saja setiap tahunnya.', en: "World's largest flower garden. Open April–May only every year." }, tip: { id: 'Terbaik: pagi weekday', en: 'Best: weekday morning' } },
      { city: 'Swiss',      icon: '🏔️', name: { id: 'Swiss Alps',          en: 'Swiss Alps'      }, desc: { id: 'Landscape pegunungan salju yang luar biasa. Interlaken, Grindelwald, Lauterbrunnen.', en: 'Stunning snowy mountain landscapes. Interlaken, Grindelwald, Lauterbrunnen.' }, tip: { id: 'Terbaik: musim dingin atau semi', en: 'Best: winter or spring' } },
    ],
    food: [
      { icon: '🥐', name: 'Croissant', place: 'Paris', price: { id: '€1–2 · ~Rp 17–34 rb', en: '€1–2' } },
      { icon: '🍦', name: { id: 'Gelato Roma', en: 'Roman Gelato' }, place: 'Roma', price: { id: '€2–4 · ~Rp 34–68 rb', en: '€2–4' } },
      { icon: '🧇', name: 'Stroopwafel', place: 'Amsterdam', price: { id: '€1–2 · ~Rp 17–34 rb', en: '€1–2' } },
      { icon: '🫕', name: 'Fondue', place: 'Swiss', price: { id: '€15–25 · ~Rp 255–425 rb', en: '€15–25' } },
    ],
    tips: [
      { Icon: FaTicketAlt, title: { id: 'Visa Schengen', en: 'Schengen Visa' }, body: { id: 'Satu visa untuk 26 negara. Ajukan minimal 3 bulan sebelum keberangkatan.', en: 'One visa for 26 countries. Apply at least 3 months before departure.' } },
      { Icon: FaTrain,     title: { id: 'Transportasi',  en: 'Transport'      }, body: { id: 'Eurail Pass untuk keliling multi-negara. Kereta malam bisa hemat akomodasi.', en: 'Eurail Pass for multi-country travel. Night trains save on accommodation.' } },
      { Icon: FaEuroSign,  title: { id: 'Harga mahal',   en: 'High prices'    }, body: { id: 'Swiss dan Scandinavia sangat mahal. Eropa Timur (Praha, Budapest) jauh lebih hemat.', en: 'Switzerland and Scandinavia are very expensive. Eastern Europe (Prague, Budapest) is much cheaper.' } },
    ],
    budget: [],
  },
};

/* ── Components ──────────────────────────────────────────────────── */
function StatBox({ stat, lang }) {
  const d = stat[lang];
  return (
    <div className="mk-inner" style={{ padding: '12px 14px', textAlign: 'right' }}>
      <div style={{ fontSize: 10, color: '#444', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>{d.label}</div>
      <div style={{ fontSize: 18, fontWeight: 500, color: '#e0e0e0' }}>{d.val}</div>
      <div style={{ fontSize: 10, color: '#444', marginTop: 2 }}>{d.note}</div>
    </div>
  );
}

function SpotCard({ spot, lang }) {
  const name = typeof spot.name === 'object' ? spot.name[lang] : spot.name;
  const desc = typeof spot.desc === 'object' ? spot.desc[lang] : spot.desc;
  const tip  = typeof spot.tip  === 'object' ? spot.tip[lang]  : spot.tip;
  return (
    <div className="mk-card" style={{ padding: 0, overflow: 'hidden', borderRadius: 12 }}>
      <div style={{ height: 80, background: '#1c1c20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, position: 'relative', borderBottom: '0.5px solid #222' }}>
        {spot.icon}
        <span style={{ position: 'absolute', top: 8, left: 8, fontSize: 9, color: '#7c7cff', background: '#1a1a2e', border: '0.5px solid #3a3a6a', borderRadius: 8, padding: '2px 7px' }}>{spot.city}</span>
      </div>
      <div style={{ padding: '10px 12px' }}>
        <div style={{ fontSize: 13, color: '#ccc', fontWeight: 500, marginBottom: 3 }}>{name}</div>
        <div style={{ fontSize: 11, color: '#555', lineHeight: 1.5, marginBottom: 6 }}>{desc}</div>
        {tip && <span style={{ fontSize: 10, color: '#666', border: '0.5px solid #252528', borderRadius: 8, padding: '2px 7px', background: '#1c1c20' }}>{tip}</span>}
      </div>
    </div>
  );
}

function FoodCard({ food, lang }) {
  const name  = typeof food.name  === 'object' ? food.name[lang]  : food.name;
  const place = typeof food.place === 'object' ? food.place[lang] : food.place;
  const price = typeof food.price === 'object' ? food.price[lang] : food.price;
  return (
    <div className="mk-card" style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: 14 }}>
      <div className="mk-inner" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{food.icon}</div>
      <div>
        <div style={{ fontSize: 13, color: '#ccc', fontWeight: 500, marginBottom: 3 }}>{name}</div>
        <div style={{ fontSize: 11, color: '#555', marginBottom: 4 }}>{place}</div>
        <div style={{ fontSize: 11, color: '#7c7cff' }}>{price}</div>
      </div>
    </div>
  );
}

function BudgetPanel({ plan, lang }) {
  return (
    <div>
      <div className="mk-card" style={{ marginBottom: 12, padding: 16 }}>
        <div style={{ fontSize: 10, color: '#444', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>
          {lang === 'id' ? `Total estimasi · ${plan.duration.id}` : `Total estimate · ${plan.duration.en}`}
        </div>
        <div style={{ fontSize: 24, fontWeight: 500, color: plan.color }}>{plan.total[lang]}</div>
        <div style={{ fontSize: 11, color: '#444', marginTop: 4 }}>{plan.note[lang]}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 8 }}>
        {plan.rows.map((row, i) => {
          const d = row[lang];
          return (
            <div key={i} className="mk-inner" style={{ padding: '10px 12px' }}>
              <div style={{ fontSize: 10, color: '#444', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{d.l}</div>
              <div style={{ fontSize: 13, color: '#aaa' }}>{d.v}</div>
              <div style={{ fontSize: 10, color: '#555', marginTop: 2 }}>{d.n}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TipCard({ tip, lang }) {
  return (
    <div className="mk-card" style={{ display: 'flex', gap: 10, padding: '12px 14px' }}>
      <tip.Icon size={14} style={{ flexShrink: 0, color: '#666', marginTop: 2 }} />
      <div>
        <div style={{ fontSize: 12, color: '#aaa', fontWeight: 500, marginBottom: 2 }}>{tip.title[lang]}</div>
        <div style={{ fontSize: 12, color: '#666', lineHeight: 1.6 }}>{tip.body[lang]}</div>
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function TravelDetailPage() {
  const { slug } = useParams();
  const navigate  = useNavigate();
  const [lang, setLang]     = useState('id');
  const [activeTab, setTab] = useState(0);
  const [budgetPlan, setBP] = useState(0);

  const data = TRAVEL_DATA[slug];
  if (!data) {
    return (
      <div className="mk-page" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <p style={{ color: '#555', fontSize: 14 }}>Destinasi tidak ditemukan.</p>
        <button type="button" className="mk-pro-btn" style={{ marginTop: 16 }} onClick={() => navigate('/')}>← Kembali</button>
      </div>
    );
  }

  const tabs     = data.tabs;
  const tabLabel = data.tabLabels[lang];
  const curTab   = tabs[activeTab];

  return (
    <div className="mk-page">
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <button type="button" className="mk-pro-btn" onClick={() => navigate('/')}>
          <FaArrowLeft style={{ fontSize: 11 }} />
          {lang === 'id' ? 'Kembali' : 'Back'}
        </button>
        <div style={{ display: 'flex', gap: 6 }}>
          {['id', 'en'].map((l) => (
            <button key={l} type="button" className={`mk-lang-btn ${lang === l ? 'active' : ''}`} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Hero band */}
      <div className="mk-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20, flexWrap: 'wrap', marginBottom: 16, padding: 24 }}>
        <div>
          <p className="mk-label">{lang === 'id' ? 'Wishlist traveling' : 'Travel wishlist'}</p>
          <p style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 500, color: '#f0f0f0', marginBottom: 4 }}>{data.name[lang]}</p>
          <p style={{ fontSize: 13, color: '#555', marginBottom: 16 }}>{data.sub[lang]}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {data.meta.map((m, i) => (
              <span key={i} className="mk-inner" style={{ fontSize: 11, color: '#666', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 5 }}>
                <m.Icon size={11} /> {m[lang] || m.id}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 160 }}>
          {data.stats.map((s, i) => <StatBox key={i} stat={s} lang={lang} />)}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {tabLabel.map((label, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setTab(i)}
            style={{ fontSize: 11, color: activeTab === i ? '#c8c4ff' : '#555', border: `0.5px solid ${activeTab === i ? '#4a4a8a' : '#2a2a2e'}`, borderRadius: 20, padding: '5px 13px', background: activeTab === i ? '#1e1e2e' : '#16161a', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {curTab === 'spots' && (
        <>
          <p className="mk-label">{lang === 'id' ? 'Spot wajib dikunjungi' : 'Must-visit spots'}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
            {data.spots.map((s, i) => <SpotCard key={i} spot={s} lang={lang} />)}
          </div>
        </>
      )}

      {curTab === 'food' && (
        <>
          <p className="mk-label">{lang === 'id' ? 'Kuliner wajib coba' : 'Must-try food'}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {data.food.map((f, i) => <FoodCard key={i} food={f} lang={lang} />)}
          </div>
        </>
      )}

      {curTab === 'budget' && data.budget.length > 0 && (
        <>
          <p className="mk-label">{lang === 'id' ? 'Pilih budget plan' : 'Choose budget plan'}</p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {data.budget.map((plan, i) => (
              <button
                key={plan.key}
                type="button"
                onClick={() => setBP(i)}
                style={{ fontSize: 12, padding: '6px 16px', borderRadius: 20, border: `0.5px solid ${budgetPlan === i ? plan.color + '55' : '#2a2a2e'}`, background: budgetPlan === i ? plan.color + '15' : '#16161a', cursor: 'pointer', color: budgetPlan === i ? plan.color : '#555', transition: 'all 0.2s' }}
              >
                {plan.label[lang]}
              </button>
            ))}
          </div>
          <BudgetPanel plan={data.budget[budgetPlan]} lang={lang} />
        </>
      )}

      {curTab === 'tips' && (
        <>
          <p className="mk-label">{lang === 'id' ? 'Tips perjalanan' : 'Travel tips'}</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
            {data.tips.map((tip, i) => <TipCard key={i} tip={tip} lang={lang} />)}
          </div>
        </>
      )}
    </div>
  );
}
