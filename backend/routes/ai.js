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
        error: 'Failed to generate response',
        message: errorMessage
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
  });
});

module.exports = router;

