
const SHIFT_LOCKING_ANGLE = Math.PI / 12;

/**
 * Makes a perfect shape or diagonal/horizontal/vertical line
 */
const getPerfectElementSize = (
  elementType: string,
  width: number,
  height: number,
): { width: number; height: number } => {
  const absWidth = Math.abs(width);
  const absHeight = Math.abs(height);

  if (
    elementType === "line" ||
    elementType === "arrow" ||
    elementType === "freedraw"
  ) {
    const lockedAngle =
      Math.round(Math.atan(absHeight / absWidth) / SHIFT_LOCKING_ANGLE) *
      SHIFT_LOCKING_ANGLE;
    if (lockedAngle === 0) {
      height = 0;
    } else if (lockedAngle === Math.PI / 2) {
      width = 0;
    } else {
      height = absWidth * Math.tan(lockedAngle) * Math.sign(height) || height;
    }
  } else if (
    elementType === "rectangle" ||
    elementType === "ellipse" ||
    elementType === "diamond" ||
    elementType === "image" ||
    elementType === "frame" ||
    elementType === "magicframe" ||
    elementType === "embeddable"
  ) {
    height = absWidth * Math.sign(height);
  }
  return { width, height };
};

const EPSILON_DIGITS = 3;

const toBeCloseTo = (actual: number, expected: number, precision: number, name: string) => {
  const diff = Math.abs(actual - expected);
  if (diff > Math.pow(10, -precision) / 2) {
    throw new Error(`${name}: Expected ${expected} but got ${actual} (diff: ${diff})`);
  }
};

const toBe = (actual: any, expected: any, name: string) => {
  if (actual !== expected) {
    throw new Error(`${name}: Expected ${expected} but got ${actual}`);
  }
};

const tests = [
  {
    name: "should return height:0 if `elementType` is line and locked angle is 0",
    fn: () => {
      const { height, width } = getPerfectElementSize("line", 149, 10);
      toBeCloseTo(width, 149, EPSILON_DIGITS, "width");
      toBeCloseTo(height, 0, EPSILON_DIGITS, "height");
    }
  },
  {
    name: "should return width:0 if `elementType` is line and locked angle is 90 deg (Math.PI/2)",
    fn: () => {
      const { height, width } = getPerfectElementSize("line", 10, 140);
      toBeCloseTo(width, 0, EPSILON_DIGITS, "width");
      toBeCloseTo(height, 140, EPSILON_DIGITS, "height");
    }
  },
  {
    name: "should return height:0 if `elementType` is arrow and locked angle is 0",
    fn: () => {
      const { height, width } = getPerfectElementSize("arrow", 200, 20);
      toBeCloseTo(width, 200, EPSILON_DIGITS, "width");
      toBeCloseTo(height, 0, EPSILON_DIGITS, "height");
    }
  },
  {
    name: "should return width:0 if `elementType` is arrow and locked angle is 90 deg (Math.PI/2)",
    fn: () => {
      const { height, width } = getPerfectElementSize("arrow", 10, 100);
      toBeCloseTo(width, 0, EPSILON_DIGITS, "width");
      toBeCloseTo(height, 100, EPSILON_DIGITS, "height");
    }
  },
  {
    name: "should return adjust height to be width * tan(locked angle)",
    fn: () => {
      const { height, width } = getPerfectElementSize("arrow", 120, 185);
      toBeCloseTo(width, 120, EPSILON_DIGITS, "width");
      toBeCloseTo(height, 207.846, EPSILON_DIGITS, "height");
    }
  },
  {
    name: "should return height equals to width if locked angle is 45 deg",
    fn: () => {
      const { height, width } = getPerfectElementSize("arrow", 135, 145);
      toBeCloseTo(width, 135, EPSILON_DIGITS, "width");
      toBeCloseTo(height, 135, EPSILON_DIGITS, "height");
    }
  },
  {
    name: "should return height:0 and width:0 when width and height are 0",
    fn: () => {
      const { height, width } = getPerfectElementSize("arrow", 0, 0);
      toBeCloseTo(width, 0, EPSILON_DIGITS, "width");
      toBeCloseTo(height, 0, EPSILON_DIGITS, "height");
    }
  },
  {
    name: "area elements: should return a square (height = width) for rectangle",
    fn: () => {
      const { height, width } = getPerfectElementSize("rectangle", 200, 50);
      toBe(width, 200, "width");
      toBe(height, 200, "height");
    }
  },
  {
    name: "area elements: should return a square for ellipse",
    fn: () => {
      const { height, width } = getPerfectElementSize("ellipse", 150, 10);
      toBe(width, 150, "width");
      toBe(height, 150, "height");
    }
  },
  {
    name: "area elements: should return a square for image",
    fn: () => {
      const { height, width } = getPerfectElementSize("image", 300, 20);
      toBe(width, 300, "width");
      toBe(height, 300, "height");
    }
  },
  {
    name: "area elements: should preserve negative signals for diamond",
    fn: () => {
      const { height, width } = getPerfectElementSize("diamond", -100, -40);
      toBe(width, -100, "width");
      toBe(height, -100, "height");
    }
  },
  {
    name: "area elements: should preserve mixed signals for rectangle",
    fn: () => {
      const { height, width } = getPerfectElementSize("rectangle", 50, -20);
      toBe(width, 50, "width");
      toBe(height, -50, "height");
    }
  },
  {
    name: "area elements: should handle zero dimensions for ellipse",
    fn: () => {
      const { height, width } = getPerfectElementSize("ellipse", 0, 0);
      toBe(width, 0, "width");
      toBe(height, 0, "height");
    }
  },
  {
    name: "unsupported types: should return original dimensions for text",
    fn: () => {
      const { height, width } = getPerfectElementSize("text", 150, 30);
      toBe(width, 150, "width");
      toBe(height, 30, "height");
    }
  },
  {
    name: "unsupported types: should return original dimensions for selection",
    fn: () => {
      const { height, width } = getPerfectElementSize("selection", 100, 100);
      toBe(width, 100, "width");
      toBe(height, 100, "height");
    }
  },
  {
    name: "freedraw: should snap freedraw to 45 deg similarly to lines",
    fn: () => {
      const { height, width } = getPerfectElementSize("freedraw", 100, 105);
      toBeCloseTo(width, 100, EPSILON_DIGITS, "width");
      toBeCloseTo(height, 100, EPSILON_DIGITS, "height");
    }
  }
];

let passed = 0;
let failed = 0;

console.log("Running standalone tests for getPerfectElementSize...\n");

tests.forEach(test => {
  try {
    test.fn();
    console.log(`✓ PASSED: ${test.name}`);
    passed++;
  } catch (e) {
    console.log(`✗ FAILED: ${test.name}`);
    console.error(e.message);
    failed++;
  }
});

console.log(`\nSummary: ${passed} passed, ${failed} failed.`);

if (failed > 0) {
  process.exit(1);
}
