
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, clearCart, addOrder } from "@/lib/local-storage";
import { CartItem, CustomerInfo, OrderStatus } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    setLoading(true);
    setTimeout(() => {
      const cart = getCart();
      if (cart.length === 0) {
        navigate("/cart");
        return;
      }
      setCartItems(cart);
      setLoading(false);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!customerInfo.name || !customerInfo.email || !customerInfo.address || !customerInfo.phone) {
      toast.error("Please fill in all fields");
      setIsSubmitting(false);
      return;
    }

    // Process order (in real app, we'd send to backend)
    setTimeout(() => {
      const orderId = uuidv4();
      
      const order = {
        id: orderId,
        customer: customerInfo,
        items: cartItems,
        total: calculateTotal(),
        status: "Pending" as OrderStatus,
        date: new Date().toISOString(),
      };

      addOrder(order);
      clearCart();
      
      // Notify components about cart change
      window.dispatchEvent(new Event("cart-updated"));
      
      toast.success("Order placed successfully!");
      navigate(`/order-confirmation/${orderId}`);
      
      setIsSubmitting(false);
    }, 1000);
  };

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
            <form onSubmit={handlePlaceOrder}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St, City, Country"
                  required
                />
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  placeholder="+1 234 567 890"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-brand-purple hover:bg-brand-purple-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Place Order"}
              </Button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold border-b pb-4">Order Summary</h2>

            <div className="py-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between py-2">
                  <span>
                    {item.product.name} × {item.quantity}
                  </span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
