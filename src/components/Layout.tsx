import React, { ReactNode, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import SideCart from './SideCart';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSideCartOpen, setIsSideCartOpen] = useState(false);

  const toggleSideCart = () => {
    setIsSideCartOpen(!isSideCartOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSideCart={toggleSideCart} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <SideCart isOpen={isSideCartOpen} onClose={() => setIsSideCartOpen(false)} />
    </div>
  );
};

export default Layout;