import { vi } from "vitest";

import { getPerfectElementSize } from "../src/sizeHelpers";

const EPSILON_DIGITS = 3;
// Needed so that we can mock the value of constants which is done in
// below tests. In Jest this wasn't needed as global override was possible
// but vite doesn't allow that hence we need to mock
vi.mock(
  "@excalidraw/common",
  //@ts-ignore
  async (importOriginal) => {
    const module: any = await importOriginal();
    return { ...module };
  },
);
describe("getPerfectElementSize", () => {
  it("should return height:0 if `elementType` is line and locked angle is 0", () => {
    const { height, width } = getPerfectElementSize("line", 149, 10);
    expect(width).toBeCloseTo(149, EPSILON_DIGITS);
    expect(height).toBeCloseTo(0, EPSILON_DIGITS);
  });

  it("should return width:0 if `elementType` is line and locked angle is 90 deg (Math.PI/2)", () => {
    const { height, width } = getPerfectElementSize("line", 10, 140);
    expect(width).toBeCloseTo(0, EPSILON_DIGITS);
    expect(height).toBeCloseTo(140, EPSILON_DIGITS);
  });

  it("should return height:0 if `elementType` is arrow and locked angle is 0", () => {
    const { height, width } = getPerfectElementSize("arrow", 200, 20);
    expect(width).toBeCloseTo(200, EPSILON_DIGITS);
    expect(height).toBeCloseTo(0, EPSILON_DIGITS);
  });
  it("should return width:0 if `elementType` is arrow and locked angle is 90 deg (Math.PI/2)", () => {
    const { height, width } = getPerfectElementSize("arrow", 10, 100);
    expect(width).toBeCloseTo(0, EPSILON_DIGITS);
    expect(height).toBeCloseTo(100, EPSILON_DIGITS);
  });

  it("should return adjust height to be width * tan(locked angle)", () => {
    const { height, width } = getPerfectElementSize("arrow", 120, 185);
    expect(width).toBeCloseTo(120, EPSILON_DIGITS);
    expect(height).toBeCloseTo(207.846, EPSILON_DIGITS);
  });

  it("should return height equals to width if locked angle is 45 deg", () => {
    const { height, width } = getPerfectElementSize("arrow", 135, 145);
    expect(width).toBeCloseTo(135, EPSILON_DIGITS);
    expect(height).toBeCloseTo(135, EPSILON_DIGITS);
  });

  it("should return height:0 and width:0 when width and height are 0", () => {
    const { height, width } = getPerfectElementSize("arrow", 0, 0);
    expect(width).toBeCloseTo(0, EPSILON_DIGITS);
    expect(height).toBeCloseTo(0, EPSILON_DIGITS);
  });

  describe("area elements", () => {
    it("should return a square (height = width) for rectangle", () => {
      const { height, width } = getPerfectElementSize("rectangle", 200, 50);
      expect(width).toBe(200);
      expect(height).toBe(200);
    });

    it("should return a square for ellipse", () => {
      const { height, width } = getPerfectElementSize("ellipse", 150, 10);
      expect(width).toBe(150);
      expect(height).toBe(150);
    });

    it("should return a square for image", () => {
      const { height, width } = getPerfectElementSize("image", 300, 20);
      expect(width).toBe(300);
      expect(height).toBe(300);
    });

    it("should preserve negative signals for diamond", () => {
      const { height, width } = getPerfectElementSize("diamond", -100, -40);
      expect(width).toBe(-100);
      expect(height).toBe(-100);
    });

    it("should preserve mixed signals for rectangle", () => {
      const { height, width } = getPerfectElementSize("rectangle", 50, -20);
      expect(width).toBe(50);
      expect(height).toBe(-50);
    });

    it("should handle zero dimensions for ellipse", () => {
      const { height, width } = getPerfectElementSize("ellipse", 0, 0);
      expect(width).toBe(0);
      expect(height).toBe(0);
    });
  });

  describe("unsupported types", () => {
    it("should return original dimensions for text", () => {
      const { height, width } = getPerfectElementSize("text", 150, 30);
      expect(width).toBe(150);
      expect(height).toBe(30);
    });

    it("should return original dimensions for selection", () => {
      const { height, width } = getPerfectElementSize("selection", 100, 100);
      expect(width).toBe(100);
      expect(height).toBe(100);
    });
  });

  describe("freedraw", () => {
    it("should snap freedraw to 45 deg similarly to lines", () => {
      const { height, width } = getPerfectElementSize("freedraw", 100, 105);
      expect(width).toBeCloseTo(100, EPSILON_DIGITS);
      expect(height).toBeCloseTo(100, EPSILON_DIGITS);
    });
  });
});
