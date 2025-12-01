# Advanced Portfolio Website

A cutting-edge, SEO-optimized portfolio website built with Next.js, TypeScript, Socket.io, and advanced features.

## 🚀 Features

### Frontend Features
- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 🌙 **Dark Mode** - Manual theme toggle with system preference detection
- ⚡ **Real-time Features** - Live visitor counter and online user tracking via Socket.io
- 📊 **Skills Visualization** - Interactive skill bars with category filtering
- 💼 **Project Showcase** - Featured projects with modal details and filtering
- 📝 **Blog Section** - Latest blog posts with reading time
- 📧 **Contact Form** - Validated form with backend integration
- 🎭 **Advanced Animations** - Framer Motion animations and custom CSS effects
- 📱 **Fully Responsive** - Mobile-first design approach
- 🔍 **SEO Optimized** - Complete SEO setup with metadata, sitemap, and structured data

### Backend Features
- 🔌 **Socket.io Server** - Real-time communication for visitor tracking
- 📧 **Contact API** - Email integration ready
- 🛡️ **Security** - Helmet, CORS, rate limiting
- 📈 **Analytics Ready** - Visitor statistics and tracking
- ⚙️ **RESTful API** - Clean API structure

## 📁 Project Structure

```
my-portfolio/
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/
│   │   │   │   └── contact/
│   │   │   │       └── route.ts      # Contact form API
│   │   │   ├── layout.tsx            # SEO-optimized layout
│   │   │   ├── page.tsx              # Main homepage
│   │   │   ├── sitemap.ts            # SEO sitemap
│   │   │   └── globals.css           # Global styles & animations
│   │   └── components/
│   │       ├── Header.tsx            # Navigation with theme toggle
│   │       ├── Hero.tsx              # Animated hero section
│   │       ├── About.tsx             # About section with stats
│   │       ├── Skills.tsx            # Skills with filtering
│   │       ├── Projects.tsx         # Projects with modals
│   │       ├── Blog.tsx              # Blog posts section
│   │       ├── Contact.tsx           # Contact form
│   │       ├── Footer.tsx            # Footer with social links
│   │       ├── Providers.tsx         # Context providers
│   │       ├── ThemeProvider.tsx     # Theme management
│   │       ├── SocketProvider.tsx    # Socket.io integration
│   │       └── Analytics.tsx        # Analytics tracking
│   └── public/
│       └── robots.txt                # SEO robots file
│
└── backend/
    ├── server.js                     # Express + Socket.io server
    ├── package.json
    └── .env.example                  # Environment variables template
```

## 🛠️ Technologies Used

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion** - Animation library
- **Socket.io Client** - Real-time communication
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **React Intersection Observer** - Scroll animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time bidirectional communication
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API rate limiting
- **Compression** - Response compression

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- (Optional) MongoDB for database features

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd my-portfolio
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

4. **Configure Environment Variables**

Create `.env` files from examples:

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/portfolio
```

5. **Start Development Servers**

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

6. **Open your browser**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:5000](http://localhost:5000)

## 📝 Customization Guide

### 1. Personal Information

**Update Hero Section** (`frontend/src/components/Hero.tsx`):
- Replace "Your Name" with your name
- Update roles array with your titles

**Update About Section** (`frontend/src/components/About.tsx`):
- Modify the story text
- Update stats (projects, clients, etc.)

**Update Skills** (`frontend/src/components/Skills.tsx`):
- Modify the skills array with your technologies
- Adjust proficiency levels

### 2. Projects

**Update Projects** (`frontend/src/components/Projects.tsx`):
- Replace the projects array with your actual projects
- Add GitHub and live demo URLs
- Update technologies and descriptions

### 3. Blog Posts

**Update Blog** (`frontend/src/components/Blog.tsx`):
- Replace blogPosts array with your articles
- Add actual blog post content

### 4. Contact Information

**Update Contact** (`frontend/src/components/Contact.tsx`):
- Update email address
- Add your social media links

**Update Footer** (`frontend/src/components/Footer.tsx`):
- Update social media links
- Modify footer text

### 5. SEO Configuration

**Update Metadata** (`frontend/src/app/layout.tsx`):
- Update title, description, keywords
- Add your social media handles
- Update Open Graph images
- Add verification codes

**Update Sitemap** (`frontend/src/app/sitemap.ts`):
- Update baseUrl with your domain
- Add additional routes

**Update robots.txt** (`frontend/public/robots.txt`):
- Update sitemap URL with your domain

## 🔧 Advanced Configuration

### Socket.io Configuration

The Socket.io server tracks:
- Total visitor count
- Online users in real-time
- New visitor notifications

To customize, edit `backend/server.js` and `frontend/src/components/SocketProvider.tsx`.

### Email Integration

To enable email sending for contact form:

1. Install nodemailer (already included)
2. Configure SMTP in `backend/.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

3. Update `backend/server.js` contact endpoint to send emails.

### Analytics

Add Google Analytics:
1. Get your GA tracking ID
2. Add to `frontend/.env.local`: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
3. Add GA script to `frontend/src/app/layout.tsx`

## 🏗️ Build for Production

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Backend
```bash
cd backend
NODE_ENV=production npm start
```

## 🚢 Deployment

### Frontend (Vercel Recommended)
1. Push to GitHub
2. Import project on Vercel
3. Add environment variables
4. Deploy

### Backend (Railway/Heroku/Render)
1. Set up environment variables
2. Deploy server.js
3. Update frontend Socket.io URL

### Environment Variables for Production
- Update `NEXT_PUBLIC_SITE_URL` with your domain
- Update `NEXT_PUBLIC_SOCKET_URL` with your backend URL
- Update CORS origins in backend

## 📊 SEO Features

- ✅ Comprehensive metadata (Open Graph, Twitter Cards)
- ✅ Structured data (JSON-LD)
- ✅ Sitemap generation
- ✅ Robots.txt configuration
- ✅ Semantic HTML
- ✅ Optimized images
- ✅ Fast loading times
- ✅ Mobile-friendly

## 🎨 Customization Tips

- **Colors**: Modify Tailwind config or use CSS variables
- **Fonts**: Update font imports in `layout.tsx`
- **Animations**: Adjust Framer Motion settings
- **Layout**: Modify component structures
- **Content**: All content is in component files

## 🤝 Contributing

Feel free to fork, modify, and use this portfolio template for your own projects!

## 📄 License

MIT License - feel free to use this for your portfolio!

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS
- Framer Motion for smooth animations
- Socket.io for real-time features

---

**Built with ❤️ using Next.js, TypeScript, and Socket.io**

