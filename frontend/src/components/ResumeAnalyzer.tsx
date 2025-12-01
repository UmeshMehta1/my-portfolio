'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ResumeAnalyzer() {
  const [resumeText, setResumeText] = useState('');
  const [analysis, setAnalysis] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string>('');

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      setError('Please paste your resume text');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setAnalysis('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/ai/analyze-resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        const errorMsg = errorData.message || errorData.error || 'Failed to analyze resume';
        throw new Error(errorMsg);
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      let errorMsg = 'An error occurred';
      
      if (err instanceof Error) {
        if (err.message.includes('Generative Language API') || err.message.includes('not enabled')) {
          errorMsg = 'AI service is not available. The Generative Language API needs to be enabled in Google Cloud Console.';
        } else if (err.message.includes('Cannot connect')) {
          errorMsg = 'Cannot connect to backend server. Please make sure the backend is running on port 5000.';
        } else {
          errorMsg = err.message;
        }
      }
      
      setError(errorMsg);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
            AI Resume Analyzer
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Upload your resume and get AI-powered feedback and suggestions
          </p>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <div className="mb-6">
              <label htmlFor="resume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Paste Your Resume Text
              </label>
              <textarea
                id="resume"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume content here... (Name, Experience, Education, Skills, etc.)"
                className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {resumeText.length} / 5000 characters
                  </p>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !resumeText.trim()}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {isAnalyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Analyzing...
                </span>
              ) : (
                'Analyze Resume'
              )}
            </button>

            {error && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-800 dark:text-red-300">{error}</p>
              </div>
            )}

            {analysis && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-800"
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span>🤖</span> AI Analysis
                </h3>
                <div className="prose dark:prose-invert max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 font-sans">
                    {analysis}
                  </pre>
                </div>
              </motion.div>
            )}

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                <strong>💡 Tip:</strong> The AI analyzes your resume for strengths, areas of improvement, skill gaps, and provides actionable recommendations.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

