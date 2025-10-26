import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";

const Index = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica de logout simulada
    showSuccess("Você foi desconectado.");
    navigate("/login"); // Redirecionar para a página de login
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Seu Aplicativo</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Gerencie suas finanças e produtos aqui!
        </p>
        <div className="flex flex-col space-y-4">
          <Link to="/budget">
            <Button size="lg" className="text-lg px-8 py-4 w-full">
              Ir para o Aplicativo de Orçamento
            </Button>
          </Link>
          <Link to="/history">
            <Button size="lg" variant="outline" className="text-lg px-8 py-4 w-full">
              Ver Histórico de Transações
            </Button>
          </Link>
          <Link to="/product-registration">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 w-full">
              Cadastrar Produtos
            </Button>
          </Link>
          <Link to="/salesperson-registration">
            <Button size="lg" variant="ghost" className="text-lg px-8 py-4 w-full">
              Cadastrar Vendedores
            </Button>
          </Link>
          <Link to="/panel-model-registration">
            <Button size="lg" variant="ghost" className="text-lg px-8 py-4 w-full">
              Cadastrar Modelos de Painel
            </Button>
          </Link>
          <Link to="/acm-border-model-registration"> {/* Novo link */}
            <Button size="lg" variant="ghost" className="text-lg px-8 py-4 w-full">
              Cadastrar Modelos de Borda ACM
            </Button>
          </Link>
          <Button size="lg" variant="destructive" className="text-lg px-8 py-4 w-full" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;