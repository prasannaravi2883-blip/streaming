# Clone Series - MongoDB Database Schema

## Database Name
`clone-series`

---

## Collections Overview

### 1. **users** - User accounts & authentication
### 2. **movies** - All movies/content
### 3. **reviews** - User reviews for movies
### 4. **ratings** - User ratings for movies
### 5. **watchlist** - User's saved movies

---

## 1. USERS Collection

**Purpose:** Store user accounts with authentication

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "username": "rajesh_k",
  "email": "rajesh@example.com",
  "passwordHash": "$2b$10$...", // bcrypt hashed password
  "firstName": "Rajesh",
  "lastName": "Kumar",
  "profilePicture": "https://...",
  "subscription": "premium",
  "subscriptionStart": "2026-01-15",
  "subscriptionEnd": "2027-01-15",
  "watchHistory": [
    {
      "movieId": ObjectId("507f1f77bcf86cd799439012"),
      "lastWatchedAt": "2026-09-25T14:30:00Z",
      "watchDuration": 7200, // seconds watched
      "totalDuration": 8280 // total movie duration
    }
  ],
  "preferredLanguages": ["Tamil", "Malayalam", "English"],
  "createdAt": "2026-01-10T10:00:00Z",
  "updatedAt": "2026-09-25T14:30:00Z"
}
```

**Indexes:**
- email (unique)
- username (unique)

---

## 2. MOVIES Collection

**Purpose:** Store all movie/content information

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "title": "Shadow Protocol",
  "tagline": "Trust is a target. Survival is the mission.",
  "year": 2026,
  "duration": 8280, // in seconds (2h 18m)
  "genres": ["Action", "Thriller", "Mystery"],
  "language": "Tamil",
  "alternateLanguages": ["Malayalam", "English", "Hindi"],
  "rating": "U/A 16+",
  "description": "When a critical encrypted drive goes missing from international security archives...",
  
  "cast": [
    {
      "_id": ObjectId("507f1f77bcf86cd799439020"),
      "name": "Vikramaditya",
      "role": "Captain Arjun Veer",
      "image": "https://www.figma.com/api/mcp/asset/8a0e2192-1862-417a-8117-804bf96919ce.png",
      "bio": "Elite operative caught in a deadly game"
    },
    {
      "_id": ObjectId("507f1f77bcf86cd799439021"),
      "name": "Priya Nair",
      "role": "Dr. Maya Sen",
      "image": "https://www.figma.com/api/mcp/asset/57f7e827-a32a-4b83-a3d9-ba7f4ad50950.png",
      "bio": "Scientist with dangerous secrets"
    }
  ],
  
  "crew": [
    {
      "name": "Karthik Rajan",
      "role": "Director",
      "image": "https://www.figma.com/api/mcp/asset/d00f7ff0-1120-46f5-a58a-453e2f6666d2.png"
    },
    {
      "name": "Arvind Menon",
      "role": "Screenplay",
      "image": "https://www.figma.com/api/mcp/asset/a45ad4b9-121c-4381-8f29-499c70ad7211.png"
    }
  ],
  
  "poster": "https://www.figma.com/api/mcp/asset/78e82ef5-a654-4725-a461-6742dd942c23.png",
  "backdrop": "https://www.figma.com/api/mcp/asset/60cd254f-ffab-438e-82de-e6a8ace01357.png",
  "thumbnail": "https://www.figma.com/api/mcp/asset/9b4ab138-0c42-4eb9-8d83-a99dc7b7834e.png",
  
  "chapters": [
    {
      "chapterId": 1,
      "title": "The Istanbul Breach",
      "timestamp": 0,
      "duration": 1080,
      "image": "https://www.figma.com/api/mcp/asset/5045b723-365a-4004-b923-8cd10b8ca7df.png"
    },
    {
      "chapterId": 2,
      "title": "Mission Assignment",
      "timestamp": 1080,
      "duration": 1260,
      "image": "https://www.figma.com/api/mcp/asset/8130724d-faa7-4a21-a36e-fc9991b07cce.png"
    }
  ],
  
  "features": {
    "is4K": true,
    "isHDR": true,
    "hasDolbyAtmos": true,
    "hasSubtitles": true,
    "subtitleLanguages": ["Tamil", "English", "Hindi"]
  },
  
  "stats": {
    "totalViews": 245000,
    "totalReviews": 34280,
    "averageRating": 8.8,
    "isTrending": true,
    "trendingPosition": 1
  },
  
  "videoUrl": "https://cdn.clone-series.com/shadow-protocol/main.m3u8", // HLS streaming
  "trailerUrl": "https://cdn.clone-series.com/shadow-protocol/trailer.mp4",
  
  "releaseDate": "2026-08-15",
  "isAvailable": true,
  "isFeatured": true,
  
  "createdAt": "2026-08-10T00:00:00Z",
  "updatedAt": "2026-09-25T10:00:00Z"
}
```

**Indexes:**
- title (text search)
- genres (array)
- language
- year
- isTrending
- isAvailable

---

## 3. REVIEWS Collection

**Purpose:** Store user reviews for movies

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439030"),
  "movieId": ObjectId("507f1f77bcf86cd799439012"),
  "userId": ObjectId("507f1f77bcf86cd799439011"),
  "rating": 5, // 1-5 stars
  "reviewText": "An absolute masterpiece of Tamil cinema. The action sequences are breathtaking, and the emotional depth rivals international thrillers.",
  "author": {
    "username": "rajesh_k",
    "displayName": "Rajesh K.",
    "avatar": "RK",
    "location": "Chennai",
    "verifiedPurchase": true
  },
  "helpful": 245, // users found it helpful
  "notHelpful": 12,
  "isSpoilerFree": true,
  "createdAt": "2026-09-23T10:30:00Z",
  "updatedAt": "2026-09-23T10:30:00Z"
}
```

**Indexes:**
- movieId
- userId
- createdAt (descending)
- helpful (descending)

---

## 4. RATINGS Collection

**Purpose:** Store user ratings (aggregated for quick access)

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439040"),
  "movieId": ObjectId("507f1f77bcf86cd799439012"),
  "userId": ObjectId("507f1f77bcf86cd799439011"),
  "rating": 5, // 1-5 stars
  "ratedAt": "2026-09-23T10:30:00Z"
}
```

**Also store movie rating stats:**

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439012"),
  "movieId": ObjectId("507f1f77bcf86cd799439012"),
  "averageRating": 8.8,
  "totalRatings": 34280,
  "ratingDistribution": {
    "5": 28000, // 5-star ratings
    "4": 4200,
    "3": 1200,
    "2": 600,
    "1": 280
  },
  "categoryRatings": {
    "performances": 96,
    "pacing": 92,
    "direction": 90,
    "visualEffects": 88
  },
  "lastUpdated": "2026-09-25T10:00:00Z"
}
```

**Indexes:**
- movieId
- userId (compound unique index: movieId + userId)

---

## 5. WATCHLIST Collection

**Purpose:** Store user's saved movies

```json
{
  "_id": ObjectId("507f1f77bcf86cd799439050"),
  "userId": ObjectId("507f1f77bcf86cd799439011"),
  "movieId": ObjectId("507f1f77bcf86cd799439012"),
  "addedAt": "2026-09-20T14:00:00Z",
  "position": 1 // for sorting within watchlist
}
```

**Indexes:**
- userId
- userId + movieId (unique compound index)
- addedAt (descending)

---

## Sample Data Script

Here's how to populate your database:

```javascript
// Run this in MongoDB Compass or Atlas GUI

// 1. Insert Users
db.users.insertMany([
  {
    username: "rajesh_k",
    email: "rajesh@example.com",
    passwordHash: "$2b$10$...", // bcrypt hash of "password123"
    firstName: "Rajesh",
    lastName: "Kumar",
    profilePicture: null,
    subscription: "premium",
    subscriptionStart: new Date("2026-01-15"),
    subscriptionEnd: new Date("2027-01-15"),
    watchHistory: [],
    preferredLanguages: ["Tamil", "Malayalam", "English"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: "meera_v",
    email: "meera@example.com",
    passwordHash: "$2b$10$...",
    firstName: "Meera",
    lastName: "Vignesh",
    profilePicture: null,
    subscription: "plus",
    subscriptionStart: new Date("2026-03-10"),
    subscriptionEnd: new Date("2026-12-10"),
    watchHistory: [],
    preferredLanguages: ["Malayalam", "English"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// 2. Insert Movies
db.movies.insertMany([
  {
    title: "Shadow Protocol",
    tagline: "Trust is a target. Survival is the mission.",
    year: 2026,
    duration: 8280,
    genres: ["Action", "Thriller", "Mystery"],
    language: "Tamil",
    alternateLanguages: ["Malayalam", "English", "Hindi"],
    rating: "U/A 16+",
    description: "When a critical encrypted drive goes missing...",
    cast: [
      {
        name: "Vikramaditya",
        role: "Captain Arjun Veer",
        image: "https://www.figma.com/api/mcp/asset/8a0e2192-1862-417a-8117-804bf96919ce.png",
        bio: "Elite operative caught in a deadly game"
      }
    ],
    crew: [
      {
        name: "Karthik Rajan",
        role: "Director",
        image: "https://www.figma.com/api/mcp/asset/d00f7ff0-1120-46f5-a58a-453e2f6666d2.png"
      }
    ],
    poster: "https://www.figma.com/api/mcp/asset/78e82ef5-a654-4725-a461-6742dd942c23.png",
    backdrop: "https://www.figma.com/api/mcp/asset/60cd254f-ffab-438e-82de-e6a8ace01357.png",
    thumbnail: "https://www.figma.com/api/mcp/asset/9b4ab138-0c42-4eb9-8d83-a99dc7b7834e.png",
    chapters: [
      {
        chapterId: 1,
        title: "The Istanbul Breach",
        timestamp: 0,
        duration: 1080,
        image: "https://www.figma.com/api/mcp/asset/5045b723-365a-4004-b923-8cd10b8ca7df.png"
      }
    ],
    features: {
      is4K: true,
      isHDR: true,
      hasDolbyAtmos: true,
      hasSubtitles: true,
      subtitleLanguages: ["Tamil", "English", "Hindi"]
    },
    stats: {
      totalViews: 245000,
      totalReviews: 34280,
      averageRating: 8.8,
      isTrending: true,
      trendingPosition: 1
    },
    videoUrl: "https://cdn.clone-series.com/shadow-protocol/main.m3u8",
    trailerUrl: "https://cdn.clone-series.com/shadow-protocol/trailer.mp4",
    releaseDate: new Date("2026-08-15"),
    isAvailable: true,
    isFeatured: true,
    createdAt: new Date("2026-08-10"),
    updatedAt: new Date()
  }
]);

// 3. Insert Reviews
db.reviews.insertMany([
  {
    movieId: ObjectId("..."), // Use actual ID from movies collection
    userId: ObjectId("..."),
    rating: 5,
    reviewText: "An absolute masterpiece of Tamil cinema...",
    author: {
      username: "rajesh_k",
      displayName: "Rajesh K.",
      avatar: "RK",
      location: "Chennai",
      verifiedPurchase: true
    },
    helpful: 245,
    notHelpful: 12,
    isSpoilerFree: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// 4. Insert Rating Stats
db.ratingStats.insertOne({
  movieId: ObjectId("..."),
  averageRating: 8.8,
  totalRatings: 34280,
  ratingDistribution: {
    "5": 28000,
    "4": 4200,
    "3": 1200,
    "2": 600,
    "1": 280
  },
  categoryRatings: {
    performances: 96,
    pacing: 92,
    direction: 90,
    visualEffects: 88
  },
  lastUpdated: new Date()
});
```

---

## Database Relationships

```
users (1) ──────> (many) reviews
  ↓
  ├──> watchlist ──────> movies
  ├──> watch_history ──> movies
  └──> ratings ────────> movies

movies (1) ──────> (many) reviews
  ↓
  ├──> ratings
  └──> ratingStats
```

---

## Next Steps

Once you have this structure:
1. Create MongoDB Atlas account → Copy connection string
2. I'll build the Express.js backend API
3. Connect frontend to API endpoints
4. Deploy to Railway/Render

Ready? 🚀
