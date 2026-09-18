import React from 'react';
import { NavTab } from '../types';

interface BottomNavProps {
  currentTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange }) => {
  const items: Array<{ tab: NavTab; label: string; icon: string }> = [
    { tab: 'dashboard', label: 'Home', icon: 'dashboard' },
    { tab: 'learn', label: 'Learn', icon: 'menu_book' },
    { tab: 'companies', label: 'Companies', icon: 'domain' },
    { tab: 'tests', label: 'Tests', icon: 'assignment_turned_in' },
  ];

  return (
    <div className="fixed bottom-0 w-full z-50 pointer-events-none pb-safe">
      <div className="px-4 pb-4 max-w-md mx-auto">
        <nav className="pointer-events-auto w-full h-16 bg-white/90 backdrop-blur-xl rounded-full shadow-[0_10px_25px_-3px_rgba(15,23,42,0.08),0_4px_6px_-4px_rgba(15,23,42,0.03)] border border-[#e5eeff] flex items-center justify-around px-1">
          {items.map((item) => {
            const isActive = currentTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onTabChange(item.tab)}
                className={`flex flex-col items-center justify-center flex-1 h-full py-1 min-h-[44px] min-w-[44px] transition-all relative ${
                  isActive
                    ? 'text-[#4f46e5] font-semibold'
                    : 'text-[#464555] hover:text-[#0b1c30]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[23px] transition-transform duration-150"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span className="text-[11px] leading-[14px] mt-0.5 tracking-wide">
                  {item.label}
                </span>
                <span
                  className={`w-1 h-1 rounded-full bg-[#4f46e5] mt-0.5 transition-all duration-200 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                  }`}
                />
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
