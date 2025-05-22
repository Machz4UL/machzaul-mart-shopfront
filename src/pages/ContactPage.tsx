
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Thank you for your message! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-gray-600 mb-6">
              Have questions about our products or services? Fill out the form below and we'll get back to you as soon as possible.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can we help you?"
                  rows={5}
                  required
                />
              </div>
              
              <Button
                type="submit"
                className="w-full bg-brand-purple hover:bg-brand-purple-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-brand-purple mr-3 mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <a href="mailto:info@machzaulmart.com" className="text-brand-purple hover:underline">
                    info@machzaulmart.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-brand-purple mr-3 mt-1" />
                <div>
                  <p className="font-medium">Phone</p>
                  <a href="tel:+11234567890" className="text-brand-purple hover:underline">
                    +1 (123) 456-7890
                  </a>
                  <p className="text-sm text-gray-500">Mon-Fri: 9am - 5pm</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-brand-purple mr-3 mt-1" />
                <div>
                  <p className="font-medium">Address</p>
                  <p>123 Commerce Street</p>
                  <p>Suite 101</p>
                  <p>San Francisco, CA 94103</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium mb-2">Business Hours</h3>
              <p className="text-sm">Monday - Friday: 9:00 AM - 5:00 PM</p>
              <p className="text-sm">Saturday: 10:00 AM - 3:00 PM</p>
              <p className="text-sm">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
