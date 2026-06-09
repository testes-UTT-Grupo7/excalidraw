import { describe, it, expect } from "vitest";
import { actionPasteStyles, actionCopyStyles } from "./actionStyles"; 

describe("Perspectiva Caixa-Branca: actionPasteStyles (MC/DC para Setas)", () => {
  
  const simularCopia = (elemento: any) => {
    const mockApp = { scene: { getNonDeletedElementsMap: () => new Map() } } as any;
    const appState = { selectedElementIds: { [elemento.id]: true } } as any;
    actionCopyStyles.perform([elemento], appState, null as any, mockApp);
  };

  // CB1: Condição A (True) e Condição B (True)
  it("deve copiar as pontas da seta se ambos (origem e destino) forem setas", () => {
    const setaCopiada = { id: "seta-1", type: "arrow", startArrowhead: "arrow", endArrowhead: "triangle" } as any;
    simularCopia(setaCopiada); 

    const elementosNaTela = [{ id: "seta-2", type: "arrow", startArrowhead: null, endArrowhead: null }] as any;
    const appState = { selectedElementIds: { "seta-2": true } } as any;
    const mockApp = { scene: { getNonDeletedElementsMap: () => new Map() } } as any;

    const resultado = actionPasteStyles.perform(elementosNaTela, appState, null as any, mockApp);

    expect((resultado.elements[0] as any).startArrowhead).toBe("arrow");
    expect((resultado.elements[0] as any).endArrowhead).toBe("triangle");
  });

  // CB2: Condição A (True) e Condição B (False)
  it("não deve sobrescrever as pontas se o destino for seta, mas a origem for um retângulo", () => {
    const retanguloCopiado = { id: "ret-1", type: "rectangle", backgroundColor: "red" } as any;
    simularCopia(retanguloCopiado); 

    const elementosNaTela = [{ id: "seta-2", type: "arrow", startArrowhead: "dot", endArrowhead: null }] as any;
    const appState = { selectedElementIds: { "seta-2": true } } as any;
    const mockApp = { scene: { getNonDeletedElementsMap: () => new Map() } } as any;

    const resultado = actionPasteStyles.perform(elementosNaTela, appState, null as any, mockApp);

    expect((resultado.elements[0] as any).startArrowhead).toBe("dot");
  });

  // CB3: Condição A (False) e Condição B (Não avaliada)
  it("deve ignorar a lógica de pontas de seta se o destino for um retângulo", () => {
    const setaCopiada = { id: "seta-1", type: "arrow", startArrowhead: "arrow" } as any;
    simularCopia(setaCopiada);

    const elementosNaTela = [{ id: "ret-2", type: "rectangle", backgroundColor: "blue" }] as any;
    const appState = { selectedElementIds: { "ret-2": true } } as any;
    const mockApp = { scene: { getNonDeletedElementsMap: () => new Map() } } as any;

    const resultado = actionPasteStyles.perform(elementosNaTela, appState, null as any, mockApp);

    expect((resultado.elements[0] as any).startArrowhead).toBeUndefined();
  });
});

describe("Perspectiva Caixa-Preta: actionPasteStyles (Particionamento e Limites)", () => {
  
  const simularCopia = (elemento: any) => {
    const mockApp = { scene: { getNonDeletedElementsMap: () => new Map() } } as any;
    const appState = { selectedElementIds: { [elemento.id]: true } } as any;
    actionCopyStyles.perform([elemento], appState, null as any, mockApp);
  };

  // PE1: Particionamento de Equivalência (Entrada Inválida)
  it("deve abortar e não alterar nada se o estilo copiado não for um elemento válido", () => {
    const estiloInvalido = { id: "invalido", type: "invalido" } as any;
    simularCopia(estiloInvalido);

    const elementosNaTela = [{ id: "1", type: "rectangle", backgroundColor: "blue" }] as any;
    const appState = { selectedElementIds: { "1": true } } as any;
    const mockApp = { scene: { getNonDeletedElementsMap: () => new Map() } } as any;

    const resultado = actionPasteStyles.perform(elementosNaTela, appState, null as any, mockApp);

    expect(resultado.elements).toBe(elementosNaTela);
  });

  // PE2: Particionamento de Equivalência (Regra de Negócio)
  it("não deve aplicar estilos em elementos que não estão selecionados", () => {
    const retanguloCopiado = { id: "ret-1", type: "rectangle", backgroundColor: "red" } as any;
    simularCopia(retanguloCopiado);

    const elementosNaTela = [
      { id: "selecionado", type: "rectangle", backgroundColor: "blue" },
      { id: "nao-selecionado", type: "rectangle", backgroundColor: "green" }
    ] as any;
    
    const appState = { selectedElementIds: { "selecionado": true } } as any;
    const mockApp = { scene: { getNonDeletedElementsMap: () => new Map() } } as any;

    const resultado = actionPasteStyles.perform(elementosNaTela, appState, null as any, mockApp);

    expect((resultado.elements[0] as any).backgroundColor).toBe("red");
    expect((resultado.elements[1] as any).backgroundColor).toBe("green");
  });

  // CP1: Análise de Regra Especial / Exceção (Comportamento de Sobrescrita)
  it("deve forçar background transparente e roundness nulo se o destino for um Frame", () => {
    const retanguloCopiado = { id: "rect-1", type: "rectangle", backgroundColor: "red", roundness: { type: 1 } } as any;
    simularCopia(retanguloCopiado);

    const elementosNaTela = [{ id: "frame-1", type: "frame", backgroundColor: "blue" }] as any;
    const appState = { selectedElementIds: { "frame-1": true } } as any;
    const mockApp = { scene: { getNonDeletedElementsMap: () => new Map() } } as any;

    const resultado = actionPasteStyles.perform(elementosNaTela, appState, null as any, mockApp);

    expect((resultado.elements[0] as any).backgroundColor).toBe("transparent");
    expect((resultado.elements[0] as any).roundness).toBeNull();
  });
});