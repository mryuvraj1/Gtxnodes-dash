const CurrencyRate = require('../models/CurrencyRate');

exports.getRates = async (req, res) => {
  let rates = await CurrencyRate.findOne({ base: 'INR' });
  if (!rates) {
    rates = { rates: { INR: 1 }, lastUpdated: new Date() };
  }
  res.json(rates);
};