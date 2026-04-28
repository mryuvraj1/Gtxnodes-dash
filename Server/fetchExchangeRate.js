const axios = require('axios');
const CurrencyRate = require('../models/CurrencyRate');

const fetchRates = async () => {
  try {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;
    const url = `https://open.er-api.com/v6/latest/INR?apikey=${apiKey}`;
    const res = await axios.get(url);
    const rates = res.data.rates;
    await CurrencyRate.findOneAndUpdate(
      { base: 'INR' },
      { rates, lastUpdated: new Date() },
      { upsert: true }
    );
    console.log('Exchange rates updated');
  } catch (err) {
    console.error('Failed to fetch rates:', err.message);
  }
};

const startRateUpdater = () => {
  fetchRates(); // initial
  setInterval(fetchRates, 60 * 60 * 1000); // every hour
};

module.exports = { fetchRates, startRateUpdater };