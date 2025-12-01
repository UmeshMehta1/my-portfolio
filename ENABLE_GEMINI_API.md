# 🚀 How to Enable Google Gemini API - Step by Step Guide

## Quick Steps

### Method 1: Direct Link (Easiest)

1. **Click this link**: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com

2. **Select your project** (or create a new one if needed)

3. **Click "ENABLE"** button

4. **Wait for activation** (usually takes a few seconds)

5. **Done!** ✅

---

### Method 2: Manual Steps

#### Step 1: Go to Google Cloud Console
- Visit: https://console.cloud.google.com/
- Sign in with your Google account (the one associated with your API key)

#### Step 2: Select or Create a Project
- If you see a project dropdown at the top, select your project
- If you don't have a project, click "Select a project" → "New Project"
  - Give it a name (e.g., "Portfolio AI")
  - Click "Create"

#### Step 3: Navigate to API Library
- In the left sidebar, click **"APIs & Services"**
- Then click **"Library"**

#### Step 4: Search for Generative Language API
- In the search bar at the top, type: **"Generative Language API"**
- Click on **"Generative Language API"** from the results

#### Step 5: Enable the API
- Click the big blue **"ENABLE"** button
- Wait a few seconds for it to activate
- You should see "API enabled" message

#### Step 6: Verify API Key Access
1. Go to **"APIs & Services"** → **"Credentials"**
2. Find your API key (the one starting with `AIzaSyBbqeX3nUpnorb9gN8T8TPqXyWm-r14_eY`)
3. Click on it to edit
4. Under **"API restrictions"**, make sure:
   - Either "Don't restrict key" is selected, OR
   - "Restrict key" is selected AND "Generative Language API" is in the allowed APIs list

#### Step 7: Test It!
```bash
cd backend
node test-ai.js
```

---

## 🔍 Troubleshooting

### Issue: "API not enabled" error

**Solution:**
1. Make sure you're in the correct Google Cloud project
2. Verify the API is enabled (go back to API Library and check)
3. Wait a few minutes after enabling (sometimes takes time to propagate)

### Issue: "API key not valid" error

**Solution:**
1. Check your API key in `.env` file
2. Verify the key has access to Generative Language API
3. Make sure there are no extra spaces in the API key

### Issue: "Permission denied" error

**Solution:**
1. Make sure you're signed in with the correct Google account
2. Check if billing is enabled (some APIs require billing)
   - Go to: https://console.cloud.google.com/billing
   - Link a billing account if needed

### Issue: Can't find the API

**Solution:**
1. Make sure you're searching for **"Generative Language API"** (exact name)
2. Try the direct link: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com
3. Check if you're in the correct project

---

## ✅ Verification Checklist

After enabling, verify:

- [ ] API is enabled in API Library
- [ ] API key has access to Generative Language API
- [ ] Backend server is restarted
- [ ] Test script runs successfully: `node test-ai.js`
- [ ] Frontend can connect to backend (check browser console)

---

## 🎯 Quick Test

After enabling, test immediately:

```bash
# In backend directory
cd backend
node test-ai.js
```

You should see:
```
✅ Gemini API key found
📝 Test 1: Chat about portfolio
✅ Chat test passed!
```

---

## 📞 Still Having Issues?

1. **Check API Status**: https://status.cloud.google.com/
2. **Google Cloud Support**: https://cloud.google.com/support
3. **API Documentation**: https://ai.google.dev/docs

---

## 🎉 Once Enabled

Your AI features will work:
- ✅ AI Chatbot (bottom-right button)
- ✅ Resume Analyzer (in portfolio)
- ✅ Blog AI Summaries (on blog posts)

**All code is ready - just enable the API and restart your backend!**

