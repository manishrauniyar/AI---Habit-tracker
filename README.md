# AI Habit Tracker

An AI-powered habit tracking website that helps users create habits, track daily progress, maintain streaks, and get personalized insights using **Google Gemini AI**.

## Features

* User Login & Registration
* Create, Update & Delete Habits
* Daily & Weekly Habit Tracking
* Streak Tracking
* AI Habit Suggestions
* AI Weekly Insights
* Dark / Light Mode
* Responsive UI

## Tech Stack

**Frontend:** React.js, Vite, Tailwind CSS, Axios
**Backend:** Node.js, Express.js, MongoDB, Mongoose
**Authentication:** JWT, bcrypt.js
**AI:** Google Gemini using `@google/genai`

## Setup

```bash
git clone <repository-url>
npm install
npm run dev
```

Backend `.env`:

```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret
GEMINI_API_KEY=your_gemini_api_key
PORT=8000
```

## Author

**Manish Rauniyar**
