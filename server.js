const express = require('express');
const cors = require('cors'); 
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./src/config/database');;
const authRoutes= require('./src/routes/authRoutes');
const bookingRoutes = require('./src/routes/bookingRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');
const categoryRoutes = require('./src/routes/categoryRouter');
const testEmailRouter = require('./src/routes/testEmailRouter');
const userRoutes = require('./src/routes/userRoutes');
const passport = require('./src/config/passport');
const {seedCategories} = require('./src/seeders/dataCategory');
const locationRouter = require('./src/routes/locationRouter');
dotenv.config();
connectDB();







const app = express();
//Middleware 
app.use(cors()); 


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
  role: 'NodeJS Backend Developer',
  email: 'lehieunghia2402@gmail.com', 
  accessed: 'https://www.accessed.co/user/le_hieu_nghia',
}

app.get('/', (req, res) => {
  return res.json(data)
}) 
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/test-email', testEmailRouter);
app.use('/api/users', userRoutes);
app.use('/api/location', locationRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});