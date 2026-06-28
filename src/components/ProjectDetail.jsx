import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SpaceStarfield from './SpaceStarfield';

const projects = {
  hion: {
    name: 'Hion',
    status: 'Active',
    category: 'AI Assistant',
    description:
      'Hion is a personal assistant that helps manage focus, tasks, and quick reminders with a gentle visual tone.'
  },
  liov: {
    name: 'Liov',
    status: 'Active',
    category: 'Learning Platform',
    description:
      'Liov connects learning materials, live classes, and progress tracking in a single compact dashboard.'
  },
  'nebula-pos': {
    name: 'Nebula POS',
    status: 'Development',
    category: 'POS System',
    description:
      'Nebula POS is built for small retailers to track stock, manage sales, and sync reports.'
  },
  'pulse-class': {
    name: 'Pulse Class',
    status: 'Beta',
    category: 'Education',
    description:
      'Pulse Class helps teachers organize live sessions, assignments, and classroom feedback.'
  },
  'luna-portfolio': {
    name: 'Luna Portfolio',
    status: 'Planning',
    category: 'Portfolio',
    description:
      'Luna Portfolio showcases creative work with modular bento cards and story sections.'
  }
};

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects[slug];

  if (!project) {
    return (
      <div className="min-h-screen text-slate-100 space-bg">
        <SpaceStarfield />
        <div className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-10 font-['Space_Grotesk']">
          <Link
            to="/projects"
            className="flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white"
          >
            <span className="rounded-full bg-white/10 p-2 shadow">
              <ArrowLeft size={16} />
            </span>
            Back to Projects
          </Link>
          <div className="mt-10 rounded-2xl bg-white/10 p-6 shadow-sm">
            <h1 className="text-2xl font-semibold">Project not found</h1>
            <p className="text-sm text-slate-300">Try another project from the list.</p>
          </div>
        </div>
      </div>
    );
  }

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
            {project.name}
          </span>
        </header>

        <div className="rounded-3xl bg-white/10 p-6 shadow-lg">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 shadow-md">
              <img src="/logo192.png" alt={`${project.name} logo`} className="h-16 w-16" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{project.name}</h1>
              <p className="mt-1 text-sm text-slate-300">{project.description}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="rounded-full bg-[#4b2f9b] px-3 py-1 text-white">{project.status}</span>
                <span className="rounded-full bg-white/20 px-3 py-1 text-slate-100">{project.category}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/10 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-200">Overview</h2>
              <p className="mt-2 text-sm text-slate-300">
                Project detail view with status, category, and current notes. Visuals can be added later.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-4 shadow-sm">
              <h2 className="text-sm font-semibold text-slate-200">Status</h2>
              <p className="mt-2 text-sm text-slate-300">
                {project.status} • {project.category}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
