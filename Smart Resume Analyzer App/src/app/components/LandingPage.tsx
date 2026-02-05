
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Search, FileText, BarChart } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onLogin }) => {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Smart Resume</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={onLogin} className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors">Log In</button>
            <button onClick={onStart} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-colors shadow-sm hover:shadow-md">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide mb-6">
              AI-POWERED RESUME OPTIMIZATION
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Analyze your resume against any <span className="text-blue-600">Job Description</span> in seconds.
            </h1>
            <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto">
              Stop guessing. Get instant feedback on your resume's compatibility, skill gaps, and keyword optimization to land more interviews.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStart}
                className="group relative px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition-all hover:-translate-y-1 flex items-center gap-2"
              >
                Analyze Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-semibold text-lg hover:border-blue-200 hover:bg-blue-50 transition-all flex items-center gap-2">
                View Sample
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<BarChart className="w-6 h-6 text-blue-600" />}
              title="ATS Match Score"
              description="Get a precise percentage score of how well your resume fits the job requirements."
            />
            <FeatureCard 
              icon={<Search className="w-6 h-6 text-indigo-600" />}
              title="Skill Gap Detection"
              description="Identify exactly which hard and soft skills are missing from your profile."
            />
            <FeatureCard 
              icon={<FileText className="w-6 h-6 text-emerald-600" />}
              title="Keyword Analysis"
              description="Optimize for ATS by ensuring you include the right industry keywords."
            />
            <FeatureCard 
              icon={<CheckCircle className="w-6 h-6 text-orange-600" />}
              title="Smart Suggestions"
              description="Receive actionable advice on how to improve every section of your resume."
            />
          </div>
        </div>
      </section>

      {/* Demo Section or Social Proof could go here */}
      
      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center text-slate-400 text-sm">
          © {new Date().getFullYear()} Smart Resume Analyzer. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed">{description}</p>
  </div>
);
