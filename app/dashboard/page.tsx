'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';

const caseStudies = [
  {
    id: 'cs-1',
    title: 'House Price Prediction',
    description: 'Regression Modelling - Build predictive models to estimate house prices based on various features',
    steps: 9,
    category: 'Regression'
  },
  {
    id: 'cs-2',
    title: 'Credit Risk Classification',
    description: 'Financial Decision Systems - Develop ML models to assess credit risk and make lending decisions',
    steps: 8,
    category: 'Classification'
  },
  {
    id: 'cs-3',
    title: 'Early Sepsis Risk Prediction',
    description: 'Healthcare ML - Create early warning systems to predict sepsis risk in patients',
    steps: 8,
    category: 'Healthcare'
  },
  {
    id: 'cs-4',
    title: 'Stock Trend Classification',
    description: 'Time-Series Modelling - Analyze and predict stock market trends using historical data',
    steps: 8,
    category: 'Time Series'
  },
  {
    id: 'cs-5',
    title: 'Neural Networks for Digital Classification',
    description: 'Deep Learning - Build neural networks to classify handwritten digits and images',
    steps: 8,
    category: 'Deep Learning'
  },
  {
    id: 'cs-6',
    title: 'Semantic Similarity Modeling',
    description: 'NLP - Develop models to measure semantic similarity between text documents',
    steps: 7,
    category: 'NLP'
  },
  {
    id: 'cs-7',
    title: 'RAG-based AI Chatbot Development',
    description: 'Retrieval-Augmented Generation - Build intelligent chatbots using RAG architecture',
    steps: 8,
    category: 'GenAI'
  }
];

function DashboardContent() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  AI Workshop Platform
                </h1>
                <p className="text-xs text-gray-500">
                  {user?.name} • {user?.usn}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <Link href="/dashboard" className="text-purple-600 font-semibold text-sm hover:text-purple-700 transition-colors">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium">
                Leaderboard
              </Link>
              <Link href="/quiz" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium">
                Quiz
              </Link>
              <Link href="/doubts" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium">
                Doubts
              </Link>
              <Link href="/materials" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium">
                Materials
              </Link>
              <Link href="/passwords" className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium">
                Passwords
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold">
                AI/ML Workshop 2026
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Master AI Through Practice
            </h2>
            <p className="text-lg text-purple-100 max-w-3xl mb-6">
              Hands-on learning experience with 7 comprehensive case studies covering regression, classification, deep learning, NLP, and generative AI.
            </p>
            <div className="flex items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">📚</span>
                </div>
                <div>
                  <div className="font-semibold">7 Case Studies</div>
                  <div className="text-purple-200 text-xs">Real-world projects</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <div className="font-semibold">56 Steps</div>
                  <div className="text-purple-200 text-xs">Guided learning path</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg">🎯</span>
                </div>
                <div>
                  <div className="font-semibold">Practical Focus</div>
                  <div className="text-purple-200 text-xs">Industry-relevant skills</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Case Studies
            </h3>
            <p className="text-gray-600">
              Select a case study to begin your learning journey
            </p>
          </div>

          {/* Case Study Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((cs, index) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/case-study/${cs.id}`}>
                  <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-purple-400 hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-semibold rounded-full">
                        {cs.category}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="text-purple-600 text-xs font-bold mb-2 uppercase tracking-wide">
                        Case Study {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                        {cs.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {cs.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span className="font-medium">{cs.steps} steps</span>
                      </div>
                      <div className="flex items-center gap-1 text-purple-600 font-semibold text-sm group-hover:gap-2 transition-all">
                        Start
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
