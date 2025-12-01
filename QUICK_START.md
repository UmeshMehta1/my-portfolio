# Quick Start Guide

## 🚀 Fast Setup (5 minutes)

### 1. Install Dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
```

### 2. Configure Environment

**Frontend** - Create `frontend/.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
```

**Backend** - Create `backend/.env`:
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
```

### 3. Start Servers

**Option A: Use the startup script**
```bash
./start.sh
```

**Option B: Manual start**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### 4. Open Browser

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api/health

## ✨ What's Included

### Advanced Features
- ✅ Real-time visitor counter (Socket.io)
- ✅ Online user tracking
- ✅ Dark mode toggle
- ✅ Skills visualization with filtering
- ✅ Project showcase with modals
- ✅ Blog section
- ✅ Contact form with validation
- ✅ SEO optimization (metadata, sitemap, robots.txt)
- ✅ Smooth animations (Framer Motion)
- ✅ Responsive design

### SEO Features
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Structured data (JSON-LD)
- ✅ Sitemap generation
- ✅ Robots.txt
- ✅ Semantic HTML

## 🎨 Customization Checklist

- [ ] Update name in Hero component
- [ ] Add your projects
- [ ] Update skills and proficiency levels
- [ ] Add blog posts
- [ ] Update contact information
- [ ] Add social media links
- [ ] Update SEO metadata
- [ ] Add your domain to sitemap and robots.txt
- [ ] Configure email (optional)
- [ ] Add Google Analytics (optional)

## 📦 Production Build

```bash
# Frontend
cd frontend
npm run build
npm start

# Backend
cd backend
NODE_ENV=production npm start
```

## 🐛 Troubleshooting

**Socket.io not connecting?**
- Check backend is running on port 5000
- Verify NEXT_PUBLIC_SOCKET_URL in frontend/.env.local

**Contact form not working?**
- Check backend server is running
- Verify API route is accessible

**Build errors?**
- Run `npm install` in both frontend and backend
- Check Node.js version (18+ required)

## 📚 Documentation

See `README.md` for detailed documentation.

