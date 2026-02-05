import { createContext, useContext } from "react";
import { Product } from "../types";

interface ProductsContextValue {
  onEdit: (product: Product) => void;
  onView: (product: Product) => void;
  onDelete: (id: string | number) => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export const ProductsProvider = ({
  value,
  children,
}: {
  value: ProductsContextValue;
  children: React.ReactNode;
}) => {
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProductsContext must be used inside ProductsProvider");
  }

  return context;
};
