import { limitarTexto } from "../src/textLimit";
import { describe, it, expect } from "vitest";

describe("TDD - limitarTexto", () => {
    it("Ciclo 1 (Ana): Deve retornar o texto original se for menor que o limite", () => {
        const textoPequeno = "Olá Excalidraw";
        expect(limitarTexto(textoPequeno, 1000)).toBe("Olá Excalidraw");
    });
    it("Ciclo 2 (Ana): Deve cortar o texto se for maior que o limite", () => {
        const textoGrande = "abcdefghij"; 
        expect(limitarTexto(textoGrande, 5).length).toBe(5);
    });
    it("Ciclo 3 (Ana): Deve adicionar reticências '...' ao final se o texto for cortado", () => {
        const textoGrande = "abcdefghij"; 
        expect(limitarTexto(textoGrande, 5)).toBe("ab...");
    });

    it("Ciclo 4 (Pedro): Deve retornar vazio se o texto for vazio ou indefinido", () => {
        expect(limitarTexto("")).toBe("");
        expect(limitarTexto(undefined as any)).toBe("");
    });

    it("Ciclo 5 (Pedro): Deve retornar vazio se o limite for zero ou negativo", () => {
        expect(limitarTexto("Excalidraw", 0)).toBe("");
        expect(limitarTexto("Excalidraw", -5)).toBe("");
    });

    it("Ciclo 6 (Pedro): Deve remover espaços no inicio e fim (trim) antes de calcular", () => {
        const textoComEspaco = "   texto   ";
        expect(limitarTexto(textoComEspaco, 10)).toBe("texto");
    });


});
