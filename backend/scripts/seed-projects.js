require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/database');
const Project = require('../models/Project');

// Projects data from frontend Projects component
const projectsData = [
  {
    title: 'Tax & Beyond - USA CRM System',
    description: 'Comprehensive tax, accounting, and insurance services platform for USA-based clients.',
    longDescription: 'A full-featured financial services platform designed for managing tax preparation, accounting, bookkeeping, and insurance services. Built with modern web technologies, featuring client management, document handling, payment processing, and secure multi-user access. Includes tax filing services, ITIN applications, QuickBooks integration, payroll management, insurance services, and comprehensive reporting tools. Successfully deployed and serving clients across the United States, with special focus on the Nepali community.',
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Express', 'JWT', 'Chart.js'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/UmeshMehta1',
    liveUrl: 'https://mytaxbeyond.com',
    featured: true,
    order: 1,
    status: 'active',
  },
  {
    title: 'Hamrotask - Task Marketplace Platform',
    description: 'On-demand task marketplace connecting Nepali service providers with customers across Australia.',
    longDescription: 'A comprehensive marketplace platform connecting skilled Nepali service providers with customers across Australia. Features include task posting, service provider matching, secure payment processing via Stripe, real-time messaging, rating and review system, and comprehensive service categories (home cleaning, handyman, moving & delivery, gardening, pet care). Built with Next.js and TypeScript for type safety, PostgreSQL for reliable data storage, and Stripe for secure payments. Successfully deployed and serving the Nepali community in Australia with 5,000+ completed tasks and 1,200+ trusted taskers.',
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Socket.io', 'Express', 'JWT'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/UmeshMehta1',
    liveUrl: 'https://hamrotask-dp.vercel.app',
    featured: true,
    order: 2,
    status: 'active',
  },
  {
    title: 'SaaS-Based POS System',
    description: 'Cloud-based Point of Sale system with multi-tenant architecture and subscription management.',
    longDescription: 'A complete SaaS solution for retail businesses featuring multi-tenant architecture, subscription billing, inventory management, sales reporting, and customer management. Includes admin dashboard for business owners, staff management, sales analytics, and integration capabilities. Built with scalability in mind to handle multiple businesses on a single platform.',
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/UmeshMehta1',
    featured: true,
    order: 3,
    status: 'active',
  },
  {
    title: 'UpaayaX - Home Services & Room Rental Platform',
    description: 'On-demand home services and room rental marketplace connecting users with trusted local providers.',
    longDescription: 'UpaayaX is a modern marketplace platform that helps users find trusted local service professionals and room rentals. Inspired by the live demo at upaayax.vercel.app, it focuses on easy booking, quick matching, secure payments, and transparent pricing. Users can hire taskers for furniture assembly, handyman repairs, home cleaning, grocery delivery, and more, as well as discover and list rooms for rent. The platform is designed for a smooth UX with clear service categories, city-based discovery, and a scalable full stack architecture.',
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Socket.io', 'Stripe', 'Google Maps API'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/UmeshMehta1',
    liveUrl: 'https://upaayax.vercel.app/',
    featured: true,
    order: 4,
    status: 'active',
  },
  {
    title: 'Share Bazar Insights',
    description: 'Real-time stock market insights platform with live data, technical charts, and portfolio management.',
    longDescription: 'A comprehensive stock market analytics platform providing real-time market data, technical charts, portfolio tracking, and market insights. Built with Next.js and TypeScript for the frontend, Node.js backend with PostgreSQL database, and Socket.io for real-time data updates. Features include live market data streaming, interactive technical charts, portfolio management, market news, premium educational content, and advanced analytics. Successfully deployed and serving users with up-to-date financial market information.',
    technologies: ['Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Socket.io', 'Chart.js', 'Tailwind CSS'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/UmeshMehta1',
    liveUrl: 'https://sharebazzar.vercel.app',
    featured: true,
    order: 5,
    status: 'active',
  },
  {
    title: 'Personal Portfolio Website',
    description: 'Modern portfolio website with real-time visitor tracking and AI-powered features.',
    longDescription: 'This very portfolio website! Built with Next.js 14+ App Router, featuring real-time visitor tracking using Socket.io, AI-powered chatbot using Google Gemini API, resume analyzer, blog summarization, and smooth animations. Includes SEO optimization, dark mode support, responsive design, and API playground for testing backend endpoints.',
    technologies: ['Next.js', 'TypeScript', 'Socket.io', 'Tailwind CSS', 'Framer Motion', 'Google Gemini AI'],
    category: 'Full Stack',
    githubUrl: 'https://github.com/UmeshMehta1/my-portfolio',
    liveUrl: 'https://umeshmehta.me',
    featured: false,
    order: 6,
    status: 'active',
  },
];

async function seedProjects() {
  try {
    // Connect to MongoDB using the same connection method as server.js
    const connectDB = require('../config/database');
    await connectDB();
    console.log('✅ Connected to MongoDB');

    // Clear existing projects (optional - comment out if you want to keep existing)
    // await Project.deleteMany({});
    // console.log('🗑️  Cleared existing projects');

    // Check if projects already exist
    const existingProjects = await Project.find({});
    if (existingProjects.length > 0) {
      console.log(`ℹ️  Found ${existingProjects.length} existing projects in database`);
      console.log('   Updating existing projects...');
      
      // Update existing projects or create new ones
      for (const projectData of projectsData) {
        await Project.findOneAndUpdate(
          { title: projectData.title },
          projectData,
          { upsert: true, new: true }
        );
      }
      
      console.log(`✅ Updated ${projectsData.length} projects`);
      await mongoose.connection.close();
      process.exit(0);
    }

    // Insert projects
    const projects = await Project.insertMany(projectsData);
    console.log(`✅ Successfully seeded ${projects.length} projects`);
    
    // Display seeded projects
    projects.forEach((project, index) => {
      console.log(`   ${index + 1}. ${project.title} (${project.category})`);
    });

    // Close connection
    await mongoose.connection.close();
    console.log('✅ Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    process.exit(1);
  }
}

// Run the seed function
seedProjects();

