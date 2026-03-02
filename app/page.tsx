'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (user) {
      const destination = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
      router.replace(destination);
    }
  }, [user, loading, router]);

  if (loading || user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 bg-transparent">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-white font-bold text-xl">Workshop Platform</span>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                href="/login"
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="px-6 py-2.5 bg-white text-purple-900 rounded-lg font-semibold hover:bg-purple-50 transition-all shadow-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 pt-32 pb-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-purple-200 text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                AI/ML Workshop 2026
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Master AI Through
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Real-World Practice
                </span>
              </h1>
              
              <p className="text-xl text-purple-200 mb-12 max-w-2xl mx-auto leading-relaxed">
                Hands-on learning experience with 7 comprehensive case studies covering regression, classification, deep learning, NLP, and generative AI.
              </p>

              <div className="flex items-center justify-center gap-4 mb-16">
                <Link 
                  href="/signup"
                  className="px-8 py-4 bg-white text-purple-900 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
                >
                  Start Learning
                </Link>
                <Link 
                  href="/login"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20"
                >
                  Sign In
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-white mb-2">7</div>
                  <div className="text-purple-300 text-sm">Case Studies</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-white mb-2">56</div>
                  <div className="text-purple-300 text-sm">Learning Steps</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-4xl font-bold text-white mb-2">100%</div>
                  <div className="text-purple-300 text-sm">Practical</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            What You'll Learn
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🏠',
                title: 'Regression Models',
                description: 'House price prediction and regression analysis'
              },
              {
                icon: '💳',
                title: 'Classification',
                description: 'Credit risk and stock trend classification'
              },
              {
                icon: '🏥',
                title: 'Healthcare ML',
                description: 'Early sepsis risk prediction systems'
              },
              {
                icon: '🧠',
                title: 'Deep Learning',
                description: 'Neural networks for image classification'
              },
              {
                icon: '📝',
                title: 'NLP',
                description: 'Semantic similarity modeling'
              },
              {
                icon: '🤖',
                title: 'Generative AI',
                description: 'RAG-based chatbot development'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all hover:scale-105"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-purple-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-12 shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your AI Journey?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join the workshop and gain practical AI/ML skills through hands-on projects
          </p>
          <Link 
            href="/signup"
            className="inline-block px-10 py-4 bg-white text-purple-900 rounded-xl font-bold text-lg hover:bg-purple-50 transition-all shadow-xl hover:scale-105"
          >
            Get Started Now
          </Link>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center text-purple-300">
          <p>© 2026 AI Workshop Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
