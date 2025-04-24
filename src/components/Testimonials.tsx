import React from 'react';

const testimonials = [
  {
    id: 1,
    content: "I purchased the evening gown for my daughter's wedding and received countless compliments. The quality and fit were perfect!",
    author: "Elizabeth Taylor",
    role: "Loyal Customer",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100"
  },
  {
    id: 2,
    content: "The business attire dress I ordered exceeded my expectations. Professional, comfortable, and beautifully made. I'll definitely be back!",
    author: "Sarah Johnson",
    role: "Marketing Executive",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100"
  },
  {
    id: 3,
    content: "I love how versatile the casual dresses are. I can dress them up or down depending on the occasion. The quality is worth every penny.",
    author: "Rebecca Wilson",
    role: "Fashion Blogger",
    image: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-neutral-900 mb-4">What Our Customers Say</h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            Read about experiences from our satisfied customers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-white p-6 rounded-lg shadow-sm border border-neutral-100 hover:shadow-md transition-shadow duration-300"
            >
              <svg className="h-8 w-8 text-primary-300 mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-neutral-700 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.author} 
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-medium text-neutral-900">{testimonial.author}</h4>
                  <p className="text-sm text-neutral-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;