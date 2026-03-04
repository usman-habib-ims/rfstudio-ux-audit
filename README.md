## Issue 1 — Custom Cursor Lag (Critical)

### What the Problem Is
The site runs a custom dual-ring cursor effect using a JavaScript `mousemove`
event listener. Inside that listener, the cursor position is updated using
`style.left` and `style.top` directly on the DOM element.

Changing `left` and `top` forces the browser to recalculate the layout of the
entire page on every single mouse movement — a performance antipattern known as
**"layout thrashing"**. On mid-range laptops and devices the cursor ring
visibly trails behind the pointer and the whole site feels sluggish as a result.

### Where It Shows Up
- Sitewide — affects every page on rfstudio.co
- Most noticeable when moving the mouse quickly or during scroll
- Worst on mid-range Windows laptops and mobile devices with hover support

### Why It Matters
A laggy cursor is one of the first things a visitor notices. For an agency
selling itself as a high-performance growth studio, a jittery cursor directly
contradicts the brand. It signals poor technical quality before the user has
even read a word — and increases bounce rate.

### Root Cause (Code Level)
```js
// ❌ What the site is doing — triggers layout reflow every frame
cursor.style.left = e.clientX + 'px';
cursor.style.top  = e.clientY + 'px';
```

Changing `left` / `top` are **layout properties**. Every time they change,
the browser must:
1. Recalculate layout (reflow)
2. Repaint affected elements
3. Composite the result

This happens on every `mousemove` event — which fires up to 60–120 times
per second. The result is guaranteed jank.

### The Fix
Replace `left` / `top` with `transform: translate(x, y)`. Transforms are
handled entirely on the **GPU compositor thread** — they never trigger layout
or paint. Add `will-change: transform` to promote the element to its own GPU
layer upfront.

For the trailing ring, use `requestAnimationFrame` with a **lerp
(linear interpolation)** at factor `0.12` — this creates a smooth organic
trail without any setTimeout or setInterval hacks.
```js
// ✅ The fix — GPU composited, zero layout cost
// Dot follows mouse exactly
dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

// Ring lerps behind smoothly via rAF
ringX += (mouseX - ringX) * 0.12;
ringY += (mouseY - ringY) * 0.12;
ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
```

### Files Created / Modified

| File | What Changed |
|------|-------------|
| `src/components/CustomCursor.jsx` | Created — full GPU cursor component |
| `src/app/layout.jsx` | Added `<CustomCursor />` import and render |
| `src/app/globals.css` | Added `* { cursor: none !important; }` |

### Technical Details

| Property | Before | After |
|----------|--------|-------|
| Position method | `style.left / top` | `transform: translate()` |
| Rendering thread | Main (layout) | GPU Compositor |
| Triggers reflow | ✅ Yes — every frame | ❌ Never |
| `will-change` | Not set | `transform` |
| Trail method | Direct update | `requestAnimationFrame` + lerp |
| Memory cleanup | None | Listeners removed on unmount |

### Performance Impact
- Eliminates layout reflow on every mousemove event
- Cursor runs at a stable 60fps on all tested devices
- GPU compositor handles all movement — main thread is free
- Zero external libraries — only React hooks (`useRef`, `useEffect`)

### AI Prompt Used
> "I am building a Next.js 14 app (App Router, no TypeScript).
> I need you to fix a custom cursor performance issue.
> The problem: The current cursor updates position using style.left and
> style.top inside a mousemove event listener. This causes layout thrashing
> on every frame because left/top trigger browser reflow. The cursor ring
> visibly lags and feels janky on mid-range devices.
> What I want you to build: Create src/components/CustomCursor.jsx as a
> client component. Use useRef and useEffect. Main dot follows mouse exactly
> using transform only. Ring trails with rAF lerp at 0.12. Add will-change
> transform. Arrow SVG in #c8ff00 with glow. Rotates toward movement direction.
> Hover on a/button dims arrow and scales trail. Clean up on unmount.
> Also update layout.jsx and globals.css."

### Iterations Taken
- **Iteration 1:** Generated the component — worked but arrow rotation was
  slightly off because atan2 angle wasn't offset by 90 degrees for SVG
  coordinate space
- **Iteration 2:** Fixed the angle offset (`+ 90`), tested on multiple screen
  sizes — smooth and stable

### Before / After
| Metric | Before | After |
|--------|--------|-------|
| Layout reflows per second | Up to 120 | 0 |
| Rendering thread used | Main | GPU |
| Cursor feel | Laggy / janky | Smooth 60fps |
| External dependencies | 0 | 0 |



