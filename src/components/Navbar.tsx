
import { Link } from "react-router-dom";
import { ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCart } from "@/lib/local-storage";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      setCartItemsCount(cart.reduce((total, item) => total + item.quantity, 0));
    };

    // Set initial count
    updateCartCount();

    // Add event listener for cart updates
    window.addEventListener("cart-updated", updateCartCount);

    // Cleanup
    return () => {
      window.removeEventListener("cart-updated", updateCartCount);
    };
  }, []);

  return (
    <nav className="bg-brand-purple shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Package className="text-white" size={24} />
          <span className="font-bold text-xl text-white">MachzaulMart</span>
        </Link>

        <div className="flex items-center space-x-6">
          <Link to="/" className="text-white hover:text-brand-purple-light">
            Products
          </Link>
          <Link to="/about" className="text-white hover:text-brand-purple-light">
            About
          </Link>
          <Link to="/contact" className="text-white hover:text-brand-purple-light">
            Contact
          </Link>
          <Link to="/tracking" className="text-white hover:text-brand-purple-light">
            Track Order
          </Link>
          <div className="hidden md:block">
            <Link to="/admin" className="text-white hover:text-brand-purple-light">
              Admin
            </Link>
          </div>
          <div className="hidden md:block">
            <Link to="/admin/orders" className="text-white hover:text-brand-purple-light">
              Orders
            </Link>
          </div>
          <Link to="/cart" className="relative">
            <Button variant="ghost" className="text-white p-2">
              <ShoppingCart size={22} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
