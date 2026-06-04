import { newTextElement, newElement } from "../src/newElement";
import { newElementWith } from "../src/mutateElement";
import {
  DEFAULT_FONT_FAMILY,
  DEFAULT_FONT_SIZE,
  DEFAULT_TEXT_ALIGN,
  DEFAULT_VERTICAL_ALIGN,
} from "@excalidraw/common";
import { vi, describe, it, expect } from "vitest";

describe("newTextElement", () => {

  describe("Testes de Caixa Preta", () => {

    it("CP01: deve criar um elemento de texto com propriedades e coordenadas válidas (CE1, CE5, CE7, CE9, CE12, CE15)", () => {
      const opts = {
        text: "Hello World!",
        x: 100,
        y: 100,
      };

      const element = newTextElement(opts);

      expect(element.type).toBe("text");
      expect(element.text).toBe("Hello World!");
      expect(element.x).toBeDefined();
      expect(element.y).toBeDefined();
      expect(element.fontSize).toBe(DEFAULT_FONT_SIZE); 
      expect(element.strokeColor).toBeDefined(); 
    });

    it("CP02: deve criar elemento aplicando propriedades opcionais como fontSize e strokeColor (CE1, CE5, CE7, CE9, CE11, CE14)", () => {
      const opts = {
        text: "Hello World!",
        x: 100,
        y: 100,
        fontSize: 20,
        strokeColor: "#5f3dc4",
      };

      const element = newTextElement(opts);

      expect(element.fontSize).toBe(20);
      expect(element.strokeColor).toBe("#5f3dc4");
    });

    it("CP03: deve criar um elemento de tipo válido diferente de 'text', ignorando o campo text (CE2)", () => {
      const element = newElement({
        type: "rectangle",
        x: 100,
        y: 100,
      });

      expect(element.type).toBe("rectangle");
      expect((element as any).text).toBeUndefined();
    });

    it("CP04: deve criar um elemento com type string inválida sem erro de runtime (CE3)", () => {
      const element = newElement({
        // @ts-expect-error testando type com string inválida
        type: "inválido",
        x: 100,
        y: 100,
      });

      expect(element.type).toBe("inválido");
    });

    it("CP05: deve criar um elemento com type null sem erro de runtime (CE4)", () => {
      const element = newElement({
        // @ts-expect-error testando type com valor null
        type: null,
        x: 100,
        y: 100,
      });

      expect(element.type).toBeNull();
    });

    it("CP06: deve aceitar tipo primitivo inválido para x sem lançar erro (CE6)", () => {
      const element = newTextElement({
        text: "Hello World!",
        // @ts-expect-error testando x com tipo primitivo diferente de number
        x: "inválido",
        y: 100,
      });

      expect(element.x).toBeNaN();
    });

    it("CP07: deve aceitar tipo primitivo inválido para y sem lançar erro (CE8)", () => {
      const element = newTextElement({
        text: "Hello World!",
        x: 100,
        // @ts-expect-error testando y com tipo primitivo diferente de number
        y: "inválido",
      });

      expect(element.y).toBeNaN();
    });

    it("CP08: deve lançar erro ao passar número como text (CE10)", () => {
      expect(() => {
        newTextElement({
          // @ts-expect-error testando text com tipo primitivo diferente de string
          text: 12345,
          x: 100,
          y: 100,
        });
      }).toThrow();
    });

    it("CP09: deve aceitar tipo primitivo inválido para fontSize (CE13)", () => {
      const element = newTextElement({
        text: "Hello World!",
        x: 100,
        y: 100,
        // @ts-expect-error testando fontSize com tipo primitivo diferente de number
        fontSize: "inválido",
      });

      expect(element.fontSize).toBe("inválido");
    });

    it("CP10: deve aceitar strokeColor com string que não é código hexadecimal (CE16)", () => {
      const element = newTextElement({
        text: "Hello World!",
        x: 100,
        y: 100,
        strokeColor: "inválido",
      });

      expect(element.strokeColor).toBe("inválido");
    });

    it("CP11: deve aceitar tipo primitivo inválido para strokeColor (CE17)", () => {
      const element = newTextElement({
        text: "Hello World!",
        x: 100,
        y: 100,
        // @ts-expect-error testando strokeColor com tipo primitivo diferente de string
        strokeColor: 1,
      });

      expect(element.strokeColor).toBe(1);
    });
  });

  describe("Testes de Caixa Branca", () => {

    it("CB01: Alinhamento centro/meio com valores no limite exato (-1e6), sem erro (C1-V, C3-V, C4-F a C11-F, C12-F, C16-V, C17-V, D1=FFFFFFFF, D3=VV)", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      const opts = {
        text: "Teste Limite",
        x: -1000000,         
        y: -1000000,         
        width: -1000000,     
        height: -1000000,    
        textAlign: "center" as const,     
        verticalAlign: "middle" as const, 
      };

      const element = newTextElement(opts);

      expect(consoleSpy).not.toHaveBeenCalled();

      expect(element.textAlign).toBe("center");
      expect(element.x).toBeLessThan(opts.x); 

      expect(element.verticalAlign).toBe("middle");
      expect(element.y).toBeLessThan(opts.y); 

      expect(element.version).toBe(1);

      const updated = newElementWith(element, { customData: undefined } as any);
      expect(updated).toBe(element); 

      consoleSpy.mockRestore();
    });

    it("CB02: Alinhamento direita/cima com valores no limite exato (+1e6), sem erro, D2=VVF (C1-F, C2-V, C3-F, C12-V, C13-V, C14-V, C15-F, D1=FFFFFFFF)", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      const opts = {
        text: "Teste Limite Alto",
        x: 1000000,         
        y: 1000000,         
        width: 1000000,     
        height: 1000000,    
        textAlign: "right" as const, 
      };

      const element = newTextElement(opts);

      expect(consoleSpy).not.toHaveBeenCalled();

      expect(element.textAlign).toBe("right");
      expect(element.x).toBeLessThan(opts.x); 

      expect(element.y).toBe(opts.y); 

      const updated = newElementWith(element, { opacity: element.opacity });
      expect(updated).toBe(element); 

      consoleSpy.mockRestore();
    });

    it("CB03: Alinhamento esquerda com alteração de valor, D2=FVF, D3=FV (C2-F, C13-F, C16-F, D2-FVF, D3-FV)", () => {
      const element = newTextElement({
        text: "Texto Normal",
        x: 100,
        y: 100,
        width: 100,
        height: 100
      });

      expect(element.textAlign).toBe(DEFAULT_TEXT_ALIGN);

      const novaOpacidade = element.opacity === 50 ? 60 : 50;
      const updated = newElementWith(element, { opacity: novaOpacidade });

      expect(updated).not.toBe(element); 
      expect(updated.opacity).toBe(novaOpacidade);
      expect(updated.version).toBe(element.version + 1);
    });

    it("CB04: Atualização com valor null igual ao existente, D2=VFV (C13-V, C14-F, C15-V, C16-V, D2-VFV)", () => {
      const element = newTextElement({
        text: "Texto Normal",
        x: 100,
        y: 100,
        width: 100,
        height: 100
      });

      expect(element.containerId).toBeNull();

      const updated = newElementWith(element, { containerId: null } as any);

      expect(updated).toBe(element); 
    });

    it("CB05: Atualização com array de mesma referência, D2=VFF (C13-V, C14-F, C15-F, C16-F, D2-VFF)", () => {
      const element = newTextElement({
        text: "Texto Normal",
        x: 100,
        y: 100,
        width: 100,
        height: 100
      });

      const mesmoArray = element.groupIds;

      const updated = newElementWith(element, { groupIds: mesmoArray });

      expect(updated).not.toBe(element); 
      expect(updated.version).toBe(element.version + 1);
    });

    it("CB06: Apenas x < -1e6, D1=VFFFFFFF (C4-V)", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      newTextElement({
        text: "Teste",
        x: -1000001, 
        y: 100,      
        width: 100,
        height: 100
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "New element size or position is too large",
        expect.any(Object),
      );

      consoleSpy.mockRestore();
    });

    it("CB07: Apenas x > 1e6, D1=FVFFFFFF (C5-V)", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      newTextElement({
        text: "Teste",
        x: 1000001, 
        y: 100,     
        width: 100,
        height: 100
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "New element size or position is too large",
        expect.any(Object),
      );

      consoleSpy.mockRestore();
    });

    it("CB08: Apenas y < -1e6, D1=FFVFFFFF (C6-V)", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      newTextElement({
        text: "Teste",
        x: 100,      
        y: -1000001, 
        width: 100,
        height: 100
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "New element size or position is too large",
        expect.any(Object),
      );

      consoleSpy.mockRestore();
    });

    it("CB09: Apenas y > 1e6, D1=FFFVFFFF (C7-V)", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      newTextElement({
        text: "Teste",
        x: 100,     
        y: 1000001, 
        width: 100,
        height: 100
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "New element size or position is too large",
        expect.any(Object),
      );

      consoleSpy.mockRestore();
    });

    it("CB10: Apenas width < -1e6, D1=FFFFVFFF (C8-V)", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      newTextElement({
        text: "Teste",
        x: 100,         
        y: 100,          
        width: -1000001, 
        height: 100
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "New element size or position is too large",
        expect.any(Object),
      );

      consoleSpy.mockRestore();
    });

    it("CB11: Apenas width > 1e6, D1=FFFFFVFF (C9-V)", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      newTextElement({
        text: "Teste",
        x: 100,
        y: 100,
        width: 1000001, 
        height: 100
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "New element size or position is too large",
        expect.any(Object),
      );

      consoleSpy.mockRestore();
    });

    it("CB12: Apenas height < -1e6, D1=FFFFFFVF (C10-V)", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      newTextElement({
        text: "Teste",
        x: 100,
        y: 100,
        height: -1000001, 
        width: 100,
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "New element size or position is too large",
        expect.any(Object),
      );

      consoleSpy.mockRestore();
    });

    it("CB13: Apenas height > 1e6, D1=FFFFFFFV (C11-V)", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

      newTextElement({
        text: "Teste",
        x: 100,
        y: 100,
        height: 1000001, 
        width: 100
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        "New element size or position is too large",
        expect.any(Object),
      );

      consoleSpy.mockRestore();
    });
  });
});