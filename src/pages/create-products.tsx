import { ProductsList } from "@/components/products-list";


export function CreateProduct() {


    return (
        <div className="min-h-screen px-4 py-8">
            <div className="mx-auto max-w-4xl">
                <div className="grid grid-cols-2 items-start gap-8">

                    <ProductsList />
                </div>
            </div>
        </div>
    )
}