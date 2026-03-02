import { useEffect, useState } from "react";
import { getProductById, deleteProduct } from "@/services/ProductsService";
import { IProduct } from "@/types/product";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Layers,
  Pencil,
  Tag,
  Trash,
  Info,
  Star,
  DollarSign,
  Package,
  HardDrive,
  Globe,
} from "lucide-react";
import { API_BASE } from "@/utils/productHelpers";
import { calculateMargin } from "@/utils/priceHelpers";

export function ProductDetail({
  open,
  productId,
  onClose,
  onDeleted,
  onEdit,
}: {
  open: boolean;
  productId: string;
  onClose: () => void;
  onDeleted?: () => void;
  onEdit: (product: IProduct) => void;
}) {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (product?.images?.length) {
      const main = product.images.find((img) => img.isMain);
      setSelectedImage(`${API_BASE}${main?.url || product.images[0].url}`);
    }
  }, [product]);

  useEffect(() => {
    if (!open || !productId) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [open, productId]);

  const handleDelete = async () => {
    if (!productId) return;

    try {
      setDeleting(true);
      await deleteProduct(productId);
      onDeleted?.();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  if (!open) return null;

  if (loading) {
    return (
      <div className="mt-6 p-6 rounded-xl bg-card shadow-sm">
        Loading product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-6 p-6 rounded-xl bg-card shadow-sm text-red-500">
        {error}
      </div>
    );
  }

  if (!product) return null;

  const basePrice = Number(product.basePrice) || 0;
  const discountPrice = Number(product.discountPrice) || 0;

  const finalPrice =
    discountPrice > 0 && discountPrice < basePrice ? discountPrice : basePrice;

  const showOriginal = discountPrice > 0 && discountPrice < basePrice;

  const margin = calculateMargin(
    product.basePrice,
    product.costPrice || 0,
    product.discountPrice || 0,
  );

  const lowStockAlert = product.lowStockAlert ?? 0;
  const stockUnits = product.stockUnits ?? 0;

  return (
    <div className="mt-6 space-y-8">
      <div className="flex items-center justify-between">
        <Button
          onClick={onClose}
          variant="ghost"
          className="group flex items-center gap-3 
             !text-indigo-600 font-semibold 
             !hover:bg-transparent"
        >
          <div
            className="p-2 bg-white border border-slate-200 
               rounded-xl 
               transition-all
               !group-hover:border-indigo-200 
               !group-hover:bg-indigo-50"
          >
            <ArrowLeft className="w-4 h-4" />
          </div>
          Back to Inventory
        </Button>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => onEdit(product)}
            className="px-6 py-3 rounded-xl shadow-sm border bg-white text-gray-700 hover:bg-gray-500"
          >
            <Pencil className="mr-2 w-4 h-4" />
            <span className="font-bold">Edit Product</span>
          </Button>

          <Button
            onClick={handleDelete}
            disabled={deleting}
            className="w-12 h-12 rounded-xl bg-red-100 text-red-600 hover:bg-red-200"
          >
            <Trash className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-8">
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-[32px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
            <div className="relative group aspect-square rounded-[28px] overflow-hidden bg-gray-100">
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className=" relative w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No image
                </div>
              )}
            </div>

            <div className="flex justify-center gap-5 mt-6">
              {product.images?.map((img) => {
                const imgUrl = `${API_BASE}${img.url}`;
                const isActive = selectedImage === imgUrl;

                return (
                  <Button
                    key={img.id}
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`
    relative w-20 h-20 p-0 rounded-2xl overflow-hidden
    bg-transparent hover:bg-transparent
    focus-visible:ring-0
    transition-all duration-300
    ${
      isActive
        ? "ring-2 ring-indigo-500 scale-105"
        : "opacity-70 hover:opacity-100 hover:scale-105"
    }
  `}
                  >
                    <img
                      src={imgUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center">
              <Info className="mr-2 w-4 h-4 text-indigo-600" />
              Technical Identity
            </h3>
            <div className="grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Sku Number
                </p>
                <p className="font-mono text-sm font-bold text-slate-900">
                  {product.sku || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Manufacturer
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {product.manufacturer || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Dimensions
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {product.dimensions || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Unit Weight
                </p>
                <p className="text-sm font-bold text-slate-900">
                  {product.weight || "N/A"}
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-slate-50">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                {product.tags?.length ? "Associated Tags" : "N/A"}
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100">
                  <map name="tagMap">
                    {product.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </map>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="px-4 py-1 text-xs rounded-full bg-green-100 text-green-700">
                {product.stockUnits && product.stockUnits > 0
                  ? "IN STOCK"
                  : "OUT OF STOCK"}
              </span>
              <span className="px-4 py-1 flex text-xs rounded-full bg-amber-100 text-amber-700">
                <Star className="mr-1 w-3 h-3" />
                {product.isFeatured ? "FEATURED" : "REGULAR"}
              </span>
            </div>

            <h2 className="text-4xl font-bold">{product.name}</h2>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-indigo-600 font-bold">
                <Layers className="mr-2 w-5 h-5" />
                <span>{product.category?.name || "N/A"}</span>
              </div>
              <span className="text-slate-200">|</span>
              <div className="flex items-center text-slate-500 font-bold">
                <Tag className="mr-2 w-5 h-5" />
                <span>{product.brand || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-3xl p-8 text-white shadow-lg bg-gradient-to-br from-indigo-500 to-purple-600 space-y-6">
              <div className="flex items-center gap-2 uppercase text-sm tracking-wider opacity-80">
                <DollarSign className="w-4 h-4 opacity-80" />
                <span>Revenue Analysis</span>
              </div>

              <div>
                <h3 className="text-5xl font-bold">
                  ${finalPrice.toLocaleString()}
                </h3>

                {showOriginal && (
                  <p className="text-sm opacity-70 line-through mt-2">
                    Originally ${basePrice.toLocaleString()}
                  </p>
                )}
              </div>

              <div className="bg-white/10 rounded-2xl p-6 flex justify-between text-sm">
                <div>
                  <p className="opacity-70">Gross Margin</p>
                  <p
                    className={`text-xl font-semibold ${
                      margin > 20
                        ? "text-green-300"
                        : margin > 0
                          ? "text-yellow-300"
                          : "text-red-300"
                    }`}
                  >
                    {margin.toFixed(1)}%
                  </p>
                </div>

                <div>
                  <p className="opacity-70">Unit Cost</p>
                  <p className="text-xl font-semibold">
                    ${product.costPrice?.toLocaleString() || "0"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-sm space-y-8">
              <div className="flex items-center gap-2 uppercase text-sm tracking-widest text-slate-400 font-semibold">
                <Package className="w-4 h-4 opacity-70" />
                <span>Stock Health</span>
              </div>

              <div className="text-6xl font-bold text-slate-900">
                {stockUnits}
              </div>

              <p className="uppercase text-xs tracking-widest text-slate-400 font-semibold">
                Units Currently On-Hand
              </p>

              <div className="space-y-3 pt-4">
                <div className="flex justify-between text-xs uppercase tracking-widest font-semibold">
                  <span className="text-slate-400">Inventory Level</span>
                  <span
                    className={`${
                      stockUnits <= lowStockAlert
                        ? "text-red-500"
                        : "text-indigo-600"
                    }`}
                  >
                    {stockUnits <= lowStockAlert ? "Low" : "Healthy"}
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${
                      stockUnits <= lowStockAlert
                        ? "bg-red-500"
                        : "bg-gradient-to-r from-indigo-500 to-purple-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        (stockUnits / (lowStockAlert || 1)) * 100,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-4">
                <span className="uppercase text-xs tracking-widest text-slate-400 font-semibold">
                  Alert Threshold
                </span>
                <span className="text-sm font-bold text-slate-900">
                  {lowStockAlert} units
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-2 uppercase text-sm tracking-wide text-muted-foreground">
              <HardDrive className="w-4 h-4 opacity-70" />
              <span>Product Overview</span>
            </div>
            <p className="text-lg">{product.description}</p>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-8 space-y-6">
            <div className="flex items-center gap-2 uppercase text-sm tracking-widest text-slate-400 font-semibold">
              <Globe className="w-4 h-4 opacity-70" />
              <span>SEO</span>
            </div>

            <div className="bg-white/5 p-6 rounded-2xl">
              <p className="text-sm uppercase opacity-50">
                Search Engine Snippet
              </p>
              <h4 className="text-emerald-400 text-xl font-semibold mt-2">
                Buy {product.name} – Best Deals Online
              </h4>
              <p className="opacity-70 mt-2">No meta description configured.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
