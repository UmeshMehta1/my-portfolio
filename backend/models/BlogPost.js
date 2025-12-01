const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog post title is required'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Excerpt is required'],
    trim: true,
    maxlength: [300, 'Excerpt cannot exceed 300 characters'],
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  readTime: {
    type: Number,
    default: 5,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
  views: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Indexes
blogPostSchema.index({ slug: 1 });
blogPostSchema.index({ published: 1, publishedAt: -1 });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ tags: 1 });

// Pre-save hook to generate slug from title
blogPostSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Instance method to increment views
blogPostSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;

