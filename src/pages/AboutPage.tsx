
import { Info } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-brand-purple p-6">
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Info className="mr-2" size={24} />
            About MachzaulMart
          </h1>
        </div>
        
        <div className="p-6 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-brand-purple-dark">Our Story</h2>
            <p className="text-gray-700">
              Founded in 2023, MachzaulMart began with a simple mission: to provide quality products at affordable prices 
              with exceptional customer service. What started as a small online shop has grown into a trusted 
              e-commerce destination for thousands of satisfied customers.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-brand-purple-dark">Our Mission</h2>
            <p className="text-gray-700">
              At MachzaulMart, we believe shopping should be simple, enjoyable, and rewarding. Our mission is to create 
              a seamless shopping experience that connects people with products they love while providing transparency 
              and exceptional service at every step.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-brand-purple-dark">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Quality Products</h3>
                <p className="text-gray-600">Each item in our inventory is carefully selected to ensure quality, durability, and value.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Fast Shipping</h3>
                <p className="text-gray-600">We work diligently to process and ship orders as quickly as possible.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Customer Service</h3>
                <p className="text-gray-600">Our support team is ready to assist with any questions or concerns about your order.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Secure Shopping</h3>
                <p className="text-gray-600">Shop with confidence knowing your information is protected with industry-standard security measures.</p>
              </div>
            </div>
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-brand-purple-dark">Our Promise</h2>
            <p className="text-gray-700">
              We strive to exceed your expectations with every interaction. If you're ever unsatisfied with your purchase, 
              please don't hesitate to contact us. Your feedback helps us improve and grow.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
