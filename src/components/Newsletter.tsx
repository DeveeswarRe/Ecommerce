import React, { useState } from 'react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would normally send this to your backend
      console.log(`Subscribing email: ${email}`);
      setSubscribed(true);
      setEmail('');
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <section className="py-14 bg-primary-600">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">Join Our Newsletter</h2>
          <p className="text-primary-100 mb-6">
            Subscribe to receive updates on new arrivals, special promotions, and styling tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
              required
            />
            <button
              type="submit"
              className="btn px-6 py-3 bg-white text-primary-700 hover:bg-primary-50 transition-colors rounded-md font-medium"
            >
              Subscribe
            </button>
          </form>
          
          {subscribed && (
            <div className="mt-4 text-white bg-primary-700 rounded-md py-2 px-4 inline-block transition-opacity">
              Thank you for subscribing!
            </div>
          )}
          
          <p className="mt-4 text-xs text-primary-200">
            By subscribing, you agree to receive marketing emails. You can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;