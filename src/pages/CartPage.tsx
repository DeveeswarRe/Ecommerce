import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const shippingCost = subtotal > 100 ? 0 : 12.99;
  const estimatedTax = subtotal * 0.08; // 8% tax rate
  const orderTotal = subtotal + shippingCost + estimatedTax;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (couponCode.toLowerCase() === 'welcome10') {
      setCouponMessage({ type: 'success', message: 'Coupon applied successfully!' });
    } else {
      setCouponMessage({ type: 'error', message: 'Invalid coupon code' });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-white py-16">
        <div className="container-custom">
          <div className="max-w-lg mx-auto text-center">
            <ShoppingCart size={64} className="mx-auto text-neutral-300 mb-6" />
            <h1 className="text-2xl font-semibold mb-4">Your Cart is Empty</h1>
            <p className="text-neutral-600 mb-8">
              Looks like you haven't added anything to your cart yet.
              Browse our collection to find the perfect dress for you.
            </p>
            <Link to="/products" className="btn btn-primary py-3 px-8">
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-12">
      <div className="container-custom">
        <h1 className="text-2xl font-semibold mb-8 flex items-center">
          <ShoppingBag size={24} className="mr-2" />
          Your Shopping Cart
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-lg overflow-hidden border border-neutral-200">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-neutral-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider w-full">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider whitespace-nowrap">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider whitespace-nowrap">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {cartItems.map(item => (
                    <tr key={item.product.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded bg-neutral-100">
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4">
                            <Link to={`/products/${item.product.id}`} className="text-sm font-medium text-neutral-900 hover:text-primary-600">
                              {item.product.name}
                            </Link>
                            <p className="text-xs text-neutral-500">{item.product.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center border border-neutral-200 rounded-md w-28">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1.5 text-neutral-500 hover:text-neutral-700"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value) || 1)}
                            className="w-10 h-8 text-center border-none focus:ring-0"
                          />
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1.5 text-neutral-500 hover:text-neutral-700"
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                        <div className="text-xs text-neutral-500">
                          ${item.product.price.toFixed(2)} each
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-neutral-400 hover:text-error-600 p-1.5 transition-colors"
                          aria-label={`Remove ${item.product.name} from cart`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
              <Link to="/products" className="flex items-center text-primary-600 hover:text-primary-700 mb-4 sm:mb-0">
                <ArrowLeft size={16} className="mr-1" />
                Continue Shopping
              </Link>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => clearCart()}
                  className="btn btn-outline"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-50 rounded-lg border border-neutral-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 
                      ? 'Free' 
                      : `$${shippingCost.toFixed(2)}`
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Estimated Tax</span>
                  <span className="font-medium">${estimatedTax.toFixed(2)}</span>
                </div>
                
                {subtotal < 100 && (
                  <div className="py-2 px-3 bg-primary-50 text-primary-700 text-sm rounded">
                    Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
                  </div>
                )}
              </div>
              
              <div className="border-t border-neutral-200 pt-4 mb-6">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Coupon Code */}
              <form onSubmit={handleApplyCoupon} className="mb-6">
                <label htmlFor="coupon" className="block text-sm font-medium text-neutral-700 mb-2">
                  Apply Coupon Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow px-3 py-2 border border-neutral-300 rounded-l-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter code"
                  />
                  <button
                    type="submit"
                    className="btn btn-primary rounded-l-none px-4"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className={`mt-2 text-sm ${
                    couponMessage.type === 'success' ? 'text-success-600' : 'text-error-600'
                  }`}>
                    {couponMessage.message}
                  </p>
                )}
              </form>
              
              <button className="w-full btn btn-primary py-3 mb-4">
                Proceed to Checkout
              </button>
              
              <div className="text-xs text-neutral-500 text-center">
                <p>Secure checkout powered by Stripe</p>
                <p className="mt-2">We accept Visa, Mastercard, American Express, and PayPal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;