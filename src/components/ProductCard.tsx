
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/local-storage";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    
    // Add to cart with a slight delay to show the loading state
    setTimeout(() => {
      addToCart(product);
      
      // Dispatch custom event to notify navbar
      window.dispatchEvent(new Event("cart-updated"));
      
      toast.success(`Added ${product.name} to cart`);
      setIsAdding(false);
    }, 300);
  };

  return (
    <div className="product-card bg-white rounded-lg shadow overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image"
        />
        {product.stock < 5 && product.stock > 0 && (
          <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 h-10 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <Button
            onClick={handleAddToCart}
            disabled={isAdding || product.stock === 0}
            className="bg-brand-purple hover:bg-brand-purple-dark text-white"
            size="sm"
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
