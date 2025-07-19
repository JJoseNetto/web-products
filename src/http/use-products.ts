import { useQuery } from "@tanstack/react-query"
import type { GetProductsResponse } from "./types/get-products-response"

export function useProducts() {
    return useQuery({
        queryKey: ['get-products'],
        queryFn: async () => {
            const response = await fetch('http://localhost:3333/products')
            const result: GetProductsResponse = await response.json()
            
            return result
        },
    })

}