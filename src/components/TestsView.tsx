import React, { useState } from 'react';
import { CompanyHiringTrack } from '../types';

interface TestsViewProps {
  companies: CompanyHiringTrack[];
  onStartCompanyMock: (companyId: string) => void;
  onOpenTopic: (topicId: string) => void;
}

export const TestsView: React.FC<TestsViewProps> = ({
  companies,
  onStartCompanyMock,
  onOpenTopic,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'oa' | 'technical'>('all');

  const tests = [
    {
      id: 'amazon-oa-mock',
      companyId: 'amazon',
      title: 'Amazon SDE 1 Online Assessment Simulation',
      role: 'Amazon • Product SDE',
      duration: '90 mins',
      difficulty: 'High',
      pattern: 'HackerRank Environment • 2 Coding + Work Simulation',
      questionsCount: 2,
      attempts: '1,420 taken this week',
      status: 'Ready to Start',
      tag: 'Tier-1 OA',
    },
    {
      id: 'google-dsa-mock',
      companyId: 'google',
      title: 'Google Technical Screening Pairing Mock',
      role: 'Google • Software Engineer L3/L4',
      duration: '45 mins',
      difficulty: 'Very High',
      pattern: 'Google Docs / Whiteboard Format • Graphs & Recursion',
      questionsCount: 1,
      attempts: '890 taken this week',
      status: 'Ready to Start',
      tag: 'Live Pairing',
    },
    {
      id: 'uber-algo-mock',
      companyId: 'uber',
      title: 'Uber Spatial & Two Pointers Speed Test',
      role: 'Uber • Software Engineer I',
      duration: '60 mins',
      difficulty: 'Very High',
      pattern: 'Speed Coding • Trapping Water & Monotonic Queues',
      questionsCount: 3,
      attempts: '640 taken this week',
      status: 'Ready to Start',
      tag: 'Speed Drill',
    },
    {
      id: 'general-dsa-sprint',
      companyId: 'amazon',
      title: 'Arrays & Hashing Diagnostic Sprint',
      role: 'High Frequency Foundation',
      duration: '30 mins',
      difficulty: 'Medium',
      pattern: '3 Rapid-Fire Subarray & Hashing Problems',
      questionsCount: 3,
      attempts: '3,210 taken this week',
      status: 'Recommended',
      tag: 'Diagnostic',
    },
  ];

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-1">
      {/* Header */}
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] font-semibold text-[#0b1c30]">Placement Mock Tests</h2>
          <span className="px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#00714d] text-[11px] font-semibold">
            Pro Unlocked
          </span>
        </div>
        <p className="text-[13px] text-[#464555]">
          Timed high-fidelity test simulations mirroring actual company hiring rounds.
        </p>
      </div>

      {/* Quick Test Summary Banner */}
      <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#eff4ff] mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">timer</span>
          </div>
          <div>
            <div className="text-[14px] font-semibold text-[#0b1c30]">Benchmark Average</div>
            <div className="text-[12px] text-[#464555]">82% Pass rate in cohort</div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[18px] text-[#006c49] font-bold">8 Solved</span>
          <span className="text-[11px] text-[#464555]">Rank: Top 15%</span>
        </div>
      </div>

      {/* Tests Catalog */}
      <div className="flex flex-col gap-3">
        {tests.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-2xl p-4 shadow-sm border border-[#eff4ff] hover:border-[#dce9ff] transition-all flex flex-col gap-3 group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-[#3525cd] uppercase tracking-wider">
                  {test.role}
                </span>
                <h3 className="text-[15px] font-bold text-[#0b1c30] group-hover:text-[#3525cd] transition-colors mt-0.5">
                  {test.title}
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#464555] text-[11px] font-medium border border-[#e5eeff] shrink-0">
                {test.tag}
              </span>
            </div>

            <p className="text-[12px] text-[#464555] leading-relaxed">
              {test.pattern}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-[#eff4ff] text-[11px] text-[#464555]">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  {test.duration}
                </span>
                <span>•</span>
                <span>{test.questionsCount} Questions</span>
              </div>
              <span className="text-[#006c49] font-medium">{test.attempts}</span>
            </div>

            <button
              onClick={() => onStartCompanyMock(test.companyId)}
              className="w-full h-11 bg-[#eff4ff] hover:bg-[#4f46e5] text-[#3525cd] hover:text-white text-[13px] font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              <span>Launch Mock Test</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
