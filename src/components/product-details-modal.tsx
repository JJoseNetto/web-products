import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useUpdateProduct} from "../http/use-update-product";
import { useProductDetails } from "../http/use-product-details";
import { useEffect } from "react";

const productSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number().min(0.01, "Preço deve ser maior que zero"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductDetailsModalProps {
  productId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function ProductDetailsModal({ productId, open, onOpenChange, onSuccess,}: ProductDetailsModalProps) {
  const { data, isLoading } = useProductDetails(productId);
  const product = data?.[0];
  const { mutateAsync: updateProduct, isPending } = useUpdateProduct(productId);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
    },
  });

    useEffect(() => {
    if (product && open) {
        reset({
        name: product.name,
        price: Number(product.price),
        });
    }
    }, [product, open, reset]);

  async function handleUpdateProduct(data: ProductFormData) {
    try {
      await updateProduct(data);
      onSuccess?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar produto</DialogTitle>
          <DialogDescription>Atualize as informações do produto</DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : (
          <form onSubmit={handleSubmit(handleUpdateProduct)} className="space-y-4">
            <div>
              <Input
                {...register("name")}
                placeholder="Nome do produto"
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <Input
                type="number"
                step="0.01"
                {...register("price", { valueAsNumber: true })}
                placeholder="Preço do produto"
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar alterações
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}