"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trash2 } from "lucide-react";

interface Salesperson {
  id: string;
  name: string;
}

const SalespersonRegistration = () => {
  const [salespersonName, setSalespersonName] = useState("");
  const [salespeople, setSalespeople] = useState<Salesperson[]>([]);

  useEffect(() => {
    const storedSalespeople = localStorage.getItem("salespeople");
    if (storedSalespeople) {
      setSalespeople(JSON.parse(storedSalespeople));
    }
  }, []);

  const handleAddSalesperson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!salespersonName.trim()) {
      showError("Por favor, insira o nome do vendedor.");
      return;
    }

    const newSalesperson: Salesperson = {
      id: crypto.randomUUID(),
      name: salespersonName.trim(),
    };

    const updatedSalespeople = [...salespeople, newSalesperson];
    setSalespeople(updatedSalespeople);
    localStorage.setItem("salespeople", JSON.stringify(updatedSalespeople));
    showSuccess("Vendedor cadastrado com sucesso!");
    setSalespersonName("");
  };

  const handleDeleteSalesperson = (id: string) => {
    const updatedSalespeople = salespeople.filter((s) => s.id !== id);
    setSalespeople(updatedSalespeople);
    localStorage.setItem("salespeople", JSON.stringify(updatedSalespeople));
    showSuccess("Vendedor removido com sucesso!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Cadastro de Vendedor</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddSalesperson} className="space-y-4">
            <div>
              <Label htmlFor="salespersonName">Nome do Vendedor</Label>
              <Input
                id="salespersonName"
                type="text"
                placeholder="Nome completo do vendedor"
                value={salespersonName}
                onChange={(e) => setSalespersonName(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Cadastrar Vendedor
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Vendedores Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          {salespeople.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum vendedor cadastrado ainda.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salespeople.map((salesperson) => (
                  <TableRow key={salesperson.id}>
                    <TableCell className="font-medium">{salesperson.name}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSalesperson(salesperson.id)}
                        aria-label="Excluir vendedor"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SalespersonRegistration;