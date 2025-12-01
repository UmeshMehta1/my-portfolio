# My Portfolio

A modern, responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Modern and clean UI design
- 📱 Fully responsive layout
- 🌙 Dark mode support
- ⚡ Fast and optimized with Next.js
- 🎯 Smooth scrolling navigation
- 💼 Project showcase section
- 📧 Contact section with social links

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main homepage
│   └── globals.css     # Global styles and animations
└── components/
    ├── Header.tsx      # Navigation header
    ├── Hero.tsx        # Hero section
    ├── About.tsx       # About section
    ├── Projects.tsx    # Projects showcase
    ├── Contact.tsx     # Contact section
    └── Footer.tsx      # Footer with social links
```

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Customization

### Update Personal Information

1. **Hero Section** (`src/components/Hero.tsx`):
   - Replace "Your Name" with your actual name
   - Update the title and description

2. **About Section** (`src/components/About.tsx`):
   - Update the about text
   - Modify the skills array with your technologies

3. **Projects Section** (`src/components/Projects.tsx`):
   - Update the `projects` array with your actual projects
   - Add GitHub and live demo links

4. **Contact Section** (`src/components/Contact.tsx`):
   - Update email address
   - Add your social media links (LinkedIn, GitHub, Twitter)

5. **Metadata** (`src/app/layout.tsx`):
   - Update the title and description in the metadata object

## Build for Production

```bash
npm run build
npm start
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Technologies Used

- [Next.js](https://nextjs.org) - React framework
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Geist Font](https://vercel.com/font) - Typography
