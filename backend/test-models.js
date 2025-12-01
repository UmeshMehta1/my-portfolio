// Test script to list available models
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const testModels = async () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  
  // Try different model names
  const modelsToTry = [
    'gemini-pro',
    'gemini-1.5-pro',
    'gemini-1.5-flash',
    'models/gemini-pro',
    'models/gemini-1.5-pro',
  ];

  for (const modelName of modelsToTry) {
    try {
      console.log(`Testing model: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say hello');
      const response = await result.response;
      console.log(`✅ ${modelName} works! Response: ${response.text()}\n`);
      return modelName;
    } catch (error) {
      console.log(`❌ ${modelName} failed: ${error.message}\n`);
    }
  }
};

testModels();

