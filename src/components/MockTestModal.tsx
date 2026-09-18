import React, { useState } from 'react';
import { CompanyHiringTrack } from '../types';

interface MockTestModalProps {
  company: CompanyHiringTrack;
  onClose: () => void;
  onComplete: () => void;
}

export const MockTestModal: React.FC<MockTestModalProps> = ({
  company,
  onClose,
  onComplete,
}) => {
  const [step, setStep] = useState<'intro' | 'active' | 'result'>('intro');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(60);

  const mockQuestions = [
    {
      id: 1,
      q: 'Which data structure offers average O(1) time complexity for both search and insertion in Amazon inventory tracking?',
      options: [
        'Balanced Binary Search Tree (AVL)',
        'Hash Table with open addressing or chained buckets',
        'Sorted Array with Binary Search',
        'Doubly Linked List',
      ],
      correct: 1,
    },
    {
      id: 2,
      q: "In an Amazon Bar Raiser scenario, what does demonstrating 'Bias for Action' when given an ambiguous problem statement require?",
      options: [
        'Immediately code without asking questions',
        'State reasonable assumptions, verify edge constraints with the interviewer, and proceed iteratively',
        'Wait silently for the interviewer to define all input structures',
        'Refuse to answer until full product specifications are provided',
      ],
      correct: 1,
    },
    {
      id: 3,
      q: 'When finding the Longest Consecutive Sequence in an unsorted array in O(n) time, how do we avoid O(n²) worst-case behavior?',
      options: [
        'Sort the array first using QuickSort',
        'Only initiate streak counting if (num - 1) is NOT present in the HashSet',
        'Use nested loops across each integer',
        'Construct an adjacency matrix graph',
      ],
      correct: 1,
    },
  ];

  const handleSelect = (qIdx: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleFinish = () => {
    setStep('result');
    onComplete();
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, val]) => {
    return val === mockQuestions[Number(qIdx)].correct ? acc + 1 : acc;
  }, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0b1c30]/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-3xl p-5 shadow-2xl border border-[#eff4ff] flex flex-col max-h-[90vh] overflow-y-auto">
        {step === 'intro' && (
          <div className="flex flex-col gap-4 text-center items-center py-2">
            <div className="w-14 h-14 rounded-2xl bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">timer</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#3525cd] uppercase tracking-wider">
                Simulation Mode
              </span>
              <h3 className="text-[20px] font-bold text-[#0b1c30] mt-1">
                {company.name} Pattern Mock Test
              </h3>
              <p className="text-[13px] text-[#464555] mt-1 max-w-xs mx-auto">
                3 high-yield questions covering HashMaps, Amazon Leadership Principles, and asymptotic complexity analysis.
              </p>
            </div>

            <div className="w-full bg-[#eff4ff] p-3 rounded-2xl border border-[#e5eeff] text-[12px] text-[#464555] flex justify-around">
              <div><strong>Time Limit:</strong> 60 mins</div>
              <div><strong>Format:</strong> Multiple Choice + Code</div>
            </div>

            <div className="flex items-center gap-2 w-full pt-2">
              <button
                onClick={onClose}
                className="flex-1 h-11 rounded-xl bg-white border border-[#e5eeff] text-[#464555] text-[13px] font-medium hover:bg-[#eff4ff]"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep('active')}
                className="flex-1 h-11 rounded-xl bg-[#4f46e5] text-white text-[13px] font-semibold hover:bg-[#3525cd] shadow-md"
              >
                Begin Test
              </button>
            </div>
          </div>
        )}

        {step === 'active' && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#eff4ff]">
              <div>
                <span className="text-[11px] text-[#3525cd] font-bold uppercase tracking-wide">
                  {company.name} Mock Exam
                </span>
                <div className="text-[13px] font-semibold text-[#0b1c30]">
                  Questions (3 of 3)
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#684000] bg-[#ffddb8] px-2.5 py-1 rounded-full text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[14px]">timer</span>
                <span>58:24</span>
              </div>
            </div>

            <div className="space-y-4">
              {mockQuestions.map((q, qIdx) => (
                <div key={q.id} className="space-y-2">
                  <div className="text-[13px] font-semibold text-[#0b1c30]">
                    {qIdx + 1}. {q.q}
                  </div>
                  <div className="space-y-1.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelect(qIdx, optIdx)}
                          className={`w-full p-2.5 rounded-xl text-left text-[12px] border transition-all ${
                            isSelected
                              ? 'bg-[#eff4ff] border-[#4f46e5] text-[#0b1c30] font-medium'
                              : 'bg-white border-[#e5eeff] text-[#464555] hover:border-[#c7c4d8]'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={handleFinish}
                disabled={Object.keys(selectedAnswers).length < 3}
                className="w-full h-11 rounded-xl bg-[#4f46e5] text-white text-[13px] font-semibold hover:bg-[#3525cd] shadow-md transition-all disabled:opacity-50"
              >
                Submit Answers
              </button>
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="flex flex-col gap-4 text-center items-center py-2">
            <div className="w-14 h-14 rounded-2xl bg-[#6cf8bb]/30 text-[#006c49] flex items-center justify-center">
              <span className="material-symbols-outlined text-[32px]">verified</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#006c49] uppercase tracking-wider">
                Test Completed
              </span>
              <h3 className="text-[20px] font-bold text-[#0b1c30] mt-1">
                Score: {score} / 3 ({Math.round((score / 3) * 100)}%)
              </h3>
              <p className="text-[13px] text-[#464555] mt-1 max-w-xs mx-auto">
                {score === 3
                  ? "Flawless score! Your Amazon pattern readiness rating moved to 'High'."
                  : 'Solid attempt! Review the questions above to lock down core asymptotic analysis.'}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-full h-11 rounded-xl bg-[#4f46e5] text-white text-[13px] font-semibold hover:bg-[#3525cd] shadow-md"
            >
              Return to Hub
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
