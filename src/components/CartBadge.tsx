import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartBadge: React.FC = () => {
  const { cart } = useCart();

  // Calculate total quantity of items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

// State to manage scale effect
const [scale, setScale] = useState(1);

// Effect to trigger scale animation on totalItems change
useEffect(() => {
  if (totalItems > 0) {
    setScale(1.5);
    const timer = setTimeout(() => {
      setScale(1);
    }, 400); // Reset scale after 0.4 second

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }
}, [totalItems]);

  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="w-8 h-8 text-white" />
      {totalItems > 0 && (
        <div className="absolute -top-2 -right-2 bg-[var(--activeColor)] text-white text-xs 
          rounded-full w-5 h-5 flex items-center justify-center transition-transform duration-300" style={{ transform: `scale(${scale})` }} // Apply scale transformation>
          > {totalItems}
        </div>
      )}
    </Link>
    
  );
};

export default CartBadge;