import { useQuery } from "@tanstack/react-query";
import type { GetProductResponse } from "./types/get-product-response";

export function useProductDetails(productId?: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/products/${productId}`);
      if (!response.ok) throw new Error('Produto não encontrado');
      const result: GetProductResponse = await response.json();

      return result;
    },
    enabled: !!productId,
  });
}