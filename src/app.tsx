import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CreateProduct } from "./pages/create-products";

const queryClient = new QueryClient();

export function App() {
  return (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <Routes>
              <Route index element={<CreateProduct/>}/>
            </Routes>
        </BrowserRouter>
      </QueryClientProvider>
  )
}