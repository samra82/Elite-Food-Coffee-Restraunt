// components/CartButton.tsx
'use client';

import { ShoppingCart } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import Link from 'next/link';

const CartButton = () => {
  const cart = useSelector((state: RootState) => state.carts.cart);

  return (
    <Link href="/cart" className="relative text-white hover:text-[#FF9F0D] transition-colors" aria-label="Shopping Cart">
      <ShoppingCart size={24} />
      {cart && cart.items.length > 0 && (
        <span className="absolute bottom-3 left-3 bg-[#FF9F0D] text-white text-xs rounded-full px-1.5 py-0.5">
          {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
        </span>
      )}
    </Link>
  );
};

export default CartButton;