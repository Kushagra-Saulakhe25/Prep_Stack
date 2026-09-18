import React, { useState } from 'react';
import { TopicModule } from '../types';

interface TopicDetailViewProps {
  topic: TopicModule;
  onBack: () => void;
  onOpenProblem: (problemId: string) => void;
  onNextRecommended: () => void;
}

export const TopicDetailView: React.FC<TopicDetailViewProps> = ({
  topic,
  onBack,
  onOpenProblem,
  onNextRecommended,
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'solved'>('all');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const percentage = Math.round((topic.completedProblems / topic.totalProblems) * 100);
  const pendingCount = topic.totalProblems - topic.completedProblems;

  const filteredProblems = topic.problems.filter((p) => {
    if (filter === 'solved') return p.status === 'solved';
    if (filter === 'pending') return p.status !== 'solved';
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-28 pt-1">
      {/* Topic Sub-Navigation Bar */}
      <div className="px-4 py-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-[#464555] hover:text-[#3525cd] transition-colors py-1.5 pr-2 active:scale-95 text-[14px] font-medium"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>DSA Track</span>
        </button>
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#dce9ff] text-[#3525cd] text-[11px] font-medium">
            {topic.badge}
          </span>
          <button
            aria-label="Bookmark Topic"
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-sm border border-[#e5eeff] transition-transform active:scale-90 ${
              isBookmarked ? 'text-[#3525cd] bg-[#e2dfff]' : 'text-[#464555]'
            }`}
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={isBookmarked ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>
        </div>
      </div>

      <div className="px-4 space-y-4 pb-6">
        {/* Topic Header & Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
            <span className="text-[11px] uppercase tracking-wider text-[#006c49] font-bold">
              High Priority Module
            </span>
          </div>
          <h2 className="text-[24px] font-bold text-[#0b1c30] tracking-tight">
            {topic.title}
          </h2>
          <p className="text-[12px] text-[#464555] leading-relaxed">
            {topic.description}
          </p>
        </div>

        {/* Topic Mastery Hero Card */}
        <div className="rounded-2xl bg-white p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-[#eff4ff] relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#6cf8bb]/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between gap-4">
            {/* SVG Progress Ring */}
            <div className="relative flex items-center justify-center shrink-0 w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
                <circle
                  className="text-[#e5eeff]"
                  cx="48"
                  cy="48"
                  fill="transparent"
                  r="38"
                  stroke="currentColor"
                  strokeWidth="7"
                />
                <circle
                  className="text-[#006c49] transition-all duration-1000"
                  cx="48"
                  cy="48"
                  fill="transparent"
                  r="38"
                  stroke="currentColor"
                  strokeDasharray="238.76"
                  strokeDashoffset={238.76 - (238.76 * percentage) / 100}
                  strokeLinecap="round"
                  strokeWidth="7"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[20px] font-bold text-[#0b1c30] leading-none">
                  {percentage}%
                </span>
                <span className="text-[11px] text-[#006c49] font-medium mt-0.5">
                  {topic.completedProblems}/{topic.totalProblems} Solved
                </span>
              </div>
            </div>

            {/* Metric Details */}
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-1.5 text-[#464555]">
                <span className="material-symbols-outlined text-[17px] text-[#684000]">schedule</span>
                <span className="text-[12px]">
                  <strong className="text-[#0b1c30]">{topic.estHoursRemaining} hrs</strong> remaining
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#464555]">
                <span className="material-symbols-outlined text-[17px] text-[#006c49]">verified</span>
                <span className="text-[12px]">
                  <strong className="text-[#0b1c30]">{topic.avgAccuracy}%</strong> avg. accuracy
                </span>
              </div>
              <div className="pt-0.5">
                <div className="flex items-center gap-1 text-[#464555]">
                  <span className="material-symbols-outlined text-[13px]">corporate_fare</span>
                  <span className="text-[11px]">High-yield in:</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {topic.companies.map((c) => (
                    <span
                      key={c}
                      className="px-1.5 py-0.5 rounded bg-[#eff4ff] text-[11px] font-medium text-[#0b1c30] border border-[#e5eeff]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Distribution Breakdown */}
        <div className="rounded-2xl bg-white p-4 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.05)] border border-[#eff4ff] space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[15px] font-semibold text-[#0b1c30]">Difficulty Split</span>
            <span className="text-[11px] text-[#464555]">{pendingCount} Pending Review</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Easy */}
            <div className="p-2.5 rounded-xl bg-[#eff4ff] space-y-1.5 border border-[#e5eeff]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#006c49]">Easy</span>
                <span className="text-[11px] text-[#0b1c30] font-medium">4/4</span>
              </div>
              <div className="w-full h-1.5 bg-[#e5eeff] rounded-full overflow-hidden">
                <div className="h-full bg-[#006c49] rounded-full w-full"></div>
              </div>
              <span className="block text-[10px] text-[#006c49] font-medium">100% Complete</span>
            </div>

            {/* Medium */}
            <div className="p-2.5 rounded-xl bg-[#eff4ff] space-y-1.5 border border-[#e5eeff]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#684000]">Med</span>
                <span className="text-[11px] text-[#0b1c30] font-medium">3/5</span>
              </div>
              <div className="w-full h-1.5 bg-[#e5eeff] rounded-full overflow-hidden">
                <div className="h-full bg-[#684000] rounded-full w-[60%]"></div>
              </div>
              <span className="block text-[10px] text-[#684000] font-medium">60% Complete</span>
            </div>

            {/* Hard */}
            <div className="p-2.5 rounded-xl bg-[#eff4ff] space-y-1.5 border border-[#e5eeff]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-[#ba1a1a]">Hard</span>
                <span className="text-[11px] text-[#0b1c30] font-medium">1/3</span>
              </div>
              <div className="w-full h-1.5 bg-[#e5eeff] rounded-full overflow-hidden">
                <div className="h-full bg-[#ba1a1a] rounded-full w-[33%]"></div>
              </div>
              <span className="block text-[10px] text-[#ba1a1a] font-medium">33% Complete</span>
            </div>
          </div>
        </div>

        {/* Next Recommended Problem CTA Card */}
        <div className="rounded-2xl bg-[#dce9ff]/60 border border-[#dce9ff] p-4 relative overflow-hidden shadow-sm">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4f46e5]/10 text-[#3525cd] text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[13px]">bolt</span> Next Recommended
              </div>
              <h3 className="text-[16px] font-bold text-[#0b1c30]">
                Longest Consecutive Sequence
              </h3>
              <div className="flex items-center gap-2 text-[#464555] text-[11px] flex-wrap">
                <span className="px-2 py-0.5 rounded bg-[#ffddb8] text-[#684000] font-semibold">
                  Medium
                </span>
                <span>•</span>
                <span>Est. 20 mins</span>
                <span>•</span>
                <span className="text-[#006c49] font-medium">Meta & Amazon Favorite</span>
              </div>
            </div>
          </div>

          <div className="mt-3.5">
            <button
              onClick={onNextRecommended}
              className="w-full h-11 rounded-xl bg-[#4f46e5] text-white text-[14px] font-medium flex items-center justify-center gap-1.5 shadow-md shadow-[#4f46e5]/20 active:scale-[0.98] transition-all hover:bg-[#3525cd]"
            >
              <span>Solve Next Problem</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Curated Problem List Section */}
        <div className="space-y-2.5 pt-1">
          {/* Filter Segmented Tabs */}
          <div className="flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[#0b1c30]">Problem Catalog</h3>
            <div className="flex items-center p-1 rounded-xl bg-[#e5eeff] gap-1">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  filter === 'all'
                    ? 'bg-white text-[#3525cd] shadow-xs'
                    : 'text-[#464555] hover:text-[#0b1c30]'
                }`}
              >
                All ({topic.problems.length})
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  filter === 'pending'
                    ? 'bg-white text-[#3525cd] shadow-xs'
                    : 'text-[#464555] hover:text-[#0b1c30]'
                }`}
              >
                Pending ({topic.problems.filter((p) => p.status !== 'solved').length})
              </button>
              <button
                onClick={() => setFilter('solved')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  filter === 'solved'
                    ? 'bg-white text-[#3525cd] shadow-xs'
                    : 'text-[#464555] hover:text-[#0b1c30]'
                }`}
              >
                Solved ({topic.problems.filter((p) => p.status === 'solved').length})
              </button>
            </div>
          </div>

          {/* Problem Cards List */}
          <div className="space-y-2">
            {filteredProblems.map((problem) => {
              const isSolved = problem.status === 'solved';
              const isInProgress = problem.status === 'in-progress';

              const diffBg =
                problem.difficulty === 'Easy'
                  ? 'bg-[#6cf8bb]/30 text-[#00714d]'
                  : problem.difficulty === 'Medium'
                  ? 'bg-[#ffddb8] text-[#684000]'
                  : 'bg-[#ffdad6] text-[#93000a]';

              return (
                <div
                  key={problem.id}
                  onClick={() => onOpenProblem(problem.id)}
                  className={`group rounded-2xl bg-white p-3.5 flex items-center justify-between shadow-sm border transition-all active:scale-[0.99] cursor-pointer ${
                    isInProgress
                      ? 'border-l-4 border-l-[#4f46e5] border-[#dce9ff]'
                      : 'border-[#eff4ff] hover:border-[#dce9ff]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        isSolved
                          ? 'bg-[#6cf8bb]/30 text-[#006c49]'
                          : isInProgress
                          ? 'bg-[#e2dfff] text-[#3525cd] animate-pulse'
                          : 'bg-[#eff4ff] text-[#777587]'
                      }`}
                    >
                      {isSolved ? (
                        <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                      ) : isInProgress ? (
                        <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                      ) : (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#c7c4d8]"></span>
                      )}
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-[14px] font-semibold text-[#0b1c30] truncate group-hover:text-[#3525cd] transition-colors">
                          {problem.number}. {problem.title}
                        </h4>
                        <span className={`px-1.5 py-0.2 rounded text-[10px] font-semibold ${diffBg}`}>
                          {problem.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#464555] text-[11px]">
                        {isInProgress && (
                          <span className="text-[#3525cd] font-semibold">In Progress •</span>
                        )}
                        <span className="truncate">{problem.tag}</span>
                        <span>•</span>
                        <span>{problem.accuracy}</span>
                        {problem.companies.length > 0 && (
                          <span className="bg-[#eff4ff] px-1.5 rounded text-[10px] text-[#0b1c30] border border-[#e5eeff]">
                            {problem.companies.slice(0, 2).join(' / ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {isInProgress ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProblem(problem.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#3525cd] text-white text-[12px] font-semibold shrink-0 active:scale-95 transition-transform"
                    >
                      Resume
                    </button>
                  ) : (
                    <button className="w-8 h-8 rounded-full flex items-center justify-center text-[#777587] group-hover:text-[#3525cd] group-hover:bg-[#eff4ff] shrink-0">
                      <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Micro Learning Tip Callout */}
        <div className="rounded-xl bg-[#e5eeff] p-3.5 flex items-start gap-2.5 text-[#464555] border border-[#dce9ff]">
          <span className="material-symbols-outlined text-[#3525cd] text-[20px] shrink-0 mt-0.5">
            lightbulb
          </span>
          <p className="text-[12px] leading-relaxed">
            <strong className="text-[#0b1c30] font-semibold">Interviewer Tip:</strong> Always analyze space vs time tradeoff before proposing a hash map. Mention constant-time lookup guarantees and hash collision mitigation!
          </p>
        </div>
      </div>
    </div>
  );
};
