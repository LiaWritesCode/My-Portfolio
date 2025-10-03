# ShadowScape Terminal Concept

## Commands

- `shadowscape.invoke()` → Opens portal modal
- `discord.join()` → Links to server
- `ledger.view("glyphs")` → Reveals lore fragments
- `portal.open()` → Opens ShadowScape portal
- `offering.send("crow")` → Unsure, but could be useful~

## Visual Logic

- Ambient-responsive glitch
- Crow glyph triggers hidden commands
- Terminal styled like mythic console

## To-Do

- Build terminal interface
- Design modal for ShadowScape intro
- Link Discord with symbolic command

## Inspiration

- Inspired by https://eeshanportfolio.netlify.app/ terminal

1. Barely-Visible Sigil

- Place a background SVG or div with ultra-low opacity (opacity: 0.05)
- Position it in a corner or center, depending on your ritual logic
- Use pointer-events: none until hover zone is activated

2. Glow on Hover

.sigil {
opacity: 0.05;
transition: opacity 0.3s ease, filter 0.3s ease;
}

.sigil:hover {
opacity: 0.8;
filter: drop-shadow(0 0 6px #c0c0ff);
}

3. Crow Cursor (if possible)

body {
cursor: url('crow-cursor.png'), auto;
}

.sigil:hover {
cursor: url('crow-cursor.png'), auto;
}

- The image must be:
- Small (ideally 32x32px or less)
- Transparent background (PNG or SVG)
- Hosted locally or via CDN

### MAKING SVG HAVE SHADOWS AND STUFF

@keyframes seep {
0% { filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.2)); }
50% { filter: drop-shadow(0 0 8px rgba(0, 0, 0, 0.4)); }
100% { filter: drop-shadow(0 0 4px rgba(0, 0, 0, 0.2)); }
}

.sigil {
animation: seep 6s infinite ease-in-out;
}
