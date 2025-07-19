import { useQuery } from "@tanstack/react-query";

export function useProductDetails(productId?: string) {
  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3333/products/${productId}`);
      if (!response.ok) throw new Error('Produto não encontrado');
      return response.json() as Promise<Array<{ name: string; price: string }>>;
    },
    enabled: !!productId,
  });
}