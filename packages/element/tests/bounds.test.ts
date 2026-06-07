import { pointFrom } from "@excalidraw/math";

import { arrayToMap, ROUNDNESS } from "@excalidraw/common";

import type { LocalPoint } from "@excalidraw/math";

import {
  getElementAbsoluteCoords,
  getElementBounds,
  getCommonBounds,
} from "../src/bounds";

import type { ExcalidrawElement, ExcalidrawLinearElement } from "../src/types";

const _ce = ({
  x,
  y,
  w,
  h,
  a,
  t,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  a?: number;
  t?: string;
}) =>
  ({
    type: t || "rectangle",
    strokeColor: "#000",
    backgroundColor: "#000",
    fillStyle: "solid",
    strokeWidth: 1,
    roundness: { type: ROUNDNESS.PROPORTIONAL_RADIUS },
    roughness: 0,
    opacity: 1,
    x,
    y,
    width: w,
    height: h,
    angle: a,
  } as ExcalidrawElement);

describe("getElementAbsoluteCoords", () => {
  it("test x1 coordinate", () => {
    const element = _ce({ x: 10, y: 20, w: 10, h: 0 });
    const [x1] = getElementAbsoluteCoords(element, arrayToMap([element]));
    expect(x1).toEqual(10);
  });

  it("test x2 coordinate", () => {
    const element = _ce({ x: 10, y: 20, w: 10, h: 0 });
    const [, , x2] = getElementAbsoluteCoords(element, arrayToMap([element]));
    expect(x2).toEqual(20);
  });

  it("test y1 coordinate", () => {
    const element = _ce({ x: 0, y: 10, w: 0, h: 10 });
    const [, y1] = getElementAbsoluteCoords(element, arrayToMap([element]));
    expect(y1).toEqual(10);
  });

  it("test y2 coordinate", () => {
    const element = _ce({ x: 0, y: 10, w: 0, h: 10 });
    const [, , , y2] = getElementAbsoluteCoords(element, arrayToMap([element]));
    expect(y2).toEqual(20);
  });
});

describe("getElementBounds", () => {
  it("rectangle", () => {
    const element = _ce({
      x: 40,
      y: 30,
      w: 20,
      h: 10,
      a: Math.PI / 4,
      t: "rectangle",
    });
    const [x1, y1, x2, y2] = getElementBounds(element, arrayToMap([element]));
    expect(x1).toEqual(39.39339828220179);
    expect(y1).toEqual(24.393398282201787);
    expect(x2).toEqual(60.60660171779821);
    expect(y2).toEqual(45.60660171779821);
  });

  it("diamond", () => {
    const element = _ce({
      x: 40,
      y: 30,
      w: 20,
      h: 10,
      a: Math.PI / 4,
      t: "diamond",
    });

    const [x1, y1, x2, y2] = getElementBounds(element, arrayToMap([element]));

    expect(x1).toEqual(42.928932188134524);
    expect(y1).toEqual(27.928932188134524);
    expect(x2).toEqual(57.071067811865476);
    expect(y2).toEqual(42.071067811865476);
  });

  it("ellipse", () => {
    const element = _ce({
      x: 40,
      y: 30,
      w: 20,
      h: 10,
      a: Math.PI / 4,
      t: "ellipse",
    });

    const [x1, y1, x2, y2] = getElementBounds(element, arrayToMap([element]));
    expect(x1).toEqual(42.09430584957905);
    expect(y1).toEqual(27.09430584957905);
    expect(x2).toEqual(57.90569415042095);
    expect(y2).toEqual(42.90569415042095);
  });

  it("curved line", () => {
    const element = {
      ..._ce({
        t: "line",
        x: 449.58203125,
        y: 186.0625,
        w: 170.12890625,
        h: 92.48828125,
        a: 0.6447741904932416,
      }),
      points: [
        pointFrom<LocalPoint>(0, 0),
        pointFrom<LocalPoint>(67.33984375, 92.48828125),
        pointFrom<LocalPoint>(-102.7890625, 52.15625),
      ],
    } as ExcalidrawLinearElement;

    const [x1, y1, x2, y2] = getElementBounds(element, arrayToMap([element]));
    expect(x1).toEqual(360.9291017525165);
    expect(y1).toEqual(185.24770129343722);
    expect(x2).toEqual(481.4815539037601);
    expect(y2).toEqual(319.8162855827246);
  });
});

describe("getCommonBounds", () => {
  // TESTES DE CAIXA-BRANCA
  describe("Abordagem Principal: Caixa-Branca (MC/DC)", () => {
    it("CT1: Lista de elementos vazia (D5 - V, D16 - F)", () => {
      const resultado = getCommonBounds([], undefined);
      expect(resultado).toEqual([0, 0, 0, 0]);
    });

    it("CT2: Múltiplos elementos com mapa", () => {
      const el1 = _ce({ x: 10, y: 10, w: 50, h: 50 });
      const el2 = _ce({ x: 50, y: 50, w: 50, h: 50 });
      const elements = [el1, el2];

      const elementsMap = arrayToMap(elements);

      const resultado = getCommonBounds(elements, elementsMap);

      expect(resultado).toEqual([10, 10, 100, 100]);
    });

    it("CT3: Múltiplos elementos sem mapa", () => {
      const el1 = _ce({ x: 0, y: 0, w: 100, h: 100 });
      const el2 = _ce({ x: 50, y: 50, w: 200, h: 200 });
      const elements = [el1, el2];

      const resultado = getCommonBounds(elements, undefined);

      expect(resultado).toEqual([0, 0, 250, 250]);
    });
  });

//TESTES COMPLEMENTARES DE CAIXA-PRETA
  describe("Abordagem Complementar: Caixa-Preta (Classes de Equivalência e Limites)", () => {
    it("CT1: Elemento único em coordenadas positivas", () => {
      const elements = [_ce({ x: 10, y: 10, w: 50, h: 50 })];
      const resultado = getCommonBounds(elements);
      expect(resultado).toEqual([10, 10, 60, 60]);
    });

    it("CT2: Múltiplos elementos espalhados em quadrantes negativos", () => {
      const el1 = _ce({ x: -200, y: -200, w: 50, h: 50 });
      const el2 = _ce({ x: -50, y: -50, w: 30, h: 30 });

      const resultado = getCommonBounds([el1, el2]);

      expect(resultado).toEqual([-200, -200, -20, -20]);
    });

    it("CT3: Elemento único rotacionado", () => {
      const elements = [
        _ce({
          x: 40,
          y: 30,
          w: 20,
          h: 10,
          a: Math.PI / 4,
        }),
      ];

      const resultado = getCommonBounds(elements);

      expect(resultado[0]).toEqual(39.39339828220179);
      expect(resultado[1]).toEqual(24.393398282201787);
      expect(resultado[2]).toEqual(60.60660171779821);
      expect(resultado[3]).toEqual(45.60660171779821);
    });

    it("CT4: Lista de elementos vazia - Fronteira Inválida (CE5, CE6, CS2)", () => {
      const resultado = getCommonBounds([]);
      expect(resultado).toEqual([0, 0, 0, 0]);
    });
  });
});
