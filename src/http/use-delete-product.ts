import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await fetch(`http://localhost:3333/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao deletar produto');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-products'] });
    },
  });
}