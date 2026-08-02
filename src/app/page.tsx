'use client';

import { useState, useEffect } from 'react';
import { getContentData } from '@/lib/content';

export interface ProfileData {
  name: string;
  titles: string[];
  heroSubtitle: string;
  tagline: string;
  bio: string;
  avatar: string;
  recruiterStatus: string;
  resumeUrl: string;
  stats: { label: string; value: string }[];
}

export interface ResumeItem {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileUrl: string;
  date: string;
  isPrimary: boolean;
}

export default function PortfolioPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };

  const profile = getContentData<ProfileData>('profile');
  const socials = getContentData<Record<string, string>>('socials');
  const skills = getContentData<any[]>('skills');
  const projects = getContentData<any[]>('projects');
  const experience = getContentData<any[]>('experience');
  const education = getContentData<any[]>('education');
  const certificates = getContentData<any[]>('certificates');
  const resumesList = getContentData<ResumeItem[]>('resumes');

  const isDark = theme === 'dark';

  return (
    <main className={`min-h-screen font-sans antialiased relative overflow-x-hidden transition-colors duration-300 ${
      isDark 
        ? 'bg-[#0A0A0A] text-[#FFFFFF] selection:bg-[#2563EB] selection:text-white' 
        : 'bg-[#FAFAFA] text-[#0A0A0A] selection:bg-[#2563EB] selection:text-white'
    }`}>

      {/* Subtle Grid Accent Pattern */}
      <div className={`fixed inset-0 pointer-events-none z-0 ${
        isDark 
          ? 'bg-[radial-gradient(#1e293b_1px,transparent_1px)] opacity-25' 
          : 'bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] opacity-40'
      } [background-size:32px_32px]`}></div>

      {/* Sticky Recruiter Status Banner */}
      <div className="fixed bottom-6 right-6 z-50">
        <a 
          href={`mailto:${socials.Email}`}
          className={`backdrop-blur-md px-4 py-3 rounded-xl border shadow-xl flex items-center space-x-3 transition group cursor-pointer ${
            isDark 
              ? 'bg-[#121212]/90 border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]' 
              : 'bg-white/90 border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.2)]'
          }`}
        >
          <span className="w-2.5 h-2.5 bg-[#2563EB] rounded-full animate-pulse"></span>
          <span className={`text-xs font-medium ${isDark ? 'text-[#A1A1AA] group-hover:text-white' : 'text-[#52525B] group-hover:text-[#0A0A0A]'}`}>
            {profile.recruiterStatus}
          </span>
          <span className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition">
            Email Me
          </span>
        </a>
      </div>

      {/* STICKY NAVBAR WITH DARK / LIGHT MODE SWITCH */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${
        isDark 
          ? 'bg-[#0A0A0A]/80 border-[rgba(255,255,255,0.08)]' 
          : 'bg-[#FAFAFA]/80 border-[rgba(0,0,0,0.08)]'
      }`}>
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className={`text-base font-bold tracking-tight transition ${isDark ? 'text-white hover:text-[#A1A1AA]' : 'text-[#0A0A0A] hover:text-[#52525B]'}`}>
            {profile.name}
          </a>

          <div className={`hidden md:flex items-center space-x-8 text-sm font-medium ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>
            <a href="#about" className={isDark ? 'hover:text-white transition' : 'hover:text-[#0A0A0A] transition'}>About</a>
            <a href="#skills" className={isDark ? 'hover:text-white transition' : 'hover:text-[#0A0A0A] transition'}>Skills</a>
            <a href="#projects" className={isDark ? 'hover:text-white transition' : 'hover:text-[#0A0A0A] transition'}>Projects</a>
            {experience && experience.length > 0 && <a href="#experience" className={isDark ? 'hover:text-white transition' : 'hover:text-[#0A0A0A] transition'}>Experience</a>}
            <a href="#education" className={isDark ? 'hover:text-white transition' : 'hover:text-[#0A0A0A] transition'}>Education</a>
            <a href="#certificates" className={isDark ? 'hover:text-white transition' : 'hover:text-[#0A0A0A] transition'}>Certifications</a>
            <a href="#resumes" className={isDark ? 'hover:text-white transition' : 'hover:text-[#0A0A0A] transition'}>Resume</a>
            <a href="#contact" className={isDark ? 'hover:text-white transition' : 'hover:text-[#0A0A0A] transition'}>Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            {/* THEME TOGGLE BUTTON */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle Dark and Light Mode"
                className={`p-2 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition ${
                  isDark
                    ? 'bg-[#121212] border-[rgba(255,255,255,0.08)] text-[#A1A1AA] hover:text-white hover:border-[rgba(255,255,255,0.2)]'
                    : 'bg-white border-[rgba(0,0,0,0.08)] text-[#52525B] hover:text-[#0A0A0A] hover:border-[rgba(0,0,0,0.2)]'
                }`}
              >
                <span>{isDark ? '☀️ Light' : '🌙 Dark'}</span>
              </button>
            )}

            <a 
              href={`mailto:${socials.Email}`} 
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow-sm"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className={`max-w-[1200px] mx-auto px-6 py-24 md:py-32 border-b flex flex-col md:flex-row items-center justify-between gap-12 ${isDark ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(0,0,0,0.08)]'}`}>
        <div className="flex-1 space-y-6">
          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border text-xs font-medium ${
            isDark 
              ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-[#A1A1AA]' 
              : 'bg-white border-[rgba(0,0,0,0.08)] text-[#52525B]'
          }`}>
            <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
            <span>{profile.heroSubtitle}</span>
          </div>

          <h1 className={`text-5xl md:text-7xl font-extrabold tracking-tight leading-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
            {profile.name}
          </h1>

          <p className={`text-xl md:text-2xl font-normal font-sans ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>
            {profile.titles.join("  ·  ")}
          </p>

          <p className={`text-lg max-w-2xl leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>
            M.Sc. Computer Science (Data Analytics) student exploring Artificial Intelligence, Machine Learning, Data Analytics, and Software Development with a strong focus on clean code and scalable real-world solutions.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a 
              href="#resumes" 
              className="bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium text-sm px-6 py-3 rounded-xl transition"
            >
              View Resumes
            </a>
            <a 
              href="#projects" 
              className={`border font-medium text-sm px-6 py-3 rounded-xl transition ${
                isDark 
                  ? 'bg-transparent hover:bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-white' 
                  : 'bg-white hover:bg-slate-100 border-[rgba(0,0,0,0.08)] text-[#0A0A0A]'
              }`}
            >
              Explore Projects
            </a>
            <a 
              href={socials.GitHub} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`border font-medium text-sm px-5 py-3 rounded-xl transition ${
                isDark 
                  ? 'bg-transparent hover:bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-[#A1A1AA] hover:text-white' 
                  : 'bg-white hover:bg-slate-100 border-[rgba(0,0,0,0.08)] text-[#52525B] hover:text-[#0A0A0A]'
              }`}
            >
              GitHub ↗
            </a>
            <a 
              href={socials.LinkedIn} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`border font-medium text-sm px-5 py-3 rounded-xl transition ${
                isDark 
                  ? 'bg-transparent hover:bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] text-[#A1A1AA] hover:text-white' 
                  : 'bg-white hover:bg-slate-100 border-[rgba(0,0,0,0.08)] text-[#52525B] hover:text-[#0A0A0A]'
              }`}
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        {/* PROFILE PORTRAIT IMAGE */}
        <div className="w-full md:w-80 shrink-0 flex justify-center">
          <div className={`relative w-64 h-64 md:w-72 md:h-72 rounded-[16px] overflow-hidden border shadow-2xl p-2 ${
            isDark ? 'border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)]' : 'border-[rgba(0,0,0,0.08)] bg-white'
          }`}>
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              className="w-full h-full object-cover rounded-[12px]" 
            />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className={`max-w-[1200px] mx-auto px-6 py-28 border-b ${isDark ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(0,0,0,0.08)]'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-2">
            <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>About Me</h2>
            <p className="text-sm text-[#2563EB] font-semibold font-sans uppercase tracking-wider">Philosophy & Journey</p>
          </div>

          <div className={`lg:col-span-8 space-y-6 text-base leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>
            <p className={`text-lg font-medium leading-normal ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              Hello! I'm <strong className={isDark ? 'text-white' : 'text-[#0A0A0A]'}>Abi Krishnan</strong>, an M.Sc. Computer Science (Data Analytics) student with a passion for technology, innovation, and continuous learning. I enjoy exploring new ideas, solving challenging problems, and building solutions that create meaningful real-world impact.
            </p>
            <p>
              My interests include <strong className={isDark ? 'text-white' : 'text-[#0A0A0A]'}>Artificial Intelligence, Machine Learning, Data Analytics, Software Development, and emerging technologies</strong>. I am constantly expanding my knowledge by learning new tools, frameworks, and programming concepts while applying them through practical, hands-on experiences.
            </p>
            <p>
              I believe that learning never stops. Every new challenge is an opportunity to improve my technical skills, analytical thinking, and creativity. I enjoy collaborating with others, sharing knowledge, and contributing to projects that encourage innovation and personal growth.
            </p>
            <p>
              I strive to write clean, efficient, and scalable solutions while maintaining a strong focus on problem-solving and continuous improvement. Whether I'm learning a new technology, experimenting with ideas, or working on a project, my goal is always to grow as a developer and create solutions that make a positive impact.
            </p>
            <p>
              As I continue my journey, I look forward to collaborating with like-minded people, gaining industry experience, and contributing to exciting opportunities in the fields of AI, data, and software engineering.
            </p>

            <blockquote className={`border-l-2 border-[#2563EB] pl-4 py-2 my-6 text-xl font-bold tracking-wide ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>
              "Learning. Building. Innovating. Growing."
            </blockquote>

            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t ${isDark ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(0,0,0,0.08)]'}`}>
              {profile.stats.map((s, idx) => (
                <div key={idx} className="space-y-1">
                  <div className={`text-2xl font-extrabold ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{s.value}</div>
                  <div className={`text-xs font-medium uppercase tracking-wider ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className={`max-w-[1200px] mx-auto px-6 py-28 border-b ${isDark ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(0,0,0,0.08)]'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-2">
            <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Technical Stack</h2>
            <p className="text-sm text-[#2563EB] font-semibold uppercase tracking-wider">Languages & Frameworks</p>
          </div>

          <div className="lg:col-span-8 space-y-10">
            {skills.map((cat, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{cat.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {cat.items.map((item: any, i: number) => (
                    <div 
                      key={i} 
                      className={`border text-sm px-4 py-2 rounded-[16px] font-medium transition duration-200 ${
                        isDark 
                          ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)] text-white' 
                          : 'bg-white border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.2)] text-[#0A0A0A] shadow-sm'
                      }`}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className={`max-w-[1200px] mx-auto px-6 py-28 border-b ${isDark ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(0,0,0,0.08)]'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
          <div className="lg:col-span-4 space-y-2">
            <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Projects</h2>
            <p className="text-sm text-[#2563EB] font-semibold uppercase tracking-wider">Academic & Open Source</p>
          </div>
          <div className={`lg:col-span-8 text-base leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>
            Click on any project card to inspect the live repository on GitHub.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((p, idx) => (
            <a 
              key={idx} 
              href={p.github || socials.GitHub} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`group border rounded-[16px] p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 space-y-6 cursor-pointer ${
                isDark 
                  ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]' 
                  : 'bg-white border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.2)] shadow-sm'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-[#2563EB] uppercase tracking-wider">{p.category}</span>
                  <span className={`transition text-xs font-medium ${isDark ? 'text-[#A1A1AA] group-hover:text-white' : 'text-[#52525B] group-hover:text-[#0A0A0A]'}`}>
                    GitHub ↗
                  </span>
                </div>
                <h3 className={`text-xl font-bold transition duration-200 group-hover:text-[#2563EB] ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{p.title}</h3>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>{p.description}</p>
              </div>

              <div className={`flex flex-wrap gap-2 pt-2 border-t ${isDark ? 'border-[rgba(255,255,255,0.05)]' : 'border-[rgba(0,0,0,0.05)]'}`}>
                {p.tech.map((t: string, i: number) => (
                  <span key={i} className={`text-xs px-3 py-1 rounded-md ${
                    isDark ? 'text-[#A1A1AA] bg-[rgba(255,255,255,0.04)]' : 'text-[#52525B] bg-slate-100'
                  }`}>
                    {t}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className={`max-w-[1200px] mx-auto px-6 py-28 border-b ${isDark ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(0,0,0,0.08)]'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-2">
            <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Education</h2>
            <p className="text-sm text-[#2563EB] font-semibold uppercase tracking-wider">Academic Record</p>
          </div>

          <div className="lg:col-span-8 space-y-6">
            {education.map((edu, idx) => (
              <div key={idx} className={`border p-7 rounded-[16px] space-y-3 ${
                isDark 
                  ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)]' 
                  : 'bg-white border-[rgba(0,0,0,0.08)] shadow-sm'
              }`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{edu.degree}</h3>
                    <p className={`text-sm mt-1 ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>{edu.institution}</p>
                  </div>
                  <span className="text-xs text-white bg-[#2563EB] px-3 py-1 rounded-full font-semibold">{edu.score}</span>
                </div>
                <p className={`text-xs ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certificates" className={`max-w-[1200px] mx-auto px-6 py-28 border-b ${isDark ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(0,0,0,0.08)]'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-2">
            <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Certifications</h2>
            <p className="text-sm text-[#2563EB] font-semibold uppercase tracking-wider">Verified Credentials</p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {certificates.map((cert, idx) => (
              <a 
                key={idx} 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`group border p-6 rounded-[16px] flex flex-col justify-between space-y-4 transition duration-200 cursor-pointer ${
                  isDark 
                    ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]' 
                    : 'bg-white border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.2)] shadow-sm'
                }`}
              >
                <div>
                  <h4 className={`text-base font-bold group-hover:text-[#2563EB] transition duration-200 ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{cert.title}</h4>
                  <p className={`text-xs mt-1 ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>{cert.issuer} · {cert.date}</p>
                </div>
                <span className={`text-xs font-medium transition ${isDark ? 'text-[#A1A1AA] group-hover:text-white' : 'text-[#52525B] group-hover:text-[#0A0A0A]'}`}>Verify Credential ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* RESUMES DOWNLOAD SECTION */}
      <section id="resumes" className={`max-w-[1200px] mx-auto px-6 py-28 border-b ${isDark ? 'border-[rgba(255,255,255,0.08)]' : 'border-[rgba(0,0,0,0.08)]'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-2">
            <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Curriculum Vitae</h2>
            <p className="text-sm text-[#2563EB] font-semibold uppercase tracking-wider">Official Document</p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 gap-6">
              {resumesList.map((resItem) => (
                <div 
                  key={resItem.id} 
                  className={`border p-7 rounded-[16px] flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition duration-200 ${
                    isDark 
                      ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]' 
                      : 'bg-white border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.2)] shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{resItem.title}</h3>
                      {resItem.isPrimary && (
                        <span className="text-xs font-semibold uppercase bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/40 px-2.5 py-0.5 rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>{resItem.description}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <a 
                      href={resItem.fileUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center space-x-1.5 border font-semibold text-xs px-5 py-3 rounded-xl transition ${
                        isDark 
                          ? 'bg-transparent hover:bg-[rgba(255,255,255,0.05)] border-[rgba(255,255,255,0.1)] text-[#A1A1AA] hover:text-white' 
                          : 'bg-slate-100 hover:bg-slate-200 border-[rgba(0,0,0,0.08)] text-[#52525B] hover:text-[#0A0A0A]'
                      }`}
                    >
                      <span>View</span> <span>↗</span>
                    </a>
                    <a 
                      href={resItem.fileUrl} 
                      download={resItem.fileName}
                      className="inline-flex items-center justify-center space-x-1.5 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-semibold text-xs px-5 py-3 rounded-xl transition"
                    >
                      <span>Download</span> <span>↓</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="max-w-[1200px] mx-auto px-6 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-2">
            <h2 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Get in Touch</h2>
            <p className="text-sm text-[#2563EB] font-semibold uppercase tracking-wider">Direct Communication</p>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <p className={`text-base leading-relaxed ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>
              I am actively seeking remote Data Science, Machine Learning, or Business Intelligence internship opportunities. Feel free to reach out directly via email, phone, or LinkedIn.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
              <a 
                href={`mailto:${socials.Email}`}
                className={`border p-5 rounded-[16px] space-y-2 transition duration-200 cursor-pointer group ${
                  isDark 
                    ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]' 
                    : 'bg-white border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.2)] shadow-sm'
                }`}
              >
                <div className="text-xs text-[#2563EB] font-semibold uppercase tracking-wider">EMAIL</div>
                <div className={`font-semibold truncate ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{socials.Email}</div>
                <div className={`text-xs ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>Click to compose ↗</div>
              </a>

              <a 
                href={socials.LinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className={`border p-5 rounded-[16px] space-y-2 transition duration-200 cursor-pointer group ${
                  isDark 
                    ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]' 
                    : 'bg-white border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.2)] shadow-sm'
                }`}
              >
                <div className="text-xs text-[#2563EB] font-semibold uppercase tracking-wider">LINKEDIN</div>
                <div className={`font-semibold truncate ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Abi Krishnan</div>
                <div className={`text-xs ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>Open profile ↗</div>
              </a>

              <a 
                href={socials.GitHub}
                target="_blank"
                rel="noopener noreferrer"
                className={`border p-5 rounded-[16px] space-y-2 transition duration-200 cursor-pointer group ${
                  isDark 
                    ? 'bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.08)] hover:border-[rgba(255,255,255,0.2)]' 
                    : 'bg-white border-[rgba(0,0,0,0.08)] hover:border-[rgba(0,0,0,0.2)] shadow-sm'
                }`}
              >
                <div className="text-xs text-[#2563EB] font-semibold uppercase tracking-wider">GITHUB</div>
                <div className={`font-semibold truncate ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>Abikrishnanms</div>
                <div className={`text-xs ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>View repositories ↗</div>
              </a>
            </div>

            <div className={`pt-4 text-sm ${isDark ? 'text-[#A1A1AA]' : 'text-[#52525B]'}`}>
              <span>Phone: </span> <a href={`tel:${socials.Phone}`} className={`font-semibold hover:underline ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{socials.Phone}</a>
              <span className="mx-4">·</span>
              <span>Location: </span> <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0A0A0A]'}`}>{socials.Location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`border-t py-10 text-center text-xs font-medium transition-colors duration-300 ${
        isDark 
          ? 'border-[rgba(255,255,255,0.08)] bg-[#0A0A0A] text-[#A1A1AA]' 
          : 'border-[rgba(0,0,0,0.08)] bg-[#FAFAFA] text-[#52525B]'
      }`}>
        <p>© 2026 {profile.name}. All rights reserved.</p>
      </footer>
    </main>
  );
}
