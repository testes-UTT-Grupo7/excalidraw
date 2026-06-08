import { describe, it, expect } from "vitest";
import { loadSceneOrLibraryFromBlob } from "../data/blob";
import { MIME_TYPES } from "@excalidraw/common";
import { ImageSceneDataError } from "../errors";

const base64Scene = "eyJ0eXBlIjoiZXhjYWxpZHJhdyIsInZlcnNpb24iOjIsInNvdXJjZSI6Imh0dHBzOi8vZXhjYWxpZHJhdy5jb20iLCJlbGVtZW50cyI6W10sImFwcFN0YXRlIjp7fSwiZmlsZXMiOnt9fQ==";
const validSvgWithScene = `<svg>\n<!-- payload-type:application/vnd.excalidraw+json -->\n<!-- payload-version:1 -->\n<!-- payload-start -->${base64Scene}<!-- payload-end -->\n</svg>`;

describe("blob TDD - Issue #10871", () => {
  describe("loadSceneOrLibraryFromBlob", () => {
    it("should parse SVG content with embedded scene within a .excalidraw file", async () => {
      const file = new File([validSvgWithScene], "test.excalidraw", {
        type: MIME_TYPES.excalidraw,
      });

      const result = await loadSceneOrLibraryFromBlob(file, null, null);
      
      expect(result.type).toBe(MIME_TYPES.excalidraw);
      expect((result.data as any).elements).toEqual([]);
    });

    it("should throw descriptive error when SVG content has no embedded scene in a .excalidraw file", async () => {
      const svgWithoutScene = `<svg>\n<rect width="100" height="100" />\n</svg>`;
      const file = new File([svgWithoutScene], "test.excalidraw", {
        type: MIME_TYPES.excalidraw,
      });

      await expect(loadSceneOrLibraryFromBlob(file, null, null)).rejects.toThrowError(
        new ImageSceneDataError(
          "This file appears to be an SVG image, not an Excalidraw scene file. If this SVG was exported from Excalidraw, try renaming it to .excalidraw.svg and ensure 'Embed scene' was enabled during export.",
          "IMAGE_NOT_CONTAINS_SCENE_DATA"
        )
      );
    });

    it("should throw generic invalid file error for non-SVG XML content in a .excalidraw file", async () => {
      const nonSvgXml = `<?xml version="1.0"?>\n<note>\n  <to>User</to>\n</note>`;
      const file = new File([nonSvgXml], "test.excalidraw", {
        type: MIME_TYPES.excalidraw,
      });

      await expect(loadSceneOrLibraryFromBlob(file, null, null)).rejects.toThrowError(
        new Error("Error: invalid file")
      );
    });

    it("should throw generic invalid file error if SVG has a corrupt embedded scene payload", async () => {
      const corruptBase64Scene = "bm90X3ZhbGlkX2pzb24="; // "not_valid_json"
      const corruptSvgWithScene = `<svg>\n<!-- payload-type:application/vnd.excalidraw+json -->\n<!-- payload-version:1 -->\n<!-- payload-start -->${corruptBase64Scene}<!-- payload-end -->\n</svg>`;
      const file = new File([corruptSvgWithScene], "test.excalidraw", {
        type: MIME_TYPES.excalidraw,
      });

      await expect(loadSceneOrLibraryFromBlob(file, null, null)).rejects.toThrowError(
        new Error("Error: invalid file")
      );
    });

    it("should parse SVG content with DOCTYPE and embedded scene within a .excalidraw file", async () => {
      const svgWithDoctype = `<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n${validSvgWithScene}`;
      const file = new File([svgWithDoctype], "test.excalidraw", {
        type: MIME_TYPES.excalidraw,
      });

      const result = await loadSceneOrLibraryFromBlob(file, null, null);
      
      expect(result.type).toBe(MIME_TYPES.excalidraw);
      expect((result.data as any).elements).toEqual([]);
    });

    it("should parse SVG content starting with an XML comment within a .excalidraw file", async () => {
      const svgWithComment = `<!-- This is a valid SVG comment before the root tag -->\n${validSvgWithScene}`;
      const file = new File([svgWithComment], "test.excalidraw", {
        type: MIME_TYPES.excalidraw,
      });

      const result = await loadSceneOrLibraryFromBlob(file, null, null);
      
      expect(result.type).toBe(MIME_TYPES.excalidraw);
      expect((result.data as any).elements).toEqual([]);
    });

    it("should parse .svg file with embedded scene correctly", async () => {
      // 7. Arquivo `.svg` (extensão correta) com cena embutida
      const file = new File([validSvgWithScene], "test.svg", {
        type: MIME_TYPES.svg,
      });

      const result = await loadSceneOrLibraryFromBlob(file, null, null);
      
      expect(result.type).toBe(MIME_TYPES.excalidraw);
      expect((result.data as any).elements).toEqual([]);
    });

    it("should parse .xyz file with valid JSON content correctly", async () => {
      // 8. Arquivo com extensão desconhecida `.xyz` mas com JSON de cena válido
      const validExcalidrawData = {
        type: "excalidraw",
        version: 2,
        source: "https://excalidraw.com",
        elements: [],
        appState: {},
        files: {},
      };
      const file = new File([JSON.stringify(validExcalidrawData)], "test.xyz", {
        type: "",
      });

      const result = await loadSceneOrLibraryFromBlob(file, null, null);
      
      expect(result.type).toBe(MIME_TYPES.excalidraw);
      expect((result.data as any).elements).toEqual([]);
    });

    it("should parse .excalidraw.svg file with embedded scene correctly", async () => {
      // 9. Arquivo `.excalidraw.svg` com cena embutida
      const file = new File([validSvgWithScene], "test.excalidraw.svg", {
        type: MIME_TYPES.svg,
      });

      const result = await loadSceneOrLibraryFromBlob(file, null, null);
      
      expect(result.type).toBe(MIME_TYPES.excalidraw);
      expect((result.data as any).elements).toEqual([]);
    });
  });
});
