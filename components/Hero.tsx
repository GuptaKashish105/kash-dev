import React, { useEffect, useRef, useState } from "react";
import {
  Github,
  Linkedin,
  Bot,
  ChevronRight,
  Code2,
  Globe,
} from "lucide-react";
import { PERSONAL_INFO } from "../constants";

const stats = [
  { label: "Clients Delivered", value: 1000, suffix: "+" },
  { label: "Performance Uplift", value: 38, suffix: "%" },
  { label: "Tech Stack Tools", value: 20, suffix: "+" },
];

const Hero: React.FC = () => {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!statsRef.current) return;

    const animateCounts = () => {
      stats.forEach(({ value }, index) => {
        const startTime = performance.now();
        const duration = 900;

        const step = (now: number) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const nextValue = Math.floor(progress * value);

          setCounts((prev) => {
            const next = [...prev];
            next[index] = nextValue;
            return next;
          });

          if (progress < 1) {
            window.requestAnimationFrame(step);
          }
        };

        window.requestAnimationFrame(step);
      });
    };

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        if (entries[0].isIntersecting) {
          animateCounts();
          observerInstance.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center pt-28 sm:pt-32 lg:pt-36 pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_0.95fr] gap-16 lg:gap-24 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-[0.2em] w-fit">
              Immediate joiner • Open to frontend & full-stack roles
            </div>

            <div className="max-w-2xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-10 leading-tight tracking-tight">
                Enterprise React UIs for AI-first SaaS.
              </h1>

              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed max-w-2xl">
                I’m{" "}
                <span className="text-white font-semibold">
                  {PERSONAL_INFO.name}
                </span>
                , a frontend-focused software engineer open to frontend and
                full-stack roles with 3+ years of experience delivering scalable
                SaaS platforms for enterprise clients. I specialize in React.js,
                TypeScript, microfrontends, and performance-driven UI
                architecture.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://drive.google.com/file/d/18U7EgLPoDwGrRTi422q-F-eizBBLRwic/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/20"
              >
                View Resume
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>

              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-600 transition-all hover:bg-gray-800 active:scale-95"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-gray-900/60 border border-gray-800 text-gray-300 hover:text-white hover:border-gray-600 transition-all hover:bg-gray-800 active:scale-95"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-[24rem] sm:max-w-[28rem] lg:max-w-[34rem] rounded-[3rem] overflow-hidden border border-white/10 bg-slate-950/90 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.95)]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-purple-600/15 pointer-events-none"></div>
              <div className="relative w-full aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                  alt="Kashish Gupta"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="absolute bottom-6 left-6 right-6 p-5 bg-slate-950/95 backdrop-blur-xl rounded-[1.75rem] border border-white/10 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-300 uppercase tracking-[0.2em] font-black mb-1">
                      Primary Focus
                    </p>
                    <p className="text-white font-semibold text-lg">
                      AI & Micro Frontends
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-8 -right-5 p-4 bg-gray-900/95 border border-gray-800 rounded-3xl shadow-2xl animate-float delay-700">
              <Code2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="absolute top-[55%] -left-6 p-4 bg-gray-900/95 border border-gray-800 rounded-3xl shadow-2xl animate-float delay-1000">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </div>

        <div
          ref={statsRef}
          className="mt-16 lg:mt-20 grid gap-4 sm:grid-cols-3"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex min-h-[150px] flex-col items-center justify-center gap-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl px-6 py-6 text-center shadow-xl shadow-black/20"
            >
              <p className="text-4xl sm:text-5xl font-black text-white leading-none">
                {counts[index].toLocaleString()}
                {stat.suffix}
              </p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.25em]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
