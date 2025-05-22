
import { useState, useEffect } from "react";
import { getOrders, setOrders } from "@/lib/local-storage";
import { Order, OrderStatus } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Clock, Info } from "lucide-react";

const AdminOrdersPage = () => {
  const [orders, setOrdersList] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () => {
    setLoading(true);
    setTimeout(() => {
      const fetchedOrders = getOrders();
      setOrdersList(fetchedOrders);
      setLoading(false);
    }, 300);
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    
    setOrders(updatedOrders);
    setOrdersList(updatedOrders);
    toast.success(`Order #${orderId.slice(0, 8)} status updated to ${newStatus}`);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Manage Orders</h1>
      </div>

      {loading ? (
        <div className="bg-white rounded-lg shadow overflow-hidden animate-pulse">
          <div className="h-12 bg-gray-200"></div>
          <div className="p-4 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id.slice(0, 8)}...</TableCell>
                      <TableCell>
                        <div>
                          <p>{order.customer.name}</p>
                          <p className="text-sm text-gray-500">{order.customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Delivered' 
                            ? "bg-green-100 text-green-800" 
                            : order.status === 'Shipped' 
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Select
                          defaultValue={order.status}
                          onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Update Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Processing">Processing</SelectItem>
                            <SelectItem value="Shipped">Shipped</SelectItem>
                            <SelectItem value="Delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Clock className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-xl font-medium text-gray-900">No orders yet</h3>
              <p className="mt-1 text-gray-500">When customers place orders, they will appear here.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;
