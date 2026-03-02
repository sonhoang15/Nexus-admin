import { useEffect, useState } from "react";
import { getCategoriesService } from "@/services/CategoriesService";
import { ICategory } from "@/types/category";

export const useCategoryOptions = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const data = await getCategoriesService(1000);
        setCategories(data);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);
  return {
    categories: categories.filter((c) => c.productCount > 0),
    loading,
  };
};
