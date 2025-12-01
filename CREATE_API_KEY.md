# 🔑 How to Create the Correct Gemini API Key

## ⚠️ Important: Service Account Keys Don't Work

The API key you created (`AQ.Ab8RN6IQ5rlJE99gDS_OGECks--X6IW_6xXZC0pBMVxxGmkV_g`) is a **service account key**, which doesn't work with the Gemini API directly.

You need a **standard API key** that starts with `AIza...`

---

## ✅ Step-by-Step: Create Standard API Key

### Method 1: Google AI Studio (Easiest)

1. **Go to Google AI Studio**:
   - Visit: https://makersuite.google.com/app/apikey
   - Sign in with your Google account

2. **Create API Key**:
   - Click "Create API Key"
   - Select your project: `portfolio-479818`
   - Click "Create API key in new project" or select existing project
   - **Copy the API key** (it will start with `AIza...`)

3. **Update your `.env` file**:
   ```bash
   cd backend
   # Edit .env and replace GEMINI_API_KEY with the new key
   ```

4. **Restart backend**:
   ```bash
   npm run dev
   ```

---

### Method 2: Google Cloud Console

1. **Go to Credentials**:
   - Visit: https://console.cloud.google.com/apis/credentials?project=portfolio-479818

2. **Create API Key** (NOT Service Account):
   - Click **"CREATE CREDENTIALS"** at the top
   - Select **"API key"** (NOT "Service account")
   - Copy the generated key (starts with `AIza...`)

3. **Restrict the Key** (Recommended):
   - Click on the newly created API key
   - Under "API restrictions":
     - Select **"Restrict key"**
     - Choose **"Generative Language API"**
     - Click **"SAVE"**

4. **Update `.env`**:
   ```bash
   GEMINI_API_KEY=AIza...your-new-key-here
   ```

5. **Restart backend**

---

## 🔍 How to Tell the Difference

### ✅ Standard API Key (What you need):
- Starts with: `AIza...`
- Format: `AIzaSyBbqeX3nUpnorb9gN8T8TPqXyWm-r14_eY`
- Works with: REST API calls using `?key=API_KEY`
- Use case: Direct API access

### ❌ Service Account Key (What you have):
- Starts with: `AQ.` or other formats
- Format: `AQ.Ab8RN6IQ5rlJE99gDS_OGECks--X6IW_6xXZC0pBMVxxGmkV_g`
- Works with: OAuth2 authentication
- Use case: Server-to-server authentication

---

## 🧪 Test Your New Key

After updating `.env` with the new `AIza...` key:

```bash
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

## 📝 Quick Checklist

- [ ] Created **API key** (not service account key)
- [ ] Key starts with `AIza...`
- [ ] Enabled Generative Language API
- [ ] Updated `backend/.env` with new key
- [ ] Restarted backend server
- [ ] Test passes: `node test-ai.js`

---

## 🎯 Recommended: Use Google AI Studio

**Easiest method**: https://makersuite.google.com/app/apikey

1. Click "Create API Key"
2. Copy the key (starts with `AIza...`)
3. Paste into `backend/.env`
4. Done!

---

## ⚠️ Current Status

- ❌ Service account key: `AQ.Ab8RN6IQ5rlJE99gDS_OGECks--X6IW_6xXZC0pBMVxxGmkV_g` (doesn't work)
- ✅ Need: Standard API key starting with `AIza...`

**Once you create the correct API key, all AI features will work!** 🚀

