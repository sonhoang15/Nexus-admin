import { createContext, useContext } from "react";
import { IProduct } from "../types";

interface IProductsContextValue {
  onEdit: (product: IProduct) => void;
  onView: (product: IProduct) => void;
  onDelete: (id: string | number) => void;
}

const ProductsContext = createContext<IProductsContextValue | null>(null);

export const ProductsProvider = ({
  value,
  children,
}: {
  value: IProductsContextValue;
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
