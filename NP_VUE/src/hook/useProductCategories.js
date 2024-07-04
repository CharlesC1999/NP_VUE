import { inject } from "vue";

export function useProductCategories() {
  const newCategories = inject("newCategories");
  const setNewCategories = inject("setNewCategories");

  if (!newCategories || !setNewCategories) {
    throw new Error(
      "useProductCategories must be used within a ProductCateProvider"
    );
  }

  return {
    newCategories,
    setNewCategories,
  };
}
