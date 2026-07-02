# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: visual.spec.ts >> Caso 2 — Menu Lateral >> 2.3 — Painel deve estar posicionado na lateral esquerda
- Location: zTestesVisuais/testes-automatizados/visual.spec.ts:168:7

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for locator('[data-testid="toolbar-rectangle"]')
    - locator resolved to <input type="radio" aria-label="Rectangle" aria-keyshortcuts="R or 2" name="editor-current-shape" data-testid="toolbar-rectangle" id="7u0byd7SIsEMZnPONBSRw-undefined" class="ToolIcon_type_radio ToolIcon_size_medium"/>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div tabindex="0" class="Modal__content">…</div> from <div class="excalidraw excalidraw-modal-container">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div tabindex="0" class="Modal__content">…</div> from <div class="excalidraw excalidraw-modal-container">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    19 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - <div tabindex="0" class="Modal__content">…</div> from <div class="excalidraw excalidraw-modal-container">…</div> subtree intercepts pointer events
     - retrying click action
       - waiting 500ms

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner:
    - heading "Excalidraw" [level=1] [ref=e2]
  - generic [ref=e5]:
    - generic:
      - generic:
        - generic:
          - generic:
            - img
            - img
        - generic:
          - text: Your drawings are saved in your browser's storage.
          - text: Browser storage can be cleared unexpectedly.
          - text: Save your work to a file regularly to avoid losing it.
        - generic:
          - button "Open Ctrl+O" [ref=e6] [cursor=pointer]:
            - img [ref=e8]
            - generic [ref=e10]: Open
            - generic [ref=e11]: Ctrl+O
          - button "Help ?" [ref=e12] [cursor=pointer]:
            - img [ref=e14]
            - generic [ref=e19]: Help
            - generic [ref=e20]: "?"
          - button "Live collaboration..." [ref=e21] [cursor=pointer]:
            - img [ref=e23]
            - generic [ref=e30]: Live collaboration...
          - link "Sign up" [ref=e31] [cursor=pointer]:
            - /url: https://plus.excalidraw.com/plus?utm_source=excalidraw&utm_medium=app&utm_content=welcomeScreenGuest
            - img [ref=e33]
            - generic [ref=e39]: Sign up
      - generic:
        - generic:
          - button [ref=e43] [cursor=pointer]:
            - img [ref=e44]
          - region "Shapes":
            - generic [ref=e50]:
              - generic:
                - generic:
                  - text: To move canvas, hold
                  - generic: Scroll wheel
                  - text: or
                  - generic: Space
                  - text: while dragging, or use the hand tool
              - heading "Shapes" [level=2] [ref=e51]
              - generic [ref=e52]:
                - generic "Keep selected tool active after drawing — Q" [ref=e53] [cursor=pointer]:
                  - checkbox "Keep selected tool active after drawing"
                  - img [ref=e55]
                - generic "Hand (panning tool) — H or null" [ref=e62] [cursor=pointer]:
                  - radio "Hand (panning tool)"
                  - img [ref=e64]
                - generic "Selection — V or 1" [ref=e71] [cursor=pointer]:
                  - radio "Selection" [checked]
                  - generic [ref=e72]:
                    - img [ref=e73]
                    - generic [ref=e78]: "1"
                - generic "Rectangle — R or 2" [ref=e79] [cursor=pointer]:
                  - radio "Rectangle"
                  - generic [ref=e80]:
                    - img [ref=e81]
                    - generic [ref=e85]: "2"
                - generic "Diamond — D or 3" [ref=e86] [cursor=pointer]:
                  - radio "Diamond"
                  - generic [ref=e87]:
                    - img [ref=e88]
                    - generic [ref=e92]: "3"
                - generic "Ellipse — O or 4" [ref=e93] [cursor=pointer]:
                  - radio "Ellipse"
                  - generic [ref=e94]:
                    - img [ref=e95]
                    - generic [ref=e99]: "4"
                - generic "Arrow — A or 5" [ref=e100] [cursor=pointer]:
                  - radio "Arrow"
                  - generic [ref=e101]:
                    - img [ref=e102]
                    - generic [ref=e107]: "5"
                - generic "Line — L or 6" [ref=e108] [cursor=pointer]:
                  - radio "Line"
                  - generic [ref=e109]:
                    - img [ref=e110]
                    - generic [ref=e111]: "6"
                - generic "Draw — P or 7" [ref=e112] [cursor=pointer]:
                  - radio "Draw"
                  - generic [ref=e113]:
                    - img [ref=e114]
                    - generic [ref=e118]: "7"
                - generic "Text — T or 8" [ref=e119] [cursor=pointer]:
                  - radio "Text"
                  - generic [ref=e120]:
                    - img [ref=e121]
                    - generic [ref=e126]: "8"
                - generic "Insert image — 9" [ref=e127] [cursor=pointer]:
                  - radio "Insert image"
                  - generic [ref=e128]:
                    - img [ref=e129]
                    - generic [ref=e134]: "9"
                - generic "Eraser — E or 0" [ref=e135] [cursor=pointer]:
                  - radio "Eraser"
                  - generic [ref=e136]:
                    - img [ref=e137]
                    - generic [ref=e142]: "0"
                - button "More tools" [ref=e145] [cursor=pointer]:
                  - img [ref=e146]
          - generic:
            - generic [ref=e152]:
              - link "Excalidraw+" [ref=e153] [cursor=pointer]:
                - /url: https://plus.excalidraw.com/plus?utm_source=excalidraw&utm_medium=app&utm_content=guestBanner#excalidraw-redirect
              - button "Live collaboration..." [ref=e154] [cursor=pointer]:
                - img [ref=e155]
            - generic "Library" [ref=e157]:
              - checkbox "Library"
              - img [ref=e160] [cursor=pointer]
      - contentinfo:
        - region "Canvas actions" [ref=e165]:
          - heading "Canvas actions" [level=2] [ref=e166]
          - generic [ref=e168]:
            - button "Zoom out" [ref=e169] [cursor=pointer]:
              - img [ref=e171]
            - button "Reset zoom" [ref=e173] [cursor=pointer]: 100%
            - button "Zoom in" [ref=e174] [cursor=pointer]:
              - img [ref=e176]
          - generic [ref=e178]:
            - button "Undo" [disabled] [ref=e181]:
              - img [ref=e183]
            - button "Redo" [disabled] [ref=e187]:
              - img [ref=e189]
        - link "Blog post on end-to-end encryption in Excalidraw" [ref=e192] [cursor=pointer]:
          - /url: https://plus.excalidraw.com/blog/end-to-end-encryption
          - img [ref=e194]
        - button "Help" [ref=e197] [cursor=pointer]:
          - img [ref=e198]
    - generic:
      - img
    - generic [ref=e203]: Drawing canvas
  - dialog [ref=e205]:
    - generic [ref=e208]:
      - heading "Help" [level=2] [ref=e209]
      - generic [ref=e210]:
        - generic [ref=e211]:
          - link "Documentation" [ref=e212] [cursor=pointer]:
            - /url: https://docs.excalidraw.com
            - img [ref=e214]
            - text: Documentation
          - link "Read our blog" [ref=e216] [cursor=pointer]:
            - /url: https://plus.excalidraw.com/blog
            - img [ref=e218]
            - text: Read our blog
          - link "Found an issue? Submit" [ref=e220] [cursor=pointer]:
            - /url: https://github.com/excalidraw/excalidraw/issues
            - img [ref=e222]
            - text: Found an issue? Submit
          - link "YouTube" [ref=e224] [cursor=pointer]:
            - /url: https://youtube.com/@excalidraw
            - img [ref=e226]
            - text: YouTube
        - heading "Keyboard shortcuts" [level=3] [ref=e231]
        - generic [ref=e232]:
          - generic [ref=e233]:
            - heading "Tools" [level=4] [ref=e234]
            - generic [ref=e235]:
              - generic [ref=e236]:
                - generic [ref=e237]: Hand (panning tool)
                - generic [ref=e239]: H
              - generic [ref=e240]:
                - generic [ref=e241]: Selection
                - generic [ref=e242]:
                  - generic [ref=e243]: V
                  - text: or
                  - generic [ref=e244]: "1"
              - generic [ref=e245]:
                - generic [ref=e246]: Rectangle
                - generic [ref=e247]:
                  - generic [ref=e248]: R
                  - text: or
                  - generic [ref=e249]: "2"
              - generic [ref=e250]:
                - generic [ref=e251]: Diamond
                - generic [ref=e252]:
                  - generic [ref=e253]: D
                  - text: or
                  - generic [ref=e254]: "3"
              - generic [ref=e255]:
                - generic [ref=e256]: Ellipse
                - generic [ref=e257]:
                  - generic [ref=e258]: O
                  - text: or
                  - generic [ref=e259]: "4"
              - generic [ref=e260]:
                - generic [ref=e261]: Arrow
                - generic [ref=e262]:
                  - generic [ref=e263]: A
                  - text: or
                  - generic [ref=e264]: "5"
              - generic [ref=e265]:
                - generic [ref=e266]: Line
                - generic [ref=e267]:
                  - generic [ref=e268]: L
                  - text: or
                  - generic [ref=e269]: "6"
              - generic [ref=e270]:
                - generic [ref=e271]: Draw
                - generic [ref=e272]:
                  - generic [ref=e273]: P
                  - text: or
                  - generic [ref=e274]: "7"
              - generic [ref=e275]:
                - generic [ref=e276]: Text
                - generic [ref=e277]:
                  - generic [ref=e278]: T
                  - text: or
                  - generic [ref=e279]: "8"
              - generic [ref=e280]:
                - generic [ref=e281]: Insert image
                - generic [ref=e283]: "9"
              - generic [ref=e284]:
                - generic [ref=e285]: Eraser
                - generic [ref=e286]:
                  - generic [ref=e287]: E
                  - text: or
                  - generic [ref=e288]: "0"
              - generic [ref=e289]:
                - generic [ref=e290]: Frame tool
                - generic [ref=e292]: F
              - generic [ref=e293]:
                - generic [ref=e294]: Laser pointer
                - generic [ref=e296]: K
              - generic [ref=e297]:
                - generic [ref=e298]: Pick color from canvas
                - generic [ref=e299]:
                  - generic [ref=e300]: I
                  - text: or
                  - generic [ref=e301]: Shift
                  - generic [ref=e302]: S
                  - text: or
                  - generic [ref=e303]: Shift
                  - generic [ref=e304]: G
              - generic [ref=e305]:
                - generic [ref=e306]: Edit line/arrow points
                - generic [ref=e307]:
                  - generic [ref=e308]: Ctrl
                  - generic [ref=e309]: Enter
              - generic [ref=e310]:
                - generic [ref=e311]: Edit text / add label
                - generic [ref=e313]: Enter
              - generic [ref=e314]:
                - generic [ref=e315]: Add new line (text editor)
                - generic [ref=e316]:
                  - generic [ref=e317]: Enter
                  - text: or
                  - generic [ref=e318]: Shift
                  - generic [ref=e319]: Enter
              - generic [ref=e320]:
                - generic [ref=e321]: Finish editing (text editor)
                - generic [ref=e322]:
                  - generic [ref=e323]: Esc
                  - text: or
                  - generic [ref=e324]: Ctrl
                  - generic [ref=e325]: Enter
              - generic [ref=e326]:
                - generic [ref=e327]: Curved arrow
                - generic [ref=e328]:
                  - generic [ref=e329]: A
                  - generic [ref=e330]: click
                  - generic [ref=e331]: click
                  - generic [ref=e332]: click
              - generic [ref=e333]:
                - generic [ref=e334]: Curved line
                - generic [ref=e335]:
                  - generic [ref=e336]: L
                  - generic [ref=e337]: click
                  - generic [ref=e338]: click
                  - generic [ref=e339]: click
              - generic [ref=e340]:
                - generic [ref=e341]: Crop image
                - generic [ref=e342]:
                  - generic [ref=e343]: double-click
                  - text: or
                  - generic [ref=e344]: Enter
              - generic [ref=e345]:
                - generic [ref=e346]: Finish image cropping
                - generic [ref=e347]:
                  - generic [ref=e348]: Enter
                  - text: or
                  - generic [ref=e349]: Esc
              - generic [ref=e350]:
                - generic [ref=e351]: Keep selected tool active after drawing
                - generic [ref=e353]: Q
              - generic [ref=e354]:
                - generic [ref=e355]: Prevent arrow binding
                - generic [ref=e357]: Ctrl
              - generic [ref=e358]:
                - generic [ref=e359]: Add / Update link for a selected shape
                - generic [ref=e360]:
                  - generic [ref=e361]: Ctrl
                  - generic [ref=e362]: K
              - generic [ref=e363]:
                - generic [ref=e364]: Toggle shape type
                - generic [ref=e365]:
                  - generic [ref=e366]: Tab
                  - text: or
                  - generic [ref=e367]: Shift
                  - generic [ref=e368]: Tab
          - generic [ref=e369]:
            - heading "View" [level=4] [ref=e370]
            - generic [ref=e371]:
              - generic [ref=e372]:
                - generic [ref=e373]: Zoom in
                - generic [ref=e374]:
                  - generic [ref=e375]: Ctrl
                  - generic [ref=e376]: +
              - generic [ref=e377]:
                - generic [ref=e378]: Zoom out
                - generic [ref=e379]:
                  - generic [ref=e380]: Ctrl
                  - generic [ref=e381]: "-"
              - generic [ref=e382]:
                - generic [ref=e383]: Reset zoom
                - generic [ref=e384]:
                  - generic [ref=e385]: Ctrl
                  - generic [ref=e386]: "0"
              - generic [ref=e387]:
                - generic [ref=e388]: Zoom to fit all elements
                - generic [ref=e389]:
                  - generic [ref=e390]: Shift
                  - generic [ref=e391]: "1"
              - generic [ref=e392]:
                - generic [ref=e393]: Zoom to selection
                - generic [ref=e394]:
                  - generic [ref=e395]: Shift
                  - generic [ref=e396]: "2"
              - generic [ref=e397]:
                - generic [ref=e398]: Move page up/down
                - generic [ref=e400]: PgUp/PgDn
              - generic [ref=e401]:
                - generic [ref=e402]: Move page left/right
                - generic [ref=e403]:
                  - generic [ref=e404]: Shift
                  - generic [ref=e405]: PgUp/PgDn
              - generic [ref=e406]:
                - generic [ref=e407]: Zen mode
                - generic [ref=e408]:
                  - generic [ref=e409]: Alt
                  - generic [ref=e410]: Z
              - generic [ref=e411]:
                - generic [ref=e412]: Snap to objects
                - generic [ref=e413]:
                  - generic [ref=e414]: Alt
                  - generic [ref=e415]: S
              - generic [ref=e416]:
                - generic [ref=e417]: Toggle grid
                - generic [ref=e418]:
                  - generic [ref=e419]: Ctrl
                  - generic [ref=e420]: "'"
              - generic [ref=e421]:
                - generic [ref=e422]: View mode
                - generic [ref=e423]:
                  - generic [ref=e424]: Alt
                  - generic [ref=e425]: R
              - generic [ref=e426]:
                - generic [ref=e427]: Toggle light/dark theme
                - generic [ref=e428]:
                  - generic [ref=e429]: Alt
                  - generic [ref=e430]: Shift
                  - generic [ref=e431]: D
              - generic [ref=e432]:
                - generic [ref=e433]: Canvas & Shape properties
                - generic [ref=e434]:
                  - generic [ref=e435]: Alt
                  - generic [ref=e436]: /
              - generic [ref=e437]:
                - generic [ref=e438]: Find on canvas
                - generic [ref=e439]:
                  - generic [ref=e440]: Ctrl
                  - generic [ref=e441]: F
              - generic [ref=e442]:
                - generic [ref=e443]: Command palette
                - generic [ref=e444]:
                  - generic [ref=e445]: Ctrl
                  - generic [ref=e446]: /
                  - text: or
                  - generic [ref=e447]: Ctrl
                  - generic [ref=e448]: Shift
                  - generic [ref=e449]: P
          - generic [ref=e450]:
            - heading "Editor" [level=4] [ref=e451]
            - generic [ref=e452]:
              - generic [ref=e453]:
                - generic [ref=e454]: Create a flowchart from a generic element
                - generic [ref=e455]:
                  - generic [ref=e456]: Ctrl
                  - generic [ref=e457]: Arrow Key
              - generic [ref=e458]:
                - generic [ref=e459]: Navigate a flowchart
                - generic [ref=e460]:
                  - generic [ref=e461]: Alt
                  - generic [ref=e462]: Arrow Key
              - generic [ref=e463]:
                - generic [ref=e464]: Move canvas
                - generic [ref=e465]:
                  - generic [ref=e466]: Space
                  - generic [ref=e467]: drag
                  - text: or
                  - generic [ref=e468]: Wheel
                  - generic [ref=e469]: drag
              - generic [ref=e470]:
                - generic [ref=e471]: Reset the canvas
                - generic [ref=e472]:
                  - generic [ref=e473]: Ctrl
                  - generic [ref=e474]: Delete
              - generic [ref=e475]:
                - generic [ref=e476]: Delete
                - generic [ref=e478]: Delete
              - generic [ref=e479]:
                - generic [ref=e480]: Cut
                - generic [ref=e481]:
                  - generic [ref=e482]: Ctrl
                  - generic [ref=e483]: X
              - generic [ref=e484]:
                - generic [ref=e485]: Copy
                - generic [ref=e486]:
                  - generic [ref=e487]: Ctrl
                  - generic [ref=e488]: C
              - generic [ref=e489]:
                - generic [ref=e490]: Paste
                - generic [ref=e491]:
                  - generic [ref=e492]: Ctrl
                  - generic [ref=e493]: V
              - generic [ref=e494]:
                - generic [ref=e495]: Paste as plaintext
                - generic [ref=e496]:
                  - generic [ref=e497]: Ctrl
                  - generic [ref=e498]: Shift
                  - generic [ref=e499]: V
              - generic [ref=e500]:
                - generic [ref=e501]: Select all
                - generic [ref=e502]:
                  - generic [ref=e503]: Ctrl
                  - generic [ref=e504]: A
              - generic [ref=e505]:
                - generic [ref=e506]: Add element to selection
                - generic [ref=e507]:
                  - generic [ref=e508]: Shift
                  - generic [ref=e509]: click
              - generic [ref=e510]:
                - generic [ref=e511]: Deep select
                - generic [ref=e512]:
                  - generic [ref=e513]: Ctrl
                  - generic [ref=e514]: click
              - generic [ref=e515]:
                - generic [ref=e516]: Deep select within box, and prevent dragging
                - generic [ref=e517]:
                  - generic [ref=e518]: Ctrl
                  - generic [ref=e519]: drag
              - generic [ref=e520]:
                - generic [ref=e521]: Copy to clipboard as PNG
                - generic [ref=e522]:
                  - generic [ref=e523]: Shift
                  - generic [ref=e524]: Alt
                  - generic [ref=e525]: C
              - generic [ref=e526]:
                - generic [ref=e527]: Copy styles
                - generic [ref=e528]:
                  - generic [ref=e529]: Ctrl
                  - generic [ref=e530]: Alt
                  - generic [ref=e531]: C
              - generic [ref=e532]:
                - generic [ref=e533]: Paste styles
                - generic [ref=e534]:
                  - generic [ref=e535]: Ctrl
                  - generic [ref=e536]: Alt
                  - generic [ref=e537]: V
              - generic [ref=e538]:
                - generic [ref=e539]: Send to back
                - generic [ref=e540]:
                  - generic [ref=e541]: Ctrl
                  - generic [ref=e542]: Shift
                  - generic [ref=e543]: "["
              - generic [ref=e544]:
                - generic [ref=e545]: Bring to front
                - generic [ref=e546]:
                  - generic [ref=e547]: Ctrl
                  - generic [ref=e548]: Shift
                  - generic [ref=e549]: "]"
              - generic [ref=e550]:
                - generic [ref=e551]: Send backward
                - generic [ref=e552]:
                  - generic [ref=e553]: Ctrl
                  - generic [ref=e554]: "["
              - generic [ref=e555]:
                - generic [ref=e556]: Bring forward
                - generic [ref=e557]:
                  - generic [ref=e558]: Ctrl
                  - generic [ref=e559]: "]"
              - generic [ref=e560]:
                - generic [ref=e561]: Align top
                - generic [ref=e562]:
                  - generic [ref=e563]: Ctrl
                  - generic [ref=e564]: Shift
                  - generic [ref=e565]: Up
              - generic [ref=e566]:
                - generic [ref=e567]: Align bottom
                - generic [ref=e568]:
                  - generic [ref=e569]: Ctrl
                  - generic [ref=e570]: Shift
                  - generic [ref=e571]: Down
              - generic [ref=e572]:
                - generic [ref=e573]: Align left
                - generic [ref=e574]:
                  - generic [ref=e575]: Ctrl
                  - generic [ref=e576]: Shift
                  - generic [ref=e577]: Left
              - generic [ref=e578]:
                - generic [ref=e579]: Align right
                - generic [ref=e580]:
                  - generic [ref=e581]: Ctrl
                  - generic [ref=e582]: Shift
                  - generic [ref=e583]: Right
              - generic [ref=e584]:
                - generic [ref=e585]: Duplicate
                - generic [ref=e586]:
                  - generic [ref=e587]: Ctrl
                  - generic [ref=e588]: D
                  - text: or
                  - generic [ref=e589]: Alt
                  - generic [ref=e590]: drag
              - generic [ref=e591]:
                - generic [ref=e592]: Lock/unlock selection
                - generic [ref=e593]:
                  - generic [ref=e594]: Ctrl
                  - generic [ref=e595]: Shift
                  - generic [ref=e596]: L
              - generic [ref=e597]:
                - generic [ref=e598]: Undo
                - generic [ref=e599]:
                  - generic [ref=e600]: Ctrl
                  - generic [ref=e601]: Z
              - generic [ref=e602]:
                - generic [ref=e603]: Redo
                - generic [ref=e604]:
                  - generic [ref=e605]: Ctrl
                  - generic [ref=e606]: Shift
                  - generic [ref=e607]: Z
              - generic [ref=e608]:
                - generic [ref=e609]: Group selection
                - generic [ref=e610]:
                  - generic [ref=e611]: Ctrl
                  - generic [ref=e612]: G
              - generic [ref=e613]:
                - generic [ref=e614]: Ungroup selection
                - generic [ref=e615]:
                  - generic [ref=e616]: Ctrl
                  - generic [ref=e617]: Shift
                  - generic [ref=e618]: G
              - generic [ref=e619]:
                - generic [ref=e620]: Flip horizontal
                - generic [ref=e621]:
                  - generic [ref=e622]: Shift
                  - generic [ref=e623]: H
              - generic [ref=e624]:
                - generic [ref=e625]: Flip vertical
                - generic [ref=e626]:
                  - generic [ref=e627]: Shift
                  - generic [ref=e628]: V
              - generic [ref=e629]:
                - generic [ref=e630]: Show stroke color picker
                - generic [ref=e632]: S
              - generic [ref=e633]:
                - generic [ref=e634]: Show background color picker
                - generic [ref=e636]: G
              - generic [ref=e637]:
                - generic [ref=e638]: Show font picker
                - generic [ref=e639]:
                  - generic [ref=e640]: Shift
                  - generic [ref=e641]: F
              - generic [ref=e642]:
                - generic [ref=e643]: Decrease font size
                - generic [ref=e644]:
                  - generic [ref=e645]: Ctrl
                  - generic [ref=e646]: Shift
                  - generic [ref=e647]: <
              - generic [ref=e648]:
                - generic [ref=e649]: Increase font size
                - generic [ref=e650]:
                  - generic [ref=e651]: Ctrl
                  - generic [ref=e652]: Shift
                  - generic [ref=e653]: ">"
```

# Test source

```ts
  71  |     const toolbar = page.locator('[class*="App-toolbar"]').first();
  72  |     await expect(toolbar).toHaveScreenshot("caso1.2-icones-toolbar.png");
  73  |   });
  74  | 
  75  |   test("1.3 — Ferramenta selecionada deve ter destaque visual (azul)", async ({
  76  |     page,
  77  |   }) => {
  78  |     const toolsToTest = [
  79  |       "toolbar-rectangle",
  80  |       "toolbar-ellipse",
  81  |       "toolbar-arrow",
  82  |       "toolbar-text",
  83  |     ];
  84  | 
  85  |     for (const testId of toolsToTest) {
  86  |       await page.locator(`[data-testid="${testId}"]`).click();
  87  |       await page.waitForTimeout(200);
  88  | 
  89  |       const isChecked = await page
  90  |         .locator(`[data-testid="${testId}"]`)
  91  |         .isChecked()
  92  |         .catch(() => false);
  93  | 
  94  |       if (isChecked !== false) {
  95  |         expect(isChecked).toBe(true);
  96  |       }
  97  |     }
  98  | 
  99  |     const toolbar = page.locator('[class*="App-toolbar"]').first();
  100 |     await expect(toolbar).toHaveScreenshot("caso1.3-estado-ativo.png");
  101 |   });
  102 | });
  103 | 
  104 | test.describe("Caso 2 — Menu Lateral", () => {
  105 |   test.beforeEach(async ({ page }) => {
  106 |     await page.goto("/");
  107 |     await waitForExcalidrawReady(page);
  108 |     await page.mouse.click(640, 400);
  109 |     await page.waitForTimeout(300);
  110 |   });
  111 | 
  112 |   test("2.1 — Painel de propriedades deve aparecer ao selecionar um elemento", async ({
  113 |     page,
  114 |   }) => {
  115 |     await page.locator('[data-testid="toolbar-rectangle"]').click();
  116 |     await page.waitForTimeout(200);
  117 | 
  118 |     await page.mouse.move(400, 300);
  119 |     await page.mouse.down();
  120 |     await page.mouse.move(600, 450);
  121 |     await page.mouse.up();
  122 |     await page.waitForTimeout(300);
  123 | 
  124 |     await page.locator('[data-testid="toolbar-selection"]').click();
  125 |     await page.waitForTimeout(200);
  126 |     await page.mouse.click(500, 375);
  127 |     await page.waitForTimeout(500);
  128 | 
  129 |     const strokeLabel = page.getByText("Stroke", { exact: false });
  130 |     await expect(strokeLabel.first()).toBeVisible({ timeout: 5000 });
  131 | 
  132 |     await expect(page).toHaveScreenshot("caso2.1-menu-visivel.png", {
  133 |       fullPage: false,
  134 |     });
  135 |   });
  136 | 
  137 |   test("2.2 — Painel deve conter todas as opções de personalização", async ({
  138 |     page,
  139 |   }) => {
  140 |     await page.locator('[data-testid="toolbar-rectangle"]').click();
  141 |     await page.mouse.move(400, 300);
  142 |     await page.mouse.down();
  143 |     await page.mouse.move(600, 450);
  144 |     await page.mouse.up();
  145 |     await page.waitForTimeout(300);
  146 | 
  147 |     await page.locator('[data-testid="toolbar-selection"]').click();
  148 |     await page.mouse.click(500, 375);
  149 |     await page.waitForTimeout(500);
  150 | 
  151 |     const expectedLabels = [
  152 |       "Stroke",
  153 |       "Background",
  154 |       "Fill",
  155 |       "Stroke width",
  156 |       "Stroke style",
  157 |       "Sloppiness",
  158 |       "Edges",
  159 |       "Opacity",
  160 |     ];
  161 | 
  162 |     for (const label of expectedLabels) {
  163 |       const element = page.getByText(label, { exact: false });
  164 |       await expect(element.first()).toBeVisible({ timeout: 5000 });
  165 |     }
  166 |   });
  167 | 
  168 |   test("2.3 — Painel deve estar posicionado na lateral esquerda", async ({
  169 |     page,
  170 |   }) => {
> 171 |     await page.locator('[data-testid="toolbar-rectangle"]').click();
      |                                                             ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  172 |     await page.mouse.move(400, 300);
  173 |     await page.mouse.down();
  174 |     await page.mouse.move(600, 450);
  175 |     await page.mouse.up();
  176 |     await page.waitForTimeout(300);
  177 | 
  178 |     await page.locator('[data-testid="toolbar-selection"]').click();
  179 |     await page.mouse.click(500, 375);
  180 |     await page.waitForTimeout(500);
  181 | 
  182 |     const panel = page.locator('[class*="App-menu_top__left"]').first();
  183 |     await expect(panel).toBeVisible();
  184 | 
  185 |     const boundingBox = await panel.boundingBox();
  186 |     expect(boundingBox).not.toBeNull();
  187 |     expect(boundingBox!.x).toBeLessThan(640);
  188 |   });
  189 | 
  190 |   test("2.4 — Alterações no painel devem refletir no elemento em tempo real", async ({
  191 |     page,
  192 |   }) => {
  193 |     await page.locator('[data-testid="toolbar-rectangle"]').click();
  194 |     await page.mouse.move(400, 300);
  195 |     await page.mouse.down();
  196 |     await page.mouse.move(600, 450);
  197 |     await page.mouse.up();
  198 |     await page.waitForTimeout(300);
  199 | 
  200 |     await page.locator('[data-testid="toolbar-selection"]').click();
  201 |     await page.mouse.click(500, 375);
  202 |     await page.waitForTimeout(500);
  203 | 
  204 |     await expect(page).toHaveScreenshot("caso2.4-antes-alteracao.png", {
  205 |       fullPage: false,
  206 |     });
  207 | 
  208 |     const bgColorInput = page
  209 |       .locator('label:has-text("Background")')
  210 |       .locator("..")
  211 |       .locator("input[type='text']")
  212 |       .first();
  213 | 
  214 |     if (await bgColorInput.isVisible().catch(() => false)) {
  215 |       await bgColorInput.fill("#e74c3c");
  216 |       await bgColorInput.press("Enter");
  217 |       await page.waitForTimeout(500);
  218 |     }
  219 | 
  220 |     await expect(page).toHaveScreenshot("caso2.4-depois-alteracao.png", {
  221 |       fullPage: false,
  222 |     });
  223 |   });
  224 | });
  225 | 
```