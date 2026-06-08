/* eslint-disable prettier/prettier */
import { describe, it, expect } from "vitest";

import { parseFileContents } from "../../data/blob";

describe("TDD - Ciclo: Rejeição de XMLs não-SVG", () => {
it("Deve lançar erro descritivo se o arquivo for um SVG válido mas sem cena Excalidraw embutida", async () => {
    const svgSemCena = `<svg xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" /></svg>`;

    const fileMock = new File([svgSemCena], "vetor_comum.excalidraw", {
      type: "application/vnd.excalidraw+json",
    });

    await expect(parseFileContents(fileMock)).rejects.toThrow(
      "Image doesn't contain scene"
    );
  });
});
