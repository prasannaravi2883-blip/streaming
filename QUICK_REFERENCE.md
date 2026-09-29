# Clone Series - Quick Reference Card

## 🚀 Getting Started (Copy & Paste)

### Local Setup
```bash
# 1. Create project
mkdir clone-series && cd clone-series

# 2. Copy these files into the folder:
# - server.js
# - package.json
# - .env
# - index.html

# 3. Install dependencies
npm install

# 4. Start backend (Terminal 1)
npm run dev

# 5. Serve frontend (Terminal 2)
npx http-server
# Then open: http://localhost:8080/index.html
```

---

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] MongoDB URI in `.env` is correct
- [ ] JWT_SECRET in `.env` changed to random string
- [ ] `index.html` copied to `public/` folder
- [ ] Code pushed to GitHub

### Deploy on Railway (Recommended)
```
1. Go to railway.app
2. New Project → GitHub → Select repo
3. Add environment variables:
   - MONGODB_URI: (from MongoDB Atlas)
   - JWT_SECRET: (random string)
   - PORT: 3000
4. Deploy button
5. Wait 2-3 minutes for build
6. Copy live URL
7. Update frontend: const API_URL = 'https://your-domain.up.railway.app/api'
```

### Post-Deployment
- [ ] Test `/api/health` endpoint
- [ ] Test login/signup
- [ ] Test movie browsing
- [ ] Test add to watchlist
- [ ] Frontend loads from correct API URL

---

## 🔑 Environment Variables

```env
# MongoDB Connection (Required)
MONGODB_URI=mongodb+srv://clone-user:PASSWORD@cluster0.xxxxx.mongodb.net/clone-series?retryWrites=true&w=majority

# Server Config
PORT=5000
NODE_ENV=development

# JWT (Change in production!)
JWT_SECRET=my-super-secret-key-that-is-random

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

**To get MONGODB_URI:**
1. Go to MongoDB Atlas dashboard
2. Click "Deployments" → Your cluster
3. Click "Connect" → "Drivers" → "Node.js"
4. Copy connection string
5. Replace `<username>`, `<password>`, `myFirstDatabase`

---

## 📱 API Endpoints Cheat Sheet

### Auth
```
POST /api/auth/register
POST /api/auth/login
```

### Movies
```
GET /api/movies                         # All with ?language=Tamil
GET /api/movies/trending                # Top 6 trending
GET /api/movies/:id                     # Detail + reviews
GET /api/movies/:id/recommendations     # Similar movies
```

### Protected (Need JWT in Authorization header)
```
GET /api/watchlist
POST /api/watchlist/:movieId
DELETE /api/watchlist/:movieId
GET /api/user/profile
POST /api/user/watch-history/:movieId
```

### Headers for Protected Routes
```
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

---

## 🧪 Test Credentials

### Existing User
```
Email: rajesh@example.com
Password: (same as used during registration)
```

### Create New Account
Use signup form in app - any email/password works (encrypted with bcrypt)

---

## 🌍 Where to Deploy

### Easy (Recommended)
- **Railway** → `railway.app` (auto builds Node.js apps)
- **Render** → `render.com` (free tier available)

### Medium
- **Heroku** → `heroku.com` (CLI required)
- **Vercel** → `vercel.com` (better for frontend)

### Advanced
- **AWS** → EC2 for server, RDS for database
- **Google Cloud** → Cloud Run for serverless
- **DigitalOcean** → Droplet (affordable VPS)

---

## 📊 Database Stats

**Current Data:**
- 3 Movies (Shadow Protocol, Silent River, Black Horizon)
- 3 Users (rajesh_k, meera_v, david_m)
- 3 Reviews
- 5 Ratings
- 5 Watchlist items

**Collections:**
```
clone-series
├── users
├── movies
├── reviews
├── ratings
├── watchlist
└── ratingStats
```

---

## 🐛 Common Errors & Fixes

| Error | Fix |
|-------|-----|
| Cannot connect to MongoDB | Check MONGODB_URI in .env, IP whitelisted in Atlas |
| CORS error | Update FRONTEND_URL in .env to match frontend origin |
| 401 Unauthorized | Token missing/expired. Check Authorization header |
| 404 Not Found | Wrong API endpoint. Check URL spelling |
| Cannot find module 'express' | Run `npm install` |
| Port 5000 already in use | Change PORT in .env or kill existing process |

---

## 📞 Testing with Curl

```bash
# Health check
curl http://localhost:5000/api/health

# Get all movies
curl http://localhost:5000/api/movies

# Get trending
curl http://localhost:5000/api/movies/trending

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "firstName": "Test",
    "lastName": "User"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpass123"
  }'
```

---

## 🔐 JWT Token Flow

```
1. User registers/logs in
   ↓
2. Backend returns JWT token
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": { "id": "...", "username": "..." }
   }
   ↓
3. Frontend stores in localStorage
   localStorage.setItem('token', data.token)
   ↓
4. Send with every protected request
   Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ↓
5. Backend verifies token
   if valid → allow request
   if expired/invalid → return 401 Unauthorized
```

---

## 📦 Project Size

- **Backend** (~150 KB) - server.js with MongoDB
- **Frontend** (~80 KB) - index.html with all CSS/JS
- **Total** (~230 KB) - Lightweight & fast!

---

## 🎯 Feature Checklist

### ✅ Completed
- [x] Database with MongoDB
- [x] User authentication (register, login, JWT)
- [x] Movie listing & search
- [x] Movie detail page
- [x] Reviews & ratings display
- [x] Watchlist (add/remove)
- [x] Cast & crew display
- [x] Responsive design
- [x] CORS enabled
- [x] Error handling

### 🔄 Optional (Not Included)
- [ ] Video streaming (add HLS URLs)
- [ ] Advanced filtering/sorting
- [ ] Notifications
- [ ] Social features
- [ ] Admin dashboard
- [ ] Payment integration

---

## 💡 Pro Tips

1. **Use Postman** for testing API endpoints before shipping
2. **Monitor logs** - Terminal and Railway dashboard
3. **Keep secrets safe** - Never commit .env to GitHub
4. **Test locally first** - Deploy only when working perfectly
5. **Add a .gitignore** - Exclude node_modules/ and .env
6. **Backup database** - MongoDB Atlas auto-backups
7. **Monitor costs** - Railway/Render have free tiers

---

## 🚨 Important Notes

⚠️ **Before deploying:**
- Change JWT_SECRET to random string
- Test authentication flow
- Verify all API endpoints work
- Check frontend API URLs match backend domain

⚠️ **Security:**
- Never commit .env file
- Use HTTPS in production (Railway does this automatically)
- Validate all inputs
- Keep Node.js updated
- Rotate JWT_SECRET regularly

---

## 📞 Quick Support

**Problem:** Backend won't start
```bash
# Make sure MongoDB connection is correct
# Make sure port 5000 is free
# Check .env file is in project root
npm run dev  # Try again
```

**Problem:** Frontend can't find backend
```javascript
// In index.html, find this line:
const API_URL = 'http://localhost:5000/api';

// Change to your production URL:
const API_URL = 'https://your-domain.up.railway.app/api';
```

**Problem:** Movies not showing
- Check database is connected (see server console)
- Verify sample data exists in MongoDB
- Check Network tab in browser dev tools for API response

---

## 🎓 Files to Read

1. **README.md** - Project overview
2. **BACKEND_SETUP_GUIDE.md** - Detailed deployment
3. **MONGODB_SCHEMA.md** - Database structure
4. **QUICK_REFERENCE.md** - This file!

---

## 🚀 You're Ready!

Your clone-series backend is production-ready. 

**Next:** Deploy on Railway → Get live URL → Update frontend → Launch!

Good luck! 🎬
