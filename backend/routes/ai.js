const express = require('express');
const router = express.Router();
const aiService = require('../services/aiService');

// Chat endpoint - Answer questions about portfolio
router.post('/chat', async (req, res) => {
  try {
    const { question } = req.body;

    if (!question || question.trim().length === 0) {
      return res.status(400).json({ error: 'Question is required' });
    }

    if (question.length > 500) {
      return res.status(400).json({ error: 'Question is too long (max 500 characters)' });
    }

    const response = await aiService.chatAboutPortfolio(question);
    
    res.json({
      question,
      answer: response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      status: error.status,
      response: error.response?.data || error.response
    });
    
    const errorMessage = error.message || 'Unknown error occurred';
    const errorString = JSON.stringify(error, Object.getOwnPropertyNames(error));
    
    // Check for specific error types - be more specific
    if (errorMessage.includes('404') && (errorMessage.includes('model') || errorMessage.includes('not found'))) {
      res.status(500).json({ 
        error: 'Model not found',
        message: 'The requested AI model is not available. Trying different models...',
        details: errorMessage,
        originalError: errorString
      });
    } else if (errorMessage.includes('API key') || errorMessage.includes('authentication') || errorMessage.includes('403') || errorMessage.includes('PERMISSION_DENIED')) {
      res.status(500).json({ 
        error: 'API key authentication failed',
        message: 'Your API key may be invalid or not have access to the Generative Language API.',
        details: errorMessage,
        originalError: errorString,
        solution: '1. Verify your API key is correct in Render environment variables\n2. Make sure it starts with "AIza..."\n3. Check API key has access to Generative Language API in Google Cloud Console'
      });
    } else if (errorMessage.includes('quota') || errorMessage.includes('rate limit') || errorMessage.includes('429') || errorMessage.includes('RESOURCE_EXHAUSTED')) {
      res.status(500).json({ 
        error: 'API quota exceeded',
        message: 'You have exceeded the API quota. Please check your usage limits in Google Cloud Console.',
        details: errorMessage,
        originalError: errorString
      });
    } else if (errorMessage.includes('not enabled') && errorMessage.includes('API')) {
      res.status(500).json({ 
        error: 'API not enabled',
        message: 'Generative Language API is not enabled. Please enable it in Google Cloud Console.',
        details: errorMessage,
        originalError: errorString,
        solution: '1. Go to https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com\n2. Click ENABLE\n3. Wait 10-30 seconds\n4. Try again'
      });
    } else {
      // Show the actual error for debugging
      res.status(500).json({ 
        error: 'Failed to generate response',
        message: errorMessage,
        details: errorString,
        stack: error.stack
      });
    }
  }
});

// Resume analyzer endpoint
router.post('/analyze-resume', async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText || resumeText.trim().length === 0) {
      return res.status(400).json({ error: 'Resume text is required' });
    }

    if (resumeText.length > 5000) {
      return res.status(400).json({ error: 'Resume text is too long (max 5000 characters)' });
    }

    const analysis = await aiService.analyzeResume(resumeText);
    
    res.json({
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Resume Analysis Error:', error);
    const errorMessage = error.message || 'Unknown error occurred';
    
    // Provide helpful error message if API is not enabled
    if (errorMessage.includes('not found') || errorMessage.includes('API')) {
      res.status(500).json({ 
        error: 'AI service not available',
        message: 'Generative Language API is not enabled. Please enable it in Google Cloud Console: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com',
        details: errorMessage
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to analyze resume',
        message: errorMessage
      });
    }
  }
});

// Blog summary endpoint
router.post('/summarize-blog', async (req, res) => {
  try {
    const { blogContent } = req.body;

    if (!blogContent || blogContent.trim().length === 0) {
      return res.status(400).json({ error: 'Blog content is required' });
    }

    if (blogContent.length > 10000) {
      return res.status(400).json({ error: 'Blog content is too long (max 10000 characters)' });
    }

    const summary = await aiService.summarizeBlog(blogContent);
    
    res.json({
      summary,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Blog Summary Error:', error);
    const errorMessage = error.message || 'Unknown error occurred';
    
    // Provide helpful error message if API is not enabled
    if (errorMessage.includes('not found') || errorMessage.includes('API')) {
      res.status(500).json({ 
        error: 'AI service not available',
        message: 'Generative Language API is not enabled. Please enable it in Google Cloud Console: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com',
        details: errorMessage
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to generate summary',
        message: errorMessage
      });
    }
  }
});

// Skill recommendations endpoint
router.post('/recommendations', async (req, res) => {
  try {
    const { skills } = req.body;

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ error: 'Skills array is required' });
    }

    const recommendations = await aiService.generateRecommendation(skills);
    
    res.json({
      recommendations,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Recommendations Error:', error);
    res.status(500).json({ 
      error: 'Failed to generate recommendations',
      message: error.message 
    });
  }
});

// Health check
router.get('/health', (req, res) => {
  const isConfigured = !!process.env.GEMINI_API_KEY;
  res.json({
    configured: isConfigured,
    service: 'Google Gemini AI',
    message: isConfigured 
      ? 'AI service is configured and ready' 
      : 'AI service not configured. Please set GEMINI_API_KEY in .env',
    apiKeyPrefix: isConfigured ? process.env.GEMINI_API_KEY.substring(0, 10) + '...' : 'Not set',
  });
});

// Test endpoint - try to make an actual API call
router.get('/test', async (req, res) => {
  try {
    const testResponse = await aiService.chatAboutPortfolio('Say hello');
    res.json({
      success: true,
      message: 'AI service is working correctly!',
      testResponse: testResponse.substring(0, 100),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.stack,
      fullError: JSON.stringify(error, Object.getOwnPropertyNames(error)),
    });
  }
});

module.exports = router;

