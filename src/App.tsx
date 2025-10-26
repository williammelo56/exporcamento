import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BudgetApp from "./pages/BudgetApp";
import Register from "./pages/Register"; // Importar a nova página de registro
import Login from "./pages/Login";     // Importar a nova página de login
import History from "./pages/History";   // Importar a nova página de histórico

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
          <Route path="/history" element={<History />} /> {/* Nova rota para o histórico */}
          <Route path="/register" element={<Register />} /> {/* Nova rota para registro */}
          <Route path="/login" element={<Login />} />     {/* Nova rota para login */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;