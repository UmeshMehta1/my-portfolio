const mongoose = require('mongoose');
const BlogPost = require('../models/BlogPost');
require('dotenv').config();

async function updateBlogPost() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://hello:hello@cluster0.oqa3v7m.mongodb.net/?appName=Cluster0');
    console.log('✅ MongoDB Connected');

    const slug = 'digital-pathshala-nepal-leading-software-development-company';
    const post = await BlogPost.findOne({ slug });

    if (!post) {
      console.log('❌ Blog post not found');
      process.exit(1);
    }

    // Update image URL to use local image
    post.imageUrl = '/images/dpporf.jpg';
    await post.save();

    console.log('✅ Blog post updated successfully!');
    console.log('📝 Updated Image URL:', post.imageUrl);
    console.log('🌐 View at: /blog/' + post.slug);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateBlogPost();

