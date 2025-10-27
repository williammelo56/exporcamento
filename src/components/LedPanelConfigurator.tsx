"use client";

import React, { useState, useEffect, useCallback } from "react"; // Import useCallback
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess, showError } from "@/utils/toast";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { PanelModel } from "@/pages/PanelModelRegistration";
import { AcmBorderModel } from "@/pages/AcmBorderModelRegistration";

interface Salesperson {
  id: string;
  name: string;
}

const structurePrices: { [key: string]: number } = {
  uma_face: 1360,
  dupla_face: 1800,
  dupla_face_led_angulo: 2720,
  dupla_face_led_lona: 1560,
  dupla_face_angulo_led_lona: 1760,
};

const LedPanelConfigurator = () => {
  const navigate = useNavigate();
  const [salespeople, setSalespeople] = useState<Salesperson[]>([]);
  const [panelModels, setPanelModels] = useState<PanelModel[]>([]);
  const [acmBorderModels, setAcmBorderModels] = useState<AcmBorderModel[]>([]);

  const [selectedSalespersonId, setSelectedSalespersonId] = useState("");
  const [nomeDoCliente, setNomeDoCliente] = useState("");
  const [tipoDeFace, setTipoDeFace] = useState("uma_face");
  const [largura, setLargura] = useState<number | string>("");
  const [altura, setAltura] = useState<number | string>("");
  const [selectedPanelModelId, setSelectedPanelModelId] = useState("");
  const [valorUnitarioPainel, setValorUnitarioPainel] = useState<number | string>("");
  const [valorUnitarioEstrutura, setValorUnitarioEstrutura] = useState<number | string>("");
  const [incluirBorda, setIncluirBorda] = useState(false);
  const [selectedAcmBorderModelId, setSelectedAcmBorderModelId] = useState("");
  const [valorUnitarioBordaAcm, setValorUnitarioBordaAcm] = useState<number | string>("");
  const [distanciaLocal, setDistanciaLocal] = useState<number | string>("");
  const [tempoViagem, setTempoViagem] = useState<number | string>("");
  const [numeroFuncionarios, setNumeroFuncionarios] = useState<number | string>("");
  const [horasTrabalho, setHorasTrabalho] = useState<number | string>("");
  const [horasMunck, setHorasMunck] = useState<number | string>("");
  const [controladora, setControladora] = useState("");
  const [incluirPilarFerro, setIncluirPilarFerro] = useState(false);
  const [oferecerLocacao, setOferecerLocacao] = useState(false);

  // Function to load all data from localStorage and update state
  const loadDataFromLocalStorage = useCallback(() => {
    const storedSalespeople = localStorage.getItem("salespeople");
    const loadedSalespeople: Salesperson[] = storedSalespeople ? JSON.parse(storedSalespeople) : [];
    setSalespeople(loadedSalespeople);
    // If the currently selected salesperson no longer exists, reset selection
    if (selectedSalespersonId && !loadedSalespeople.some(s => s.id === selectedSalespersonId)) {
      setSelectedSalespersonId("");
    }

    const storedPanelModels = localStorage.getItem("panelModels");
    const loadedPanelModels: PanelModel[] = storedPanelModels ? JSON.parse(storedPanelModels) : [];
    setPanelModels(loadedPanelModels);
    // If the currently selected panel model no longer exists, reset selection
    if (selectedPanelModelId && !loadedPanelModels.some(m => m.id === selectedPanelModelId)) {
      setSelectedPanelModelId("");
    }

    const storedAcmBorderModels = localStorage.getItem("acmBorderModels");
    const loadedAcmBorderModels: AcmBorderModel[] = storedAcmBorderModels ? JSON.parse(storedAcmBorderModels) : [];
    setAcmBorderModels(loadedAcmBorderModels);
    // If the currently selected ACM border model no longer exists, reset selection
    if (selectedAcmBorderModelId && !loadedAcmBorderModels.some(m => m.id === selectedAcmBorderModelId)) {
      setSelectedAcmBorderModelId("");
    }
  }, [selectedSalespersonId, selectedPanelModelId, selectedAcmBorderModelId]); // Dependencies for useCallback

  // Load data initially and whenever the window gains focus
  useEffect(() => {
    loadDataFromLocalStorage(); // Initial load

    const handleFocus = () => {
      loadDataFromLocalStorage(); // Reload data when window gains focus
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [loadDataFromLocalStorage]); // Add loadDataFromLocalStorage to dependencies

  // Update panel unit price when selected panel model changes
  useEffect(() => {
    const model = panelModels.find(m => m.id === selectedPanelModelId);
    if (model) {
      setValorUnitarioPainel(model.defaultPrice);
    } else {
      setValorUnitarioPainel("");
    }
  }, [selectedPanelModelId, panelModels]);

  // Update structure unit price when type of face changes
  useEffect(() => {
    setValorUnitarioEstrutura(structurePrices[tipoDeFace] || 0);
  }, [tipoDeFace]);

  // Update ACM border unit price when selected ACM border model changes
  useEffect(() => {
    const model = acmBorderModels.find(m => m.id === selectedAcmBorderModelId);
    if (model) {
      setValorUnitarioBordaAcm(model.defaultPrice);
    } else {
      setValorUnitarioBordaAcm("");
    }
  }, [selectedAcmBorderModelId, acmBorderModels]);

  const handleCalculateBudget = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica dos campos numéricos
    const parsedLargura = parseFloat(largura as string);
    const parsedAltura = parseFloat(altura as string);
    const parsedValorUnitarioPainel = parseFloat(valorUnitarioPainel as string);
    const parsedValorUnitarioEstrutura = parseFloat(valorUnitarioEstrutura as string);
    const parsedDistanciaLocal = parseFloat(distanciaLocal as string);
    const parsedTempoViagem = parseFloat(tempoViagem as string);
    const parsedNumeroFuncionarios = parseFloat(numeroFuncionarios as string);
    const parsedHorasTrabalho = parseFloat(horasTrabalho as string);
    const parsedHorasMunck = parseFloat(horasMunck as string);
    const parsedValorUnitarioBordaAcm = parseFloat(valorUnitarioBordaAcm as string);


    if (
      !selectedSalespersonId ||
      !nomeDoCliente ||
      isNaN(parsedLargura) || parsedLargura <= 0 ||
      isNaN(parsedAltura) || parsedAltura <= 0 ||
      !selectedPanelModelId ||
      isNaN(parsedValorUnitarioPainel) || parsedValorUnitarioPainel <= 0 ||
      isNaN(parsedValorUnitarioEstrutura) || parsedValorUnitarioEstrutura < 0 ||
      isNaN(parsedDistanciaLocal) || parsedDistanciaLocal < 0 ||
      isNaN(parsedTempoViagem) || parsedTempoViagem < 0 ||
      isNaN(parsedNumeroFuncionarios) || parsedNumeroFuncionarios <= 0 ||
      isNaN(parsedHorasTrabalho) || parsedHorasTrabalho < 0 ||
      isNaN(parsedHorasMunck) || parsedHorasMunck < 0 ||
      !controladora ||
      (incluirBorda && (!selectedAcmBorderModelId || isNaN(parsedValorUnitarioBordaAcm) || parsedValorUnitarioBordaAcm <= 0))
    ) {
      showError("Por favor, preencha todos os campos obrigatórios com valores válidos.");
      return;
    }

    const budgetData = {
      propostaEmNomeDe: salespeople.find(s => s.id === selectedSalespersonId)?.name,
      nomeDoCliente,
      tipoDeFace,
      dimensoes: { largura: parsedLargura, altura: parsedAltura },
      modeloDoPainel: panelModels.find(m => m.id === selectedPanelModelId)?.name,
      valorUnitarioPainel: parsedValorUnitarioPainel,
      valorUnitarioEstrutura: parsedValorUnitarioEstrutura,
      incluirBorda,
      modeloBordaAcm: incluirBorda ? acmBorderModels.find(m => m.id === selectedAcmBorderModelId)?.name : undefined,
      valorUnitarioBordaAcm: incluirBorda ? parsedValorUnitarioBordaAcm : undefined,
      instalacao: {
        distanciaLocal: parsedDistanciaLocal,
        tempoViagem: parsedTempoViagem,
        numeroFuncionarios: parsedNumeroFuncionarios,
        horasTrabalho: parsedHorasTrabalho,
        horasMunck: parsedHorasMunck,
      },
      controladora,
      incluirPilarFerro,
      oferecerLocacao,
    };

    console.log("Dados do Orçamento do Painel de LED:", budgetData);
    showSuccess("Orçamento calculado com sucesso! (Dados logados no console)");
    // Aqui você integraria a lógica real de cálculo e exibição do orçamento
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Configurar Painel de LED</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCalculateBudget} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="propostaEmNomeDe">Proposta em nome de:</Label>
              <div className="flex items-center space-x-2">
                <Select value={selectedSalespersonId} onValueChange={setSelectedSalespersonId} required>
                  <SelectTrigger id="propostaEmNomeDe">
                    <SelectValue placeholder="Selecione um vendedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {salespeople.map((salesperson) => (
                      <SelectItem key={salesperson.id} value={salesperson.id}>
                        {salesperson.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={() => navigate("/salesperson-registration")} aria-label="Cadastrar novo vendedor">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="nomeDoCliente">Nome do Cliente:</Label>
              <Input
                id="nomeDoCliente"
                type="text"
                value={nomeDoCliente}
                onChange={(e) => setNomeDoCliente(e.target.value)}
                placeholder="Ex: Marcelo"
                required
              />
            </div>
          </div>

          <div>
            <Label>Tipo de Face:</Label>
            <RadioGroup
              value={tipoDeFace}
              onValueChange={setTipoDeFace}
              className="flex flex-col space-y-1 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="uma_face" id="uma_face" />
                <Label htmlFor="uma_face">Uma Face</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dupla_face" id="dupla_face" />
                <Label htmlFor="dupla_face">Dupla Face</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dupla_face_led_angulo" id="dupla_face_led_angulo" />
                <Label htmlFor="dupla_face_led_angulo">Dupla Face LED com Ângulo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dupla_face_led_lona" id="dupla_face_led_lona" />
                <Label htmlFor="dupla_face_led_lona">Dupla Face LED com LONA</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dupla_face_angulo_led_lona" id="dupla_face_angulo_led_lona" />
                <Label htmlFor="dupla_face_angulo_led_lona">Dupla Face com Ângulo LED com LONA</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="largura">Largura (m):</Label>
              <Input
                id="largura"
                type="number"
                step="0.01"
                value={largura}
                onChange={(e) => setLargura(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label htmlFor="altura">Altura (m):</Label>
              <Input
                id="altura"
                type="number"
                step="0.01"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="modeloDoPainel">Modelo do Painel:</Label>
            <div className="flex items-center space-x-2">
              <Select value={selectedPanelModelId} onValueChange={setSelectedPanelModelId} required>
                <SelectTrigger id="modeloDoPainel">
                  <SelectValue placeholder="Selecione um modelo de painel" />
                </SelectTrigger>
                <SelectContent>
                  {panelModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={() => navigate("/panel-model-registration")} aria-label="Cadastrar novo modelo de painel">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="valorUnitarioPainel">Valor Unitário do Painel (R$):</Label>
              <Input
                id="valorUnitarioPainel"
                type="number"
                step="0.01"
                value={valorUnitarioPainel}
                onChange={(e) => setValorUnitarioPainel(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label htmlFor="valorUnitarioEstrutura">Valor Unitário da Estrutura (R$):</Label>
              <Input
                id="valorUnitarioEstrutura"
                type="number"
                step="0.01"
                value={valorUnitarioEstrutura}
                onChange={(e) => setValorUnitarioEstrutura(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="incluirBorda"
              checked={incluirBorda}
              onCheckedChange={(checked) => {
                setIncluirBorda(checked === true);
                if (checked === false) {
                  setSelectedAcmBorderModelId("");
                  setValorUnitarioBordaAcm("");
                }
              }}
            />
            <Label htmlFor="incluirBorda">Incluir borda no pedido?</Label>
          </div>

          {incluirBorda && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="modeloBordaAcm">Modelo de Borda ACM:</Label>
                <div className="flex items-center space-x-2">
                  <Select value={selectedAcmBorderModelId} onValueChange={setSelectedAcmBorderModelId} required={incluirBorda}>
                    <SelectTrigger id="modeloBordaAcm">
                      <SelectValue placeholder="Selecione um modelo de borda ACM" />
                    </SelectTrigger>
                    <SelectContent>
                      {acmBorderModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon" onClick={() => navigate("/acm-border-model-registration")} aria-label="Cadastrar novo modelo de borda ACM">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="valorUnitarioBordaAcm">Valor Unitário da Borda ACM (R$):</Label>
                <Input
                  id="valorUnitarioBordaAcm"
                  type="number"
                  step="0.01"
                  value={valorUnitarioBordaAcm}
                  onChange={(e) => setValorUnitarioBordaAcm(e.target.value)}
                  placeholder="0.00"
                  required={incluirBorda}
                />
              </div>
            </div>
          )}

          <h3 className="text-lg font-semibold mt-6 mb-4">Seção de Instalação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="distanciaLocal">Distância até o local (km):</Label>
              <Input
                id="distanciaLocal"
                type="number"
                step="0.1"
                value={distanciaLocal}
                onChange={(e) => setDistanciaLocal(e.target.value)}
                placeholder="0.0"
                required
              />
            </div>
            <div>
              <Label htmlFor="tempoViagem">Tempo de viagem (h):</Label>
              <Input
                id="tempoViagem"
                type="number"
                step="0.1"
                value={tempoViagem}
                onChange={(e) => setTempoViagem(e.target.value)}
                placeholder="0.0"
                required
              />
            </div>
            <div>
              <Label htmlFor="numeroFuncionarios">Nº de Funcionários:</Label>
              <Input
                id="numeroFuncionarios"
                type="number"
                step="1"
                value={numeroFuncionarios}
                onChange={(e) => setNumeroFuncionarios(e.target.value)}
                placeholder="1"
                required
              />
            </div>
            <div>
              <Label htmlFor="horasTrabalho">Horas de trabalho:</Label>
              <Input
                id="horasTrabalho"
                type="number"
                step="0.5"
                value={horasTrabalho}
                onChange={(e) => setHorasTrabalho(e.target.value)}
                placeholder="0.0"
                required
              />
            </div>
            <div>
              <Label htmlFor="horasMunck">Horas MUNCK:</Label>
              <Input
                id="horasMunck"
                type="number"
                step="0.5"
                value={horasMunck}
                onChange={(e) => setHorasMunck(e.target.value)}
                placeholder="0.0"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="controladora">Controladora:</Label>
            <Select value={controladora} onValueChange={setControladora} required>
              <SelectTrigger id="controladora">
                <SelectValue placeholder="Selecione a controladora" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="novastar_tb1">Controladora de vídeo - Novastar TB1</SelectItem>
                <SelectItem value="outra_controladora">Outra Controladora</SelectItem>
                {/* Adicione mais opções conforme necessário */}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="incluirPilarFerro"
              checked={incluirPilarFerro}
              onCheckedChange={(checked) => setIncluirPilarFerro(checked === true)}
            />
            <Label htmlFor="incluirPilarFerro">Incluir pilar de ferro?</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="oferecerLocacao"
              checked={oferecerLocacao}
              onCheckedChange={(checked) => setOferecerLocacao(checked === true)}
            />
            <Label htmlFor="oferecerLocacao">Oferecer opção de locação?</Label>
          </div>

          <Button type="submit" className="w-full">
            Calcular Orçamento
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LedPanelConfigurator;