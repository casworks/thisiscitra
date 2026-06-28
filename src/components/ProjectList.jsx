import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SpaceStarfield from './SpaceStarfield';

const tabs = [
  { key: 'it', label: 'IT' },
  { key: 'design', label: 'Design & Animasi' },
  { key: 'game', label: 'Game' }
];

const types = ['Project', 'Source code', 'Experiment', 'Excercise'];

const items = [
  {
    id: 'it-landing',
    title: 'Landing Page System',
    category: 'it',
    type: 'Project',
    badges: ['React', 'Tailwind', 'API'],
    sub: 'Landing page, system dashboard'
  },
  {
    id: 'it-pos',
    title: 'POS Inventory',
    category: 'it',
    type: 'Project',
    badges: ['Django', 'MySQL'],
    sub: 'System, stock, report'
  },
  {
    id: 'it-source-ui',
    title: 'UI Kit Components',
    category: 'it',
    type: 'Source code',
    badges: ['React', 'Storybook'],
    sub: 'Reusable components'
  },
  {
    id: 'it-exp-kmeans',
    title: 'Experiment: K-Means Segmentasi Transaksi',
    category: 'it',
    type: 'Experiment',
    badges: ['Python', 'Pandas', 'Sklearn'],
    sub: 'ML experiment',
    link: '/experiments/kmeans'
  },
  {
    id: 'it-excercises-logic',
    title: 'Logic Drill Pack',
    category: 'it',
    type: 'Excercise',
    badges: ['JS', 'Algo'],
    sub: 'Daily practice'
  },
  {
    id: 'design-motion',
    title: 'Motion Poster Set',
    category: 'design',
    type: 'Project',
    badges: ['AE', 'Figma'],
    sub: 'Visual story set'
  },
  {
    id: 'design-source-icons',
    title: 'Icon Library',
    category: 'design',
    type: 'Source code',
    badges: ['SVG', 'Illustrator'],
    sub: 'Free vector pack'
  },
  {
    id: 'design-exp-color',
    title: 'Experiment: Color Harmony',
    category: 'design',
    type: 'Experiment',
    badges: ['Color', 'Grid'],
    sub: 'Visual exploration'
  },
  {
    id: 'game-prototype',
    title: 'Puzzle Prototype',
    category: 'game',
    type: 'Project',
    badges: ['Unity', 'C#'],
    sub: 'Gameplay loop'
  },
  {
    id: 'game-source-shader',
    title: 'Shader Pack',
    category: 'game',
    type: 'Source code',
    badges: ['GLSL'],
    sub: 'Shader snippets'
  },
  {
    id: 'game-excercise-level',
    title: 'Level Design Drill',
    category: 'game',
    type: 'Excercise',
    badges: ['Design'],
    sub: 'Layout variations'
  }
];

export default function ProjectList() {
  const [activeTab, setActiveTab] = useState('it');
  const [type, setType] = useState('Project');

  const filteredItems = useMemo(() => {
    return items.filter((item) => item.category === activeTab && item.type === type);
  }, [activeTab, type]);

  return (
    <div className="min-h-screen text-slate-100 space-bg">
      <SpaceStarfield />
      <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-10 font-['Space_Grotesk']">
        <header className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white"
          >
            <span className="rounded-full bg-white/10 p-2 shadow">
              <ArrowLeft size={16} />
            </span>
            Back
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`rounded-full px-4 py-1 text-xs font-semibold transition ${
                  activeTab === tab.key
                    ? 'bg-white text-slate-900'
                    : 'bg-white/10 text-slate-200 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        <div className="rounded-3xl bg-[#4b2f9b] p-5 text-white shadow-lg shadow-purple-900/40">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold">All Project</h1>
              <p className="text-sm text-white/80">Project, source code, experiment, excercise.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/70">Type</span>
              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white outline-none ring-1 ring-white/30 focus:ring-2 focus:ring-white/70"
              >
                {types.map((option) => (
                  <option key={option} value={option} className="text-slate-800">
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => {
              const Wrapper = item.link ? Link : 'div';
              const wrapperProps = item.link
                ? { to: item.link, className: 'block' }
                : { className: 'block' };

              return (
                <Wrapper key={item.id} {...wrapperProps}>
                  <div className="rounded-2xl bg-white/10 p-4 transition hover:translate-y-0.5">
                    <h2 className="text-base font-semibold">{item.title}</h2>
                    <p className="text-xs text-white/80">{item.sub}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.badges.map((badge) => (
                        <span
                          key={`${item.id}-${badge}`}
                          className="rounded-full bg-black/30 px-2 py-1 text-[10px] font-semibold"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>
                </Wrapper>
              );
            })}
            {filteredItems.length === 0 && (
              <div className="rounded-2xl bg-white/10 p-4 text-sm text-white/80">
                No items yet for this type.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
