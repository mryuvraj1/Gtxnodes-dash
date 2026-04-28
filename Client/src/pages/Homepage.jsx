import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlanCard from '../components/PlanCard';
import { useCurrency } from '../contexts/CurrencyContext';

export default function Homepage() {
  const [featuredPlans, setFeaturedPlans] = useState([]);
  const [offers, setOffers] = useState([]);
  const [faqs, setFaqs] = useState([]);
  const { convertPrice, symbol } = useCurrency();

  useEffect(() => {
    fetch('/api/plans?limit=6').then(res=>res.json()).then(setFeaturedPlans);
    fetch('/api/offers/active').then(res=>res.json()).then(setOffers);
    fetch('/api/faqs').then(res=>res.json()).then(setFaqs);
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-darkbg via-darkbg to-primary/10 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white to-primary bg-clip-text text-transparent">GTXNodes.xyz</h1>
          <p className="text-2xl md:text-3xl mt-4">High Performance Game & Cloud Hosting</p>
          <p className="text-gray-400 mt-2">Powered by AMD EPYC / Intel Xeon CPUs • NVMe SSD • DDoS Protection</p>
          <div className="flex gap-4 justify-center mt-8">
            <Link to="/plans" className="glow-btn">View Plans</Link>
            <Link to="/checkout" className="glow-btn secondary">Order Now</Link>
          </div>
        </div>
      </section>

      {/* Featured Plans */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">🔥 Featured Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPlans.map(plan => <PlanCard key={plan._id} plan={plan} convertPrice={convertPrice} symbol={symbol} />)}
        </div>
      </section>

      {/* Offers Banner */}
      {offers.length > 0 && (
        <div className="bg-primary/10 border-y border-primary py-4 text-center">
          <p className="text-primary text-xl">{offers[0].title} – {offers[0].discountPercent}% OFF</p>
        </div>
      )}

      {/* FAQ */}
      <section className="py-16 container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        {faqs.map(faq => (
          <div key={faq._id} className="mb-4 border-b border-gray-700 pb-3">
            <h3 className="font-semibold text-primary">{faq.question}</h3>
            <p className="text-gray-300">{faq.answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
