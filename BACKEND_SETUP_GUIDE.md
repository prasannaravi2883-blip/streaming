# Clone Series Backend - Complete Setup Guide

## 📋 What You Have

- ✅ **server.js** - Express.js backend with MongoDB
- ✅ **package.json** - Node.js dependencies
- ✅ **.env** - Configuration file
- ✅ **index.html** - Rewritten frontend SPA
- ✅ **MongoDB** - Database with sample data (users, movies, reviews, ratings, watchlist)

---

## 🚀 Local Development Setup (5 minutes)

### Step 1: Install Node.js
If you don't have Node.js installed:
- Download from [nodejs.org](https://nodejs.org/)
- Choose LTS version (v18+)
- Verify: `node --version` and `npm --version`

### Step 2: Create Project Folder

```bash
mkdir clone-series-backend
cd clone-series-backend
```

### Step 3: Copy Files
Copy these files into your folder:
- `server.js`
- `package.json`
- `.env`
- `index.html`

### Step 4: Install Dependencies

```bash
npm install
```

This installs:
- express
- mongoose
- cors
- dotenv
- bcryptjs
- jsonwebtoken
- nodemon (for development)

### Step 5: Configure `.env`

Open `.env` and update:

```env
# Your MongoDB connection string from Atlas
MONGODB_URI=mongodb+srv://clone-user:YOUR_PASSWORD@cluster0.abc123.mongodb.net/clone-series?retryWrites=true&w=majority

PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key-here-change-in-production
FRONTEND_URL=http://localhost:3000
```

**Get your MongoDB URI:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click **Deployments** → Your cluster
3. Click **Connect** → Choose **Drivers** → Node.js
4. Copy the connection string
5. Replace `<username>`, `<password>`, `myFirstDatabase`

### Step 6: Start Backend Server

```bash
npm run dev
```

You should see:
```
╔════════════════════════════════════╗
║  Clone Series Backend Server       ║
║  Running on port 5000              ║
║  API: http://localhost:5000/api    ║
╚════════════════════════════════════╝

✅ MongoDB connected
```

### Step 7: Serve Frontend Locally

**Option A: Simple HTTP Server** (easiest)

```bash
# In a new terminal, from your project folder
npx http-server
```

Then open: `http://localhost:8080/index.html`

**Option B: Python HTTP Server**

```bash
python -m http.server 8000
```

Open: `http://localhost:8000/index.html`

### Step 8: Test It!

1. Go to `http://localhost:8080/index.html` (or :8000)
2. Click **Sign In** → Create account
3. Browse movies (from database)
4. Click a movie → See detail page
5. Add to watchlist

---

## 🌐 Deploy to Production

### Option A: Railway (Recommended - 10 minutes)

Railway is the easiest deployment platform for Node.js + MongoDB.

**Step 1: Prepare for Deployment**

```bash
# Create public folder for frontend
mkdir public
# Copy index.html to public folder
cp index.html public/
```

Update `server.js` line 11:
```javascript
app.use(express.static('public'));  // Frontend is served from here
```

**Step 2: Push to GitHub**

```bash
git init
git add .
git commit -m "Clone Series Backend"
git remote add origin https://github.com/YOUR_USERNAME/clone-series-backend.git
git push -u origin main
```

**Step 3: Deploy on Railway**

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **New Project** → **Deploy from GitHub**
4. Select your `clone-series-backend` repo
5. Railway auto-detects Node.js
6. Add environment variables:
   - `MONGODB_URI` (from MongoDB Atlas)
   - `PORT` → `3000` (Railway default)
   - `JWT_SECRET` → Generate random string
   - `FRONTEND_URL` → Your Railway domain

7. Deploy! Railway will automatically run `npm start`

**Your live URLs:**
- Backend API: `https://yourproject.up.railway.app/api`
- Frontend: `https://yourproject.up.railway.app/`

---

### Option B: Render (Alternative)

1. Go to [render.com](https://render.com)
2. Create account → New **Web Service**
3. Connect GitHub repo
4. Runtime: Node
5. Build: `npm install`
6. Start: `npm start`
7. Add environment variables (same as Railway)
8. Deploy

**Live URL:** `https://yourproject.onrender.com`

---

### Option C: Heroku (Legacy but works)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create clone-series-backend

# Set env vars
heroku config:set MONGODB_URI="your-connection-string"
heroku config:set JWT_SECRET="random-secret"

# Deploy
git push heroku main

# Open
heroku open
```

---

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Movies
- `GET /api/movies` - All movies (with pagination)
- `GET /api/movies/trending` - Trending movies
- `GET /api/movies/:id` - Movie detail
- `GET /api/movies/:id/recommendations` - Similar movies

### Reviews
- `GET /api/movies/:id/reviews` - Get all reviews
- `POST /api/movies/:id/reviews` - Post review (requires auth)
- `POST /api/reviews/:id/helpful` - Mark helpful

### Watchlist
- `GET /api/watchlist` - Get user's watchlist (requires auth)
- `POST /api/watchlist/:movieId` - Add to watchlist (requires auth)
- `DELETE /api/watchlist/:movieId` - Remove from watchlist (requires auth)

### User
- `GET /api/user/profile` - Get profile (requires auth)
- `POST /api/user/watch-history/:movieId` - Update watch progress (requires auth)

### Health
- `GET /api/health` - Server status

---

## 🔐 Authentication

**How JWT Works:**

1. **Register/Login** → Get JWT token
2. **Store token** → `localStorage.setItem('token', data.token)`
3. **Send with requests** → `Authorization: Bearer <token>`

**Example:**
```javascript
const token = localStorage.getItem('token');
fetch('/api/watchlist', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Check your `MONGODB_URI` in `.env`
- Make sure your MongoDB cluster is active
- Check username/password are correct
- Ensure your IP is whitelisted in MongoDB Atlas Network Access

### Error: "CORS error"
- Frontend and backend are on different origins
- Update `CORS_ORIGIN` in `.env` to match frontend URL
- In `server.js`, update: `app.use(cors({ origin: process.env.FRONTEND_URL }))`

### Error: "JWT authentication failed"
- Check token is being sent: `Authorization: Bearer <token>`
- Token might be expired (valid for 7 days)
- Make sure `JWT_SECRET` matches

### Movies not loading
- Check MongoDB is connected (see console message)
- Verify database and collections were created
- Run `npm run dev` again

### Frontend can't reach API
- Is backend running on port 5000?
- Update `API_URL` in index.html to match your backend URL
- Check CORS headers

---

## 📈 Add More Movies

Add movies via MongoDB directly or create an admin endpoint.

**Via MongoDB Atlas:**

1. Go to **Collections** → **clone-series.movies**
2. Click **Insert Document**
3. Paste this template:

```json
{
  "title": "Your Movie Title",
  "tagline": "Tagline here",
  "year": 2026,
  "duration": 7200,
  "genres": ["Action", "Thriller"],
  "language": "Tamil",
  "alternateLanguages": ["English"],
  "rating": "U/A 16+",
  "description": "Movie description...",
  "poster": "https://image-url.jpg",
  "backdrop": "https://backdrop-url.jpg",
  "thumbnail": "https://thumbnail-url.jpg",
  "cast": [
    {
      "name": "Actor Name",
      "role": "Character",
      "image": "https://actor-image.jpg",
      "bio": "Bio"
    }
  ],
  "stats": {
    "totalViews": 100000,
    "totalReviews": 5000,
    "averageRating": 8.5,
    "isTrending": true,
    "trendingPosition": 1
  },
  "isAvailable": true,
  "features": {
    "is4K": true,
    "isHDR": true,
    "hasDolbyAtmos": true,
    "hasSubtitles": true
  }
}
```

---

## 🚀 Next Steps

1. ✅ Local development works
2. ✅ Deploy backend (Railway/Render)
3. ✅ Deploy frontend (GitHub Pages or same as backend)
4. ✅ Update API URLs to production
5. ✅ Customize with your movies/users
6. ✅ Launch!

---

## 📚 File Structure

```
clone-series-backend/
├── server.js           # Main Express server
├── package.json        # Dependencies
├── .env                # Configuration
├── public/
│   └── index.html      # Frontend
└── node_modules/       # Dependencies (created by npm install)
```

---

## 💡 Tips

- Use `npm run dev` for development (auto-restart on changes)
- Use `npm start` for production
- Keep `.env` private (add to `.gitignore`)
- Test API endpoints with Postman before deploying
- Monitor logs in Railway/Render dashboard
- Update JWT_SECRET in production to a random string

---

## Support

If you get stuck:
1. Check console errors (browser & terminal)
2. Verify `.env` configuration
3. Check MongoDB Atlas connection
4. Look at API response in Network tab
5. Restart backend server

Good luck! 🚀
