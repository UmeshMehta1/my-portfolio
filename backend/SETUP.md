# MongoDB Setup Guide

## Quick Setup

1. **Create `.env` file in the backend directory:**

```bash
cd backend
cp .env.example .env
```

2. **Update the `.env` file with your MongoDB connection string:**

```env
MONGODB_URI=mongodb+srv://hello:hello@cluster0.oqa3v7m.mongodb.net/?appName=Cluster0
PORT=5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

3. **Start the server:**

```bash
npm run dev
```

## MongoDB Models

The following models are available:

### 1. Visitor Model
- Tracks website visitors
- Stores IP address, user agent, referrer, timestamp
- Methods: `getTodayCount()`, `getTotalCount()`, `getUniqueTodayCount()`

### 2. Contact Model
- Stores contact form submissions
- Fields: name, email, subject, message, status
- Methods: `markAsRead()`, `markAsReplied()`

### 3. Project Model
- Stores portfolio projects
- Fields: title, description, technologies, category, URLs
- Supports filtering by category and featured status

### 4. BlogPost Model
- Stores blog posts
- Fields: title, slug, content, author, category, tags
- Auto-generates slug from title
- Tracks views

## API Endpoints

### Statistics
- `GET /api/stats` - Get visitor statistics

### Contacts
- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts (with pagination)
- `GET /api/contacts/:id` - Get single contact
- `PATCH /api/contacts/:id` - Update contact status

### Projects
- `GET /api/projects` - Get all projects (filter by category/featured)

### Blog
- `GET /api/blog` - Get blog posts (with pagination)
- `GET /api/blog/:slug` - Get single blog post

## Database Connection

The server will automatically connect to MongoDB on startup. If the connection fails, the server will not start.

Connection status is logged:
- ✅ MongoDB Connected - Success
- ❌ MongoDB connection failed - Check your connection string

## Troubleshooting

### Connection Failed
1. Check your MongoDB connection string in `.env`
2. Verify your MongoDB Atlas IP whitelist (add 0.0.0.0/0 for development)
3. Check your MongoDB credentials
4. Ensure your network allows MongoDB connections

### Models Not Working
- Make sure MongoDB is connected before using models
- Check console for connection errors
- Verify model schemas match your data

## Production Notes

- Use environment variables for sensitive data
- Enable MongoDB authentication
- Use connection pooling for better performance
- Set up MongoDB indexes for better query performance
- Consider using MongoDB Atlas for production

