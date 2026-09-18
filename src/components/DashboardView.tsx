import React from 'react';
import { UserProfile } from '../types';

interface DashboardViewProps {
  user: UserProfile;
  onOpenTopic: (topicId: string) => void;
  onOpenCompany: (companyId: string) => void;
  onOpenProblem: (problemId: string) => void;
  onOpenTests: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  onOpenTopic,
  onOpenCompany,
  onOpenProblem,
}) => {
  return (
    <div className="flex flex-col w-full px-4 pb-28 space-y-4 pt-1">
      {/* Top Bar / Personal Greeting */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2.5">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shadow-sm bg-[#dce9ff] flex-shrink-0 ring-2 ring-white">
            <img
              alt="Student profile photo"
              className="w-full h-full object-cover"
              src={user.avatarUrl}
            />
          </div>
          <div className="flex flex-col min-w-0">
            <h2 className="text-[20px] font-semibold text-[#0b1c30] truncate leading-tight">
              Hello, {user.name.split(' ')[0]}
            </h2>
            <p className="text-[12px] text-[#464555] leading-none mt-1">
              Let's keep up your prep momentum
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#ffddb8]/50 text-[#653e00] px-3 py-1 rounded-full shadow-sm flex-shrink-0 border border-[#ffddb8]/80">
          <span className="text-[13px] leading-none">🔥</span>
          <span className="text-[11px] font-semibold tracking-wide">
            {user.streakDays} Days
          </span>
        </div>
      </div>

      {/* Hero Readiness Progress Widget */}
      <div className="w-full bg-white rounded-2xl p-5 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-[#eff4ff] flex flex-col items-center relative overflow-hidden">
        {/* Soft background ambient gradient glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#4f46e5]/5 rounded-full blur-xl pointer-events-none" />
        
        <div className="relative w-28 h-28 flex items-center justify-center mb-3">
          <svg aria-hidden="true" className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background Track */}
            <circle
              className="text-[#e5eeff]"
              cx="50"
              cy="50"
              fill="transparent"
              r="42"
              stroke="currentColor"
              strokeWidth="7"
            />
            {/* Progress Fill (68%) -> 2 * PI * 42 ~= 263.89; 68% ~= 179.45 offset 84.44 */}
            <circle
              className="text-[#006c49] transition-all duration-1000 ease-out"
              cx="50"
              cy="50"
              fill="transparent"
              r="42"
              stroke="currentColor"
              strokeDasharray="263.89"
              strokeDashoffset="84.44"
              strokeLinecap="round"
              strokeWidth="7"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[24px] font-bold text-[#0b1c30] leading-none">
              {user.overallReadiness}%
            </span>
            <span className="text-[11px] text-[#464555] font-medium mt-1">
              Placement Ready
            </span>
          </div>
        </div>

        {/* Sub-chips Breakdown */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 w-full pt-1">
          <div className="flex items-center gap-1.5 bg-[#6cf8bb]/25 text-[#00714d] font-medium text-[11px] px-2.5 py-1 rounded-full border border-[#6cf8bb]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]"></span>
            <span>DSA: {user.dsaReadiness}%</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#eff4ff] text-[#464555] font-medium text-[11px] px-2.5 py-1 rounded-full border border-[#e5eeff]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#777587]"></span>
            <span>Aptitude: 60%</span>
          </div>
          <div className="flex items-center gap-1.5 bg-[#ffddb8]/40 text-[#653e00] font-medium text-[11px] px-2.5 py-1 rounded-full border border-[#ffddb8]/60">
            <span className="w-1.5 h-1.5 rounded-full bg-[#684000]"></span>
            <span>System Design: {user.systemAptitudeReadiness}%</span>
          </div>
        </div>
      </div>

      {/* Today's Focus Section */}
      <div className="flex flex-col space-y-2.5">
        <div className="flex items-baseline justify-between px-0.5">
          <div>
            <h3 className="text-[16px] font-semibold text-[#0b1c30]">Today's Focus</h3>
            <p className="text-[12px] text-[#464555]">2 high-yield topics selected for you</p>
          </div>
          <span className="text-[11px] text-[#3525cd] font-semibold">Curated</span>
        </div>

        {/* Action Card 1 */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-[#eff4ff] flex items-center justify-between gap-3 transition-transform active:scale-[0.99]">
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#ffddb8]/50 text-[#653e00] text-[11px] px-2 py-0.5 rounded-full font-medium">
                Medium
              </span>
              <span className="flex items-center gap-0.5 text-[12px] text-[#464555]">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>15 mins</span>
              </span>
            </div>
            <h4
              onClick={() => onOpenTopic('trees-bst')}
              className="text-[15px] font-semibold text-[#0b1c30] truncate leading-snug cursor-pointer hover:text-[#3525cd] transition-colors"
            >
              Binary Tree Level Order Traversal
            </h4>
            <span className="text-[12px] text-[#464555] mt-0.5">
              Data Structures • Trees
            </span>
          </div>
          <button
            aria-label="Start Binary Tree Level Order Traversal practice"
            onClick={() => onOpenTopic('trees-bst')}
            className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#3525cd] hover:bg-[#3525cd] hover:text-white active:scale-95 transition-all flex items-center justify-center flex-shrink-0 shadow-sm"
          >
            <span className="material-symbols-outlined text-[22px] ml-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
          </button>
        </div>

        {/* Action Card 2 */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-[#eff4ff] flex items-center justify-between gap-3 transition-transform active:scale-[0.99]">
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#6cf8bb]/30 text-[#00714d] text-[11px] px-2 py-0.5 rounded-full font-medium">
                Easy
              </span>
              <span className="flex items-center gap-0.5 text-[12px] text-[#464555]">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                <span>15 mins</span>
              </span>
            </div>
            <h4
              onClick={() => onOpenTopic('quantitative-aptitude')}
              className="text-[15px] font-semibold text-[#0b1c30] truncate leading-snug cursor-pointer hover:text-[#3525cd] transition-colors"
            >
              Probability & Bayes' Theorem Essentials
            </h4>
            <span className="text-[12px] text-[#464555] mt-0.5">
              Aptitude • Quantitative
            </span>
          </div>
          <button
            aria-label="Start Probability & Bayes' Theorem practice"
            onClick={() => onOpenTopic('quantitative-aptitude')}
            className="w-10 h-10 rounded-full bg-[#eff4ff] text-[#3525cd] hover:bg-[#3525cd] hover:text-white active:scale-95 transition-all flex items-center justify-center flex-shrink-0 shadow-sm"
          >
            <span className="material-symbols-outlined text-[22px] ml-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
          </button>
        </div>
      </div>

      {/* Quick Drive Banner */}
      <div className="w-full bg-[#ffddb8]/35 border border-[#ffddb8]/80 rounded-2xl p-4 shadow-[0_2px_12px_-2px_rgba(15,23,42,0.04)] flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-[#ffb95f]/40 text-[#684000] flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[18px]">campaign</span>
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <p className="text-[13px] text-[#0b1c30] leading-snug">
            <strong className="font-semibold text-[#0b1c30]">Amazon On-Campus Drive in 5 Days</strong> • Review recommended pattern tests
          </p>
          <button
            onClick={() => onOpenCompany('amazon')}
            className="inline-flex items-center gap-1 text-[12px] text-[#684000] font-semibold mt-2 hover:underline focus:outline-none self-start"
          >
            <span>View Details</span>
            <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Quick Continue Practice Pill Banner */}
      <div className="w-full bg-white rounded-2xl p-4 border border-[#eff4ff] shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">code</span>
          </div>
          <div>
            <div className="text-[14px] font-semibold text-[#0b1c30]">Active Problem In Progress</div>
            <div className="text-[12px] text-[#464555]">Longest Consecutive Sequence</div>
          </div>
        </div>
        <button
          onClick={() => onOpenProblem('longest-consecutive-sequence')}
          className="px-3.5 py-1.5 rounded-lg bg-[#4f46e5] text-white text-[12px] font-medium hover:bg-[#3525cd] transition-colors"
        >
          Resume
        </button>
      </div>
    </div>
  );
};
