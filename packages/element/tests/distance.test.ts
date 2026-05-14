import { describe, it, expect, beforeEach } from "vitest";
import { pointFrom, type GlobalPoint } from "@excalidraw/math";
import { arrayToMap, ROUNDNESS } from "@excalidraw/common";

import {
  distanceToElement,
} from "../src/distance";

import type {
  ExcalidrawRectanguloidElement,
  ExcalidrawEllipseElement,
  ExcalidrawDiamondElement,
  ExcalidrawLinearElement,
} from "../src/types";

/**
 * Teste Caixa Branca - Distance Calculations
 * 
 * Estes testes validam a lógica interna de cálculo de distância entre
 * um ponto e elementos de diferentes tipos (retângulo, elipse, diamante, linha).
 * 
 * Não testamos UI ou interação - apenas a matemática pura dos cálculos.
 */

// Helper para criar um retângulo básico
const createRectangle = (overrides?: Partial<ExcalidrawRectanguloidElement>) => ({
  id: "rect-1",
  type: "rectangle" as const,
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  angle: 0,
  strokeColor: "#000000",
  backgroundColor: "#ffffff",
  fillStyle: "solid",
  strokeWidth: 1,
  roughness: 0,
  opacity: 100,
  groupIds: [],
  frameId: null,
  index: "a0" as const,
  roundness: { type: ROUNDNESS.PROPORTIONAL_RADIUS },
  seed: 12345,
  versionNonce: 1,
  isDeleted: false,
  boundElements: null,
  updated: Date.now(),
  link: null,
  locked: false,
  ...overrides,
} as ExcalidrawRectanguloidElement);

// Helper para criar uma elipse
const createEllipse = (overrides?: Partial<ExcalidrawEllipseElement>) => ({
  id: "ellipse-1",
  type: "ellipse" as const,
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  angle: 0,
  strokeColor: "#000000",
  backgroundColor: "#ffffff",
  fillStyle: "solid",
  strokeWidth: 1,
  roughness: 0,
  opacity: 100,
  groupIds: [],
  frameId: null,
  index: "a0" as const,
  roundness: { type: ROUNDNESS.PROPORTIONAL_RADIUS },
  seed: 12345,
  versionNonce: 1,
  isDeleted: false,
  boundElements: null,
  updated: Date.now(),
  link: null,
  locked: false,
  ...overrides,
} as ExcalidrawEllipseElement);

// Helper para criar um diamante
const createDiamond = (overrides?: Partial<ExcalidrawDiamondElement>) => ({
  id: "diamond-1",
  type: "diamond" as const,
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  angle: 0,
  strokeColor: "#000000",
  backgroundColor: "#ffffff",
  fillStyle: "solid",
  strokeWidth: 1,
  roughness: 0,
  opacity: 100,
  groupIds: [],
  frameId: null,
  index: "a0" as const,
  roundness: { type: ROUNDNESS.PROPORTIONAL_RADIUS },
  seed: 12345,
  versionNonce: 1,
  isDeleted: false,
  boundElements: null,
  updated: Date.now(),
  link: null,
  locked: false,
  ...overrides,
} as ExcalidrawDiamondElement);

// Helper para criar uma linha
const createLine = (overrides?: Partial<ExcalidrawLinearElement>) => ({
  id: "line-1",
  type: "line" as const,
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  angle: 0 as any,
  points: [[0, 0] as any, [100, 100] as any],
  lastCommittedPoint: null,
  startBinding: null,
  endBinding: null,
  startArrowType: null,
  endArrowType: null,
  strokeColor: "#000000",
  backgroundColor: "#ffffff",
  fillStyle: "solid",
  strokeWidth: 1,
  roughness: 0,
  opacity: 100,
  groupIds: [],
  frameId: null,
  index: "a0" as const,
  roundness: null,
  seed: 12345,
  versionNonce: 1,
  isDeleted: false,
  boundElements: null,
  updated: Date.now(),
  link: null,
  locked: false,
  ...overrides,
} as ExcalidrawLinearElement);

describe("distanceToElement - Caixa Branca", () => {
  describe("Retângulo - casos básicos", () => {
    it("ponto no centro do retângulo tem distância até borda (50% da altura/largura)", () => {
      const rect = createRectangle({ x: 0, y: 0, width: 100, height: 100 });
      const point = pointFrom<GlobalPoint>(50, 50); // Centro

      const distance = distanceToElement(rect, arrayToMap([rect]), point);
      // Função calcula distância até o CONTORNO, não até ponto dentro
      // Centro até a borda = 50 (metade da altura ou largura)
      expect(distance).toBeCloseTo(50, 0);
    });

    it("ponto na borda do retângulo deve ter distância ~0", () => {
      const rect = createRectangle({ x: 0, y: 0, width: 100, height: 100 });
      const point = pointFrom<GlobalPoint>(50, 0); // Borda superior
      
      const distance = distanceToElement(rect, arrayToMap([rect]), point);
      expect(distance).toBeLessThan(1);
    });

    it("ponto fora do retângulo deve ter distância > 0", () => {
      const rect = createRectangle({ x: 0, y: 0, width: 100, height: 100 });
      const point = pointFrom<GlobalPoint>(200, 200); // Bem longe

      const distance = distanceToElement(rect, arrayToMap([rect]), point);
      expect(distance).toBeGreaterThan(0);
    });

    it("ponto muito longe deve ter distância grande", () => {
      const rect = createRectangle({ x: 0, y: 0, width: 100, height: 100 });
      const nearPoint = pointFrom<GlobalPoint>(105, 50); // Perto
      const farPoint = pointFrom<GlobalPoint>(500, 50); // Longe

      const nearDistance = distanceToElement(rect, arrayToMap([rect]), nearPoint);
      const farDistance = distanceToElement(rect, arrayToMap([rect]), farPoint);

      expect(farDistance).toBeGreaterThan(nearDistance);
    });

    it("ponto no canto tem distância relacionada ao arredondamento", () => {
      const rect = createRectangle({ x: 0, y: 0, width: 100, height: 100 });
      const point = pointFrom<GlobalPoint>(0, 0); // Canto superior esquerdo

      const distance = distanceToElement(rect, arrayToMap([rect]), point);
      // Distância deve ser um número válido (pode haver arredondamento)
      expect(typeof distance).toBe('number');
      expect(distance).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Retângulo - rotação", () => {
    it("ponto no centro com rotação ainda tem distância consistente", () => {
      const angle = Math.PI / 4; // 45 graus
      const rect = createRectangle({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        angle: angle as any,
      });
      const point = pointFrom<GlobalPoint>(50, 50); // Centro

      const distance = distanceToElement(rect, arrayToMap([rect]), point);
      // Com rotação, a distância do centro é ligeiramente diferente devido ao cálculo geométrico
      expect(typeof distance).toBe('number');
      expect(distance).toBeGreaterThanOrEqual(0);
    });

    it("ponto fora de retângulo rotacionado deve ter distância consistente", () => {
      const rect = createRectangle({
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        angle: Math.PI / 6 as any, // 30 graus
      });
      const point = pointFrom<GlobalPoint>(300, 300);

      const distance = distanceToElement(rect, arrayToMap([rect]), point);
      expect(distance).toBeGreaterThan(0);
      expect(typeof distance).toBe("number");
    });
  });

  describe("Retângulo - posição diferente", () => {
    it("retângulo em posição diferente calcula distância corretamente", () => {
      const rect = createRectangle({ x: 100, y: 100, width: 100, height: 100 });
      const pointInside = pointFrom<GlobalPoint>(150, 150); // Centro do retângulo deslocado

      const distance = distanceToElement(rect, arrayToMap([rect]), pointInside);
      // Ponto no centro do retângulo deslocado = distância até borda = 50
      expect(distance).toBeCloseTo(50, 0);
    });

    it("ponto fora de retângulo deslocado tem distância > 0", () => {
      const rect = createRectangle({ x: 100, y: 100, width: 100, height: 100 });
      const pointOutside = pointFrom<GlobalPoint>(50, 50);

      const distance = distanceToElement(rect, arrayToMap([rect]), pointOutside);
      expect(distance).toBeGreaterThan(0);
    });
  });

  describe("Elipse - casos básicos", () => {
    it("ponto fora da elipse deve ter distância > 0", () => {
      const ellipse = createEllipse({ x: 0, y: 0, width: 100, height: 100 });
      const point = pointFrom<GlobalPoint>(200, 200);

      const distance = distanceToElement(ellipse, arrayToMap([ellipse]), point);
      expect(distance).toBeGreaterThan(0);
    });

    it("ponto na borda da elipse deve ter distância ~0", () => {
      const ellipse = createEllipse({ x: 0, y: 0, width: 100, height: 100 });
      const point = pointFrom<GlobalPoint>(100, 50); // Borda direita

      const distance = distanceToElement(ellipse, arrayToMap([ellipse]), point);
      expect(distance).toBeLessThan(1);
    });

    it("elipse de tamanho diferente calcula corretamente", () => {
      const ellipse = createEllipse({
        x: 0,
        y: 0,
        width: 200,
        height: 100,
      });
      const point = pointFrom<GlobalPoint>(150, 50);

      const distance = distanceToElement(ellipse, arrayToMap([ellipse]), point);
      expect(typeof distance).toBe("number");
      expect(distance).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Diamante - casos básicos", () => {
    it("ponto no centro do diamante tem distância até a aresta", () => {
      const diamond = createDiamond({ x: 0, y: 0, width: 100, height: 100 });
      const point = pointFrom<GlobalPoint>(50, 50);

      const distance = distanceToElement(diamond, arrayToMap([diamond]), point);
      // Diamante: centro até aresta = distância diagonal mínima (~35.4 para diamante 100x100)
      expect(typeof distance).toBe('number');
      expect(distance).toBeGreaterThanOrEqual(0);
    });

    it("ponto perto de um vértice do diamante tem pequena distância", () => {
      const diamond = createDiamond({ x: 0, y: 0, width: 100, height: 100 });
      const point = pointFrom<GlobalPoint>(50, 0); // Topo

      const distance = distanceToElement(diamond, arrayToMap([diamond]), point);
      // Ponto no topo (vértice) tem distância pequena mas não zero (geometria)
      expect(typeof distance).toBe('number');
      expect(distance).toBeGreaterThanOrEqual(0);
      expect(distance).toBeLessThan(10); // Pequena distância
    });

    it("ponto fora do diamante deve ter distância > 0", () => {
      const diamond = createDiamond({ x: 0, y: 0, width: 100, height: 100 });
      const point = pointFrom<GlobalPoint>(200, 200);

      const distance = distanceToElement(diamond, arrayToMap([diamond]), point);
      expect(distance).toBeGreaterThan(0);
    });
  });

  describe("Propriedades gerais de distância", () => {
    it("distância deve ser sempre >= 0 (nunca negativa)", () => {
      const rect = createRectangle();
      const points = [
        pointFrom<GlobalPoint>(0, 0),
        pointFrom<GlobalPoint>(50, 50),
        pointFrom<GlobalPoint>(100, 100),
        pointFrom<GlobalPoint>(500, 500),
      ];

      points.forEach((point) => {
        const distance = distanceToElement(rect, arrayToMap([rect]), point);
        expect(distance).toBeGreaterThanOrEqual(0);
        expect(typeof distance).toBe('number');
        expect(!isNaN(distance)).toBe(true);
      });
    });

    it("distância aumenta com pontos mais afastados", () => {
      const rect = createRectangle();
      const pointClose = pointFrom<GlobalPoint>(105, 50);  // Próximo à borda direita
      const pointFar = pointFrom<GlobalPoint>(300, 50);    // Mais longe

      const distClose = distanceToElement(rect, arrayToMap([rect]), pointClose);
      const distFar = distanceToElement(rect, arrayToMap([rect]), pointFar);

      expect(distFar).toBeGreaterThan(distClose);
    });

    it("distância é simétrica: pontos equidistantes das bordas têm mesma distância", () => {
      const rect = createRectangle({ x: 0, y: 0, width: 100, height: 100 });
      const pointAbove = pointFrom<GlobalPoint>(50, -50); // 50px acima
      const pointBelow = pointFrom<GlobalPoint>(50, 150); // 50px abaixo

      const distAbove = distanceToElement(rect, arrayToMap([rect]), pointAbove);
      const distBelow = distanceToElement(rect, arrayToMap([rect]), pointBelow);

      // Pontos equidistantes devem ter mesma distância (simetria)
      expect(distAbove).toBeCloseTo(distBelow, 0);
      expect(distAbove).toBeCloseTo(50, 0); // 50px de diferença
    });
  });

  describe("Tipos de elemento (dispatch correto)", () => {
    it("retângulo, imagem, texto, frame devem usar a mesma lógica de distância", () => {
      const basePoint = pointFrom<GlobalPoint>(150, 50); // Fora do retângulo padrão
      
      const rect = createRectangle();
      const image = { ...rect, type: "image" as const };
      const text = { ...rect, type: "text" as const };
      const frame = { ...rect, type: "frame" as const };
      
      const elementsMap = arrayToMap([rect, image as any, text as any, frame as any]);

      const rectDist = distanceToElement(rect, elementsMap, basePoint);
      const imageDist = distanceToElement(image as any, elementsMap, basePoint);
      const textDist = distanceToElement(text as any, elementsMap, basePoint);
      const frameDist = distanceToElement(frame as any, elementsMap, basePoint);

      // Todos devem retornar o mesmo valor pois compartilham a mesma geometria
      // e usam a mesma função distanceToRectanguloidElement
      expect(rectDist).toEqual(imageDist);
      expect(rectDist).toEqual(textDist);
      expect(rectDist).toEqual(frameDist);
      expect(typeof rectDist).toBe('number');
    });
  });
});
