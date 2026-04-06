# Portfolio QA Checklist

## Before release

- Run `npm run build` and confirm no asset errors.
- Open the portfolio section and verify every card image is visible.
- Simulate an image failure in DevTools (disable network or edit one URL) and confirm fallback switches to `/portfolio-fallback.avif` then `/portfolio-fallback.webp`.
- Check desktop and mobile: same card image area height, background, and padding on all cards.
- Verify Jumia card displays `public/jumia-logo-official.png` correctly.
- Hard refresh the page (`Ctrl+F5`) and confirm no stale logo remains.
