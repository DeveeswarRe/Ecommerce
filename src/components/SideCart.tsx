import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface SideCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideCart: React.FC<SideCartProps> = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Side Cart Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <h2 className="text-lg font-semibold flex items-center">
            <ShoppingBag size={20} className="mr-2" /> 
            Your Cart
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-neutral-500 hover:text-neutral-800 transition-colors rounded-full hover:bg-neutral-100"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Cart Items */}
        <div className="flex-grow overflow-y-auto p-4 h-[calc(100vh-180px)]">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <ShoppingBag size={48} className="text-neutral-300 mb-4" />
              <h3 className="text-lg font-medium text-neutral-800 mb-2">Your cart is empty</h3>
              <p className="text-neutral-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
              <Link 
                to="/products" 
                className="btn btn-primary"
                onClick={onClose}
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-200">
              {cartItems.map(item => (
                <li key={item.product.id} className="py-4 flex">
                  {/* Product Image */}
                  <div className="h-20 w-16 flex-shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-neutral-50">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="ml-4 flex-1 flex flex-col">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium text-neutral-800">
                        <Link to={`/products/${item.product.id}`} onClick={onClose}>
                          {item.product.name}
                        </Link>
                      </h3>
                      <p className="text-sm font-medium text-neutral-800">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <p className="mt-1 text-xs text-neutral-500">{item.product.category}</p>
                    
                    {/* Quantity Controls & Remove Button */}
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-neutral-200 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1.5 text-neutral-500 hover:text-neutral-700"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 py-1 text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1.5 text-neutral-500 hover:text-neutral-700"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-neutral-400 hover:text-error-600 p-1.5 transition-colors"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Footer with Subtotal and Checkout */}
        {cartItems.length > 0 && (
          <div className="border-t border-neutral-200 p-4 bg-white">
            <div className="flex justify-between mb-4">
              <span className="text-neutral-700">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-neutral-500 mb-4">
              Shipping and taxes calculated at checkout
            </p>
            <button 
              className="w-full btn btn-primary mb-2"
            >
              Proceed to Checkout
            </button>
            <Link 
              to="/cart" 
              className="w-full btn btn-outline flex justify-center"
              onClick={onClose}
            >
              View Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default SideCart;