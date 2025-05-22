
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getOrderById } from "@/lib/local-storage";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Order } from "@/types";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!orderId) {
      navigate("/");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const fetchedOrder = getOrderById(orderId);
      if (!fetchedOrder) {
        navigate("/");
        return;
      }
      setOrder(fetchedOrder);
      setLoading(false);
    }, 500);
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-1/3 mx-auto"></div>
        <div className="h-64 bg-gray-200 rounded max-w-xl mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-4" />
        <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been successfully placed.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-3">Order #{orderId}</h2>
          
          <div className="text-left mb-4">
            <h3 className="font-medium mb-2">Customer Information:</h3>
            <p>{order?.customer.name}</p>
            <p>{order?.customer.email}</p>
            <p>{order?.customer.address}</p>
            <p>{order?.customer.phone}</p>
          </div>
          
          <div className="text-left border-t pt-4">
            <h3 className="font-medium mb-2">Order Details:</h3>
            <p className="mb-1">Status: <span className="font-semibold">{order?.status}</span></p>
            <p className="mb-1">Date: <span className="font-semibold">{new Date(order?.date || "").toLocaleDateString()}</span></p>
            <p>Total: <span className="font-semibold">${order?.total.toFixed(2)}</span></p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 justify-center">
          <Button asChild className="bg-brand-purple hover:bg-brand-purple-dark">
            <Link to="/">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/tracking">Track Your Order</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
