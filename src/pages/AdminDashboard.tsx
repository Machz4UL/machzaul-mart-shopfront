
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, setProducts } from "@/lib/local-storage";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Trash, PencilIcon, PackagePlus, ClipboardList } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

const AdminDashboard = () => {
  const [products, setProductsList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    stock: "",
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    setTimeout(() => {
      const fetchedProducts = getProducts();
      setProductsList(fetchedProducts);
      setLoading(false);
    }, 300);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormValues({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      stock: "",
    });
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormValues({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl,
      stock: product.stock.toString(),
    });
    setIsDialogOpen(true);
  };

  const confirmDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteProduct = () => {
    if (!productToDelete) return;
    
    const updatedProducts = products.filter((p) => p.id !== productToDelete.id);
    setProducts(updatedProducts);
    setProductsList(updatedProducts);
    
    // Notify other components about the change
    window.dispatchEvent(new Event("products-updated"));
    
    toast.success(`${productToDelete.name} has been deleted`);
    setIsDeleteDialogOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formValues.name || !formValues.description || !formValues.price || !formValues.imageUrl || !formValues.stock) {
      toast.error("Please fill in all fields");
      return;
    }

    const price = parseFloat(formValues.price);
    const stock = parseInt(formValues.stock);
    
    if (isNaN(price) || price <= 0) {
      toast.error("Price must be a positive number");
      return;
    }
    
    if (isNaN(stock) || stock < 0) {
      toast.error("Stock must be a non-negative number");
      return;
    }

    let updatedProducts: Product[];
    
    if (editingProduct) {
      // Update existing product
      updatedProducts = products.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              name: formValues.name,
              description: formValues.description,
              price,
              imageUrl: formValues.imageUrl,
              stock,
            }
          : p
      );
      toast.success(`${formValues.name} has been updated`);
    } else {
      // Add new product
      const newProduct: Product = {
        id: uuidv4(),
        name: formValues.name,
        description: formValues.description,
        price,
        imageUrl: formValues.imageUrl,
        stock,
      };
      updatedProducts = [...products, newProduct];
      toast.success(`${formValues.name} has been added`);
    }
    
    setProducts(updatedProducts);
    setProductsList(updatedProducts);
    
    // Notify other components about the change
    window.dispatchEvent(new Event("products-updated"));
    
    setIsDialogOpen(false);
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Button
            asChild
            variant="outline"
          >
            <Link to="/admin/orders">
              <ClipboardList className="mr-2" size={18} />
              Manage Orders
            </Link>
          </Button>
          <Button
            onClick={handleAddProduct}
            className="bg-brand-purple hover:bg-brand-purple-dark"
          >
            <PackagePlus className="mr-2" size={18} />
            Add Product
          </Button>
        </div>
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
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={product.imageUrl}
                            alt={product.name}
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 10 
                            ? "bg-green-100 text-green-800" 
                            : product.stock > 0 
                            ? "bg-yellow-100 text-yellow-800" 
                            : "bg-red-100 text-red-800"
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                          >
                            <PencilIcon size={16} />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => confirmDeleteProduct(product)}
                            className="text-red-500 border-red-500 hover:bg-red-50"
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No products found.</p>
              <Button 
                variant="link" 
                onClick={handleAddProduct}
                className="mt-2"
              >
                Add your first product
              </Button>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Product Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formValues.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formValues.description}
                  onChange={handleInputChange}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formValues.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    min="0"
                    value={formValues.stock}
                    onChange={handleInputChange}
                    placeholder="0"
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  value={formValues.imageUrl}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
                {formValues.imageUrl && (
                  <div className="mt-2">
                    <img
                      src={formValues.imageUrl}
                      alt="Preview"
                      className="h-24 w-auto object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-brand-purple hover:bg-brand-purple-dark">
                {editingProduct ? "Update Product" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Are you sure you want to delete <strong>{productToDelete?.name}</strong>?</p>
            <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
          </div>
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              type="button" 
              onClick={handleDeleteProduct}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
