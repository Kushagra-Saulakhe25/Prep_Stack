import React from 'react';
import { NavTab } from '../types';

interface HeaderProps {
  currentTab: NavTab;
  onNavigate: (tab: NavTab) => void;
  avatarUrl: string;
  hasNotifications?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  avatarUrl,
  hasNotifications = true,
}) => {
  const getTabTitle = (tab: NavTab) => {
    switch (tab) {
      case 'dashboard':
        return 'Dashboard';
      case 'learn':
        return 'Learn';
      case 'companies':
        return 'Companies';
      case 'tests':
        return 'Tests';
      case 'profile':
        return 'Profile';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#f8f9ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#e5eeff]/60">
      <div className="h-16 px-4 max-w-md mx-auto flex items-center justify-between">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-2.5 text-left focus:outline-none group active:scale-95 transition-transform"
        >
          {/* Stylized PrepStack Icon Monogram */}
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#3525cd] to-[#4f46e5] flex items-center justify-center text-white shadow-sm shadow-[#3525cd]/20">
            <span className="material-symbols-outlined text-[19px]">layers</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#3525cd] uppercase tracking-wider leading-none">
              PrepStack
            </span>
            <h1 className="text-[17px] font-semibold text-[#0b1c30] leading-tight mt-0.5">
              {getTabTitle(currentTab)}
            </h1>
          </div>
        </button>

        <div className="flex items-center gap-1">
          <button
            aria-label="Notifications"
            onClick={() => alert("You're all caught up! Amazon on-campus OA starts in 5 days.")}
            className="w-10 h-10 flex items-center justify-center rounded-full text-[#464555] hover:text-[#0b1c30] hover:bg-[#e5eeff]/50 transition-colors relative"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {hasNotifications && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white"></span>
            )}
          </button>
          <button
            aria-label="User Profile"
            onClick={() => onNavigate('profile')}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-transform active:scale-95 ${
              currentTab === 'profile' ? 'ring-2 ring-[#4f46e5]' : ''
            }`}
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-[#e5eeff]"
              src={avatarUrl}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
