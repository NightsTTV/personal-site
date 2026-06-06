"""Key out the baked-in checkerboard/gray background from the kaspiBOT sprites.

Strategy: flood-fill from the image borders through "grayish" pixels only, so we
remove background-connected gray (checker, smoke, gradient) while preserving the
character's bold black outline and any interior grays (sneakers, white shirt).
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

SAT_THRESH = 26    # max-min channel <= this  => "grayish"
DARK_THRESH = 44   # mean brightness >= this  => background (below = black outline, keep)


def dealpha(path: str) -> None:
    img = Image.open(path).convert("RGBA")
    arr = np.asarray(img).astype(np.int16)
    r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]

    maxc = np.maximum(np.maximum(r, g), b)
    minc = np.minimum(np.minimum(r, g), b)
    mean = (r + g + b) / 3.0

    grayish = (maxc - minc) <= SAT_THRESH
    bright_enough = mean >= DARK_THRESH
    passable = grayish & bright_enough  # pixels the flood is allowed to travel through

    # Seed from the 1px border.
    seed = np.zeros_like(passable)
    seed[0, :] = passable[0, :]
    seed[-1, :] = passable[-1, :]
    seed[:, 0] = passable[:, 0]
    seed[:, -1] = passable[:, -1]

    background = ndimage.binary_propagation(seed, mask=passable)

    out = arr.copy()
    out[..., 3] = np.where(background, 0, a)

    # Soften a 1px halo: where a pixel is now transparent but neighbours opaque,
    # leave as-is; the black outline already gives a clean edge.
    Image.fromarray(out.astype(np.uint8), "RGBA").save(path)

    removed = int(background.sum())
    total = background.size
    print(f"{path}: removed {removed/total*100:.1f}% as background ({removed} px)")


if __name__ == "__main__":
    for p in sys.argv[1:]:
        dealpha(p)
