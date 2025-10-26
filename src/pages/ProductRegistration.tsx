"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { showSuccess, showError } from "@/utils/toast";

const ProductRegistration = () => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleProductRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedPrice = parseFloat(productPrice);

    if (!productName || !productDescription || isNaN(parsedPrice) || parsedPrice <= 0) {
      showError("Por favor, preencha todos os campos com valores válidos.");
      return;
    }

    // Lógica de cadastro de produto simulada
    console.log({
      productName,
      productDescription,
      productPrice: parsedPrice,
    });
    showSuccess("Produto cadastrado com sucesso! (Funcionalidade real de backend não implementada)");

    // Limpar formulário
    setProductName("");
    setProductDescription("");
    setProductPrice("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Cadastro de Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProductRegistration} className="space-y-4">
            <div>
              <Label htmlFor="productName">Nome do Produto</Label>
              <Input
                id="productName"
                type="text"
                placeholder="Nome do produto"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="productDescription">Descrição</Label>
              <Textarea
                id="productDescription"
                placeholder="Descrição detalhada do produto"
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="productPrice">Preço</Label>
              <Input
                id="productPrice"
                type="number"
                placeholder="0.00"
                step="0.01"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Cadastrar Produto
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center flex justify-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Gerencie seus produtos de forma eficiente.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductRegistration;