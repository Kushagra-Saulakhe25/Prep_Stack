import React, { useState } from 'react';
import { CompanyHiringTrack } from '../types';

interface CompaniesViewProps {
  companies: CompanyHiringTrack[];
  selectedCompanyId: string;
  onSelectCompany: (companyId: string) => void;
  onOpenStudyAsset: (assetId: string) => void;
  onStartMock: (companyId: string) => void;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({
  companies,
  selectedCompanyId,
  onSelectCompany,
  onOpenStudyAsset,
  onStartMock,
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const company = companies.find((c) => c.id === selectedCompanyId) || companies[0];

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-1">
      {/* 1. Top Sub-Navigation / Quick Action Bar */}
      <div className="flex items-center justify-between py-2 mb-1">
        {/* Company Quick Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar -ml-1 pr-2">
          {companies.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCompany(c.id)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all ${
                company.id === c.id
                  ? 'bg-[#3525cd] text-white shadow-sm'
                  : 'bg-white text-[#464555] hover:text-[#0b1c30] border border-[#e5eeff]'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            aria-label="Save to target list"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`w-9 h-9 flex items-center justify-center rounded-full bg-[#eff4ff] transition-all active:scale-95 shadow-sm ${
              isBookmarked ? 'text-[#3525cd] bg-[#e2dfff]' : 'text-[#464555] hover:text-[#3525cd]'
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
            aria-label="Share interview track"
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Copied company preparation roadmap link!');
              }
            }}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#eff4ff] text-[#464555] hover:text-[#3525cd] transition-all active:scale-95 shadow-sm"
          >
            <span className="material-symbols-outlined text-[19px]">ios_share</span>
          </button>
        </div>
      </div>

      {/* 2. Company Header Card */}
      <div className="relative bg-white rounded-2xl p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-[#eff4ff] overflow-hidden mb-4">
        {/* Subtle Brand Glow Accent */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#3525cd]/5 rounded-full pointer-events-none blur-2xl" />

        {/* Top Row: Identifiers & Role Tag */}
        <div className="flex items-start justify-between gap-3 mb-3 relative z-10">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-[#eff4ff] p-2 flex items-center justify-center shadow-sm flex-shrink-0 border border-[#e5eeff]">
              {company.id === 'amazon' ? (
                <svg className="w-7 h-7 text-[#0b1c30]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.42 16.35c-2.48 1.83-6.09 2.79-9.22 1.37-1.1-.5-2.02-1.25-2.65-2.19-.19-.28-.02-.55.3-.46 3.29.95 6.94.75 9.87-.96.42-.25.84.18.42.54l1.28 1.7zm1.14-1.39c-.32-.41-.75-.38-.99-.08-1.07 1.35-2.73 2.1-4.49 2.1-.96 0-1.92-.25-2.78-.75-.38-.22-.72.07-.48.42.74 1.09 2.05 1.76 3.44 1.76 1.75 0 3.39-.81 4.47-2.18.23-.29.17-.86-.17-1.27zM20.25 18.21c-.41-.33-2.72-.18-3.77-.07-.32.03-.37-.24-.09-.43 1.81-1.26 3.8-1.57 4.16-1.12.37.45-.19 2.37-1.89 3.82-.26.22-.51.1-.38-.2.43-1.03 1.56-1.7 1.97-2zM12.92 5.09c.14.77.24 1.57.24 2.4 0 3.23-1.63 5.48-4.08 5.48-1.37 0-2.31-.83-2.31-2.22 0-2.32 2.03-3.6 5.42-3.8l.73-1.86zm-1.84 5.37c-.77.1-1.59.35-1.59 1.13 0 .52.37.84.85.84.7 0 1.25-.56 1.37-1.22l-.63-.75z" />
                </svg>
              ) : (
                <span className="material-symbols-outlined text-[24px] text-[#3525cd]">
                  {company.logo}
                </span>
              )}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[17px] font-bold text-[#0b1c30] truncate">{company.name}</span>
                <span
                  className="material-symbols-outlined text-[#006c49] text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  title="Verified Evaluation Pipeline"
                >
                  verified
                </span>
              </div>
              <span className="text-[12px] text-[#464555]">{company.industry}</span>
            </div>
          </div>
          <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#e2dfff] text-[#3323cc] text-[11px] font-semibold whitespace-nowrap shadow-sm">
            {company.role}
          </div>
        </div>

        {/* Difficulty & Metrics Row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e5eeff] text-[12px] text-[#464555]">
            <span className="w-2 h-2 rounded-full bg-[#ffb95f] ring-2 ring-[#684000]/20"></span>
            <span className="font-medium">Difficulty: {company.difficulty}</span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e5eeff] text-[12px] text-[#464555]">
            <span className="material-symbols-outlined text-[15px] text-[#006c49]">trending_up</span>
            <span className="font-semibold text-[#0b1c30]">Avg. CTC: {company.avgCtc}</span>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#6cf8bb]/30 text-[#00714d] text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[14px]">psychology</span>
            {company.patternMatch}% Pattern Match
          </div>
        </div>

        {/* Description / Brief */}
        <p className="text-[13px] text-[#464555] leading-relaxed mb-3">
          {company.description}
        </p>

        {/* Visual Readiness Meter Mini-Module */}
        <div className="pt-2 bg-[#eff4ff]/70 rounded-xl p-3 flex flex-col gap-1.5 border border-[#e5eeff]">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-[#464555] font-medium">Your PrepStack Cohort Match</span>
            <span className="text-[#3525cd] font-bold">{company.cohortMatch}% Ready</span>
          </div>
          <div className="w-full h-1.5 bg-[#e5eeff] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4f46e5] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${company.cohortMatch}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3. Hiring Process Visual Step Roadmap */}
      <div className="flex flex-col mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] font-bold text-[#464555] uppercase tracking-wider">
            Interview Process Roadmap
          </h2>
          <span className="text-[11px] text-[#3525cd] font-semibold">
            {company.rounds.length} Total Stages
          </span>
        </div>

        <div className="relative flex flex-col">
          {company.rounds.map((round, idx) => {
            const isLast = idx === company.rounds.length - 1;
            const isCompleted = round.type === 'completed';
            const isActive = round.type === 'active';

            return (
              <div key={round.number} className="relative flex items-start gap-3 pb-4 group">
                {/* Connecting Line */}
                {!isLast && (
                  <div
                    className={`absolute left-4 top-8 -bottom-1 w-0.5 ${
                      isCompleted
                        ? 'bg-[#006c49]'
                        : 'border-l border-dashed border-[#777587]/40'
                    }`}
                  />
                )}

                {/* Node Status Indicator */}
                <div
                  className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${
                    isCompleted
                      ? 'bg-[#006c49] text-white'
                      : isActive
                      ? 'bg-[#4f46e5] text-white shadow-[0_0_12px_rgba(79,70,229,0.4)]'
                      : 'bg-[#e5eeff] text-[#464555]'
                  }`}
                >
                  {isCompleted ? (
                    <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                  ) : isActive ? (
                    <span className="material-symbols-outlined text-[17px] animate-pulse">code</span>
                  ) : (
                    <span className="material-symbols-outlined text-[17px]">lock_clock</span>
                  )}
                </div>

                {/* Step Content Card */}
                <div
                  className={`flex-1 rounded-2xl p-3.5 shadow-sm border transition-all ${
                    isActive
                      ? 'bg-white border-[#4f46e5]/40 shadow-[0_6px_24px_-4px_rgba(79,70,229,0.12)] ring-1 ring-[#4f46e5]/20'
                      : isCompleted
                      ? 'bg-white border-[#eff4ff]'
                      : 'bg-white/80 border-[#eff4ff]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-[14px] font-semibold text-[#0b1c30]">
                      {round.title}
                    </h3>
                    {round.scoreBadge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#00714d] text-[11px] font-semibold whitespace-nowrap">
                        {round.scoreBadge}
                      </span>
                    )}
                    {round.type === 'locked' && (
                      <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#464555] text-[11px] font-medium">
                        Upcoming
                      </span>
                    )}
                  </div>

                  {round.currentFocusBadge && (
                    <div className="inline-flex self-start px-2.5 py-0.5 rounded-full bg-[#e2dfff] text-[#3323cc] text-[11px] font-semibold mb-1.5">
                      {round.currentFocusBadge}
                    </div>
                  )}

                  <p className="text-[12px] text-[#464555] mb-2 leading-relaxed">
                    {round.summary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-[#eff4ff] text-[11px]">
                    <span className="flex items-center gap-1 text-[#464555]">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {round.duration}
                    </span>
                    <span
                      className={`font-semibold ${
                        isCompleted
                          ? 'text-[#006c49]'
                          : isActive
                          ? 'text-[#3525cd]'
                          : 'text-[#777587]'
                      }`}
                    >
                      {round.statusText}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Curated Study Assets */}
      <div className="flex flex-col mb-5">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-[11px] font-bold text-[#464555] uppercase tracking-wider">
            Curated Study Assets
          </h2>
          <span className="text-[11px] text-[#464555]">
            {company.studyAssets.length} High-Impact Bundles
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {company.studyAssets.map((asset) => (
            <div
              key={asset.id}
              onClick={() => onOpenStudyAsset(asset.id)}
              className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-[#eff4ff] shadow-sm hover:border-[#dce9ff] transition-all cursor-pointer active:scale-[0.99] group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#e2dfff] flex items-center justify-center text-[#3525cd] flex-shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">{asset.icon}</span>
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-[14px] font-semibold text-[#0b1c30] truncate group-hover:text-[#3525cd] transition-colors">
                    {asset.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[#464555] text-[12px]">
                    <span className="truncate">{asset.subtitle}</span>
                    <span>•</span>
                    <span className="text-[#006c49] font-medium shrink-0">{asset.solvedText}</span>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#777587] group-hover:text-[#3525cd] group-hover:translate-x-0.5 transition-all text-[20px] ml-2">
                chevron_right
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Prominent Floating Action CTA */}
      <div className="w-full">
        <div className="bg-white rounded-2xl p-4 border border-[#eff4ff] shadow-[0_10px_25px_-3px_rgba(15,23,42,0.08)] flex flex-col items-center gap-1.5">
          <button
            onClick={() => onStartMock(company.id)}
            className="w-full h-12 bg-[#4f46e5] text-white hover:bg-[#3525cd] text-[14px] font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[20px]">play_arrow</span>
            <span>Start Pattern Mock Test</span>
          </button>
          <div className="flex items-center gap-1.5 text-[11px] text-[#464555] text-center pt-0.5">
            <span className="material-symbols-outlined text-[14px] text-[#684000]">bolt</span>
            <span>Timed 60-min simulation based on latest 2025 hiring trends</span>
          </div>
        </div>
      </div>
    </div>
  );
};
