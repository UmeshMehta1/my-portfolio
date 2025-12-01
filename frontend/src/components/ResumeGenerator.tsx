'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}

const sampleResumeData: ResumeData = {
  personal: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '+1 (555) 123-4567',
    location: 'City, Country',
    linkedin: 'linkedin.com/in/yourname',
    github: 'github.com/yourusername',
  },
  experience: [
    {
      title: 'Full Stack Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: [
        'Developed and maintained web applications using React and Node.js',
        'Collaborated with cross-functional teams to deliver high-quality software',
        'Implemented CI/CD pipelines and improved deployment processes',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University Name',
      period: '2018 - 2022',
    },
  ],
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'Python'],
  projects: [
    {
      name: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
    },
  ],
};

export default function ResumeGenerator() {
  const [selectedStyle, setSelectedStyle] = useState<'modern' | 'minimal' | 'creative'>('modern');
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async (style: string) => {
    setIsGenerating(true);
    try {
      const element = document.getElementById(`resume-${style}`);
      if (!element) return;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`resume-${style}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="resume" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4">
            Download Resume
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-12">
            Choose your preferred style and download
          </p>

          {/* Style Selector */}
          <div className="flex justify-center gap-4 mb-12">
            {(['modern', 'minimal', 'creative'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setSelectedStyle(style)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all capitalize ${
                  selectedStyle === style
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          {/* Resume Preview */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-8 overflow-x-auto">
            <div id={`resume-${selectedStyle}`} className="bg-white dark:bg-gray-800 p-8 min-w-[210mm]">
              {selectedStyle === 'modern' && <ModernResume data={sampleResumeData} />}
              {selectedStyle === 'minimal' && <MinimalResume data={sampleResumeData} />}
              {selectedStyle === 'creative' && <CreativeResume data={sampleResumeData} />}
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center">
            <button
              onClick={() => generatePDF(selectedStyle)}
              disabled={isGenerating}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all disabled:opacity-50"
            >
              {isGenerating ? 'Generating...' : `Download ${selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1)} Resume`}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ModernResume({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-6">
      <div className="border-b-4 border-blue-600 pb-4">
        <h1 className="text-4xl font-bold text-gray-900">{data.personal.name}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
          <span>{data.personal.email}</span>
          <span>•</span>
          <span>{data.personal.phone}</span>
          <span>•</span>
          <span>{data.personal.location}</span>
        </div>
      </div>

      <section>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Experience</h2>
        {data.experience.map((exp, i) => (
          <div key={i} className="mb-4">
            <h3 className="text-xl font-semibold">{exp.title} - {exp.company}</h3>
            <p className="text-gray-600 mb-2">{exp.period}</p>
            <ul className="list-disc list-inside space-y-1">
              {exp.description.map((desc, j) => (
                <li key={j} className="text-gray-700">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, i) => (
            <span key={i} className="px-3 py-1 bg-blue-100 text-blue-800 rounded">{skill}</span>
          ))}
        </div>
      </section>
    </div>
  );
}

function MinimalResume({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-5xl font-light text-gray-900 mb-2">{data.personal.name}</h1>
        <div className="text-gray-600 space-x-4">
          <span>{data.personal.email}</span>
          <span>|</span>
          <span>{data.personal.phone}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-light uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-6">
              <h3 className="font-medium">{exp.title}</h3>
              <p className="text-sm text-gray-600">{exp.company} • {exp.period}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-light uppercase tracking-wide mb-4 border-b border-gray-300 pb-2">Skills</h2>
          <div className="space-y-2">
            {data.skills.map((skill, i) => (
              <div key={i} className="text-gray-700">{skill}</div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function CreativeResume({ data }: { data: ResumeData }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
        <h1 className="text-4xl font-bold mb-2">{data.personal.name}</h1>
        <div className="flex flex-wrap gap-4 text-purple-100">
          <span>{data.personal.email}</span>
          <span>•</span>
          <span>{data.personal.phone}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <section className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-purple-600 mb-4">Experience</h2>
          {data.experience.map((exp, i) => (
            <div key={i} className="mb-4">
              <h3 className="font-semibold">{exp.title}</h3>
              <p className="text-sm text-gray-600">{exp.company}</p>
            </div>
          ))}
        </section>

        <section className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg">
          <h2 className="text-xl font-bold text-pink-600 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, i) => (
              <span key={i} className="px-2 py-1 bg-white dark:bg-gray-800 rounded text-sm">{skill}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

