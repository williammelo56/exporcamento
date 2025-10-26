"use client";

import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Importar useNavigate
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";

const Login = () => {
  const navigate = useNavigate(); // Inicializar useNavigate

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de login simulada
    showSuccess("Login bem-sucedido! (Funcionalidade real de backend não implementada)");
    // Em um aplicativo real, você faria uma chamada de API aqui
    navigate("/"); // Redirecionar para a página inicial
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Entrar</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="seu@email.com" required />
            </div>
            <div>
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" placeholder="********" required />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center flex justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Não tem uma conta?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Registrar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;