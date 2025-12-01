// Check API status and list available models
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function checkAPIStatus() {
  console.log('🔍 Checking Gemini API Status...\n');

  if (!process.env.GEMINI_API_KEY) {
    console.error('❌ GEMINI_API_KEY not found in .env file');
    process.exit(1);
  }

  console.log('✅ API Key found:', process.env.GEMINI_API_KEY.substring(0, 20) + '...\n');

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  try {
    // Try to list available models
    console.log('📋 Attempting to list available models...\n');
    
    // Try to use a model to see what error we get
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent('test');
    const response = await result.response;
    console.log('✅ API is working! Model response:', response.text().substring(0, 50) + '...\n');
  } catch (error) {
    console.error('❌ Error:', error.message, '\n');
    
    if (error.message.includes('not found') || error.message.includes('404')) {
      console.log('💡 SOLUTION:');
      console.log('1. Enable Generative Language API:');
      console.log('   https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com?project=portfolio-479818\n');
      console.log('2. Click "ENABLE" button');
      console.log('3. Wait 10-30 seconds');
      console.log('4. Restart backend server\n');
    } else if (error.message.includes('API key') || error.message.includes('authentication')) {
      console.log('💡 SOLUTION:');
      console.log('1. Verify your API key is correct');
      console.log('2. Make sure API key starts with "AIza..."');
      console.log('3. Check API key has access to Generative Language API\n');
    } else {
      console.log('💡 Check the error message above for details\n');
    }
  }
}

checkAPIStatus();

