'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface Doubt {
  id: string;
  caseStudyTitle: string;
  question: string;
  isAnonymous: boolean;
  userName: string;
  timestamp: string;
}

const caseStudies = [
  { id: 'cs-1', title: 'House Price Prediction' },
  { id: 'cs-2', title: 'Credit Risk Classification' },
  { id: 'cs-3', title: 'Early Sepsis Risk Prediction' },
  { id: 'cs-4', title: 'Stock Trend Classification' },
  { id: 'cs-5', title: 'Neural Networks for Digital Classification' },
  { id: 'cs-6', title: 'Semantic Similarity Modeling' },
  { id: 'cs-7', title: 'RAG-based AI Chatbot Development' },
];

export default function DoubtsPage() {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState('');
  const [question, setQuestion] = useState('');
  const [userName, setUserName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deletePasscode, setDeletePasscode] = useState('');
  const [deletingDoubtId, setDeletingDoubtId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;

    const fetchData = async () => {
      try {
        const res = await fetch('/api/doubts', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache',
          },
        });
        const data = await res.json();
        
        if (data.success && data.data && Array.isArray(data.data)) {
          setDoubts(data.data);
        }
      } catch (err) {
        console.error('Error fetching doubts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const timer = setInterval(fetchData, 10000); // Refresh every 10 seconds
    return () => clearInterval(timer);
  }, []);

  const handleDelete = async (doubtId: string) => {
    try {
      const res = await fetch('/api/doubts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'delete',
          doubtId,
          passcode: deletePasscode,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setDoubts(doubts.filter(d => d.id !== doubtId));
        setDeletingDoubtId(null);
        setDeletePasscode('');
        setSuccess('Doubt deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Failed to delete doubt');
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('Failed to delete doubt');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!selectedCaseStudy) {
      setError('Please select a case study');
      return;
    }

    if (!question.trim()) {
      setError('Please enter your question');
      return;
    }

    if (!isAnonymous && !userName.trim()) {
      setError('Please enter your name or select anonymous');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/doubts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'submit',
          caseStudyTitle: selectedCaseStudy,
          question: question.trim(),
          userName: isAnonymous ? 'Anonymous' : userName.trim(),
          isAnonymous,
        }),
      });

      const data = await res.json();

      if (data.success) {
        // Reset form
        setSelectedCaseStudy('');
        setQuestion('');
        setUserName('');
        setIsAnonymous(false);
        setSuccess('Your question has been submitted successfully!');
        
        // Refresh doubts list
        const refreshRes = await fetch('/api/doubts', { cache: 'no-store' });
        const refreshData = await refreshRes.json();
        if (refreshData.success && refreshData.data) {
          setDoubts(refreshData.data);
        }

        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(data.error || 'Failed to submit question');
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      setError('Failed to submit question');
      setTimeout(() => setError(''), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return dateString; // Already formatted from Google Sheets
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Workshop Platform</h1>
              <p className="text-sm text-gray-500">Welcome, Shreyas</p>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                Case Studies
              </Link>
              <Link href="/leaderboard" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                Leaderboard
              </Link>
              <Link href="/quiz" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                Quiz
              </Link>
              <Link href="/doubts" className="text-purple-600 font-semibold text-sm">
                Doubts
              </Link>
              <Link href="/materials" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                Materials
              </Link>
              <Link href="/passwords" className="text-gray-600 hover:text-purple-600 transition-colors text-sm">
                Passwords
              </Link>
              <Link href="/login" className="flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors text-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Ask Your Doubts</h2>
          <p className="text-gray-600 text-sm">Have questions about the case studies? Ask here and get help from instructors</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Submit a Question</h3>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">
                Select Case Study
              </label>
              <select
                value={selectedCaseStudy}
                onChange={(e) => setSelectedCaseStudy(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300"
              >
                <option value="">Choose a case study...</option>
                {caseStudies.map((cs) => (
                  <option key={cs.id} value={cs.title}>
                    {cs.title}
                  </option>
                ))}
              </select>
            </div>

            {!isAnonymous && (
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Your Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">
                Your Question
              </label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                placeholder="Describe your doubt or question in detail..."
                className="w-full px-4 py-3 bg-gray-50 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 resize-none"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500 rounded"
              />
              <label htmlFor="anonymous" className="ml-2 text-gray-700 text-sm">
                Submit anonymously
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Question'}
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Recent Questions ({doubts.length})
          </h3>

          {isLoading ? (
            <div className="bg-white rounded-lg border border-gray-200 p-16 text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Questions...</h3>
              <p className="text-gray-500 text-sm">Fetching data from Google Sheets</p>
            </div>
          ) : doubts.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-16 text-center">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Questions Yet</h3>
              <p className="text-gray-500 text-sm">Be the first to ask a question!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {doubts.map((doubt) => (
                <div key={doubt.id} className="bg-white rounded-lg border border-gray-200 p-5 hover:border-purple-300 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {doubt.isAnonymous ? '?' : doubt.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{doubt.userName}</p>
                        <p className="text-sm text-gray-500">{formatDate(doubt.timestamp)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                        {doubt.caseStudyTitle}
                      </span>
                      <button
                        onClick={() => setDeletingDoubtId(doubt.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete doubt"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-3">{doubt.question}</p>
                  
                  {deletingDoubtId === doubt.id && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2">
                        <input
                          type="password"
                          value={deletePasscode}
                          onChange={(e) => setDeletePasscode(e.target.value)}
                          placeholder="Enter passcode to delete"
                          className="flex-1 px-3 py-2 bg-gray-50 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-300 text-sm"
                        />
                        <button
                          onClick={() => handleDelete(doubt.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors text-sm"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setDeletingDoubtId(null);
                            setDeletePasscode('');
                          }}
                          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition-colors text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

