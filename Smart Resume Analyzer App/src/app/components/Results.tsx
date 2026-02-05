
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Check, X, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import type { AnalysisResult } from '../../utils/analysisEngine';
import clsx from 'clsx';

interface ResultsProps {
  results: AnalysisResult;
}

export const Results: React.FC<ResultsProps> = ({ results }) => {
  const scoreData = [
    { name: 'Match', value: results.matchPercentage },
    { name: 'Gap', value: 100 - results.matchPercentage },
  ];
  const COLORS = ['#2563eb', '#e2e8f0']; // blue-600, slate-200

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Match Score */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
          <h3 className="text-sm font-semibold text-slate-500 mb-4 uppercase tracking-wider">Overall Match</h3>
          <div className="w-40 h-40 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={scoreData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={0}
                  dataKey="value"
                  stroke="none"
                >
                  {scoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-slate-900">{results.matchPercentage}%</span>
              <span className="text-xs text-slate-400 font-medium">MATCH</span>
            </div>
          </div>
        </div>

        {/* Quality Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 md:col-span-2">
          <h3 className="text-sm font-semibold text-slate-500 mb-6 uppercase tracking-wider">Resume Quality Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
            <ScoreBar label="Skills Match" score={results.qualityScore.skillsMatch} max={40} color="bg-blue-500" />
            <ScoreBar label="Keywords" score={results.qualityScore.keywords} max={30} color="bg-indigo-500" />
            <ScoreBar label="Sections" score={results.qualityScore.sections} max={20} color="bg-emerald-500" />
            <ScoreBar label="Formatting" score={results.qualityScore.formatting} max={10} color="bg-orange-500" />
          </div>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
             <div className="w-2 h-6 bg-emerald-500 rounded-full" />
             Matched Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {results.matchedSkills.length > 0 ? (
              results.matchedSkills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-slate-400 italic text-sm">No specific skills matched yet.</span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
             <div className="w-2 h-6 bg-red-500 rounded-full" />
             Missing Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {results.missingSkills.length > 0 ? (
              results.missingSkills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-100">
                  {skill}
                </span>
              ))
            ) : (
              <span className="text-emerald-600 text-sm font-medium flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> All detected skills present!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Keywords & Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Keyword Analysis */}
         <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Keyword Analysis</h3>
            <div className="overflow-hidden rounded-xl border border-slate-100">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-medium">
                  <tr>
                    <th className="px-4 py-3">Keyword</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {results.keywords.found.map(kw => (
                    <tr key={kw} className="bg-white">
                      <td className="px-4 py-3 text-slate-700 font-medium capitalize">{kw}</td>
                      <td className="px-4 py-3 text-emerald-600 font-medium flex items-center gap-1">
                        <Check className="w-4 h-4" /> Found
                      </td>
                    </tr>
                  ))}
                  {results.keywords.missing.map(kw => (
                    <tr key={kw} className="bg-white">
                      <td className="px-4 py-3 text-slate-700 font-medium capitalize">{kw}</td>
                      <td className="px-4 py-3 text-red-500 font-medium flex items-center gap-1">
                        <X className="w-4 h-4" /> Missing
                      </td>
                    </tr>
                  ))}
                  {results.keywords.found.length === 0 && results.keywords.missing.length === 0 && (
                     <tr>
                       <td colSpan={2} className="px-4 py-3 text-center text-slate-400">No specific keywords detected in JD.</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
         </div>

         {/* Section Check */}
         <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Section Check</h3>
            <div className="space-y-3">
              <SectionItem label="Summary" present={results.sectionCheck.summary} />
              <SectionItem label="Education" present={results.sectionCheck.education} />
              <SectionItem label="Projects" present={results.sectionCheck.projects} />
              <SectionItem label="Experience" present={results.sectionCheck.experience} />
              <SectionItem label="Skills" present={results.sectionCheck.skills} />
            </div>
         </div>
      </div>

      {/* Suggestions */}
      <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100">
         <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
           <AlertCircle className="w-5 h-5 text-blue-600" />
           Improvement Suggestions
         </h3>
         <ul className="space-y-3">
           {results.suggestions.map((suggestion, i) => (
             <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-xl border border-blue-100 shadow-sm text-slate-700 text-sm">
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
               {suggestion}
             </li>
           ))}
         </ul>
      </div>

    </motion.div>
  );
};

const ScoreBar = ({ label, score, max, color }: { label: string, score: number, max: number, color: string }) => {
  const percentage = (score / max) * 100;
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-bold text-slate-900">{score}/{max}</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
        <div 
          className={clsx("h-2.5 rounded-full", color)} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const SectionItem = ({ label, present }: { label: string, present: boolean }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
    <span className="text-sm font-medium text-slate-700">{label}</span>
    {present ? (
      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
    ) : (
      <X className="w-5 h-5 text-red-400" />
    )}
  </div>
);
