// API configuration helper
const getApiUrl = () => {
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  }
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
};

export const apiUrl = getApiUrl();

// Helper function for AI API calls
export async function callAIEndpoint(endpoint: string, body: any) {
  try {
    const response = await fetch(`${apiUrl}/api/ai/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ 
        error: `HTTP ${response.status}: ${response.statusText}` 
      }));
      
      // Use the message from backend if available, otherwise use error
      const errorMsg = errorData.message || errorData.error || `HTTP ${response.status}: Request failed`;
      throw new Error(errorMsg);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Cannot connect to backend server. Please make sure the backend is running and the API URL is configured correctly.');
    }
    throw error;
  }
}

