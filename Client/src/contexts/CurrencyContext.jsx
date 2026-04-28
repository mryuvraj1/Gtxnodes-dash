import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState('INR');
  const [rates, setRates] = useState({ INR: 1 });
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    api.get('/currency/rates').then(res => {
      setRates(res.data.rates);
      setLastUpdated(res.data.lastUpdated);
    });
  }, []);

  const convertPrice = (inrPrice) => {
    const rate = rates[currency] || 1;
    return (inrPrice * rate).toFixed(2);
  };

  const currencySymbol = {
    INR: '₹', USD: '$', PKR: '₨', JPY: '¥', BDT: '৳', EUR: '€', AED: 'د.إ', LKR: 'Rs', RUB: '₽'
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, rates, convertPrice, symbol: currencySymbol[currency], lastUpdated }}>
      {children}
    </CurrencyContext.Provider>
  );
};
