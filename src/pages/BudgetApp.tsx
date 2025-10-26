"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type ProductType = "painel_led" | "totem_led" | "painel_ima" | "";

const BudgetApp = () => {
  const [selectedProductType, setSelectedProductType] = useState<ProductType>("");

  const renderProductContent = () => {
    switch (selectedProductType) {
      case "painel_led":
        return (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Detalhes do Painel de LED</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Aqui você pode configurar as especificações do Painel de LED, como tamanho, resolução, tipo de uso (interno/externo), etc.</p>
              {/* Adicione mais campos de configuração aqui */}
            </CardContent>
          </Card>
        );
      case "totem_led":
        return (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Detalhes do Totem de LED</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Aqui você pode configurar as especificações do Totem de LED, como altura, largura, interatividade, base, etc.</p>
              {/* Adicione mais campos de configuração aqui */}
            </CardContent>
          </Card>
        );
      case "painel_ima":
        return (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Detalhes do Painel de IMÃ</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Aqui você pode configurar as especificações do Painel de IMÃ, como dimensões, força do ímã, material, aplicação, etc.</p>
              {/* Adicione mais campos de configuração aqui */}
            </CardContent>
          </Card>
        );
      default:
        return (
          <Card className="mt-8">
            <CardContent className="text-center py-8 text-gray-500">
              <p>Selecione um tipo de produto acima para começar a configurar seu orçamento.</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-4xl font-bold text-center mb-8">Orçamento de Produtos</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Selecionar Tipo de Produto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div>
              <Label htmlFor="product-type">Tipo de Produto</Label>
              <Select
                value={selectedProductType}
                onValueChange={(value: ProductType) => setSelectedProductType(value)}
              >
                <SelectTrigger id="product-type">
                  <SelectValue placeholder="Selecione um tipo de produto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="painel_led">Painel de LED</SelectItem>
                  <SelectItem value="totem_led">Totem de LED</SelectItem>
                  <SelectItem value="painel_ima">Painel de IMÃ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {renderProductContent()}
    </div>
  );
};

export default BudgetApp;