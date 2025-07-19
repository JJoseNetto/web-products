import { useState } from "react";
import { useProducts } from "@/http/use-products";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Skeleton } from "./ui/skeleton"
import { ProductCreate } from "./product-create";
import { ProductDeleteButton } from "./product-delete-button";
import { ProductDetailsModal } from "./product-details-modal";
import { Eye } from "lucide-react";
import { Button } from "./ui/button";

export function ProductsList() {
     const {data, isLoading} = useProducts()
    const [selectedProductId, setSelectedProductId] = useState<string | undefined>();

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-4">
            <h1 className="text-3xl font-bold">Produtos</h1>
            <ProductCreate />

            <ProductDetailsModal
                productId={selectedProductId}
                open={!!selectedProductId}
                onOpenChange={(open) => !open && setSelectedProductId(undefined)}
            />
            <div className="border rounded-lg p-2">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Id</TableHead>
                        <TableHead>Produtos</TableHead>
                        <TableHead>Preço</TableHead>
                        <TableHead>SKU</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading && 
                        Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                            <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                            <TableCell className="text-right"><Skeleton className="h-4 w-16 ml-auto" /></TableCell>
                            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                        </TableRow>
                        ))
                    }
                    {data?.map(product => (
                        <TableRow
                        key={product.id}
                        className="hover:bg-accent/50 transition-colors cursor-pointer"
                        >
                        <TableCell className="font-medium">{product.id}</TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>R$ {Number(product.price).toFixed(2)}</TableCell>
                        <TableCell>{product.sku}</TableCell>
                        <TableCell className="text-right">
                            <ProductDeleteButton productId={product.id} />
                            <Button variant="outline" size="sm" onClick={() => setSelectedProductId(product.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Ver detalhes
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}

                    {!isLoading && data?.length === 0 && (
                        <TableRow>
                        <TableCell colSpan={3} className="text-muted-foreground text-center">
                            Nenhum produto encontrado.
                        </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}