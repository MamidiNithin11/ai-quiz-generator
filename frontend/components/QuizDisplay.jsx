import React, { useState, useEffect } from 'react';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon.jsx';
import { ClipboardIcon } from './icons/ClipboardIcon.jsx';
import { CheckIcon } from './icons/CheckIcon.jsx';
import Modal from './Modal.jsx';
import { TrophyIcon } from './icons/TrophyIcon.jsx';
import { ClockIcon } from './icons/ClockIcon.jsx';


const InfoCard = ({ title, children }) => (
    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
        <h3 className="font-bold text-lg mb-2 text-teal-400">{title}</h3>
        {children}
    </div>
);

const Tag = ({ children }) => (
    <span className="inline-block bg-slate-700 text-slate-300 text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">
        {children}
    </span>
);

const difficultyColors = {
    easy: 'bg-green-500/20 text-green-300 border-green-500/50',
    medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    hard: 'bg-red-500/20 text-red-300 border-red-500/50',
};

const QuizQuestionCard = ({ question, index, onOptionSelect, selectedOption, isSubmitted }) => {
    
    const handleOptionClick = (option) => {
        if (!isSubmitted) {
            onOptionSelect(index, option);
        }
    };

    const getOptionClass = (option) => {
            if (isSubmitted) {
                if (option === question.answer) {
                    return 'bg-green-500/50 border-green-500 text-white';
                }
                if (option === selectedOption) {
                    return 'bg-red-500/50 border-red-500 text-white';
                }
                return 'bg-slate-700 opacity-60';
            }

            if (option === selectedOption) {
                return 'bg-teal-600 border-teal-500 text-white';
            }
            return 'bg-slate-700 hover:bg-slate-600 border-slate-600';
    };

    return (
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
                <p className="text-lg font-semibold text-slate-200">
                    <span className="text-slate-500 mr-2">{index + 1}.</span>{question.question}
                </p>
                <span className={`capitalize text-xs font-bold px-2 py-1 rounded-md border ${difficultyColors[question.difficulty]}`}>
                    {question.difficulty}
                </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {question.options.map((option, i) => (
                    <button
                        key={i}
                        onClick={() => handleOptionClick(option)}
                        disabled={isSubmitted}
                        className={`p-3 text-left rounded-md border transition-all duration-300 ${getOptionClass(option)} ${!isSubmitted ? 'cursor-pointer' : 'cursor-default'}`}
                    >
                        {option}
                    </button>
                ))}
            </div>
            {isSubmitted && (
                <div className="mt-4 p-4 bg-slate-900/50 rounded-md border border-slate-600 animate-fade-in">
                    <p className={`font-bold ${selectedOption === question.answer ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedOption === question.answer ? 'Correct!' : 'Incorrect.'}
                    </p>
                    <p className="text-slate-400 mt-1"><span className="font-semibold">Explanation:</span> {question.explanation}</p>
                </div>
            )}
        </div>
    );
};

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
};

const QuizDisplay = ({ quizData, isChallengeMode = false }) => {
    const [copied, setCopied] = useState(false);
    const [userAnswers, setUserAnswers] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    
    useEffect(() => {
        let interval;
        if (isChallengeMode && timerActive) {
            interval = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isChallengeMode, timerActive]);

    useEffect(() => {
        if (isChallengeMode) {
            setTimerActive(true);
        }
    }, [isChallengeMode]);

    const handleAnswerSelect = (questionIndex, option) => {
        if (isSubmitted) return;
        setUserAnswers(prev => ({
            ...prev,
            [questionIndex]: option
        }));
    };
    
    const handleSubmit = () => {
        setTimerActive(false);
        let currentScore = 0;
        quizData.quiz.forEach((q, index) => {
            if (userAnswers[index] === q.answer) {
                currentScore++;
            }
        });
        setScore(currentScore);
        setIsSubmitted(true);
        setIsScoreModalOpen(true);
    };

    const copyUrl = () => {
        navigator.clipboard.writeText(quizData.url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const allQuestionsAnswered = Object.keys(userAnswers).length === quizData.quiz.length;

    return (
    <div className="space-y-6">
      <header className="bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
            <div>
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">{quizData.title}</h2>
                <div className="flex items-center gap-4 mt-2">
                    <a href={quizData.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-400 hover:underline">
                        View on Wikipedia <ExternalLinkIcon />
                    </a>
                    <button onClick={copyUrl} className="flex items-center gap-1 text-sm text-slate-400 hover:text-white transition">
                        {copied ? <CheckIcon /> : <ClipboardIcon />}
                        {copied ? 'Copied!' : 'Copy URL'}
                    </button>
                </div>
            </div>
            {isChallengeMode && (
                <div className="mt-4 sm:mt-0 flex items-center gap-2 bg-slate-900/50 border border-slate-700 px-4 py-2 rounded-lg">
                    <ClockIcon className="h-6 w-6 text-yellow-400" />
                    <span className="text-2xl font-mono font-bold text-slate-200">{formatTime(timeElapsed)}</span>
                </div>
            )}
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
                <InfoCard title="Summary">
                    <p className="text-slate-300">{quizData.summary}</p>
                </InfoCard>
                <InfoCard title="Key Entities">
                    <div>
                        <h4 className="font-semibold text-slate-400 mb-2">People:</h4>
                        {quizData.key_entities.people.map(e => <Tag key={e}>{e}</Tag>)}
                    </div>
                    <div className="mt-3">
                        <h4 className="font-semibold text-slate-400 mb-2">Organizations:</h4>
                        {quizData.key_entities.organizations.map(e => <Tag key={e}>{e}</Tag>)}
                    </div>
                     <div className="mt-3">
                        <h4 className="font-semibold text-slate-400 mb-2">Locations:</h4>
                        {quizData.key_entities.locations.map(e => <Tag key={e}>{e}</Tag>)}
                    </div>
                </InfoCard>
          </div>
          <div className="space-y-6">
              <InfoCard title="Article Sections">
                  {quizData.sections.map(s => <Tag key={s}>{s}</Tag>)}
              </InfoCard>
              <InfoCard title="Related Topics">
                  {quizData.related_topics.map(t => <Tag key={t}>{t}</Tag>)}
              </InfoCard>
          </div>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-4 text-slate-200">Quiz Questions</h3>
        <div className="space-y-4">
            {quizData.quiz.map((q, i) => (
                <QuizQuestionCard 
                    key={i} 
                    question={q} 
                    index={i} 
                    onOptionSelect={handleAnswerSelect}
                    selectedOption={userAnswers[i] || null}
                    isSubmitted={isSubmitted}
                />
            ))}
        </div>
      </div>
      
      {!isSubmitted && (
        <div className="flex justify-center mt-8">
            <button
                onClick={handleSubmit}
                disabled={!allQuestionsAnswered}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:scale-100"
            >
                Submit Quiz
            </button>
        </div>
      )}

       <Modal isOpen={isScoreModalOpen} onClose={() => setIsScoreModalOpen(false)}>
            <div className="text-center p-4">
                <TrophyIcon className="h-16 w-16 mx-auto text-yellow-400" />
                <h3 className="text-2xl font-bold mt-4 text-slate-100">Assignment Completed!</h3>
                <p className="text-slate-300 mt-2 text-lg">
                    You scored
                </p>
                <p className="text-5xl font-bold my-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                    {score} / {quizData.quiz.length}
                </p>
                {isChallengeMode && (
                    <p className="text-slate-400 text-md mb-4">
                        Completed in <span className="font-bold text-slate-200">{formatTime(timeElapsed)}</span>
                    </p>
                )}
                <button
                    onClick={() => setIsScoreModalOpen(false)}
                    className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-6 rounded-md transition"
                >
                    Close
                </button>
            </div>
        </Modal>
    </div>
  );
};

export default QuizDisplay;