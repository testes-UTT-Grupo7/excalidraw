import { arrayToMap, reseed } from "@excalidraw/common";
import { type GlobalPoint, type LocalPoint, pointFrom } from "@excalidraw/math";
import { Excalidraw } from "@excalidraw/excalidraw";
import { API } from "@excalidraw/excalidraw/tests/helpers/api";
import { UI } from "@excalidraw/excalidraw/tests/helpers/ui";
import "@excalidraw/utils/test-utils";
import { render } from "@excalidraw/excalidraw/tests/test-utils";

import * as distance from "../src/distance";
import { hitElementItself, isPointInElement } from "../src/collision";

describe("check rotated elements can be hit:", () => {
  beforeEach(async () => {
    localStorage.clear();
    reseed(7);
    await render(<Excalidraw handleKeyboardGlobally={true} />);
  });

  it("arrow", () => {
    UI.createElement("arrow", {
      x: 0,
      y: 0,
      width: 124,
      height: 302,
      angle: 1.8700426423973724,
      points: [
        [0, 0],
        [120, -198],
        [-4, -302],
      ] as LocalPoint[],
    });
    const hit = hitElementItself({
      point: pointFrom<GlobalPoint>(88, -68),
      element: window.h.elements[0],
      threshold: 10,
      elementsMap: window.h.scene.getNonDeletedElementsMap(),
    });
    expect(hit).toBe(true);
  });
});

describe("hitElementItself cache", () => {
  beforeEach(async () => {
    // reset cache
    hitElementItself({
      point: pointFrom<GlobalPoint>(50, 50),
      element: API.createElement({
        type: "rectangle",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        backgroundColor: "#ffffff",
      }),
      threshold: Infinity,
      elementsMap: new Map([]),
    });

    localStorage.clear();
    reseed(7);
    await render(<Excalidraw handleKeyboardGlobally={true} />);
  });

  it("reuses cached result when threshold increases", () => {
    const element = API.createElement({
      type: "rectangle",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      backgroundColor: "#ffffff",
    });
    const elementsMap = arrayToMap([element]);
    const point = pointFrom<GlobalPoint>(100.5, 50);

    const distanceSpy = jest.spyOn(distance, "distanceToElement");

    expect(
      hitElementItself({
        point,
        element,
        threshold: 1,
        elementsMap,
      }),
    ).toBe(true);

    expect(distanceSpy).toHaveBeenCalledTimes(1);

    expect(
      hitElementItself({
        point,
        element,
        threshold: 10,
        elementsMap,
      }),
    ).toBe(true);

    expect(distanceSpy).toHaveBeenCalledTimes(1);

    distanceSpy.mockRestore();
  });

  it("does not reuse cache when threshold decreases", () => {
    const element = API.createElement({
      type: "rectangle",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      backgroundColor: "transparent",
    });
    const elementsMap = arrayToMap([element]);
    const point = pointFrom<GlobalPoint>(105, 50);

    const distanceSpy = jest.spyOn(distance, "distanceToElement");

    expect(
      hitElementItself({
        point,
        element,
        threshold: 10,
        elementsMap,
      }),
    ).toBe(true);

    expect(distanceSpy).toHaveBeenCalledTimes(1);

    expect(
      hitElementItself({
        point,
        element,
        threshold: 6,
        elementsMap,
      }),
    ).toBe(true);

    expect(distanceSpy).toHaveBeenCalledTimes(2);
    distanceSpy.mockRestore();
  });

  it("invalidates cache when element version changes", () => {
    const element = API.createElement({
      type: "rectangle",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      backgroundColor: "#ffffff",
    });
    const elementsMap = arrayToMap([element]);
    const point = pointFrom<GlobalPoint>(100.5, 50);

    const distanceSpy = jest.spyOn(distance, "distanceToElement");

    expect(
      hitElementItself({
        point,
        element,
        threshold: 1,
        elementsMap,
      }),
    ).toBe(true);

    expect(distanceSpy).toHaveBeenCalledTimes(1);

    const movedElement = {
      ...element,
      version: element.version + 1,
      versionNonce: element.versionNonce + 1,
    };

    expect(
      hitElementItself({
        point,
        element: movedElement,
        threshold: 1,
        elementsMap,
      }),
    ).toBe(true);

    expect(distanceSpy).toHaveBeenCalledTimes(2);
    distanceSpy.mockRestore();
  });

  it("override does not affect caching", () => {
    const element = API.createElement({
      type: "rectangle",
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      backgroundColor: "transparent",
    });
    const elementsMap = arrayToMap([element]);
    const point = pointFrom<GlobalPoint>(50, 50);

    const distanceSpy = jest.spyOn(distance, "distanceToElement");

    expect(
      hitElementItself({
        point,
        element,
        threshold: 10,
        elementsMap,
      }),
    ).toBe(false);

    expect(distanceSpy).toHaveBeenCalledTimes(1);

    expect(
      hitElementItself({
        point,
        element,
        threshold: 10,
        elementsMap,
        overrideShouldTestInside: true,
      }),
    ).toBe(true);
  });
});

describe("isPointInElement - Caixa Branca e Caixa Preta", () => {
  const elementsMap = new Map();

  describe("Caixa-Branca (MC/DC Coverage)", () => {
    // Decisão analisada: (isLinearElement(element) || isFreeDrawElement(element)) && !isPathALoop(element.points)

    it("CT01: Linha Reta (Linear = true, FreeDraw = false, Loop = false) -> Deve retornar false", () => {
      const line = API.createElement({
        type: "line",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        points: [[0, 0], [100, 100]] as any
      });
      const point = pointFrom<GlobalPoint>(50, 50);
      expect(isPointInElement(point, line, elementsMap)).toBe(false);
    });

    it("CT02: Retângulo (Linear = false, FreeDraw = false, Loop = ignorado) -> Deve testar colisão", () => {
      const rect = API.createElement({
        type: "rectangle",
        x: 0,
        y: 0,
        width: 100,
        height: 100
      });
      const point = pointFrom<GlobalPoint>(50, 50);
      expect(isPointInElement(point, rect, elementsMap)).toBe(true);
    });

    it("CT03: FreeDraw Aberto (Linear = false, FreeDraw = true, Loop = false) -> Deve retornar false", () => {
      const freeDraw = API.createElement({
        type: "freedraw",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        points: [[0, 0], [50, 50], [100, 0]] as any
      });
      const point = pointFrom<GlobalPoint>(50, 25);
      expect(isPointInElement(point, freeDraw, elementsMap)).toBe(false);
    });

    it("CT04: Linha Fechada/Triângulo (Linear = true, FreeDraw = false, Loop = true) -> Deve testar colisão", () => {
      const loopLine = API.createElement({
        type: "line",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        points: [[0, 0], [100, 0], [50, 100], [0, 0]] as any
      });
      const point = pointFrom<GlobalPoint>(50, 50);
      expect(isPointInElement(point, loopLine, elementsMap)).toBe(true);
    });
  });

  describe("Caixa-Preta (Valor Limite)", () => {
    it("CT05: Ponto claramente dentro do Retângulo (Dentro)", () => {
      const rect = API.createElement({ type: "rectangle", x: 0, y: 0, width: 100, height: 100 });
      expect(isPointInElement(pointFrom<GlobalPoint>(50, 50), rect, elementsMap)).toBe(true);
    });

    it("CT06: Ponto claramente fora do Retângulo (Fora)", () => {
      const rect = API.createElement({ type: "rectangle", x: 0, y: 0, width: 100, height: 100 });
      expect(isPointInElement(pointFrom<GlobalPoint>(200, 200), rect, elementsMap)).toBe(false);
    });

    it("CT07: Ponto exatamente sobre a aresta (Contorno/Limite)", () => {
      const rect = API.createElement({ type: "rectangle", x: 0, y: 0, width: 100, height: 100 });
      // Retorna false pois isPointInElement testa estritamente o interior (o contorno é tratado por isPointOnElementOutline)
      expect(isPointInElement(pointFrom<GlobalPoint>(100, 50), rect, elementsMap)).toBe(false);
    });

    it("CT08: Ray-casting no exato vértice (Quina/Extremo Limite)", () => {
      const diamond = API.createElement({ type: "diamond", x: 0, y: 0, width: 100, height: 100 });
      expect(isPointInElement(pointFrom<GlobalPoint>(50, 50), diamond, elementsMap)).toBe(true);
    });
  });
});

