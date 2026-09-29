const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// ============ SCHEMAS ============

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  firstName: String,
  lastName: String,
  profilePicture: String,
  subscription: { type: String, default: 'standard' },
  subscriptionStart: Date,
  subscriptionEnd: Date,
  watchHistory: [{
    movieId: mongoose.Schema.Types.ObjectId,
    lastWatchedAt: Date,
    watchDuration: Number,
    totalDuration: Number
  }],
  preferredLanguages: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tagline: String,
  year: Number,
  duration: Number,
  genres: [String],
  language: String,
  alternateLanguages: [String],
  rating: String,
  description: String,
  cast: [{
    name: String,
    role: String,
    image: String,
    bio: String
  }],
  crew: [{
    name: String,
    role: String,
    image: String
  }],
  poster: String,
  backdrop: String,
  thumbnail: String,
  chapters: [{
    chapterId: Number,
    title: String,
    timestamp: Number,
    duration: Number,
    image: String
  }],
  features: {
    is4K: Boolean,
    isHDR: Boolean,
    hasDolbyAtmos: Boolean,
    hasSubtitles: Boolean,
    subtitleLanguages: [String]
  },
  stats: {
    totalViews: Number,
    totalReviews: Number,
    averageRating: Number,
    isTrending: Boolean,
    trendingPosition: Number
  },
  videoUrl: String,
  trailerUrl: String,
  releaseDate: Date,
  isAvailable: Boolean,
  isFeatured: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const reviewSchema = new mongoose.Schema({
  movieId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  reviewText: String,
  author: {
    username: String,
    displayName: String,
    avatar: String,
    location: String,
    verifiedPurchase: Boolean
  },
  helpful: { type: Number, default: 0 },
  notHelpful: { type: Number, default: 0 },
  isSpoilerFree: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const ratingSchema = new mongoose.Schema({
  movieId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  ratedAt: { type: Date, default: Date.now }
});

const watchlistSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  movieId: mongoose.Schema.Types.ObjectId,
  addedAt: { type: Date, default: Date.now },
  position: Number
});

// Models
const User = mongoose.model('users', userSchema);
const Movie = mongoose.model('movies', movieSchema);
const Review = mongoose.model('reviews', reviewSchema);
const Rating = mongoose.model('ratings', ratingSchema);
const Watchlist = mongoose.model('watchlist', watchlistSchema);

// ============ MIDDLEWARE ============

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// ============ AUTH ROUTES ============

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });
    
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      username,
      email,
      passwordHash,
      firstName,
      lastName,
      subscription: 'standard',
      preferredLanguages: ['English']
    });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({ 
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) return res.status(401).json({ error: 'Invalid email or password' });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.json({ 
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        subscription: user.subscription
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ MOVIE ROUTES ============

// Get all movies
app.get('/api/movies', async (req, res) => {
  try {
    const { page = 1, limit = 10, genre, language, search } = req.query;
    const query = {};
    
    if (genre) query.genres = genre;
    if (language) query.language = language;
    if (search) query.title = { $regex: search, $options: 'i' };
    
    const movies = await Movie.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });
    
    const total = await Movie.countDocuments(query);
    
    res.json({
      movies,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get trending movies
app.get('/api/movies/trending', async (req, res) => {
  try {
    const movies = await Movie.find({ 'stats.isTrending': true })
      .sort({ 'stats.trendingPosition': 1 })
      .limit(6);
    
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single movie detail
app.get('/api/movies/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    
    const reviews = await Review.find({ movieId: req.params.id })
      .sort({ createdAt: -1 })
      .limit(3);
    
    res.json({
      ...movie.toObject(),
      reviews
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get recommendations
app.get('/api/movies/:id/recommendations', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    
    const recommendations = await Movie.find({
      _id: { $ne: req.params.id },
      $or: [
        { genres: { $in: movie.genres } },
        { language: movie.language }
      ]
    }).limit(6);
    
    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ REVIEWS ROUTES ============

// Get reviews for a movie
app.get('/api/movies/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ movieId: req.params.id })
      .sort({ createdAt: -1 });
    
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Post a review
app.post('/api/movies/:id/reviews', auth, async (req, res) => {
  try {
    const { rating, reviewText, isSpoilerFree } = req.body;
    
    const user = await User.findById(req.userId);
    
    const review = await Review.create({
      movieId: req.params.id,
      userId: req.userId,
      rating,
      reviewText,
      isSpoilerFree,
      author: {
        username: user.username,
        displayName: user.firstName + ' ' + user.lastName,
        location: 'Unknown',
        verifiedPurchase: true
      }
    });
    
    await Rating.create({
      movieId: req.params.id,
      userId: req.userId,
      rating
    });
    
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark review helpful
app.post('/api/reviews/:id/helpful', async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { helpful: 1 } },
      { new: true }
    );
    
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ WATCHLIST ROUTES ============

// Get watchlist
app.get('/api/watchlist', auth, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ userId: req.userId })
      .sort({ position: 1 });
    
    const movieIds = watchlist.map(w => w.movieId);
    const movies = await Movie.find({ _id: { $in: movieIds } });
    
    res.json({
      watchlist: watchlist.map(w => ({
        ...w.toObject(),
        movie: movies.find(m => m._id.toString() === w.movieId.toString())
      }))
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add to watchlist
app.post('/api/watchlist/:movieId', auth, async (req, res) => {
  try {
    const existing = await Watchlist.findOne({
      userId: req.userId,
      movieId: req.params.movieId
    });
    
    if (existing) {
      return res.status(400).json({ error: 'Already in watchlist' });
    }
    
    const maxPosition = await Watchlist.findOne({ userId: req.userId })
      .sort({ position: -1 });
    
    const watchlistItem = await Watchlist.create({
      userId: req.userId,
      movieId: req.params.movieId,
      position: (maxPosition?.position || 0) + 1
    });
    
    res.status(201).json(watchlistItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove from watchlist
app.delete('/api/watchlist/:movieId', auth, async (req, res) => {
  try {
    await Watchlist.deleteOne({
      userId: req.userId,
      movieId: req.params.movieId
    });
    
    res.json({ message: 'Removed from watchlist' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ USER ROUTES ============

// Get profile
app.get('/api/user/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      subscription: user.subscription,
      subscriptionEnd: user.subscriptionEnd,
      createdAt: user.createdAt
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update watch history
app.post('/api/user/watch-history/:movieId', auth, async (req, res) => {
  try {
    const { watchDuration, totalDuration } = req.body;
    
    const user = await User.findById(req.userId);
    
    user.watchHistory = user.watchHistory.filter(w => w.movieId.toString() !== req.params.movieId);
    user.watchHistory.push({
      movieId: req.params.movieId,
      lastWatchedAt: new Date(),
      watchDuration,
      totalDuration
    });
    
    user.updatedAt = new Date();
    await user.save();
    
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============ HEALTH CHECK ============

app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// ============ START SERVER ============

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════╗
║  Clone Series Backend Server       ║
║  Running on port ${PORT}              ║
║  API: http://localhost:${PORT}/api    ║
╚════════════════════════════════════╝
  `);
});

module.exports = app;
