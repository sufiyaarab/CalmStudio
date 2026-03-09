# Mystic Theme

This build uses the provided inspirational images as the background theme.

Files:
- `public/theme/mystic-1.png`
- `public/theme/mystic-2.png`

CSS:
- `app/globals.css` contains `.mystic-bg` which layers:
  - gradients for readability
  - the two images for mystical energy / warm golden glow

If text is hard to read:
- increase the alpha in the `linear-gradient(...)` layer
- or add more blur to `.mystic-bg` on large screens
