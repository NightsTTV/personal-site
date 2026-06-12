# kaspiBOT mascot images

The kaspiBOT dock at the bottom of the site shows a character peeking over it.
As the cursor gets closer, he smoothly "pops out" into his full-body pose.

Two images drive this effect — **save them here with these exact names** (PNG,
transparent background):

| File       | Which attachment                                        | Shown when            |
| ---------- | ------------------------------------------------------- | --------------------- |
| `peek.png` | The **head + two hands gripping over the wall** image   | cursor is far (rest)  |
| `full.png` | The **full standing body** image                        | cursor is near (out)  |

They render at the bottom-left, above the dock. The component (`src/components/
chip/ChipWidget.tsx`) hides either image gracefully if its file is missing, so
nothing breaks before you add them.

Tuning knobs live in `ChipWidget.tsx`:
- `near` / `far` (in the mouse-proximity effect) — how close triggers the pop-out.
- `peekStyle` / `fullStyle` — the rise distance, fade timing, and scale.
- `left-4 sm:left-16` on the mascot container — horizontal placement.
- sprite widths `w-[150px]` / `w-[190px]` — on-screen size.
