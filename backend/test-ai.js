// Test script for AI functionality
require('dotenv').config();
const aiService = require('./services/aiService');

const testAI = async () => {
  console.log('🧪 Testing Google Gemini AI integration...\n');

  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in environment variables');
    process.exit(1);
  }

  console.log('✅ Gemini API key found\n');

  try {
    // Test 1: Chat about portfolio
    console.log('📝 Test 1: Chat about portfolio');
    console.log('Question: "What are your main skills?"\n');
    const chatResponse = await aiService.chatAboutPortfolio('What are your main skills?');
    console.log('Response:', chatResponse);
    console.log('\n✅ Chat test passed!\n');

    // Test 2: Resume analysis
    console.log('📄 Test 2: Resume analysis');
    const sampleResume = `
      John Doe
      Full Stack Developer
      
      Experience:
      - 5 years building web applications
      - Expertise in React and Node.js
      - Led team of 3 developers
    `;
    const analysis = await aiService.analyzeResume(sampleResume);
    console.log('Analysis:', analysis);
    console.log('\n✅ Resume analysis test passed!\n');

    // Test 3: Blog summary
    console.log('📝 Test 3: Blog summary');
    const sampleBlog = `
      Next.js 14 introduces several exciting features. The new App Router provides 
      a more intuitive way to structure applications. Server Components allow 
      rendering on the server, reducing JavaScript sent to clients.
    `;
    const summary = await aiService.summarizeBlog(sampleBlog);
    console.log('Summary:', summary);
    console.log('\n✅ Blog summary test passed!\n');

    console.log('🎉 All AI tests passed! Your Gemini AI integration is working correctly.');
  } catch (error) {
    console.error('❌ AI Test Error:', error.message);
    process.exit(1);
  }
};

testAI();

