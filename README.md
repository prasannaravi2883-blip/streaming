# Clone Series - Premium OTT Streaming Platform

**A complete streaming platform built with Node.js, Express, MongoDB, and modern frontend architecture.**

---

## 🎬 Project Overview

Clone Series is a full-stack streaming application featuring:
- **Dynamic movie catalog** with real database backend
- **User authentication** (registration, login, JWT tokens)
- **Watchlist management** - Save movies for later
- **Reviews & ratings** - Community engagement
- **Responsive design** that looks human-made, not AI-generated
- **Single-page app** navigation without page reloads

**Live Database:** 3 sample movies (Shadow Protocol, Silent River, Black Horizon) with cast, reviews, and ratings.

---

## 📦 What's Included

### Backend Files
```
server.js           - Express.js server with all API routes
package.json        - Node.js dependencies
.env                - Configuration (MongoDB URI, JWT secret, etc.)
```

### Frontend Files
```
index.html          - Single-page app with integrated frontend
```

### Documentation
```
BACKEND_SETUP_GUIDE.md   - Detailed deployment instructions
MONGODB_SCHEMA.md        - Database structure documentation
```

---

## 🏗️ Architecture

### Frontend (index.html)
- **Single-page application** - No page reloads, smooth navigation
- **Vanilla JavaScript** - No frameworks, lightweight
- **Dynamic data loading** - Movies, reviews, ratings from API
- **User authentication** - Login/signup modal
- **Responsive design** - Works on mobile, tablet, desktop
- **Real interactions** - Click movie → detail page with dynamic content

### Backend (server.js)
- **Express.js** framework
- **MongoDB** database (via Mongoose)
- **JWT authentication** for secure endpoints
- **CORS enabled** for frontend communication
- **13 API endpoints** for complete functionality

### Database (MongoDB)
- **6 collections**: users, movies, reviews, ratings, watchlist, ratingStats
- **Sample data** for 3 movies + 3 users
- **Relationships** between movies, users, reviews, ratings

---

## 🚀 Quick Start

### Local Development (5 min)

```bash
# 1. Install Node.js from nodejs.org

# 2. Create folder and copy files
mkdir clone-series
cd clone-series
# Copy: server.js, package.json, .env, index.html

# 3. Install dependencies
npm install

# 4. Update .env with MongoDB URI
# Get from: https://cloud.mongodb.com/v2/6ab668e0dcf36eeda943ebf8/clusters

# 5. Start backend
npm run dev

# 6. In new terminal, serve frontend
npx http-server
# Open: http://localhost:8080/index.html
```

### Production Deployment (10 min)

**Deploy on Railway:**

1. Push code to GitHub
2. Go to [railway.app](https://railway.app)
3. Connect GitHub repo
4. Add environment variables (.env values)
5. Deploy → Get live URL

**That's it!** Your backend and frontend are live.

---

## 🎯 Key Features

### 1. Movie Browsing
- Grid layout of trending/recent movies
- Filter by language (Tamil, Malayalam, English)
- Search functionality
- Click any movie → detailed view

### 2. Movie Details
- Full cast & crew information
- Description & metadata
- User reviews (real data from DB)
- Rating breakdown
- Similar movie recommendations
- Watch now / Add to watchlist buttons

### 3. Authentication
- Sign up with email/password (encrypted with bcrypt)
- Sign in to existing account
- JWT tokens valid for 7 days
- Protected endpoints (watchlist, watch history)

### 4. Watchlist
- Add/remove movies
- Persistent across sessions
- View all saved movies in "My List" section

### 5. Reviews & Ratings
- Read user reviews on movie pages
- (Backend ready for) Post your own reviews
- Rating statistics from database

---

## 🔌 API Endpoints

### Public Endpoints
```
GET /api/movies              - All movies (paginated)
GET /api/movies/trending     - Top trending movies
GET /api/movies/:id          - Movie detail with reviews
GET /api/movies/:id/recommendations - Similar movies
GET /api/health              - Server status
```

### Auth Endpoints
```
POST /api/auth/register      - Create account
POST /api/auth/login         - Sign in
```

### Protected Endpoints (require JWT token)
```
GET /api/watchlist                      - Get user's watchlist
POST /api/watchlist/:movieId            - Add to watchlist
DELETE /api/watchlist/:movieId          - Remove from watchlist
GET /api/user/profile                   - Get user info
POST /api/user/watch-history/:movieId   - Update watch progress
POST /api/movies/:id/reviews            - Post a review
```

---

## 📊 Database Schema

### Users Collection
```
{
  username, email, passwordHash,
  firstName, lastName,
  subscription, subscriptionEnd,
  watchHistory: [{ movieId, lastWatchedAt, watchDuration }],
  preferredLanguages: ["Tamil", "English"]
}
```

### Movies Collection
```
{
  title, tagline, year, duration, genres, language,
  description, rating, poster, backdrop,
  cast: [{ name, role, image, bio }],
  crew: [{ name, role, image }],
  chapters: [{ title, timestamp, image }],
  stats: { averageRating, totalViews, totalReviews, isTrending },
  features: { is4K, isHDR, hasDolbyAtmos }
}
```

### Reviews, Ratings, Watchlist Collections
See `MONGODB_SCHEMA.md` for detailed schema.

---

## 💻 How It Works

### User Flow
1. **Visit website** → Homepage loads trending movies from API
2. **Click movie** → Fetches detail page data (cast, reviews, ratings)
3. **Sign up** → Creates account, gets JWT token
4. **Add to watchlist** → POST request with token, saves to DB
5. **Visit watchlist** → Fetches user's saved movies

### Behind the Scenes
```
Frontend (index.html)
    ↓
[API Call] → http://localhost:5000/api/movies
    ↓
Backend (server.js)
    ↓
[Query] → MongoDB (clone-series database)
    ↓
[Response] → JSON data
    ↓
Frontend renders dynamically
```

---

## 🔐 Security Features

- **Password Encryption** - bcryptjs (10 salt rounds)
- **JWT Authentication** - Secure token-based auth
- **CORS Protection** - Control who accesses the API
- **Input Validation** - Mongoose schema validation
- **Unique Constraints** - No duplicate emails/usernames

---

## 🎨 Frontend Design

**Not AI-Generated** - The frontend is built to look naturally designed:
- Smooth animations & hover effects
- Proper typography hierarchy
- Thoughtful color palette (dark theme with purple accents)
- Human-like spacing & layout
- Intuitive navigation patterns
- Real data driving the UI

**Technology:**
- Vanilla JavaScript (no framework overhead)
- CSS Grid & Flexbox for responsive layouts
- Fetch API for backend communication
- LocalStorage for token persistence

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin requests

### Frontend
- **Vanilla JavaScript** - No dependencies
- **HTML5** - Semantic markup
- **CSS3** - Modern styling
- **Fetch API** - HTTP requests

### Deployment
- **Railway / Render / Heroku** - Hosting
- **MongoDB Atlas** - Cloud database
- **GitHub** - Version control

---

## 📈 Adding More Content

### Add Movies via MongoDB Atlas

1. Open MongoDB Atlas dashboard
2. Go to clone-series → collections → movies
3. Insert document with template from `MONGODB_SCHEMA.md`
4. Refresh frontend → New movie appears

### Add Users
- Via sign-up form in app
- Passwords auto-encrypted with bcrypt
- Subscription managed in database

---

## 🚨 Troubleshooting

### "Cannot reach backend"
- Is server running? `npm run dev` should show "Running on port 5000"
- Check API_URL in index.html matches backend URL
- CORS errors? Update `.env` FRONTEND_URL

### "MongoDB connection failed"
- Verify MONGODB_URI in `.env`
- Check MongoDB cluster is active (not paused)
- Ensure IP is whitelisted in Atlas → Network Access

### "Movies not loading"
- Check database connection message in terminal
- Verify sample data was inserted (see `MONGODB_SCHEMA.md`)
- Look at browser Network tab → see API response

### "Sign in not working"
- Check you registered first (or use test account)
- JWT secret in `.env` must match between auth & API calls
- Token stored in localStorage? Check browser dev tools

---

## 📚 Learning Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Atlas Docs](https://docs.mongodb.com/atlas/)
- [JWT Explained](https://jwt.io/introduction)
- [REST API Best Practices](https://restfulapi.net/)

---

## 🎓 What You Learned

✅ Full-stack development (frontend + backend)  
✅ Database design & MongoDB queries  
✅ User authentication with JWT  
✅ API design & RESTful conventions  
✅ Modern web architecture (SPA)  
✅ Cloud deployment & DevOps basics  

---

## 📝 Next Steps

1. **Deploy backend** to Railway/Render (10 min)
2. **Update frontend API_URL** to production URL
3. **Add more movies** to MongoDB
4. **Customize branding** (colors, fonts, content)
5. **Add video streaming** (optional - use HLS)
6. **Launch!**

---

## 🤝 Support

Read:
1. `BACKEND_SETUP_GUIDE.md` - Detailed setup & deployment
2. `MONGODB_SCHEMA.md` - Database structure
3. Browser console - JavaScript errors
4. Terminal - Server errors

---

## 📄 Files Summary

| File | Purpose |
|------|---------|
| `server.js` | Express backend with MongoDB & all routes |
| `package.json` | Node dependencies & scripts |
| `.env` | Configuration (keep private!) |
| `index.html` | Full-stack frontend SPA |
| `BACKEND_SETUP_GUIDE.md` | Setup & deployment guide |
| `MONGODB_SCHEMA.md` | Database structure reference |
| `README.md` | This file |

---

## 🎬 You've Built

A **professional streaming platform** with:
- ✅ Real backend server
- ✅ Cloud database
- ✅ User accounts
- ✅ Dynamic content
- ✅ Responsive design
- ✅ Production-ready code

Ready to deploy and launch! 🚀

---

**Created with Node.js, Express, MongoDB & Love** ❤️
