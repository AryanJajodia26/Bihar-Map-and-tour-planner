require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const winston = require('winston');
const { auth, adminAuth } = require('./middleware/auth');
const User = require('./models/User');
const City = require('./models/City');
const jwt = require('jsonwebtoken');

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bihar-tour-planner', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  logger.info('Connected to MongoDB');
}).catch((error) => {
  logger.error('MongoDB connection error:', error);
});

// Auth routes
app.post('/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ user, token });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid login credentials');
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(401).json({ error: error.message });
  }
});

// City routes
app.get('/cities', async (req, res) => {
  try {
    const cities = await City.find().populate('connections.city');
    res.json(cities);
  } catch (error) {
    logger.error('Get cities error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/cities', auth, async (req, res) => {
  try {
    const city = new City({
      ...req.body,
      createdBy: req.user._id
    });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    logger.error('Add city error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/route', async (req, res) => {
  try {
    const { from, to, time } = req.query;
    if (!from || !to || !time) {
      return res.status(400).json({ error: 'From, to, and time are required' });
    }

    const startCity = await City.findOne({ name: from });
    const endCity = await City.findOne({ name: to });

    if (!startCity || !endCity) {
      return res.status(404).json({ error: 'City not found' });
    }

    // Implement Dijkstra's algorithm here using the City model
    // This is a simplified version - you'll need to implement the full algorithm
    const result = await findShortestPath(startCity, endCity);
    
    if (!result) {
      return res.status(404).json({ error: 'No route found' });
    }

    const speed = time === 'day' ? 40 : 60;
    const timeInHours = result.distance / speed;
    const hours = Math.floor(timeInHours);
    const minutes = Math.round(((timeInHours - hours) * 60) + 10);

    res.json({
      path: result.path,
      distance: result.distance,
      estimatedTime: {
        hours,
        minutes
      }
    });
  } catch (error) {
    logger.error('Route finding error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
}); 