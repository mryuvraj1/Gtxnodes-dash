const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const planRoutes = require('./routes/planRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const pageRoutes = require('./routes/pageRoutes');
const offerRoutes = require('./routes/offerRoutes');
const currencyRoutes = require('./routes/currencyRoutes');
const { createSuperAdmin } = require('./utils/createSuperAdmin');
const { startRateUpdater } = require('./utils/fetchExchangeRates');

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// create super admin if not exists
createSuperAdmin();

// start hourly rate update
startRateUpdater();

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/currency', currencyRoutes);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));