import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Menu, X, User, LogOut } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  toggleSideCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSideCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, isAdmin, signOut } = useAuth();

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-700 flex items-center">
            DevMart
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-neutral-800 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link to="/products" className="text-neutral-800 hover:text-primary-600 font-medium">
              Shop
            </Link>
            {isAdmin && (
              <Link to="/admin/dashboard" className="text-neutral-800 hover:text-primary-600 font-medium">
                Admin
              </Link>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-neutral-800 hover:text-primary-600">
              <Search size={20} />
            </button>
            
            <Link to="/wishlist" className="p-2 text-neutral-800 hover:text-primary-600 relative">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            
            <button 
              onClick={toggleSideCart} 
              className="p-2 text-neutral-800 hover:text-primary-600 relative"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="p-2 text-neutral-800 hover:text-primary-600"
                >
                  <User size={20} />
                </button>
                
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    {isAdmin && (
                      <>
                        <Link
                          to="/admin/dashboard"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/admin/products"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Manage Products
                        </Link>
                        <Link
                          to="/admin/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Manage Orders
                        </Link>
                        <hr className="my-1" />
                      </>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut size={16} className="inline mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-neutral-800 hover:text-primary-600 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary"
                >
                  Register
                </Link>
              </div>
            )}

            <button
              className="p-2 text-neutral-800 hover:text-primary-600 md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-neutral-200">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-neutral-800 hover:text-primary-600 font-medium px-2">
                Home
              </Link>
              <Link to="/products" className="text-neutral-800 hover:text-primary-600 font-medium px-2">
                Shop
              </Link>
              {isAdmin && (
                <Link to="/admin/dashboard" className="text-neutral-800 hover:text-primary-600 font-medium px-2">
                  Admin Dashboard
                </Link>
              )}
              {!user && (
                <>
                  <Link to="/login" className="text-neutral-800 hover:text-primary-600 font-medium px-2">
                    Sign In
                  </Link>
                  <Link to="/register" className="text-neutral-800 hover:text-primary-600 font-medium px-2">
                    Register
                  </Link>
                </>
              )}
              {user && (
                <button
                  onClick={handleSignOut}
                  className="text-neutral-800 hover:text-primary-600 font-medium px-2 text-left"
                >
                  Sign Out
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;