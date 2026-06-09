import {
  doBBoxesIntersect,
  isLineSegmentTouchingOrCrossingLine,
  doLineSegmentsIntersect,
} from "../src/bbox";
import { pointFrom } from "@excalidraw/math";
import type { GlobalPoint, LineSegment } from "@excalidraw/math";
import { describe, it, expect } from "vitest";

describe("bbox utils - White-Box Testing (MC/DC)", () => {
  describe("doLineSegmentsIntersect", () => {
    // A: doBBoxesIntersect, B: a crosses b, C: b crosses a
    it("should return true when A=T, B=T, C=T (Segments intersect)", () => {
      const a: LineSegment<GlobalPoint> = [pointFrom(2, 0), pointFrom(2, 4)];
      const b: LineSegment<GlobalPoint> = [pointFrom(0, 2), pointFrom(4, 2)];
      expect(doLineSegmentsIntersect(a, b)).toBe(true);
    });

    it("should return false when A=F (BBoxes do not intersect)", () => {
      const a: LineSegment<GlobalPoint> = [pointFrom(0, 0), pointFrom(1, 1)];
      const b: LineSegment<GlobalPoint> = [pointFrom(3, 3), pointFrom(4, 4)];
      expect(doLineSegmentsIntersect(a, b)).toBe(false);
    });

    it("should return false when A=T, B=F (a doesn't touch/cross b)", () => {
      const a: LineSegment<GlobalPoint> = [pointFrom(1, 1), pointFrom(3, 1)];
      const b: LineSegment<GlobalPoint> = [pointFrom(0, 2), pointFrom(4, 4)];
      expect(doLineSegmentsIntersect(a, b)).toBe(false);
    });

    it("should return false when A=T, B=T, C=F (b doesn't cross a)", () => {
      const a: LineSegment<GlobalPoint> = [pointFrom(2, 0), pointFrom(2, 1)];
      const b: LineSegment<GlobalPoint> = [pointFrom(0, 2), pointFrom(4, 2)];
      expect(doLineSegmentsIntersect(a, b)).toBe(false);
    });
  });
});