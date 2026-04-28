import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const loadRazorpay = () => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.onload = () => resolve(true);
  script.onerror = () => resolve(false);
  document.body.appendChild(script);
});

export default function Checkout() {
  const { planId } = useParams();
  const [plan, setPlan] = useState(null);
  const [order, setOrder] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/plans/${planId}`).then(res => setPlan(res.data));
  }, [planId]);

  const handlePayment = async () => {
    const res = await api.post('/orders/create', { planId: plan._id });
    const orderData = res.data;
    setOrder(orderData);
    const rzpRes = await api.post('/payment/create-order', { orderId: orderData.orderId });
    const { razorpayOrderId, amount, key } = rzpRes.data;
    const rzp = new window.Razorpay({
      key,
      amount: amount * 100,
      currency: 'INR',
      order_id: razorpayOrderId,
      handler: async (response) => {
        const verify = await api.post('/payment/verify', response);
        if (verify.data.success) {
          toast.success('Payment successful!');
          navigate('/dashboard');
        } else {
          toast.error('Payment verification failed');
        }
      }
    });
    rzp.open();
  };

  if (!plan) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <div className="bg-cardbg rounded-2xl p-6">
        <h2 className="text-2xl font-bold">Order Summary</h2>
        <p className="text-xl mt-4">{plan.name}</p>
        <p className="text-primary text-2xl">₹{plan.discountPrice || plan.price}/mo</p>
        <button onClick={handlePayment} className="glow-btn w-full mt-6">Pay with Razorpay</button>
      </div>
    </div>
  );
}
