import { limitarTexto } from "../src/textLimit";
import { describe, it, expect } from "vitest";

describe("TDD - limitarTexto", () => {
    it("Ciclo 1 (Ana): Deve retornar o texto original se for menor que o limite", () => {
        const textoPequeno = "Olá Excalidraw";
        // Esperamos que ele não corte nada e retorne igual
        expect(limitarTexto(textoPequeno, 1000)).toBe("Olá Excalidraw");
    });
    it("Ciclo 2 (Ana): Deve cortar o texto se for maior que o limite", () => {
        const textoGrande = "abcdefghij"; // 10 letras
        // Se o limite for 5, esperamos que ele corte e retorne tamanho 5
        expect(limitarTexto(textoGrande, 5).length).toBe(5);
    });
    it("Ciclo 3 (Ana): Deve adicionar reticências '...' ao final se o texto for cortado", () => {
        const textoGrande = "abcdefghij"; // 10 letras
        // Se o limite for 5, ele não pode retornar "abcde...", pois isso teria 8 letras.
        // Ele deve retornar "ab..." (tamanho final = 5)
        expect(limitarTexto(textoGrande, 5)).toBe("ab...");
    });


});
