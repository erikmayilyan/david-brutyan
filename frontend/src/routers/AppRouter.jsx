import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import ShopPage from '../pages/shop/ShopPage';
import PaymentPage from '../pages/shop/PaymentPage';

const AppRouter = () => {
  return (
    <Routes>
      {/* Home routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/ua" element={<HomePage />} />
      <Route path="/iv" element={<HomePage />} />

      {/* Shop routes */}
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/ua/shop" element={<ShopPage />} />
      <Route path="/iv/shop" element={<ShopPage />} />

      {/* Payment routes */}
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/ua/payment" element={<PaymentPage />} />
      <Route path="/iv/payment" element={<PaymentPage />} />
    </Routes>
  );
};

export default AppRouter; 