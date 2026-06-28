import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SpaceStarfield from './SpaceStarfield';

const tableRows = Array.from({ length: 15 }).map((_, index) => ({
  id: index + 1,
  avgSpend: (120 + index * 8).toFixed(2),
  visits: 2 + (index % 5),
  basket: 3 + (index % 4),
  cluster: (index % 3) + 1
}));

export default function ExperimentDetail() {
  return (
    <div className="min-h-screen text-slate-100 space-bg">
      <SpaceStarfield />
      <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-10 font-['Space_Grotesk']">
        <header className="flex items-center justify-between mb-6">
          <Link
            to="/projects"
            className="flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white"
          >
            <span className="rounded-full bg-white/10 p-2 shadow">
              <ArrowLeft size={16} />
            </span>
            Project
          </Link>
          <span className="rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase text-white">
            Experiment
          </span>
        </header>

        <div className="rounded-3xl bg-white/10 p-6 shadow-lg">
          <h1 className="text-2xl font-semibold">Experiment: K-Means Segmentasi Transaksi</h1>
          <p className="text-sm text-slate-300">Cluster-based grouping for transaction behavior.</p>

          <section className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-200">Goal</h2>
              <p className="mt-2 text-sm text-slate-300">
                Menguji segmentasi pelanggan dari pola transaksi untuk mencari grup perilaku yang berbeda.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-200">Dataset</h2>
              <ul className="mt-2 text-sm text-slate-300 space-y-1">
                <li>Sumber: Dummy (synthetic)</li>
                <li>Fitur: avg_spend, visits, basket_size</li>
                <li>Ukuran: 1.500 rows</li>
              </ul>
            </div>
          </section>

          <section className="mt-4 rounded-2xl bg-white/10 p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-slate-200">Method</h2>
            <div className="mt-2 text-sm text-slate-300 space-y-1">
              <p>Algoritma: K-Means</p>
              <p>Parameter: k=3, init=k-means++, max_iter=300</p>
            </div>
          </section>

          <section className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-200">Artifacts</h2>
              <p className="mt-2 text-sm text-slate-300">Preview tabel sample (15 rows).</p>
              <div className="mt-3 overflow-auto rounded-xl border border-white/10">
                <table className="min-w-full text-left text-xs">
                  <thead className="bg-white/10 text-slate-200">
                    <tr>
                      <th className="px-3 py-2 font-semibold">ID</th>
                      <th className="px-3 py-2 font-semibold">Avg Spend</th>
                      <th className="px-3 py-2 font-semibold">Visits</th>
                      <th className="px-3 py-2 font-semibold">Basket</th>
                      <th className="px-3 py-2 font-semibold">Cluster</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows.map((row) => (
                      <tr key={row.id} className="border-t border-white/10 text-slate-100">
                        <td className="px-3 py-2">{row.id}</td>
                        <td className="px-3 py-2">{row.avgSpend}</td>
                        <td className="px-3 py-2">{row.visits}</td>
                        <td className="px-3 py-2">{row.basket}</td>
                        <td className="px-3 py-2">C{row.cluster}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-200">Artifacts (Chart)</h2>
              <p className="mt-2 text-sm text-slate-300">Ringkas grafik distribusi cluster.</p>
              <div className="mt-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Cluster 1</span>
                    <span>42%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-[#4b2f9b]" style={{ width: '42%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Cluster 2</span>
                    <span>33%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-[#6a54bd]" style={{ width: '33%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <span>Cluster 3</span>
                    <span>25%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="h-2 rounded-full bg-[#8b7be6]" style={{ width: '25%' }} />
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-xl bg-white/10 p-3 text-xs text-slate-200">
                Output final: cluster label + runtime 1.2s.
              </div>
            </div>
          </section>

          <section className="mt-4 grid gap-4 lg:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-200">Code</h2>
              <pre className="mt-2 overflow-auto rounded-xl bg-slate-900 p-3 text-xs text-slate-100">
{`from sklearn.cluster import KMeans
model = KMeans(n_clusters=3, random_state=42)
labels = model.fit_predict(X)`}
              </pre>
              <a
                href="https://github.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex rounded-full bg-[#4b2f9b] px-3 py-1 text-[10px] font-semibold text-white"
              >
                Repo Link
              </a>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-200">Findings</h2>
              <ul className="mt-2 text-sm text-slate-300 space-y-1 list-disc list-inside">
                <li>Cluster pelanggan dengan belanja tinggi terdeteksi jelas.</li>
                <li>Limitasi: data dummy belum mewakili musim/promosi.</li>
                <li>Next step: uji feature tambahan & scaling data real.</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
