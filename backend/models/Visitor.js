const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ipAddress: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
  },
  referrer: {
    type: String,
  },
  page: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  sessionId: {
    type: String,
  },
}, {
  timestamps: true,
});

// Index for faster queries
visitorSchema.index({ timestamp: -1 });
visitorSchema.index({ ipAddress: 1, timestamp: -1 });

// Static method to get today's visitor count
visitorSchema.statics.getTodayCount = async function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return await this.countDocuments({
    timestamp: { $gte: today }
  });
};

// Static method to get total visitor count
visitorSchema.statics.getTotalCount = async function() {
  return await this.countDocuments();
};

// Static method to get unique visitors today
visitorSchema.statics.getUniqueTodayCount = async function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  return await this.distinct('ipAddress', {
    timestamp: { $gte: today }
  }).then(ips => ips.length);
};

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;

