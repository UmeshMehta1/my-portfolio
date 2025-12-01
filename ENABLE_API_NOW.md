# 🚀 Enable Generative Language API - Quick Guide

## ⚡ Fastest Way (2 Minutes)

### Step 1: Enable the API (30 seconds)

**Click this direct link:**
👉 **https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com?project=portfolio-479818**

1. You'll see the "Generative Language API" page
2. Click the big blue **"ENABLE"** button
3. Wait 10-30 seconds for activation
4. You'll see "API enabled" confirmation

---

### Step 2: Verify API Key Type (30 seconds)

**Check your API key:**
- Go to: https://console.cloud.google.com/apis/credentials?project=portfolio-479818
- Look at your API keys

**You need:**
- ✅ API key starting with `AIza...` (Standard API key)
- ❌ NOT a key starting with `AQ...` (Service account key)

**If you only have `AQ...` key:**
1. Click "CREATE CREDENTIALS" → "API key"
2. Copy the new key (starts with `AIza...`)
3. Update `backend/.env`: `GEMINI_API_KEY=AIza...your-key`

---

### Step 3: Restart Backend (10 seconds)

```bash
cd backend
# Stop server (Ctrl+C if running)
npm run dev
```

---

### Step 4: Test (10 seconds)

```bash
cd backend
node test-ai.js
```

**Expected output:**
```
✅ Gemini API key found
📝 Test 1: Chat about portfolio
✅ Chat test passed!
```

---

## 🎯 Direct Links

- **Enable API**: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com?project=portfolio-479818
- **Create API Key**: https://console.cloud.google.com/apis/credentials?project=portfolio-479818
- **Google AI Studio** (Alternative): https://makersuite.google.com/app/apikey

---

## ✅ Checklist

- [ ] Generative Language API is **ENABLED**
- [ ] You have an API key starting with **`AIza...`**
- [ ] API key is in `backend/.env` file
- [ ] Backend server **restarted**
- [ ] Test passes: `node test-ai.js`

---

## 🐛 Still Not Working?

### Check 1: API Enabled?
Visit: https://console.cloud.google.com/apis/library?project=portfolio-479818
- Search for "Generative Language API"
- Should show "Enabled" status

### Check 2: API Key Format?
```bash
cd backend
grep GEMINI .env
```
- Should show: `GEMINI_API_KEY=AIza...`
- NOT: `GEMINI_API_KEY=AQ...`

### Check 3: Backend Running?
```bash
curl http://localhost:5000/api/health
```
- Should return: `{"status":"ok"}`

### Check 4: Test API Key?
```bash
cd backend
node test-ai.js
```

---

## 📞 Need Help?

1. **Check API Status**: https://status.cloud.google.com/
2. **Google Cloud Support**: https://cloud.google.com/support
3. **API Documentation**: https://ai.google.dev/docs

---

## 🎉 Once Enabled

Your AI features will work:
- ✅ AI Chatbot (bottom-right button)
- ✅ Resume Analyzer
- ✅ Blog AI Summaries

**All code is ready - just enable the API!** 🚀

