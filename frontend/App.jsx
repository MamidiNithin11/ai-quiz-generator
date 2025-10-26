import React, { useState } from 'react';
import GenerateQuizTab from './components/GenerateQuizTab.jsx';
import HistoryTab from './components/HistoryTab.jsx';
import { BookOpenIcon } from './components/icons/BookOpenIcon.jsx';
import { HistoryIcon } from './components/icons/HistoryIcon.jsx';

const App = () => {
  const [activeTab, setActiveTab] = useState('generate');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'generate':
        return <GenerateQuizTab />;
      case 'history':
        return <HistoryTab />;
      default:
        return null;
    }
  };

  const TabButton = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 focus-visible:ring-teal-400 ${
        activeTab === tabName
          ? 'bg-teal-500 text-white shadow-lg'
          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <img
            src="/assets/logo.png"
            alt="Cotle logo"
            className="mx-auto w-20 h-20 sm:w-24 sm:h-24 mb-4 rounded-full object-cover ring-2 ring-white/10"
          />
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Wikipedia AI Quiz Generator
          </h1>
          <p className="mt-2 text-slate-400">Transform any Wikipedia article into an interactive quiz.</p>
        </header>

        <nav className="flex justify-center gap-4 mb-8">
          <TabButton tabName="generate" label="Generate Quiz" icon={<BookOpenIcon />} />
          <TabButton tabName="history" label="Quiz History" icon={<HistoryIcon />} />
        </nav>

        <main>
          {renderTabContent()}
        </main>
      </div>
    </div>
  );
};

export default App;