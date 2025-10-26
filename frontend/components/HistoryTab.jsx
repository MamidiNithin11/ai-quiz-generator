import React, { useState, useEffect, useCallback } from 'react';
import { getHistory, getQuizById } from '../services/api.js';
import Modal from './Modal.jsx';
import QuizDisplay from './QuizDisplay.jsx';
import { LoaderIcon } from './icons/LoaderIcon.jsx';
import { InfoIcon } from './icons/InfoIcon.jsx';

const HistoryTab = () => {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getHistory();
      setHistory(data.sort((a, b) => new Date(b.date_generated).getTime() - new Date(a.date_generated).getTime()));
    } catch (err) {
      setError(err.message || 'Failed to fetch history.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleViewDetails = async (quizId) => {
    setIsModalOpen(true);
    setIsModalLoading(true);
    setSelectedQuiz(null);
    setError(null);
    try {
      const data = await getQuizById(quizId);
      setSelectedQuiz(data);
    } catch (err) {
      setError(err.message || 'Failed to load quiz details.');
    } finally {
      setIsModalLoading(false);
    }
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuiz(null);
    setError(null);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoaderIcon className="h-10 w-10 animate-spin text-teal-400" />
        <p className="ml-4 text-lg">Loading history...</p>
      </div>
    );
  }

  if (error && !isModalOpen) {
    return (
      <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg shadow-lg text-center">
        <p>{error}</p>
        <button onClick={fetchHistory} className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">Retry</button>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-4 sm:p-6 rounded-lg shadow-2xl border border-slate-700">
      <h2 className="text-2xl font-bold mb-4 text-slate-200">Quiz History</h2>
      {history.length === 0 ? (
         <div className="text-center py-10">
          <InfoIcon className="mx-auto h-12 w-12 text-slate-500" />
          <h3 className="mt-2 text-lg font-medium text-slate-400">No quizzes generated yet.</h3>
          <p className="mt-1 text-sm text-slate-500">Go to the 'Generate Quiz' tab to create your first one!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-900/50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">URL</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">Generated</th>
                <th scope="col" className="relative px-6 py-3"><span className="sr-only">Details</span></th>
              </tr>
            </thead>
            <tbody className="bg-slate-800 divide-y divide-slate-700">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-200">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 hidden md:table-cell truncate max-w-xs">{item.url}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 hidden sm:table-cell">{new Date(item.date_generated).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => handleViewDetails(item.id)} className="text-teal-400 hover:text-teal-300 font-semibold transition">View Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {isModalLoading && (
           <div className="flex flex-col items-center justify-center h-64">
            <LoaderIcon className="h-12 w-12 animate-spin text-teal-400" />
            <p className="mt-4 text-lg">Loading quiz...</p>
          </div>
        )}
        {error && isModalOpen && (
             <div className="p-4 text-center bg-red-900/50 border border-red-700 text-red-300 rounded-lg">
                <p className="font-bold">Error</p>
                <p>{error}</p>
             </div>
        )}
        {selectedQuiz && <QuizDisplay quizData={selectedQuiz} />}
      </Modal>
    </div>
  );
};

export default HistoryTab;