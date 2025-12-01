# ✅ API Key Updated! One More Step Needed

## ✅ What's Done
- ✅ API key updated to: `AIzaSyBbqeX3nUpnorb9gN8T8TPqXyWm-r14_eY`
- ✅ Correct format (starts with `AIza...`)

## ⏳ What's Left: Enable the API

The **Generative Language API** needs to be enabled in Google Cloud Console.

---

## 🚀 Enable API Now (30 seconds)

### Direct Link:
👉 **https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com?project=portfolio-479818**

### Steps:
1. **Click the link above**
2. **Click the blue "ENABLE" button**
3. **Wait 10-30 seconds** for activation
4. **You'll see "API enabled" confirmation**

---

## 🔄 After Enabling

### 1. Restart Backend Server
```bash
cd backend
# Stop server (Ctrl+C if running)
npm run dev
```

### 2. Test
```bash
cd backend
node test-ai.js
```

**Expected output:**
```
✅ Gemini API key found
📝 Test 1: Chat about portfolio
✅ Chat test passed!
✅ Resume analysis test passed!
✅ Blog summary test passed!
🎉 All AI tests passed!
```

---

## ✅ Verification

After enabling, test in your portfolio:
- Click "🤖 AI Summary" on any blog post
- Use the AI Chatbot (bottom-right button)
- Try the Resume Analyzer

All should work! 🎉

---

## 🐛 If Still Not Working

1. **Verify API is enabled:**
   - Go to: https://console.cloud.google.com/apis/library?project=portfolio-479818
   - Search: "Generative Language API"
   - Should show: **"Enabled"** status

2. **Check API key restrictions:**
   - Go to: https://console.cloud.google.com/apis/credentials?project=portfolio-479818
   - Click on your API key
   - Under "API restrictions", make sure "Generative Language API" is allowed

3. **Wait a few minutes** - Sometimes it takes time to propagate

---

**Once you enable the API, everything will work!** 🚀

