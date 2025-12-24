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

// Static method to get last 7 days visitor data grouped by day
visitorSchema.statics.getLast7DaysData = async function() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6); // Last 7 days including today
  
  // Initialize array with all 7 days
  const daysData = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);
    
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    
    daysData.push({
      date: date.toISOString().split('T')[0],
      dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
      count: 0
    });
  }
  
  // Get visitor counts for each day
  const visitors = await this.aggregate([
    {
      $match: {
        timestamp: {
          $gte: sevenDaysAgo,
          $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // Up to end of today
        }
      }
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$timestamp'
          }
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { _id: 1 }
    }
  ]);
  
  // Map the aggregated data to daysData
  visitors.forEach(visitor => {
    const dayIndex = daysData.findIndex(day => day.date === visitor._id);
    if (dayIndex !== -1) {
      daysData[dayIndex].count = visitor.count;
    }
  });
  
  return daysData;
};

const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor;

