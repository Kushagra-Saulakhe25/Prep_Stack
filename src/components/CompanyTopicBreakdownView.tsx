import React, { useState } from 'react';
import { CompanyHiringTrack } from '../types';

interface CompanyTopicBreakdownViewProps {
  company: CompanyHiringTrack;
  onBack: () => void;
  onPracticeCurated: () => void;
  onOpenProblem: (problemTitle: string) => void;
}

export const CompanyTopicBreakdownView: React.FC<CompanyTopicBreakdownViewProps> = ({
  company,
  onBack,
  onPracticeCurated,
  onOpenProblem,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [activeTab, setActiveTab] = useState<'vibe' | 'patterns'>('patterns');

  const pattern = company.patternOverview;

  return (
    <div className="flex flex-col w-full pb-28 pt-1">
      {/* Interactive Top Action & Context Bar */}
      <div className="px-4 py-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-[#3525cd] text-[14px] font-semibold transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back_ios</span>
          <span>{company.name} Hub</span>
        </button>
        <div className="flex items-center gap-1">
          <button
            aria-label="Save to Prep List"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`w-9 h-9 flex items-center justify-center rounded-full transition-all active:scale-90 ${
              isBookmarked ? 'bg-[#3525cd]/15 text-[#3525cd]' : 'bg-[#e5eeff] text-[#464555]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[19px]"
              style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
          <button
            aria-label="Share Pattern Guide"
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Copied Amazon Arrays & Hashing Interview pattern link!');
              }
            }}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#e5eeff] text-[#464555] transition-all active:scale-90"
          >
            <span className="material-symbols-outlined text-[19px]">share</span>
          </button>
        </div>
      </div>

      <div className="px-4 flex flex-col gap-4">
        {/* Hero Card: Pattern Intelligence Overview */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-[#eff4ff] p-4 flex flex-col gap-3.5 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#3525cd]/5 rounded-full pointer-events-none blur-2xl" />

          {/* Company Identity & Meta */}
          <div className="flex items-start justify-between gap-3 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-xl bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] shadow-sm font-bold">
                <span className="material-symbols-outlined text-[#885500] text-[26px]">
                  {company.logo}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-[#464555] uppercase tracking-wider font-semibold">
                    {company.name} Tech Track
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#006c49]"></span>
                  <span className="text-[11px] text-[#006c49] font-semibold">Live 2025</span>
                </div>
                <h2 className="text-[20px] text-[#0b1c30] font-bold truncate leading-tight">
                  Arrays & Hashing
                </h2>
              </div>
            </div>
            <span className="px-2.5 py-1 bg-[#6cf8bb]/30 text-[#00714d] text-[11px] rounded-full font-semibold shrink-0">
              Core SDE I/II
            </span>
          </div>

          <p className="text-[13px] text-[#464555] leading-relaxed">
            The absolute foundation of {company.name} Technical Screenings. {pattern?.frequency || '42%'} of candidates encounter this paradigm within Round 1 or the Online Assessment (OA).
          </p>

          {/* Key Metrics Row */}
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="bg-[#eff4ff] rounded-xl p-2.5 flex flex-col border border-[#e5eeff]">
              <span className="text-[11px] text-[#464555]">Frequency</span>
              <span className="text-[16px] text-[#3525cd] font-bold">{pattern?.frequency || '42%'}</span>
              <span className="text-[10px] text-[#464555]">OA & R1/R2</span>
            </div>
            <div className="bg-[#eff4ff] rounded-xl p-2.5 flex flex-col border border-[#e5eeff]">
              <span className="text-[11px] text-[#464555]">Target Pace</span>
              <span className="text-[16px] text-[#0b1c30] font-bold">{pattern?.targetPace || '25 min'}</span>
              <span className="text-[10px] text-[#464555]">Working code</span>
            </div>
            <div className="bg-[#eff4ff] rounded-xl p-2.5 flex flex-col border border-[#e5eeff]">
              <span className="text-[11px] text-[#464555]">Avg Diff</span>
              <span className="text-[16px] text-[#684000] font-bold">{pattern?.avgDiff || 'Medium'}</span>
              <span className="text-[10px] text-[#464555]">50% Med / 35% H</span>
            </div>
          </div>

          {/* Difficulty Proportion Bar */}
          <div className="flex flex-col gap-1.5 pt-1">
            <div className="flex justify-between text-[11px] text-[#464555]">
              <span>Question Mix</span>
              <span>15% Easy • 50% Med • 35% Hard</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#e5eeff] flex overflow-hidden">
              <div className="bg-[#006c49] h-full" style={{ width: '15%' }}></div>
              <div className="bg-[#4f46e5] h-full" style={{ width: '50%' }}></div>
              <div className="bg-[#ba1a1a] h-full" style={{ width: '35%' }}></div>
            </div>
          </div>

          {/* High Bar Advisory Pill */}
          <div className="bg-[#dce9ff]/60 border border-[#dce9ff] rounded-xl px-3 py-2 flex items-center gap-2 text-[#0b1c30]">
            <span className="material-symbols-outlined text-[#3525cd] text-[18px]">verified_user</span>
            <span className="text-[12px] font-medium leading-snug">
              {pattern?.advisoryPill || 'Critical focus: Strict bounds check & non-allocating edge cases'}
            </span>
          </div>
        </div>

        {/* Section 1: Company Interview Vibe */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-[#eff4ff] p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4f46e5]/10 flex items-center justify-center text-[#4f46e5]">
              <span className="material-symbols-outlined text-[20px]">explore</span>
            </div>
            <h3 className="text-[17px] text-[#0b1c30] font-bold">Company Interview Vibe</h3>
          </div>

          <div className="flex flex-col gap-2">
            {pattern?.vibePoints.map((point, index) => (
              <div
                key={index}
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#eff4ff]/60 border border-[#e5eeff] hover:bg-[#eff4ff] transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#6cf8bb]/30 text-[#00714d] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[16px]">{point.icon}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[14px] font-semibold text-[#0b1c30]">{point.title}</span>
                  <p className="text-[12px] text-[#464555] mt-0.5 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Tested Patterns */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="text-[17px] text-[#0b1c30] font-bold">Tested Patterns</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-[#dce9ff] text-[#3525cd] text-[11px] font-semibold">
              3 High-Yield
            </span>
          </div>

          {pattern?.testedPatterns.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-[#eff4ff] p-4 flex flex-col gap-2.5 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex flex-col">
                  <span className="text-[15px] text-[#0b1c30] font-semibold">{p.title}</span>
                  <span className="text-[12px] text-[#464555] mt-0.5">{p.description}</span>
                </div>
                <span className="px-2 py-0.5 bg-[#6cf8bb]/30 text-[#00714d] text-[11px] rounded-full font-bold whitespace-nowrap">
                  {p.matchPercentage}% Match
                </span>
              </div>

              <div className="flex flex-col gap-1.5 pt-1">
                {p.problems.map((prob, pidx) => (
                  <button
                    key={pidx}
                    onClick={() => onOpenProblem(prob.title)}
                    className="flex items-center justify-between p-2.5 bg-[#eff4ff] rounded-xl hover:bg-[#e5eeff] transition-colors group text-left border border-[#e5eeff]"
                  >
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#3525cd] text-[18px]">terminal</span>
                      <span className="text-[13px] text-[#0b1c30] font-medium">{prob.title}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#684000] font-semibold">{prob.diff}</span>
                      <span className="material-symbols-outlined text-[#3525cd] text-[16px] transition-transform group-hover:translate-x-0.5">
                        chevron_right
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section 3: Recent Assessment & Campus Trends */}
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-[#eff4ff] p-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#006c49] animate-pulse"></div>
              <h3 className="text-[15px] text-[#0b1c30] font-bold">2024 - 2025 OA Shift</h3>
            </div>
            <span className="text-[11px] text-[#464555] font-medium">Real-Time Intake</span>
          </div>

          <p className="text-[12px] text-[#464555] leading-relaxed">
            Recent {company.name} campus hackathons and SDE assessments have pivoted towards <span className="font-semibold text-[#0b1c30]">Hybrid Hashing</span>. Interviewers increasingly frame questions around logistics tracking: pairing HashMaps with Monotonic Queues for continuous inventory stream updates.
          </p>

          <div className="flex items-start gap-2.5 p-3 bg-[#eff4ff] rounded-xl border border-[#e5eeff]">
            <span className="material-symbols-outlined text-[#3525cd] text-[20px] shrink-0 mt-0.5">
              insights
            </span>
            <div className="flex flex-col">
              <span className="text-[12px] text-[#0b1c30] font-semibold">Assessment Insight</span>
              <span className="text-[11px] text-[#464555] leading-snug">
                Over 60% of candidates who passed Round 1 proactively mentioned memory allocation limits.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Action Area */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={onPracticeCurated}
            className="w-full h-12 rounded-xl bg-[#4f46e5] text-white text-[14px] font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-[#3525cd] transition-all active:scale-98"
          >
            <span className="material-symbols-outlined text-[20px]">play_arrow</span>
            <span>Practice {company.name} Arrays (12 Curated)</span>
          </button>
          <button
            onClick={() => {
              setDownloaded(true);
              setTimeout(() => setDownloaded(false), 3000);
            }}
            className="w-full h-10 flex items-center justify-center gap-1.5 text-[#464555] hover:text-[#0b1c30] text-[12px] font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">
              {downloaded ? 'check_circle' : 'download_for_offline'}
            </span>
            <span>
              {downloaded ? 'Pattern Cheat Sheet Downloaded!' : 'Download Pattern Cheat Sheet (PDF)'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
