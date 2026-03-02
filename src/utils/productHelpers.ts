import { IProduct } from "@/types";

export function getStockStatus(product: IProduct) {
  const stock = Number(product.stockUnits);
  const threshold = Number(product.lowStockAlert ?? 10);

  if (stock === 0) {
    return { label: "OUT OF STOCK", variant: "secondary" as const };
  }

  if (stock <= threshold) {
    return { label: "LOW STOCK", variant: "destructive" as const };
  }

  return { label: "IN STOCK", variant: "success" as const };
}

export const API_BASE = import.meta.env.VITE_BASE_URL;

export const buildUrl = (path?: string) =>
  path?.startsWith("http") ? path : `${API_BASE}${path}`;
