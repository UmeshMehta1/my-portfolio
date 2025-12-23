const { GoogleGenerativeAI } = require('@google/generative-ai');

class AIService {
  constructor() {
    this.apiKey = process.env.GEMINI_API_KEY;
    if (!this.apiKey) {
      console.warn('⚠️ Gemini API key not found. AI features will be disabled.');
      this.genAI = null;
    } else {
      try {
        this.genAI = new GoogleGenerativeAI(this.apiKey);
      } catch (error) {
        console.error('Error initializing Google Generative AI:', error);
        this.genAI = null;
      }
    }
  }

  async generateResponse(prompt, context = '') {
    if (!this.genAI) {
      throw new Error('AI service not configured. Please set GEMINI_API_KEY in environment variables.');
    }

    const fullPrompt = context ? `${context}\n\n${prompt}` : prompt;

    try {
      // Try different models in order of preference
      const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro'];
      let lastError = null;

      for (const modelName of models) {
        try {
          const model = this.genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent(fullPrompt);
          const response = await result.response;
          return response.text();
        } catch (error) {
          lastError = error;
          const errorMsg = error.message || String(error);
          const errorCode = error.code || error.status || '';
          
          console.error(`Model ${modelName} failed:`, {
            message: errorMsg,
            code: errorCode,
            fullError: error
          });
          
          // If it's a model not found error (404), try next model
          if (errorCode === 404 || (errorMsg.includes('not found') && errorMsg.includes('model'))) {
            console.log(`Model ${modelName} not found (404), trying next model...`);
            continue;
          }
          // If it's an API key/auth error (403), throw immediately
          if (errorCode === 403 || errorMsg.includes('API key') || errorMsg.includes('authentication') || errorMsg.includes('PERMISSION_DENIED')) {
            console.error('API key authentication error (403):', errorMsg);
            throw error;
          }
          // If it's a quota error (429), throw immediately
          if (errorCode === 429 || errorMsg.includes('quota') || errorMsg.includes('rate limit') || errorMsg.includes('RESOURCE_EXHAUSTED')) {
            console.error('Quota/rate limit error (429):', errorMsg);
            throw error;
          }
          // If it's a 400 error (bad request), might be model-specific, try next
          if (errorCode === 400 && errorMsg.includes('model')) {
            console.log(`Model ${modelName} returned 400, trying next model...`);
            continue;
          }
          // For other errors, log and try next model
          console.log(`Model ${modelName} failed with error (${errorCode}), trying next model...`);
          continue;
        }
      }

      // If all models failed, provide helpful error
      if (lastError) {
        if (lastError.message && lastError.message.includes('API key')) {
          throw new Error(
            'API key authentication failed. Please ensure:\n' +
            '1. Your API key is correct and starts with "AIza..."\n' +
            '2. Generative Language API is enabled: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com\n' +
            '3. Your API key has access to the Generative Language API\n' +
            `Original error: ${lastError.message}`
          );
        }
        throw lastError;
      }

      throw new Error('All models failed. Please check your API key and enable the Generative Language API.');
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  async chatAboutPortfolio(question) {
    const context = `You are a helpful assistant representing a portfolio website owner. 
    Here's information about the portfolio owner:
    
    - Full Stack Developer
    - Skills: JavaScript, TypeScript, React, Next.js, Node.js, MongoDB, Python
    - Experience: Building modern web applications, APIs, and full-stack solutions
    - Projects: E-commerce platforms, Task management apps, Analytics dashboards
    - Technologies: Modern web stack with focus on performance and user experience
    
    Answer questions about the portfolio owner's skills, experience, and projects in a friendly and professional manner.
    Keep responses concise (2-3 sentences) unless asked for more detail.`;

    return await this.generateResponse(question, context);
  }

  async analyzeResume(resumeText) {
    const prompt = `Analyze the following resume and provide:
1. Strengths (3-4 key points)
2. Areas for improvement (2-3 suggestions)
3. Skill gaps (if any)
4. Overall assessment (brief summary)

Resume content:
${resumeText}

Format the response in a clear, structured way.`;

    return await this.generateResponse(prompt);
  }

  async summarizeBlog(blogContent) {
    const prompt = `Summarize the following blog post in 5-6 lines. 
    Focus on key points and main takeaways. 
    Make it concise and informative.
    
    Blog content:
    ${blogContent}`;

    return await this.generateResponse(prompt);
  }

  async generateRecommendation(currentSkills) {
    const prompt = `Based on the following skills: ${currentSkills.join(', ')}

Provide 3-5 specific recommendations for:
1. Technologies to learn next
2. Skills to improve
3. Projects to build

Keep recommendations practical and actionable.`;

    return await this.generateResponse(prompt);
  }
}

module.exports = new AIService();
