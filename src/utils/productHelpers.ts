import { IProduct } from "@/types";

export function getStockStatus(product: IProduct) {
  if (product.stockUnits <= (product.lowStockAlert || 10)) {
    return { label: "LOW STOCK", variant: "destructive" as const };
  }
  return { label: "IN STOCK", variant: "default" as const };
}

export const API_BASE = import.meta.env.VITE_BASE_URL;

export const buildUrl = (path?: string) =>
  path?.startsWith("http") ? path : `${API_BASE}${path}`;
