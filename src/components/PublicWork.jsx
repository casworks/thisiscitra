import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SpaceStarfield from './SpaceStarfield';

export default function PublicWork() {
  return (
    <div className="min-h-screen text-slate-100 space-bg">
      <SpaceStarfield />
      <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-10 font-['Space_Grotesk']">
        <header className="flex items-center justify-between mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white"
          >
            <span className="rounded-full bg-white/10 p-2 shadow">
              <ArrowLeft size={16} />
            </span>
            Back
          </Link>
          <span className="rounded-full bg-black px-3 py-1 text-[10px] font-bold uppercase text-white">
            Public Work
          </span>
        </header>

        <div className="grid gap-5 lg:grid-cols-3">
          <section className="rounded-3xl bg-[#4b2f9b] p-5 text-white shadow-lg shadow-purple-900/40">
            <h2 className="text-lg font-semibold">YouTube</h2>
            <p className="text-sm text-white/80">Education</p>
            <div className="mt-4 overflow-hidden rounded-2xl bg-white/5">
              <iframe
                title="YouTube highlight"
                className="h-48 w-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="mt-3 text-sm text-white/90">
              Short lessons focused on practical coding and design workflow.
            </p>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold"
            >
              More on YouTube
            </a>
          </section>

          <section className="rounded-3xl bg-[#5b45b3] p-5 text-white shadow-lg shadow-purple-900/35">
            <h2 className="text-lg font-semibold">TikTok</h2>
            <p className="text-sm text-white/80">Micro-learning</p>
            <div className="mt-4 flex h-48 items-center justify-center rounded-2xl bg-white/10">
              <img src="/logo192.png" alt="TikTok highlight" className="h-20 w-20 opacity-90" />
            </div>
            <p className="mt-3 text-sm text-white/90">
              Fast tips, small wins, and quick breakdowns you can save.
            </p>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold"
            >
              More on TikTok
            </a>
          </section>

          <section className="rounded-3xl bg-[#6a54bd] p-5 text-white shadow-lg shadow-purple-900/30">
            <h2 className="text-lg font-semibold">Instagram</h2>
            <p className="text-sm text-white/80">Visual archive</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, index) => (
                <div
                  key={`ig-${index}`}
                  className="aspect-square rounded-lg bg-white/20 shadow-inner"
                />
              ))}
            </div>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-full bg-white/20 px-4 py-2 text-xs font-semibold"
            >
              More on Instagram
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
