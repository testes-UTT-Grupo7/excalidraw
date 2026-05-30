import { limitarTexto } from "../src/textLimit";
import { describe, it, expect } from "vitest";

describe("TDD - limitarTexto", () => {
    it("Ciclo 1 (Ana): Deve retornar o texto original se for menor que o limite", () => {
        const textoPequeno = "Olá Excalidraw";
        // Esperamos que ele não corte nada e retorne igual
        expect(limitarTexto(textoPequeno, 1000)).toBe("Olá Excalidraw");
    });
});
