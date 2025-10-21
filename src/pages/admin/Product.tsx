import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Trash2, Edit, Plus, Search } from "lucide-react";
import Cookies from "js-cookie";
import { Fetch } from "@/lib/fetch";

interface Product {
  id: string;
  name: string;
  description: string;
  stock: number;
  price: number;
  image: string;
  created_at: string;
  updated_at: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
  };
  message?: string;
}

const AdminProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: 0,
    price: 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (query = "") => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("accessToken");
      const url = query
        ? `/products/search?name=${encodeURIComponent(query)}`
        : `/products?page=1&limit=100`;
      const response = await Fetch.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data.data || response.data.products || []);
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setError(
        apiErr.response?.data?.message ||
          apiErr.response?.data?.error ||
          apiErr.message ||
          "Unknown error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchProducts(searchQuery);
  };

  const handleAdd = async () => {
    try {
      const token = Cookies.get("accessToken");
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price.toString());
      data.append("stock", formData.stock.toString());
      if (imageFile) data.append("image", imageFile);

      await Fetch.post("/products", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchProducts();
      resetForm();
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setError(
        apiErr.response?.data?.message ||
          apiErr.response?.data?.error ||
          apiErr.message ||
          "Failed to add product"
      );
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      stock: product.stock,
      price: product.price,
    });
    setImageFile(null);
    setIsEditDialogOpen(true);
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;
    try {
      const token = Cookies.get("accessToken");
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price.toString());
      data.append("stock", formData.stock.toString());
      if (imageFile) data.append("image", imageFile);

      await Fetch.put(`/products/${editingProduct.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      await fetchProducts();
      setIsEditDialogOpen(false);
      setEditingProduct(null);
      resetForm();
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setError(
        apiErr.response?.data?.message ||
          apiErr.response?.data?.error ||
          apiErr.message ||
          "Failed to update product"
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
    try {
      const token = Cookies.get("accessToken");
      await Fetch.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchProducts();
    } catch (err: unknown) {
      const apiErr = err as ApiError;
      setError(
        apiErr.response?.data?.message ||
          apiErr.response?.data?.error ||
          apiErr.message ||
          "Failed to delete product"
      );
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      stock: 0,
      price: 0,
    });
    setImageFile(null);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "stock" || name === "price" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageFile(file);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header + Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-xl sm:text-2xl font-bold">Manajemen Produk</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="w-4 h-4 mr-2" />
              Tambah Produk
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Produk Baru</DialogTitle>
              <DialogDescription>
                Masukkan detail produk baru dan unggah gambar.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input name="name" placeholder="Nama Produk" value={formData.name} onChange={handleInputChange} />
              <Textarea name="description" placeholder="Deskripsi" value={formData.description} onChange={handleInputChange} />
              <Input name="price" type="number" placeholder="Harga" value={formData.price} onChange={handleInputChange} />
              <Input name="stock" type="number" placeholder="Stok" value={formData.stock} onChange={handleInputChange} />
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {imageFile && (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-md"
                />
              )}
            </div>
            <DialogFooter>
              <Button onClick={handleAdd}>Tambah</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Cari produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={handleSearch} className="w-full sm:w-auto">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      {error && (
        <Alert>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Responsive Layout */}
      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : (
        <>
          {/* 🖥️ Desktop Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nama</TableHead>
                  <TableHead>Deskripsi</TableHead>
                  <TableHead>Harga</TableHead>
                  <TableHead>Stok</TableHead>
                  <TableHead>Gambar</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id.slice(0, 8)}...</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.description.slice(0, 50)}...</TableCell>
                    <TableCell>Rp{product.price.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge
                        variant={product.stock > 0 ? "default" : "destructive"}
                      >
                        {product.stock}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.image && (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleEdit(product)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 📱 Mobile Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-xl p-3 shadow-sm space-y-2 bg-white"
              >
                <div className="flex items-center gap-3">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                  )}
                  <div>
                    <h2 className="font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-600">
                      Rp{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex justify-between items-center">
                  <Badge
                    variant={product.stock > 0 ? "default" : "destructive"}
                  >
                    Stok: {product.stock}
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => handleEdit(product)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminProduct;
