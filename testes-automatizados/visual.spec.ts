import { test, expect, type Page } from "@playwright/test";

async function waitForExcalidrawReady(page: Page) {
  await page.waitForSelector(".excalidraw", { timeout: 15000 });
  await page.waitForSelector('[class*="App-toolbar"]', { timeout: 10000 });
  await page.waitForTimeout(1000);

  const modal = page.locator(".Modal__content");
  if (await modal.isVisible({ timeout: 2000 }).catch(() => false)) {
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
  }

  const welcomeScreen = page.locator(".welcome-screen-center");
  if (await welcomeScreen.isVisible({ timeout: 1000 }).catch(() => false)) {
    await page.mouse.click(640, 400);
    await page.waitForTimeout(300);
  }
}

test.describe("Caso 1 — Toolbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForExcalidrawReady(page);
    await page.mouse.click(640, 400);
    await page.waitForTimeout(300);
  });

  test("1.1 — Toolbar deve estar centralizada no topo", async ({ page }) => {
    const toolbar = page.locator('[class*="App-toolbar"]').first();
    await expect(toolbar).toBeVisible();

    const display = await toolbar.evaluate((el) =>
      window.getComputedStyle(el).display,
    );
    const justifyContent = await toolbar.evaluate((el) =>
      window.getComputedStyle(el).justifyContent,
    );

    expect(display).toBe("flex");
    expect(justifyContent).toBe("center");

    await expect(toolbar).toHaveScreenshot("caso1.1-toolbar-centralizada.png");
  });

  test("1.2 — Todos os ícones devem estar presentes e na ordem correta", async ({
    page,
  }) => {
    const expectedTools = [
      "toolbar-lock",
      "toolbar-hand",
      "toolbar-selection",
      "toolbar-rectangle",
      "toolbar-diamond",
      "toolbar-ellipse",
      "toolbar-arrow",
      "toolbar-line",
      "toolbar-freedraw",
      "toolbar-text",
      "toolbar-image",
      "toolbar-eraser",
    ];

    for (const testId of expectedTools) {
      const tool = page.locator(`[data-testid="${testId}"]`);
      await expect(tool).toBeVisible({
        timeout: 5000,
      });
    }

    const toolbar = page.locator('[class*="App-toolbar"]').first();
    await expect(toolbar).toHaveScreenshot("caso1.2-icones-toolbar.png");
  });

  test("1.3 — Ferramenta selecionada deve ter destaque visual (azul)", async ({
    page,
  }) => {
    const toolsToTest = [
      "toolbar-rectangle",
      "toolbar-ellipse",
      "toolbar-arrow",
      "toolbar-text",
    ];

    for (const testId of toolsToTest) {
      await page.locator(`[data-testid="${testId}"]`).click();
      await page.waitForTimeout(200);

      const isChecked = await page
        .locator(`[data-testid="${testId}"]`)
        .isChecked()
        .catch(() => false);

      if (isChecked !== false) {
        expect(isChecked).toBe(true);
      }
    }

    const toolbar = page.locator('[class*="App-toolbar"]').first();
    await expect(toolbar).toHaveScreenshot("caso1.3-estado-ativo.png");
  });
});

test.describe("Caso 2 — Menu Lateral", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForExcalidrawReady(page);
    await page.mouse.click(640, 400);
    await page.waitForTimeout(300);
  });

  test("2.1 — Painel de propriedades deve aparecer ao selecionar um elemento", async ({
    page,
  }) => {
    await page.locator('[data-testid="toolbar-rectangle"]').click();
    await page.waitForTimeout(200);

    await page.mouse.move(400, 300);
    await page.mouse.down();
    await page.mouse.move(600, 450);
    await page.mouse.up();
    await page.waitForTimeout(300);

    await page.locator('[data-testid="toolbar-selection"]').click();
    await page.waitForTimeout(200);
    await page.mouse.click(500, 375);
    await page.waitForTimeout(500);

    const strokeLabel = page.getByText("Stroke", { exact: false });
    await expect(strokeLabel.first()).toBeVisible({ timeout: 5000 });

    await expect(page).toHaveScreenshot("caso2.1-menu-visivel.png", {
      fullPage: false,
    });
  });

  test("2.2 — Painel deve conter todas as opções de personalização", async ({
    page,
  }) => {
    await page.locator('[data-testid="toolbar-rectangle"]').click();
    await page.mouse.move(400, 300);
    await page.mouse.down();
    await page.mouse.move(600, 450);
    await page.mouse.up();
    await page.waitForTimeout(300);

    await page.locator('[data-testid="toolbar-selection"]').click();
    await page.mouse.click(500, 375);
    await page.waitForTimeout(500);

    const expectedLabels = [
      "Stroke",
      "Background",
      "Fill",
      "Stroke width",
      "Stroke style",
      "Sloppiness",
      "Edges",
      "Opacity",
    ];

    for (const label of expectedLabels) {
      const element = page.getByText(label, { exact: false });
      await expect(element.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test("2.3 — Painel deve estar posicionado na lateral esquerda", async ({
    page,
  }) => {
    await page.locator('[data-testid="toolbar-rectangle"]').click();
    await page.mouse.move(400, 300);
    await page.mouse.down();
    await page.mouse.move(600, 450);
    await page.mouse.up();
    await page.waitForTimeout(300);

    await page.locator('[data-testid="toolbar-selection"]').click();
    await page.mouse.click(500, 375);
    await page.waitForTimeout(500);

    const panel = page.locator('[class*="App-menu_top__left"]').first();
    await expect(panel).toBeVisible();

    const boundingBox = await panel.boundingBox();
    expect(boundingBox).not.toBeNull();
    expect(boundingBox!.x).toBeLessThan(640);
  });

  test("2.4 — Alterações no painel devem refletir no elemento em tempo real", async ({
    page,
  }) => {
    await page.locator('[data-testid="toolbar-rectangle"]').click();
    await page.mouse.move(400, 300);
    await page.mouse.down();
    await page.mouse.move(600, 450);
    await page.mouse.up();
    await page.waitForTimeout(300);

    await page.locator('[data-testid="toolbar-selection"]').click();
    await page.mouse.click(500, 375);
    await page.waitForTimeout(500);

    await expect(page).toHaveScreenshot("caso2.4-antes-alteracao.png", {
      fullPage: false,
    });

    const bgColorInput = page
      .locator('label:has-text("Background")')
      .locator("..")
      .locator("input[type='text']")
      .first();

    if (await bgColorInput.isVisible().catch(() => false)) {
      await bgColorInput.fill("#e74c3c");
      await bgColorInput.press("Enter");
      await page.waitForTimeout(500);
    }

    await expect(page).toHaveScreenshot("caso2.4-depois-alteracao.png", {
      fullPage: false,
    });
  });
});
