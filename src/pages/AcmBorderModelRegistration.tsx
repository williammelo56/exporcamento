"use client";

import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trash2 } from "lucide-react";

export interface AcmBorderModel {
  id: string;
  name: string;
  defaultPrice: number; // Adicionando um preço padrão para a borda ACM
}

const AcmBorderModelRegistration = () => {
  const [modelName, setModelName] = useState("");
  const [modelPrice, setModelPrice] = useState<number | string>("");
  const [acmBorderModels, setAcmBorderModels] = useState<AcmBorderModel[]>([]);

  useEffect(() => {
    const storedAcmBorderModels = localStorage.getItem("acmBorderModels");
    if (storedAcmBorderModels) {
      setAcmBorderModels(JSON.parse(storedAcmBorderModels));
    }
  }, []);

  const handleAddAcmBorderModel = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseFloat(modelPrice as string);

    if (!modelName.trim() || isNaN(parsedPrice) || parsedPrice <= 0) {
      showError("Por favor, preencha todos os campos com valores válidos.");
      return;
    }

    const newAcmBorderModel: AcmBorderModel = {
      id: crypto.randomUUID(),
      name: modelName.trim(),
      defaultPrice: parsedPrice,
    };

    const updatedAcmBorderModels = [...acmBorderModels, newAcmBorderModel];
    setAcmBorderModels(updatedAcmBorderModels);
    localStorage.setItem("acmBorderModels", JSON.stringify(updatedAcmBorderModels));
    showSuccess("Modelo de borda ACM cadastrado com sucesso!");
    setModelName("");
    setModelPrice("");
  };

  const handleDeleteAcmBorderModel = (id: string) => {
    const updatedAcmBorderModels = acmBorderModels.filter((m) => m.id !== id);
    setAcmBorderModels(updatedAcmBorderModels);
    localStorage.setItem("acmBorderModels", JSON.stringify(updatedAcmBorderModels));
    showSuccess("Modelo de borda ACM removido com sucesso!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Cadastro de Modelo de Borda ACM</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddAcmBorderModel} className="space-y-4">
            <div>
              <Label htmlFor="modelName">Nome do Modelo</Label>
              <Input
                id="modelName"
                type="text"
                placeholder="Ex: Borda ACM 10cm Preta"
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="modelPrice">Preço Padrão (R$)</Label>
              <Input
                id="modelPrice"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={modelPrice}
                onChange={(e) => setModelPrice(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Cadastrar Modelo
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Modelos de Borda ACM Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          {acmBorderModels.length === 0 ? (
            <p className="text-center text-gray-500">Nenhum modelo de borda ACM cadastrado ainda.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço Padrão</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {acmBorderModels.map((model) => (
                  <TableRow key={model.id}>
                    <TableCell className="font-medium">{model.name}</TableCell>
                    <TableCell>R$ {model.defaultPrice.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteAcmBorderModel(model.id)}
                        aria-label="Excluir modelo"
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

export default AcmBorderModelRegistration;