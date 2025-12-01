# 🔧 AI Features Troubleshooting Guide

## ❌ Error: "Failed to generate summary" or "Gemini API model not found"

### Root Cause
The **Generative Language API is not enabled** in your Google Cloud Console.

### ✅ Solution

#### Step 1: Enable the API
1. **Click this direct link**: 
   https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com?project=portfolio-479818

2. **Click the blue "ENABLE" button**

3. **Wait 10-30 seconds** for activation

#### Step 2: Verify API Key Access
1. Go to: https://console.cloud.google.com/apis/credentials?project=portfolio-479818
2. Click on your API key
3. Under "API restrictions":
   - Select **"Restrict key"**
   - Add **"Generative Language API"** to allowed APIs
   - Click **"SAVE"**

#### Step 3: Restart Backend
```bash
cd backend
# Stop server (Ctrl+C)
npm run dev
```

#### Step 4: Test
```bash
cd backend
node test-ai.js
```

You should see:
```
✅ Chat test passed!
✅ Resume analysis test passed!
✅ Blog summary test passed!
```

---

## 🔍 Other Common Issues

### Issue: "Cannot connect to backend server"
**Solution:**
- Make sure backend is running: `cd backend && npm run dev`
- Check if port 5000 is available
- Verify `NEXT_PUBLIC_API_URL` in frontend `.env.local` (if using custom URL)

### Issue: "API key not configured"
**Solution:**
- Check `backend/.env` file has `GEMINI_API_KEY=...`
- Restart backend after adding API key
- Verify no extra spaces in API key

### Issue: "Permission denied" or "403 Forbidden"
**Solution:**
- Verify API key has access to Generative Language API
- Check if billing is enabled (free tier available)
- Ensure you're using the correct Google account

### Issue: "Rate limit exceeded"
**Solution:**
- Wait a few minutes
- Check your API usage in Google Cloud Console
- Consider implementing caching for repeated requests

---

## ✅ Verification Checklist

After enabling the API, verify:

- [ ] API enabled in Google Cloud Console
- [ ] API key has access to Generative Language API
- [ ] Backend server restarted
- [ ] Test script passes: `node test-ai.js`
- [ ] Frontend can connect (check browser console)
- [ ] AI features work in portfolio

---

## 🧪 Quick Test

Test the API directly:
```bash
curl -X POST http://localhost:5000/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"question": "What are your skills?"}'
```

Expected response:
```json
{
  "question": "What are your skills?",
  "answer": "...",
  "timestamp": "..."
}
```

---

## 📞 Still Not Working?

1. **Check API Status**: https://status.cloud.google.com/
2. **Verify API Key**: Make sure it's the correct format (starts with `AIza...` or `AQ...`)
3. **Check Backend Logs**: Look for detailed error messages
4. **Test API Key**: Try using it in Google AI Studio: https://makersuite.google.com/

---

## 🎯 Current Status

- ✅ Backend server: Running
- ✅ API routes: Configured
- ✅ Frontend components: Ready
- ⏳ Generative Language API: **Needs to be enabled**

**Once you enable the API, all AI features will work!** 🚀

