import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BudgetApp from "./pages/BudgetApp";
import Register from "./pages/Register";
import Login from "./pages/Login";
import History from "./pages/History";
import ProductRegistration from "./pages/ProductRegistration";
import SalespersonRegistration from "./pages/SalespersonRegistration"; // Importar a nova página
import PanelModelRegistration from "./pages/PanelModelRegistration"; // Importar a nova página

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/budget" element={<BudgetApp />} />
          <Route path="/history" element={<History />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product-registration" element={<ProductRegistration />} />
          <Route path="/salesperson-registration" element={<SalespersonRegistration />} /> {/* Nova rota */}
          <Route path="/panel-model-registration" element={<PanelModelRegistration />} /> {/* Nova rota */}
          {/* Redireciona a rota raiz para /login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;