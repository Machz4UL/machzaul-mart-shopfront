
import { useState } from "react";
import { getOrderById } from "@/lib/local-storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Order } from "@/types";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderId.trim()) {
      setError("Please enter an order ID");
      return;
    }

    setError("");
    setIsSearching(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const foundOrder = getOrderById(orderId.trim());
      
      if (!foundOrder) {
        setError("Order not found. Please check the order ID and try again.");
        setOrder(null);
      } else {
        setOrder(foundOrder);
        setError("");
      }
      
      setIsSearching(false);
    }, 800);
  };

  // Track status progress (for visualization)
  const getStatusProgress = (status: string) => {
    switch (status) {
      case "Pending":
        return 1;
      case "Processing":
        return 2;
      case "Shipped":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Enter your order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="flex-grow"
          />
          <Button 
            type="submit" 
            className="bg-brand-purple hover:bg-brand-purple-dark" 
            disabled={isSearching}
          >
            {isSearching ? "Searching..." : "Track Order"}
          </Button>
        </form>
        
        {error && (
          <div className="mt-4 text-red-500">{error}</div>
        )}
      </div>

      {order && (
        <div className="bg-white rounded-lg shadow p-6 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between mb-6">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold">{order.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-semibold">{new Date(order.date).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total</p>
              <p className="font-semibold">${order.total.toFixed(2)}</p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Order Status: {order.status}</h3>
            
            <div className="relative">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div 
                  style={{ width: `${getStatusProgress(order.status) * 25}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-purple transition-all duration-500"
                />
              </div>
              
              <div className="flex justify-between text-xs">
                <div className={`text-center ${getStatusProgress(order.status) >= 1 ? "text-brand-purple font-semibold" : ""}`}>
                  <div className={`w-6 h-6 rounded-full mx-auto mb-1 ${getStatusProgress(order.status) >= 1 ? "bg-brand-purple" : "bg-gray-200"}`} />
                  Order Placed
                </div>
                <div className={`text-center ${getStatusProgress(order.status) >= 2 ? "text-brand-purple font-semibold" : ""}`}>
                  <div className={`w-6 h-6 rounded-full mx-auto mb-1 ${getStatusProgress(order.status) >= 2 ? "bg-brand-purple" : "bg-gray-200"}`} />
                  Processing
                </div>
                <div className={`text-center ${getStatusProgress(order.status) >= 3 ? "text-brand-purple font-semibold" : ""}`}>
                  <div className={`w-6 h-6 rounded-full mx-auto mb-1 ${getStatusProgress(order.status) >= 3 ? "bg-brand-purple" : "bg-gray-200"}`} />
                  Shipped
                </div>
                <div className={`text-center ${getStatusProgress(order.status) >= 4 ? "text-brand-purple font-semibold" : ""}`}>
                  <div className={`w-6 h-6 rounded-full mx-auto mb-1 ${getStatusProgress(order.status) >= 4 ? "bg-brand-purple" : "bg-gray-200"}`} />
                  Delivered
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Ordered Items</h3>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img 
                      src={item.product.imageUrl} 
                      alt={item.product.name} 
                      className="w-12 h-12 object-cover rounded" 
                    />
                    <div className="ml-4">
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
