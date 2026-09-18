import React, { useState } from 'react';
import { TopicModule } from '../types';

interface LearnViewProps {
  topics: TopicModule[];
  onSelectTopic: (topicId: string) => void;
  onOpenStreakGoal?: () => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  topics,
  onSelectTopic,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState<'all' | 'dsa' | 'aptitude' | 'system-design' | 'core-cs'>('dsa');

  const filteredTopics = topics.filter((topic) => {
    const matchesTrack = selectedTrack === 'all' || topic.track === selectedTrack;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesTrack;

    const matchesTitle = topic.title.toLowerCase().includes(query);
    const matchesDesc = topic.description.toLowerCase().includes(query);
    const matchesCompanies = topic.companies.some((c) => c.toLowerCase().includes(query));
    return matchesTrack && (matchesTitle || matchesDesc || matchesCompanies);
  });

  const totalQuestions = topics.reduce((acc, t) => acc + t.totalProblems, 0);
  const solvedQuestions = topics.reduce((acc, t) => acc + t.completedProblems, 0);
  const percentage = Math.round((solvedQuestions / totalQuestions) * 100);

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Ambient Canvas Area */}
      <div className="relative px-4 pt-1 pb-4">
        {/* Header Section */}
        <div className="flex flex-col gap-1 mb-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-semibold text-[#0b1c30]">Curated Syllabus</h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#6cf8bb]/30 text-[#00714d] text-[11px] font-medium border border-[#6cf8bb]/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006c49] animate-pulse"></span>
              2025 Tier-1
            </span>
          </div>
          <p className="text-[13px] text-[#464555]">
            Structured roadmap tailored for top product & IT placements
          </p>
        </div>

        {/* Interactive Search Bar */}
        <div className="relative w-full mb-3.5">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#777587]">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, patterns, or algorithms..."
            className="w-full h-12 pl-10 pr-10 bg-white text-[#0b1c30] text-[14px] rounded-xl shadow-sm border border-[#e5eeff] focus:outline-none focus:border-[#4f46e5] focus:ring-2 focus:ring-[#4f46e5]/10 transition-all placeholder:text-[#777587]"
          />
          {searchQuery && (
            <button
              aria-label="Clear search"
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#777587] hover:text-[#0b1c30]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Track Summary Pill Banner */}
        <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-[#eff4ff] mb-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">terminal</span>
            </div>
            <div>
              <div className="text-[15px] font-semibold text-[#0b1c30] leading-snug">Track Mastery</div>
              <div className="text-[12px] text-[#464555]">{solvedQuestions} of {totalQuestions} questions solved</div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[18px] text-[#3525cd] font-bold">{percentage}%</span>
            <span className="text-[11px] text-[#006c49] font-medium flex items-center gap-0.5">
              <span className="material-symbols-outlined text-[13px]">trending_up</span> On Track
            </span>
          </div>
        </div>

        {/* Segment Control / Pill Tabs (Scrollable) */}
        <div className="w-full overflow-x-auto no-scrollbar -mx-4 px-4 mb-3.5">
          <div className="flex items-center gap-2 min-w-max pb-1">
            {[
              { id: 'dsa', label: 'DSA' },
              { id: 'aptitude', label: 'Aptitude' },
              { id: 'system-design', label: 'System Design' },
              { id: 'core-cs', label: 'Core CS' },
            ].map((tab) => {
              const active = selectedTrack === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTrack(tab.id as any)}
                  className={`px-4 py-2 rounded-full text-[12px] font-medium transition-all shadow-sm ${
                    active
                      ? 'bg-[#4f46e5] text-white'
                      : 'bg-white text-[#464555] hover:text-[#0b1c30] border border-[#e5eeff]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Topic Cards Stack */}
        <div className="flex flex-col gap-2.5">
          {filteredTopics.map((topic) => {
            const topicPercentage = Math.round((topic.completedProblems / topic.totalProblems) * 100);
            const isCompleted = topicPercentage === 100;

            const badgeBg =
              topic.badgeType === 'secondary'
                ? 'bg-[#6cf8bb]/25 text-[#00714d]'
                : topic.badgeType === 'tertiary'
                ? 'bg-[#ffddb8] text-[#684000]'
                : topic.badgeType === 'primary'
                ? 'bg-[#e2dfff] text-[#3323cc]'
                : 'bg-[#e5eeff] text-[#464555]';

            return (
              <div
                key={topic.id}
                onClick={() => onSelectTopic(topic.id)}
                className="group bg-white rounded-2xl p-4 shadow-sm border border-[#eff4ff] transition-all active:scale-[0.99] hover:border-[#dce9ff] cursor-pointer"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] font-semibold text-[#0b1c30] truncate group-hover:text-[#3525cd] transition-colors">
                      {topic.title}
                    </h3>
                    <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${badgeBg}`}>
                      {topic.badge}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#f8f9ff] flex items-center justify-center text-[#464555] group-hover:text-[#3525cd] group-hover:bg-[#e2dfff] transition-all flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                  </div>
                </div>

                {/* Progress Indicator Row */}
                <div className="my-2.5">
                  <div className="flex items-center justify-between text-[12px] text-[#464555] mb-1.5">
                    {isCompleted ? (
                      <div className="flex items-center gap-1 text-[#006c49] font-medium">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                        <span>{topic.completedProblems} of {topic.totalProblems} completed</span>
                      </div>
                    ) : (
                      <span className="font-medium text-[#0b1c30]">
                        {topic.completedProblems} of {topic.totalProblems} completed
                      </span>
                    )}
                    <span className={`font-semibold text-[11px] ${isCompleted ? 'text-[#006c49]' : 'text-[#006c49]'}`}>
                      {topicPercentage}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-[#e5eeff] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#006c49] rounded-full transition-all duration-500"
                      style={{ width: `${topicPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Company Tags */}
                {topic.companies.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[11px] text-[#777587] mr-0.5">Asked in:</span>
                    {topic.companies.map((company) => (
                      <span
                        key={company}
                        className="px-2 py-0.5 rounded-md bg-[#eff4ff] text-[#464555] text-[11px] font-medium border border-[#e5eeff]"
                      >
                        {company}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {filteredTopics.length === 0 && (
            <div className="flex flex-col items-center justify-center text-center py-10 px-4 bg-white rounded-2xl border border-[#e5eeff]">
              <div className="w-14 h-14 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#777587] mb-2.5">
                <span className="material-symbols-outlined text-[28px]">search_off</span>
              </div>
              <h4 className="text-[16px] font-semibold text-[#0b1c30] mb-1">No topics found</h4>
              <p className="text-[12px] text-[#464555] max-w-xs mb-3">
                Try searching for another pattern, algorithm name, or reset the filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTrack('dsa');
                }}
                className="px-4 py-2 rounded-xl bg-[#eff4ff] text-[#3525cd] text-[12px] font-medium hover:bg-[#e5eeff]"
              >
                Clear Filter
              </button>
            </div>
          )}
        </div>

        {/* Delighted Motivation Banner */}
        <div className="mt-3.5 p-4 rounded-2xl bg-gradient-to-r from-[#e2dfff]/60 to-[#e5eeff] border border-[#dce9ff] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-white text-[#3525cd] flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                bolt
              </span>
            </div>
            <div className="min-w-0">
              <div className="text-[13px] text-[#0b1c30] font-semibold truncate">Daily Practice Goal</div>
              <div className="text-[11px] text-[#464555] truncate">Solve 2 more questions to retain your 14-day streak!</div>
            </div>
          </div>
          <button
            onClick={() => onSelectTopic('arrays-hashing')}
            className="px-3 py-1.5 rounded-lg bg-[#3525cd] text-white text-[12px] font-medium shrink-0 shadow-sm active:scale-95 transition-transform"
          >
            Start
          </button>
        </div>
      </div>
    </div>
  );
};
