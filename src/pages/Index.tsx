import { MadeWithDyad } from "@/components/made-with-dyad";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao Seu Aplicativo</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Comece a construir seu projeto incrível aqui!
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
          <Link to="/login">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4 w-full">
              Entrar
            </Button>
          </Link>
          <Link to="/register">
            <Button size="lg" variant="ghost" className="text-lg px-8 py-4 w-full">
              Registrar
            </Button>
          </Link>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;