import React, { useState } from 'react';
import { Problem } from '../types';

interface ProblemWorkspaceViewProps {
  problem: Problem;
  onBack: () => void;
  onSolved: (problemId: string) => void;
}

export const ProblemWorkspaceView: React.FC<ProblemWorkspaceViewProps> = ({
  problem,
  onBack,
  onSolved,
}) => {
  const [lang, setLang] = useState<'python' | 'java' | 'cpp'>('python');
  const [code, setCode] = useState(problem.starterCode[lang]);
  const [activeTab, setActiveTab] = useState<'desc' | 'solution' | 'hint'>('desc');
  const [isRunning, setIsRunning] = useState(false);
  const [testOutput, setTestOutput] = useState<{
    status: 'idle' | 'success' | 'failed';
    message: string;
    runtime?: string;
    memory?: string;
  }>({ status: 'idle', message: '' });

  const handleLangChange = (newLang: 'python' | 'java' | 'cpp') => {
    setLang(newLang);
    setCode(problem.starterCode[newLang]);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setTestOutput({ status: 'idle', message: 'Running test cases against test suite...' });

    setTimeout(() => {
      setIsRunning(false);
      setTestOutput({
        status: 'success',
        message: 'All test cases passed! (3/3 public tests + 45 hidden tests)',
        runtime: '42 ms (faster than 89.4% submissions)',
        memory: '17.2 MB (less than 76.1% submissions)',
      });
      onSolved(problem.id);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full pb-24 pt-1">
      {/* Top Bar */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-[#e5eeff]">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 text-[#464555] hover:text-[#0b1c30] text-[13px] font-medium transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Arrays & Hashing</span>
        </button>

        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
              problem.difficulty === 'Easy'
                ? 'bg-[#6cf8bb]/30 text-[#00714d]'
                : problem.difficulty === 'Medium'
                ? 'bg-[#ffddb8] text-[#684000]'
                : 'bg-[#ffdad6] text-[#93000a]'
            }`}
          >
            {problem.difficulty}
          </span>
          <button
            onClick={() => alert('Bookmarked problem!')}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#464555] hover:bg-[#eff4ff]"
          >
            <span className="material-symbols-outlined text-[18px]">bookmark_border</span>
          </button>
        </div>
      </div>

      <div className="px-4 py-3 flex flex-col gap-3">
        {/* Title */}
        <div>
          <h2 className="text-[18px] font-bold text-[#0b1c30]">
            {problem.number}. {problem.title}
          </h2>
          <div className="flex items-center gap-2 text-[12px] text-[#464555] mt-0.5">
            <span>{problem.tag}</span>
            <span>•</span>
            <span className="text-[#006c49] font-medium">{problem.accuracy}</span>
            <span>•</span>
            <span>{problem.companies.join(', ')}</span>
          </div>
        </div>

        {/* Tab switchers: Description, Hint, Solution */}
        <div className="flex items-center gap-2 border-b border-[#e5eeff] pb-2">
          <button
            onClick={() => setActiveTab('desc')}
            className={`text-[12px] font-semibold pb-1 border-b-2 transition-all ${
              activeTab === 'desc'
                ? 'text-[#4f46e5] border-[#4f46e5]'
                : 'text-[#464555] border-transparent hover:text-[#0b1c30]'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('hint')}
            className={`text-[12px] font-semibold pb-1 border-b-2 transition-all ${
              activeTab === 'hint'
                ? 'text-[#4f46e5] border-[#4f46e5]'
                : 'text-[#464555] border-transparent hover:text-[#0b1c30]'
            }`}
          >
            Hint & Strategy
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'desc' ? (
          <div className="bg-white rounded-2xl p-4 border border-[#eff4ff] shadow-sm space-y-3">
            <p className="text-[13px] text-[#0b1c30] leading-relaxed">
              {problem.description}
            </p>

            {problem.examples.map((eg, idx) => (
              <div key={idx} className="bg-[#eff4ff] rounded-xl p-3 text-[12px] space-y-1 border border-[#e5eeff]">
                <div className="font-semibold text-[#0b1c30]">Example {idx + 1}:</div>
                <div className="font-mono text-[#464555]">
                  <strong className="text-[#0b1c30]">Input:</strong> {eg.input}
                </div>
                <div className="font-mono text-[#464555]">
                  <strong className="text-[#0b1c30]">Output:</strong> {eg.output}
                </div>
                {eg.explanation && (
                  <div className="text-[#464555] text-[11px] pt-0.5">
                    <strong>Explanation:</strong> {eg.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-4 border border-[#eff4ff] shadow-sm space-y-2 text-[13px] leading-relaxed">
            <div className="flex items-center gap-1.5 text-[#3525cd] font-semibold">
              <span className="material-symbols-outlined text-[18px]">lightbulb</span>
              <span>Optimal Approach</span>
            </div>
            <p className="text-[#464555]">{problem.solutionHint}</p>
          </div>
        )}

        {/* Code Editor Header */}
        <div className="bg-white rounded-2xl border border-[#e5eeff] shadow-sm overflow-hidden mt-1">
          <div className="flex items-center justify-between px-3 py-2 bg-[#eff4ff] border-b border-[#e5eeff]">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#464555]">code</span>
              <span className="text-[12px] font-semibold text-[#0b1c30]">Code Solution</span>
            </div>

            {/* Language Picker */}
            <div className="flex items-center gap-1 bg-white rounded-lg p-0.5 border border-[#e5eeff]">
              {(['python', 'java', 'cpp'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => handleLangChange(l)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase transition-all ${
                    lang === l ? 'bg-[#4f46e5] text-white' : 'text-[#464555] hover:text-[#0b1c30]'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={10}
            className="w-full p-3 font-mono text-[12px] text-[#0b1c30] bg-[#f8f9ff] focus:outline-none focus:bg-white transition-colors resize-none leading-relaxed"
            spellCheck={false}
          />
        </div>

        {/* Test Run Output */}
        {testOutput.status !== 'idle' && (
          <div
            className={`p-3.5 rounded-2xl text-[12px] border transition-all ${
              testOutput.status === 'success'
                ? 'bg-[#6cf8bb]/20 border-[#6cf8bb]/60 text-[#00714d]'
                : 'bg-[#ffdad6]/40 border-[#ffdad6] text-[#93000a]'
            }`}
          >
            <div className="flex items-center gap-1.5 font-semibold text-[13px] mb-1">
              <span className="material-symbols-outlined text-[18px]">
                {testOutput.status === 'success' ? 'check_circle' : 'error'}
              </span>
              <span>{testOutput.message}</span>
            </div>
            {testOutput.runtime && (
              <div className="text-[11px] text-[#00714d]/90 font-mono space-y-0.5 pl-6">
                <div>⚡ Runtime: {testOutput.runtime}</div>
                <div>💾 Memory: {testOutput.memory}</div>
              </div>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => setCode(problem.starterCode[lang])}
            className="px-4 h-11 rounded-xl bg-white border border-[#e5eeff] text-[#464555] hover:text-[#0b1c30] text-[12px] font-medium active:scale-95 transition-all"
          >
            Reset
          </button>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex-1 h-11 rounded-xl bg-[#4f46e5] text-white text-[13px] font-semibold flex items-center justify-center gap-1.5 shadow-md hover:bg-[#3525cd] transition-all active:scale-98 disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isRunning ? 'refresh' : 'play_arrow'}
            </span>
            <span>{isRunning ? 'Compiling & Testing...' : 'Run Tests & Submit'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
