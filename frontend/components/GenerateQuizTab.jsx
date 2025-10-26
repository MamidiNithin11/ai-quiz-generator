import React, { useState } from 'react';
import { generateQuiz } from '../services/api.js';
import QuizDisplay from './QuizDisplay.jsx';
import { LoaderIcon } from './icons/LoaderIcon.jsx';
import { CogIcon } from './icons/CogIcon.jsx';

const GenerateQuizTab = () => {
  const [url, setUrl] = useState('https://en.wikipedia.org/wiki/Alan_Turing');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quizSession, setQuizSession] = useState(null);
  const [options, setOptions] = useState({ numQuestions: 10, difficulty: 'mixed' });
  const [isChallengeMode, setIsChallengeMode] = useState(false);
  const [showOptions, setShowOptions] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.includes('en.wikipedia.org')) {
      setError('Please enter a valid English Wikipedia URL.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setQuizSession(null);

    try {
      const data = await generateQuiz(url, options);
      setQuizSession({ data, isChallenge: isChallengeMode });
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-slate-800 p-6 rounded-lg shadow-2xl border border-slate-700">
        <form onSubmit={handleSubmit}>
          <label htmlFor="wiki-url" className="block text-lg font-medium text-slate-300 mb-2">
            Wikipedia Article URL
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              id="wiki-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://en.wikipedia.org/wiki/..."
              className="flex-grow bg-slate-700 border border-slate-600 rounded-md px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50"
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center justify-center bg-gradient-to-r from-teal-500 to-blue-600 text-white font-bold py-2 px-6 rounded-md hover:from-teal-600 hover:to-blue-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : 'Generate Quiz'}
            </button>
          </div>

          <div className="mt-4">
             <button type="button" onClick={() => setShowOptions(!showOptions)} className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-teal-400 transition">
                <CogIcon className={`h-5 w-5 transition-transform duration-300 ${showOptions ? 'rotate-90' : ''}`} />
                {showOptions ? 'Hide' : 'Show'} Advanced Options
            </button>
          </div>
          
          {showOptions && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-slate-700 pt-4 animate-fade-in">
             
              <div>
                <label htmlFor="num-questions" className="block text-sm font-medium text-slate-300">Number of Questions: <span className="font-bold text-teal-400">{options.numQuestions}</span></label>
                <input
                  id="num-questions"
                  type="range"
                  min="5"
                  max="20"
                  value={options.numQuestions}
                  onChange={(e) => setOptions(prev => ({ ...prev, numQuestions: parseInt(e.target.value) }))}
                  className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer accent-teal-500 mt-2"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Difficulty</label>
                <div className="flex flex-wrap gap-2">
                  {['mixed', 'easy', 'medium', 'hard'].map(diff => (
                    <button
                      key={diff}
                      type="button"
                      onClick={() => setOptions(prev => ({ ...prev, difficulty: diff }))}
                      disabled={isLoading}
                      className={`capitalize px-3 py-1 text-sm rounded-full transition ${options.difficulty === diff ? 'bg-teal-500 text-white font-semibold' : 'bg-slate-700 hover:bg-slate-600'}`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
              
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Challenge Mode (Timed)</label>
                  <button
                    type="button"
                    onClick={() => setIsChallengeMode(!isChallengeMode)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${isChallengeMode ? 'bg-teal-600' : 'bg-slate-600'}`}
                    role="switch"
                    aria-checked={isChallengeMode}
                    disabled={isLoading}
                  >
                  <span
                    aria-hidden="true"
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isChallengeMode ? 'translate-x-5' : 'translate-x-0'}`}
                  ></span>
                </button>
              </div>

            </div>
          )}
        </form>
      </div>

      {isLoading && (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-slate-800 rounded-lg shadow-lg border border-slate-700">
          <LoaderIcon className="h-12 w-12 animate-spin text-teal-400 mb-4" />
          <p className="text-xl font-semibold text-slate-300">Generating your quiz...</p>
          <p className="text-slate-400">This might take a moment. We're scraping the article and crafting questions.</p>
        </div>
      )}

      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg shadow-lg">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      
      {quizSession && (
        <div className="animate-fade-in">
          <QuizDisplay quizData={quizSession.data} isChallengeMode={quizSession.isChallenge} />
        </div>
      )}
    </div>
  );
};

export default GenerateQuizTab;