import React, { useState } from 'react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onBack: () => void;
  onUpdateGoal?: (newGoal: string) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onBack }) => {
  const [synced, setSynced] = useState(true);
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-1">
      {/* Toast Notice */}
      {notification && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-[#0b1c30] text-white text-[12px] font-medium rounded-full shadow-lg">
          {notification}
        </div>
      )}

      {/* Sub-Header Bar */}
      <div className="px-4 py-2 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 -ml-1 flex items-center justify-center rounded-full text-[#0b1c30] hover:bg-[#e5eeff] transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h2 className="text-[17px] font-semibold text-[#0b1c30]">Candidate Profile</h2>
        <div className="w-10" />
      </div>

      {/* Profile Header / User Overview Hero */}
      <section className="px-4 pt-1 pb-3">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eff4ff] flex flex-col items-center text-center relative overflow-hidden">
          {/* Decorative ambient gradient tint */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#e2dfff]/40 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#6ffbbe]/30 rounded-full blur-2xl pointer-events-none" />

          {/* Avatar with Status Indicator */}
          <div className="relative mb-3">
            <div className="w-[84px] h-[84px] rounded-full p-1 bg-[#eff4ff] shadow-sm flex items-center justify-center border border-[#e5eeff]">
              <img
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
                src={user.avatarUrl}
              />
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#006c49] rounded-full flex items-center justify-center shadow-sm ring-2 ring-white">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </span>
          </div>

          {/* User Identification */}
          <h2 className="text-[22px] font-bold text-[#0b1c30] tracking-tight">
            {user.name}
          </h2>
          <p className="text-[13px] text-[#464555] mt-1">
            {user.role}
          </p>

          {/* Target Goal Pill */}
          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-[#eff4ff] border border-[#e5eeff] rounded-full">
            <span className="text-xs">🎯</span>
            <span className="text-[12px] font-medium text-[#0b1c30]">
              {user.targetGoal}
            </span>
          </div>
        </div>
      </section>

      {/* Placement Readiness Score & Quick Metrics */}
      <section className="px-4 pb-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eff4ff]">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#3525cd]">
                <span className="material-symbols-outlined text-[18px]">insights</span>
              </div>
              <span className="text-[15px] font-semibold text-[#0b1c30]">Placement Readiness</span>
            </div>
            <span className="text-[17px] font-bold text-[#3525cd]">72%</span>
          </div>
          <p className="text-[12px] text-[#464555] mb-2.5">Overall syllabus & mock test mastery score</p>

          {/* Dual Segment Progress Track */}
          <div className="w-full h-2.5 bg-[#eff4ff] rounded-full overflow-hidden flex gap-0.5">
            <div className="bg-[#006c49] rounded-full transition-all duration-500" style={{ width: '48%' }}></div>
            <div className="bg-[#4f46e5] rounded-full transition-all duration-500" style={{ width: '24%' }}></div>
          </div>

          <div className="flex items-center justify-between mt-2 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006c49]"></span>
              <span className="text-[11px] text-[#464555]">Core DSA (48%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#4f46e5]"></span>
              <span className="text-[11px] text-[#464555]">System & Aptitude (24%)</span>
            </div>
          </div>

          {/* 3-Column Micro-Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 pt-2.5 bg-[#eff4ff]/60 border border-[#e5eeff] rounded-xl p-3">
            <div className="flex flex-col items-center text-center">
              <span className="text-[20px] font-bold text-[#0b1c30]">{user.solvedCount}</span>
              <span className="text-[11px] text-[#464555] mt-0.5">Solved</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-1">
                <span className="text-[20px] font-bold text-[#684000]">{user.streakDays}</span>
                <span className="text-sm">🔥</span>
              </div>
              <span className="text-[11px] text-[#464555] mt-0.5">Day Streak</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[20px] font-bold text-[#0b1c30]">{user.mocksDone}</span>
              <span className="text-[11px] text-[#464555] mt-0.5">Mocks Done</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Groups */}
      <div className="px-4 flex flex-col gap-4">
        {/* Group 1: Preparation & Goals */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-[#464555] uppercase tracking-wider px-1">
            Preparation & Goals
          </span>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => showNotification('Target role preferences updated for 2025')}
              className="w-full bg-white active:scale-[0.99] transition-transform rounded-2xl p-3.5 shadow-sm border border-[#eff4ff] flex items-center justify-between text-left"
              type="button"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#3525cd] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">ads_click</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-[#0b1c30] truncate">
                    Edit Goals & Target Roles
                  </div>
                  <div className="text-[12px] text-[#464555] truncate">
                    Target companies, role tier, target CTC
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#777587] ml-2 shrink-0">chevron_right</span>
            </button>

            <button
              onClick={() => showNotification('Daily quota set to 3 problems')}
              className="w-full bg-white active:scale-[0.99] transition-transform rounded-2xl p-3.5 shadow-sm border border-[#eff4ff] flex items-center justify-between text-left"
              type="button"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#3525cd] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">tune</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-[#0b1c30] truncate">
                    Practice Preferences
                  </div>
                  <div className="text-[12px] text-[#464555] truncate">
                    Daily question quotas, difficulty curve, reminders
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#777587] ml-2 shrink-0">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Group 2: Account & Membership */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-[#464555] uppercase tracking-wider px-1">
            Account & Membership
          </span>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => showNotification('Pro plan is active and unlimited')}
              className="w-full bg-white active:scale-[0.99] transition-transform rounded-2xl p-3.5 shadow-sm border border-[#eff4ff] flex items-center justify-between text-left"
              type="button"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#ffddb8] flex items-center justify-center text-[#684000] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[14px] font-semibold text-[#0b1c30]">Subscription Plan</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ffddb8] text-[#885500] font-bold">
                      {user.subscriptionTier}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#464555] truncate">
                    {user.planRenewal}
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#777587] ml-2 shrink-0">chevron_right</span>
            </button>

            <button
              onClick={() => {
                setSynced(!synced);
                showNotification(synced ? 'Disconnected portfolio accounts' : 'Portfolio accounts re-synced!');
              }}
              className="w-full bg-white active:scale-[0.99] transition-transform rounded-2xl p-3.5 shadow-sm border border-[#eff4ff] flex items-center justify-between text-left"
              type="button"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#3525cd] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">hub</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-[#0b1c30] truncate">
                    Resume & Portfolio Sync
                  </div>
                  <div className="text-[12px] text-[#464555] truncate">
                    Connected to GitHub & LeetCode
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 ml-2 shrink-0">
                <span className={`w-2 h-2 rounded-full ${synced ? 'bg-[#006c49]' : 'bg-[#ba1a1a]'}`} />
                <span className="material-symbols-outlined text-[#777587]">chevron_right</span>
              </div>
            </button>
          </div>
        </div>

        {/* Group 3: Session */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-bold text-[#464555] uppercase tracking-wider px-1">
            Session
          </span>
          <div>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to reset your test session?')) {
                  showNotification('Session refreshed');
                }
              }}
              className="w-full bg-white active:scale-[0.99] transition-transform rounded-2xl p-3.5 shadow-sm border border-[#eff4ff] flex items-center justify-between text-left group"
              type="button"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#ffdad6]/50 flex items-center justify-center text-[#ba1a1a] shrink-0">
                  <span className="material-symbols-outlined text-[22px]">logout</span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[14px] font-semibold text-[#0b1c30] group-hover:text-[#ba1a1a] transition-colors">
                    Log Out
                  </div>
                  <div className="text-[12px] text-[#464555] truncate">
                    Signed in as {user.email}
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#777587] ml-2 shrink-0">chevron_right</span>
            </button>
          </div>
        </div>

        {/* App Version & Footnote */}
        <div className="flex flex-col items-center justify-center pt-2 pb-2 text-center">
          <div className="inline-flex items-center gap-1.5 text-[#464555]">
            <span className="material-symbols-outlined text-[16px]">school</span>
            <span className="text-[12px] font-medium">PrepStack v2.4.0</span>
          </div>
          <p className="text-[11px] text-[#777587] mt-1">Structured for composure, clarity, and success.</p>
        </div>
      </div>
    </div>
  );
};
