const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');;
const authRoutes= require('./src/routes/authRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const categoryRoutes = require('./src/routes/categoryRouter');
const userRoutes = require('./src/routes/userRoutes');
const passport = require('./src/config/passport');
const locationRouter = require('./src/routes/locationRouter');
const businessRouter = require('./src/routes/businessRouter');
const ratingRouter = require('./src/routes/ratingRouter');
const {seedService} = require('./src/seeders/dataService');
const Location = require('./src/models/Location');
const dataLocation = require('./src/seeders/dataLocation');
const individualRouter = require('./src/routes/individualRouter');
const searchRoutes = require('./src/routes/searchRoutes');

dotenv.config();
connectDB();






const app = express();
//Middleware 
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());


app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString()
  });
});

const data = {
  fullName: 'Nghia Le', 
}

app.get('/', (req, res) => {
  return res.json(data)
}) 
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/location', locationRouter);
app.use('/api/business', businessRouter);
app.use('/api/ratings', ratingRouter);
app.use('/api/individuals', individualRouter);
app.use('/api/search', searchRoutes);



const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});