import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateProductResponse } from "./types/update-product-response";
import type { UpdateProductRequest } from "./types/update-product-request";

export function useUpdateProduct(productId?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateProductRequest) => {
      const response = await fetch(`http://localhost:3333/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao atualizar produto');

    const result: UpdateProductResponse = await response.json()

    return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      queryClient.invalidateQueries({ queryKey: ['get-products'] });
    },
  });
}