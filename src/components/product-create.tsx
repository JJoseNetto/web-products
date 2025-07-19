import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useCreateProduct } from "../http/use-create-product";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const createProductSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  price: z.number().min(0, "Preço deve ser positivo"),
  sku: z.string().min(1, "SKU é obrigatório"),
});

type CreateProductFormData = z.infer<typeof createProductSchema>;

export function ProductCreate() {
  const { mutateAsync: createProduct } = useCreateProduct();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
  });

  async function handleCreateProduct(data: CreateProductFormData) {
    try {
      await createProduct(data);
      reset();
    } catch (error) {
      console.error("Erro ao criar produto:", error);
    }
  }

  return (
    <div className="flex items-center justify-between">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Adicionar produto
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar novo produto</DialogTitle>
            <DialogDescription>Criar um novo produto no sistema</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(handleCreateProduct)} className="space-y-4">
            <div>
              <Input 
                {...register("name")}
                placeholder="Nome do produto" 
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            
            <div>
              <Input 
                {...register("price", { valueAsNumber: true })}
                type="number" 
                placeholder="Preço do produto" 
              />
              {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
            </div>
            
            <div>
              <Input 
                {...register("sku")}
                placeholder="SKU do produto" 
              />
              {errors.sku && <p className="text-sm text-red-500">{errors.sku.message}</p>}
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Criar produto</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}