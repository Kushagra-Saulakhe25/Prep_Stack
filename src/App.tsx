import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { LearnView } from './components/LearnView';
import { CompaniesView } from './components/CompaniesView';
import { TopicDetailView } from './components/TopicDetailView';
import { CompanyTopicBreakdownView } from './components/CompanyTopicBreakdownView';
import { ProfileView } from './components/ProfileView';
import { TestsView } from './components/TestsView';
import { ProblemWorkspaceView } from './components/ProblemWorkspaceView';
import { MockTestModal } from './components/MockTestModal';
import { TOPIC_MODULES, COMPANY_TRACKS, INITIAL_USER } from './data';
import { NavTab, SubScreen, TopicModule, CompanyHiringTrack, UserProfile, Problem } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [subScreen, setSubScreen] = useState<SubScreen>({ type: 'main' });
  const [topics, setTopics] = useState<TopicModule[]>(TOPIC_MODULES);
  const [companies, setCompanies] = useState<CompanyHiringTrack[]>(COMPANY_TRACKS);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('amazon');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [activeMockCompanyId, setActiveMockCompanyId] = useState<string | null>(null);

  // Tab switching from bottom bar or header
  const handleTabChange = (tab: NavTab) => {
    setCurrentTab(tab);
    setSubScreen({ type: 'main' });
  };

  // Navigations into deeper screens
  const handleOpenTopic = (topicId: string) => {
    setSubScreen({ type: 'topic-detail', topicId });
  };

  const handleOpenCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setCurrentTab('companies');
    setSubScreen({ type: 'main' });
  };

  const handleOpenCompanyTopicBreakdown = (companyId: string, topicId: string) => {
    setSelectedCompanyId(companyId);
    setSubScreen({ type: 'company-topic-breakdown', companyId, topicId });
  };

  const handleOpenProblem = (problemIdentifier: string) => {
    // Check if matching id or title in first topic
    const found =
      topics[0].problems.find((p) => p.id === problemIdentifier) ||
      topics[0].problems.find((p) => p.title.toLowerCase() === problemIdentifier.toLowerCase()) ||
      topics[0].problems[0];

    setSubScreen({ type: 'problem-workspace', problemId: found.id });
  };

  const handleProblemSolved = (problemId: string) => {
    setTopics((prev) =>
      prev.map((t) => ({
        ...t,
        problems: t.problems.map((p) =>
          p.id === problemId ? { ...p, status: 'solved' } : p
        ),
        completedProblems: t.problems.some((p) => p.id === problemId && p.status !== 'solved')
          ? t.completedProblems + 1
          : t.completedProblems,
      }))
    );
    setUser((prev) => ({
      ...prev,
      solvedCount: prev.solvedCount + 1,
      overallReadiness: Math.min(100, prev.overallReadiness + 1),
    }));
  };

  const handleStartMock = (companyId: string) => {
    setActiveMockCompanyId(companyId);
  };

  const handleMockComplete = () => {
    setUser((prev) => ({
      ...prev,
      mocksDone: prev.mocksDone + 1,
      overallReadiness: Math.min(100, prev.overallReadiness + 2),
    }));
  };

  const activeTopic =
    subScreen.type === 'topic-detail'
      ? topics.find((t) => t.id === subScreen.topicId) || topics[0]
      : topics[0];

  const activeCompany =
    companies.find((c) => c.id === selectedCompanyId) || companies[0];

  const activeProblem =
    subScreen.type === 'problem-workspace'
      ? topics[0].problems.find((p) => p.id === subScreen.problemId) || topics[0].problems[0]
      : topics[0].problems[0];

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col items-center">
      {/* Container wrapper bounded to mobile/tablet precision */}
      <div className="w-full max-w-md min-h-screen flex flex-col relative bg-[#f8f9ff] shadow-sm">
        {/* Fixed Header */}
        <Header
          currentTab={currentTab}
          onNavigate={handleTabChange}
          avatarUrl={user.avatarUrl}
        />

        {/* Main Content Area */}
        <main className="flex-1 w-full pt-16 flex flex-col">
          {/* SubScreen Router */}
          {subScreen.type === 'topic-detail' && (
            <TopicDetailView
              topic={activeTopic}
              onBack={() => setSubScreen({ type: 'main' })}
              onOpenProblem={handleOpenProblem}
              onNextRecommended={() => handleOpenProblem('longest-consecutive-sequence')}
            />
          )}

          {subScreen.type === 'company-topic-breakdown' && (
            <CompanyTopicBreakdownView
              company={activeCompany}
              onBack={() => setSubScreen({ type: 'main' })}
              onPracticeCurated={() => handleOpenTopic('arrays-hashing')}
              onOpenProblem={handleOpenProblem}
            />
          )}

          {subScreen.type === 'problem-workspace' && (
            <ProblemWorkspaceView
              problem={activeProblem}
              onBack={() => setSubScreen({ type: 'topic-detail', topicId: 'arrays-hashing' })}
              onSolved={handleProblemSolved}
            />
          )}

          {subScreen.type === 'main' && currentTab === 'dashboard' && (
            <DashboardView
              user={user}
              onOpenTopic={handleOpenTopic}
              onOpenCompany={handleOpenCompany}
              onOpenProblem={handleOpenProblem}
              onOpenTests={() => setCurrentTab('tests')}
            />
          )}

          {subScreen.type === 'main' && currentTab === 'learn' && (
            <LearnView
              topics={topics}
              onSelectTopic={handleOpenTopic}
            />
          )}

          {subScreen.type === 'main' && currentTab === 'companies' && (
            <CompaniesView
              companies={companies}
              selectedCompanyId={selectedCompanyId}
              onSelectCompany={(id) => setSelectedCompanyId(id)}
              onOpenStudyAsset={(assetId) => {
                if (assetId === 'amazon-top-dsa') {
                  handleOpenCompanyTopicBreakdown('amazon', 'arrays-hashing');
                } else {
                  handleOpenCompanyTopicBreakdown('amazon', 'arrays-hashing');
                }
              }}
              onStartMock={handleStartMock}
            />
          )}

          {subScreen.type === 'main' && currentTab === 'tests' && (
            <TestsView
              companies={companies}
              onStartCompanyMock={handleStartMock}
              onOpenTopic={handleOpenTopic}
            />
          )}

          {subScreen.type === 'main' && currentTab === 'profile' && (
            <ProfileView
              user={user}
              onBack={() => setCurrentTab('dashboard')}
            />
          )}
        </main>

        {/* Floating Bottom Nav */}
        <BottomNav currentTab={currentTab} onTabChange={handleTabChange} />

        {/* Mock Test Interactive Modal */}
        {activeMockCompanyId && (
          <MockTestModal
            company={companies.find((c) => c.id === activeMockCompanyId) || companies[0]}
            onClose={() => setActiveMockCompanyId(null)}
            onComplete={handleMockComplete}
          />
        )}
      </div>
    </div>
  );
}
