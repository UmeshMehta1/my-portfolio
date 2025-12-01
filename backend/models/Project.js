const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
  },
  longDescription: {
    type: String,
    trim: true,
  },
  technologies: [{
    type: String,
    trim: true,
  }],
  category: {
    type: String,
    enum: ['Full Stack', 'Frontend', 'Backend', 'Mobile', 'Other'],
    required: true,
  },
  githubUrl: {
    type: String,
    trim: true,
  },
  liveUrl: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
}, {
  timestamps: true,
});

// Indexes
projectSchema.index({ featured: -1, order: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ status: 1 });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;

