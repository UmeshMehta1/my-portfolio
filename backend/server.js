const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Database connection
const connectDB = require('./config/database');

// Models
const Visitor = require('./models/Visitor');
const Contact = require('./models/Contact');
const Project = require('./models/Project');
const BlogPost = require('./models/BlogPost');

// Connect to MongoDB (will be called before server starts)
let dbConnected = false;

const app = express();
const server = http.createServer(app);

// CORS configuration for Socket.io - same as Express
const socketAllowedOrigins = [
  'https://umeshmehta.me',
  'https://www.umeshmehta.me',
  'http://localhost:3000',
  'http://localhost:3001',
];

const isVercelPreviewSocket = (origin) => {
  return origin && (
    origin.includes('.vercel.app') ||
    origin.includes('vercel.app')
  );
};

// Socket.io CORS - allow all Vercel preview URLs and production domain
const io = new Server(server, {
  cors: {
    origin: true, // Allow all origins (Socket.io will validate via handshake)
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware
app.use(helmet());
app.use(compression());

// CORS configuration - allow multiple origins
const allowedOrigins = [
  'https://umeshmehta.me',
  'https://www.umeshmehta.me',
  'http://localhost:3000',
  'http://localhost:3001',
];

// Add Vercel preview URLs pattern
const isVercelPreview = (origin) => {
  return origin && (
    origin.includes('.vercel.app') ||
    origin.includes('vercel.app')
  );
};

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    
    // Check if origin is a Vercel preview URL
    if (isVercelPreview(origin)) {
      return callback(null, true);
    }
    
    // Allow if FRONTEND_URL matches
    const frontendUrl = process.env.FRONTEND_URL;
    if (frontendUrl && origin === frontendUrl) {
      return callback(null, true);
    }
    
    // Reject other origins
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Visitor tracking (in-memory for real-time)
let onlineUsers = new Set();

app.get('/', (req, res) => {
  res.send('Server is running');
});

// Configure Nodemailer for GmailProduction
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️ Email configuration not found. Email functionality will be disabled.');
    return null;
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS, // Gmail App Password
    },
  });
};

const transporter = createTransporter();

// Helper function to get client IP
const getClientIP = (req) => {
  return req.headers['x-forwarded-for']?.split(',')[0] || 
         req.headers['x-real-ip'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress ||
         'unknown';
};

// Socket.io connection handling
io.on('connection', async (socket) => {
  console.log('User connected:', socket.id);
  onlineUsers.add(socket.id);
  
  // Get client info
  const clientIP = socket.handshake.address || 'unknown';
  const userAgent = socket.handshake.headers['user-agent'] || 'unknown';
  
  // Save visitor to database
  try {
    const visitor = new Visitor({
      ipAddress: clientIP,
      userAgent: userAgent,
      sessionId: socket.id,
      page: socket.handshake.headers.referer || '/',
    });
    await visitor.save();
  } catch (error) {
    console.error('Error saving visitor:', error);
  }
  
  // Get and emit visitor counts
  try {
    const todayCount = await Visitor.getTodayCount();
    const totalCount = await Visitor.getTotalCount();
    const uniqueToday = await Visitor.getUniqueTodayCount();
    
    io.emit('visitorCount', todayCount);
    io.emit('totalVisitors', totalCount);
    io.emit('uniqueToday', uniqueToday);
    io.emit('onlineUsers', onlineUsers.size);
    io.emit('newVisitor', { count: todayCount });
  } catch (error) {
    console.error('Error getting visitor counts:', error);
  }

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    onlineUsers.delete(socket.id);
    io.emit('onlineUsers', onlineUsers.size);
  });

  // Handle custom events
  socket.on('message', (data) => {
    console.log('Message received:', data);
    io.emit('message', data);
  });
});

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Get statistics
app.get('/api/stats', async (req, res) => {
  try {
    const todayCount = await Visitor.getTodayCount();
    const totalCount = await Visitor.getTotalCount();
    const uniqueToday = await Visitor.getUniqueTodayCount();
    
    res.json({
      todayVisitors: todayCount,
      totalVisitors: totalCount,
      uniqueToday: uniqueToday,
      onlineUsers: onlineUsers.size,
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Get client IP and user agent
    const ipAddress = getClientIP(req);
    const userAgent = req.headers['user-agent'] || 'unknown';

    // Save to database
    const contact = new Contact({
      name,
      email,
      subject,
      message,
      ipAddress,
      userAgent,
    });

    await contact.save();

    console.log('Contact form submission saved:', contact._id);

    // Send email notification
    if (transporter) {
      try {
        const mailOptions = {
          from: process.env.SMTP_USER,
          to: process.env.SMTP_USER, // Send to yourself
          replyTo: email,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
                  ${message.replace(/\n/g, '<br>')}
                </p>
                <p style="margin-top: 15px; font-size: 12px; color: #6b7280;">
                  <strong>IP Address:</strong> ${ipAddress}<br>
                  <strong>User Agent:</strong> ${userAgent}<br>
                  <strong>Submitted:</strong> ${new Date().toLocaleString()}
                </p>
              </div>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                <p style="font-size: 12px; color: #6b7280;">
                  This email was sent from your portfolio contact form.
                </p>
              </div>
            </div>
          `,
          text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
IP Address: ${ipAddress}
User Agent: ${userAgent}
Submitted: ${new Date().toLocaleString()}
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent successfully to:', process.env.SMTP_USER);
      } catch (emailError) {
        console.error('❌ Error sending email:', emailError);
        // Don't fail the request if email fails, just log it
      }
    } else {
      console.warn('⚠️ Email transporter not configured. Skipping email send.');
    }

    // Emit real-time notification
    io.emit('newContact', { name, email, subject, id: contact._id });

    res.json({ 
      message: 'Message sent successfully!',
      id: contact._id 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all contacts (admin endpoint - add authentication in production)
app.get('/api/contacts', async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = status ? { status } : {};
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');
    
    const total = await Contact.countDocuments(query);
    
    res.json({
      contacts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: 'Failed to get contacts' });
  }
});

// Get single contact
app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    console.error('Error getting contact:', error);
    res.status(500).json({ error: 'Failed to get contact' });
  }
});

// Update contact status
app.patch('/api/contacts/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    
    if (status === 'read') {
      await contact.markAsRead();
    } else if (status === 'replied') {
      await contact.markAsReplied();
    } else {
      contact.status = status;
      await contact.save();
    }
    
    res.json(contact);
  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Projects API
app.get('/api/projects', async (req, res) => {
  try {
    const { category, featured } = req.query;
    const query = { status: 'active' };
    
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    
    const projects = await Project.find(query)
      .sort({ featured: -1, order: 1, createdAt: -1 });
    
    res.json(projects);
  } catch (error) {
    console.error('Error getting projects:', error);
    res.status(500).json({ error: 'Failed to get projects' });
  }
});

// Blog posts API
app.get('/api/blog', async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const query = { published: true };
    
    if (category) query.category = category;
    
    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-content -__v');
    
    const total = await BlogPost.countDocuments(query);
    
    res.json({
      posts,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    });
  } catch (error) {
    console.error('Error getting blog posts:', error);
    res.status(500).json({ error: 'Failed to get blog posts' });
  }
});

// Get single blog post
app.get('/api/blog/:slug', async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true });
    if (!post) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    
    // Increment views
    await post.incrementViews();
    
    res.json(post);
  } catch (error) {
    console.error('Error getting blog post:', error);
    res.status(500).json({ error: 'Failed to get blog post' });
  }
});

// Email routes
const emailRoutes = require('./routes/email');
app.use('/api/email', emailRoutes);

// Test email configuration endpoint
app.get('/api/email/test-config', (req, res) => {
  const isConfigured = !!(process.env.SMTP_USER && process.env.SMTP_PASS);
  res.json({
    configured: isConfigured,
    user: isConfigured ? process.env.SMTP_USER : null,
    message: isConfigured 
      ? 'Email is configured and ready to use' 
      : 'Email configuration missing. Please set SMTP_USER and SMTP_PASS in .env',
  });
});

// AI routes
const aiRoutes = require('./routes/ai');
app.use('/api/ai', aiRoutes);

// Upload routes
const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

// Start server (only after MongoDB connection is established)
const PORT = process.env.PORT || 5000;

// Initialize database connection and start server
const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();
    dbConnected = true;
    
    // Start the server
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔌 Socket.io server ready`);
      console.log(`📊 MongoDB connected and ready`);
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    console.error('Please check your MongoDB connection string in .env file');
    process.exit(1);
  }
};

// Start the application
startServer();

