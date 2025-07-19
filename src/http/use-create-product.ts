import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateProductResponse } from "./types/create-product-response";
import type { CreateProductRequest } from "./types/create-product-request";

export function useCreateProduct() {
 const queryClient = useQueryClient()

     return useMutation({
        mutationFn: async (data: CreateProductRequest) => {
            const response = await fetch('http://localhost:3333/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result: CreateProductResponse = await response.json()

            return result
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-products'] })
        },
    })
}