# Quiz GPT (Gemini Edition) 

A Chrome extension that automatically reads Google Form quizzes, generates answers using AI (Gemini), and fills them — with **stealth display options** so answers aren’t obvious.

---

## 🚀 Features

* 🔍 Reads questions directly from Google Forms
* 🤖 Uses **Gemini Flash Lite models** for fast answers
* ⚡ Single API call (no rate-limit spam)
* 🧠 Multi-model + multi-key fallback system
* 🎯 Auto-fills answers (MCQ, dropdown, etc.)
* 🕶️ Stealth mode:

  * Inline answers like `Question (2)`
  * Hidden / subtle display
* ⌨️ Keyboard shortcut (Alt + X) to toggle visibility

---

## 🛠️ Installation

1. Clone or download the repository:

   ```bash
   git clone "https://github.com/OnkarGaikwad-astro/QuizAssist.git"
   ```

2. Open Chrome and go to:

   ```
   chrome://extensions/
   ```

3. Enable **Developer mode**

4. Click **Load unpacked**

5. Select the project folder

---

## 🔑 Setup API Keys

Open `functions.js` and replace:

```js
API_KEY = "YOUR_API_KEY"
```

👉 Get keys from:
https://aistudio.google.com/app/apikey

⚠️ **Important:**
Do NOT expose real keys publicly. Use only for testing.

---

## 🧠 Supported Models

The extension automatically tries:

* `gemini-2.5-flash-lite` (primary)
* `gemini-flash-lite-latest`
* `gemini-2.0-flash-lite-001`

Fallback ensures reliability if one fails.

---

## 🎮 Usage

### Run AI

* Press:

  ```
  Ctrl + Shift + F
  ```

  OR use context menu → **Get Answers**

---

### Toggle Visibility

* Press:

  ```
  Alt + X
  ```

👉 Shows / hides answers

---

### Erase Answers

* Press:

  ```
  Ctrl + Shift + E
  ```

---

## 🕶️ Stealth Modes

### 1. Inline Mode

Answers appear like:

```
What is your gender (2)
```

### 2. Text Mode

```
What is your gender (Male)
```

### 3. Hidden Mode

* Only visible on hover or toggle

## 🛡️ Error Handling

* Skips invalid DOM nodes safely
* Retries across models
* Handles API failures gracefully
* Prevents crashes on malformed data

---

## 🔮 Future Improvements

* ✅ Text-based answer matching (instead of index)
* 🎨 Better UI overlay
* 🔒 Secure backend for API keys
* 🧠 Smarter parsing (JSON responses)
* 📊 Confidence scoring

---

## ⚠️ Disclaimer

This project is for **learning and experimentation purposes only**.
Do not misuse it in academic or unethical scenarios.

---

## 👨‍💻 Author

Built as a learning project exploring:

* Chrome Extensions (Manifest V3)
* DOM manipulation
* AI API integration
* Resilient system design

---

## ⭐ If you found it useful

Give it a star 🌟 or improve it further!

---
#
