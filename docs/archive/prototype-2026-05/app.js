// ============================================================
// app.js — v3.1 (fix-pass).
//
// Square-bipyramid skeleton (8 explicit Line2 edges between named
// equator vertices and apices), 4 onion shells with camera-distance
// fade-in, breath rule (no lines render inside Shell 1), canonical
// label placement from a single ZONE_POSITIONS map, paused-by-default
// τ slider with a play/pause toggle.
//
// The diamond has THREE perpendicular axes — vertical (Birth/Death),
// affect (Hate/Love), time (Past/Future) — meeting at BEING. Every
// named zone sits on one of three φ-shells (1/φ³, 1/φ², 1/φ⁻¹) along
// one of those rays, with the equator at radius 1, apices at √φ, and
// off-sphere poles at φ.
// ============================================================

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import {
  PHI, PHI_HALF, SHELLS, SPHERE_RADIUS, BIPY_TIP, LIMIT,
} from './coordinates.js';

import {
  buildBipyramidEdges, buildOnionShells, breathAlpha, buildTorusGrid, buildAxis,
} from './geometry.js';

import {
  SOURCES, POINT, HOVER_TO_POINT, POSITION_INDEX,
  sourceById, slotKeyOf, glossFor, hasResonances,
} from './content/sources.js';
import { READINGS, HOVER_BLURBS, HOVER_TO_SECTION } from './content/readings.js';
import { buildGlyphLayer, pickGlyph } from './glyphs.js';

// ============================================================
// φ shorthands (φ-shells along every ray).
// ============================================================
const SHELL3 = SHELLS[0];   // 1/φ   ≈ 0.618
const SHELL2 = SHELLS[1];   // 1/φ²  ≈ 0.382
const SHELL1 = SHELLS[2];   // 1/φ³  ≈ 0.236
const APEX_R = PHI_HALF;    // √φ    ≈ 1.272
const POLE_R = LIMIT;       // φ     ≈ 1.618

// ============================================================
// ZONE_POSITIONS — the canonical placement of every named zone.
// Keyed by lowercase id; values are THREE.Vector3 in world units.
//
// Single source of truth: drives label placement AND resonance-line
// endpoints. Mirrors the position table in the v3.1 brief exactly.
// ============================================================
const v = (x, y, z) => new THREE.Vector3(x, y, z);

const ZONE_POSITIONS = Object.freeze({
  being:        v(0, 0, 0),
  // Vertical axis (y)
  oppression:   v(0,  SHELL1,  0),
  excitement:   v(0,  SHELL2,  0),
  intensity:    v(0,  SHELL3,  0),
  obliteration: v(0,  APEX_R,  0),
  death:        v(0,  POLE_R,  0),
  reflection:   v(0, -SHELL1,  0),
  meditation:   v(0, -SHELL2,  0),
  insight:      v(0, -SHELL3,  0),
  awakening:    v(0, -APEX_R,  0),
  birth:        v(0, -POLE_R,  0),
  // Affect axis (x)
  attraction:   v( SHELL1, 0, 0),
  desire:       v( SHELL2, 0, 0),
  love:         v( 1,      0, 0),
  aversion:     v(-SHELL1, 0, 0),
  fear:         v(-SHELL2, 0, 0),
  hate:         v(-1,      0, 0),
  // Time axis (z)
  past:         v(0, 0, -1),
  future:       v(0, 0,  1),
});

// Resonance-target lookup. Mirrors zone names AND the slot-key shorthands
// the sources file uses (Shell1/2/3, AffectAxis, TimeAxis).
const ZONE_CENTER = (() => {
  const m = {};
  // Capitalised keys (sources.js writes 'Death', 'Insight' etc.)
  for (const [id, p] of Object.entries(ZONE_POSITIONS)) {
    m[cap(id)] = p;
  }
  // Region-style aliases for shells and axis fallbacks.
  m['BEING']      = ZONE_POSITIONS.being;
  m['Shell1']     = v(0,  SHELL1, 0);
  m['Shell2']     = v(0,  SHELL2, 0);
  m['Shell3']     = v(0,  SHELL3, 0);
  m['AffectAxis'] = v( 1, 0, 0);             // Love endpoint as proxy
  m['TimeAxis']   = v(0, 0,  1);             // Future endpoint as proxy
  return m;
})();
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// ============================================================
// DOM refs
// ============================================================
const stage         = document.getElementById('stage');
const canvas        = document.getElementById('scene');
const labelLayer    = document.getElementById('label-layer');
const tooltip       = document.getElementById('tooltip');
const tauSlider     = document.getElementById('tau-slider');
const tauValueEl    = document.getElementById('tau-value');
const rotateBtn     = document.getElementById('rotate-btn');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const readingsRoot  = document.getElementById('readings');

// ============================================================
// Three.js setup
// ============================================================
const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(36, 1, 0.01, 100);
camera.position.set(3.4, 2.0, 4.2);

const renderer = new THREE.WebGLRenderer({
  canvas, antialias: true, alpha: true, powerPreference: 'high-performance',
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping    = true;
controls.dampingFactor    = 0.06;
controls.minDistance      = 0.40;   // can fly inside the inmost shell
controls.maxDistance      = 11;
controls.enablePan        = false;
controls.autoRotate       = false;  // driven by the play button + tick()
controls.autoRotateSpeed  = 0;      // we set it dynamically in tick()
controls.target.set(0, 0, 0);

// Rotation curve: full speed at maxDistance, near zero at minDistance.
// Maps current camera distance → autoRotateSpeed value.
const ROTATE_MAX_SPEED = 0.55;
function rotateSpeedForDistance(d) {
  const t = (d - controls.minDistance) / (controls.maxDistance - controls.minDistance);
  const k = Math.max(0, Math.min(1, t));
  return ROTATE_MAX_SPEED * k * k;   // ease-in: very slow inside, brisk outside
}

// ============================================================
// Palette
// ============================================================
const PAL = {
  bipyEdge:     0x383c44,   // bipyramid + torus grid: cool near-black
  axisLine:     0x8c5a2b,   // axis lines: warm bronze — reads as "axis" not "edge"
  gold:         0xc8951a,
  goldGlow:     0xd9a823,
  needle:       0x101216,
  resonance:    0xb070b0,
  timeDash:     0x7a7d83,
  glyphMagenta: 0x3a1d52,   // solid dark purple (was magenta)
};

// ============================================================
// Scene contents
// ============================================================
const sceneRoot = new THREE.Group();
scene.add(sceneRoot);

// (1) Onion shells — 4 nested translucent layers, camera-distance fade.
const onion = buildOnionShells();
sceneRoot.add(onion.group);

// (2) Bipyramid skeleton — 8 explicit Line2 fat-line edges.
const bipy = buildBipyramidEdges({
  segments:  32,
  color:     PAL.bipyEdge,
  opacity:   0.30,
  linewidth: 2.0,
});
sceneRoot.add(bipy.group);

// (2b) Horn-torus grid — hidden at τ=0, fades in as τ → 1.
const torusGrid = buildTorusGrid({
  meridians: 24,
  parallels: 16,
  segments:  64,
  color:     PAL.bipyEdge,
  linewidth: 1.0,
});
sceneRoot.add(torusGrid.group);

// (3) BEING — gold luminous core with soft diffusion.
function buildGoldDot() {
  const g = new THREE.Group();
  // Tighter glow / halo / core for a more defined gold dot against the
  // higher-key background. Halo opacity lifted so it still reads, but the
  // core is bigger and saturates more, giving a crisp luminous point.
  const glow = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 24, 24),
    new THREE.MeshBasicMaterial({ color: PAL.goldGlow, transparent: true, opacity: 0.10,
                                  depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(0.072, 24, 24),
    new THREE.MeshBasicMaterial({ color: PAL.gold, transparent: true, opacity: 0.55,
                                  depthWrite: false, blending: THREE.AdditiveBlending }),
  );
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.034, 24, 24),
    new THREE.MeshBasicMaterial({ color: 0xffd24a, transparent: true, opacity: 1.0,
                                  depthWrite: false }),
  );
  g.add(glow, halo, core);
  g.userData = { core, halo, glow };
  return g;
}
const being = buildGoldDot();
sceneRoot.add(being);

// (4) Birth (−φ) and Death (+φ) — black needle prick + soft white halo.
//     Inverse of BEING (gold core + diffusion outward): a TINY BLACK
//     pin at the exact pole point with a larger radiant white halo.
//     The halo is a Sprite with a radial-gradient texture so it fades
//     to transparent at the edge, letting the black needle remain
//     clearly visible at its centre against the off-white background.
function makeRadialHaloTexture(rgba0, rgba1) {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const cx = size / 2;
  const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
  grad.addColorStop(0,    rgba0);
  grad.addColorStop(0.45, rgba1);
  grad.addColorStop(1,    'rgba(255,255,255,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}
const LIMIT_HALO_TEX = makeRadialHaloTexture('rgba(255,255,255,0.85)', 'rgba(255,255,255,0.20)');

function buildLimitDot(y) {
  const g = new THREE.Group();
  // White halo as a camera-facing sprite with a radial gradient.
  // Larger, soft, falls off to zero at the edge.
  const haloMat = new THREE.SpriteMaterial({
    map: LIMIT_HALO_TEX,
    color: 0xffffff,
    transparent: true,
    opacity: 1.0,
    depthWrite: false,
    blending: THREE.NormalBlending,
  });
  const halo = new THREE.Sprite(haloMat);
  halo.scale.set(0.10, 0.10, 0.10);   // tighter halo — more definition
  halo.renderOrder = 4;

  // Black needle: bigger, opaque, with depthTest so it always reads as
  // a defined dot against the (now whiter) background and the gold torus.
  const core = new THREE.Mesh(
    new THREE.SphereGeometry(0.028, 24, 24),
    new THREE.MeshBasicMaterial({ color: PAL.needle, transparent: true, opacity: 1.0,
                                  depthWrite: false }),
  );
  core.renderOrder = 6;
  g.add(halo, core);
  g.position.y = y;
  g.userData = { core, halo };
  return g;
}
const deathDot = buildLimitDot(+POLE_R);
const birthDot = buildLimitDot(-POLE_R);
sceneRoot.add(deathDot, birthDot);

// (5) Three principal axes — vertical (Birth–Death), affect (Hate–Love),
//     time (Past–Future). Each: TWO Line2 fat segments with a small breath
//     gap around BEING. Warm bronze hue distinguishes them from the
//     cool near-black bipyramid edges.
const verticalAxis = buildAxis(new THREE.Vector3(0, 1, 0), LIMIT,
  { color: PAL.axisLine, opacity: 0.55, linewidth: 1.6 });
const affectAxis   = buildAxis(new THREE.Vector3(1, 0, 0), 1.0,
  { color: PAL.axisLine, opacity: 0.55, linewidth: 1.6 });
const timeAxisObj  = buildAxis(new THREE.Vector3(0, 0, 1), 1.0,
  { color: PAL.axisLine, opacity: 0.55, linewidth: 1.6 });
sceneRoot.add(verticalAxis.group, affectAxis.group, timeAxisObj.group);
const allAxes = [verticalAxis, affectAxis, timeAxisObj];
// Compatibility shim for the existing setTau() opacity sweep.
const timeAxis = timeAxisObj.group;

// (6) Resonance lines — at most 3 per hover, breath-rule clipped.
//     Each line is built as a polyline of N samples; samples whose
//     radial distance lies inside Shell 1 are skipped, yielding the
//     "fade into the inmost shell" effect.
const RES_SAMPLES = 24;        // per resonance line
const resonanceMaxLines = 3;
const resonancePositions = new Float32Array(resonanceMaxLines * (RES_SAMPLES - 1) * 2 * 3);
const resonanceGeo = new THREE.BufferGeometry();
resonanceGeo.setAttribute('position', new THREE.BufferAttribute(resonancePositions, 3));
resonanceGeo.setDrawRange(0, 0);
const resonanceMat = new THREE.LineBasicMaterial({
  color: PAL.resonance, transparent: true, opacity: 0, depthWrite: false,
});
const resonanceLines = new THREE.LineSegments(resonanceGeo, resonanceMat);
sceneRoot.add(resonanceLines);

let resonanceTargetOpacity = 0;

// Walk start→end as N samples; emit segment pairs only where BOTH
// endpoints have nonzero breath alpha (i.e. lie outside Shell 1).
function fillResonanceSegments(start, end, writeOffset) {
  let count = 0;
  let prev = null, prevAlpha = 0;
  for (let i = 0; i < RES_SAMPLES; i++) {
    const t = i / (RES_SAMPLES - 1);
    const x = start.x + (end.x - start.x) * t;
    const y = start.y + (end.y - start.y) * t;
    const z = start.z + (end.z - start.z) * t;
    const d = Math.sqrt(x*x + y*y + z*z);
    const a = breathAlpha(d);
    if (prev !== null && (prevAlpha > 0 || a > 0)) {
      const o = (writeOffset + count) * 6;
      resonancePositions[o + 0] = prev.x;
      resonancePositions[o + 1] = prev.y;
      resonancePositions[o + 2] = prev.z;
      resonancePositions[o + 3] = x;
      resonancePositions[o + 4] = y;
      resonancePositions[o + 5] = z;
      count++;
    }
    prev = { x, y, z };
    prevAlpha = a;
  }
  return count;
}

function showResonanceFor(sourceId) {
  const s = sourceById(sourceId);
  if (!s || !Array.isArray(s.resonances) || s.resonances.length === 0) {
    hideResonance(); return;
  }
  const meta = glyphs.meta.find(m => m.id === sourceId);
  if (!meta) { hideResonance(); return; }
  const start = meta.position;

  let totalSegments = 0;
  for (const z of s.resonances.slice(0, resonanceMaxLines)) {
    const end = ZONE_CENTER[z];
    if (!end) continue;
    totalSegments += fillResonanceSegments(start, end, totalSegments);
  }
  resonanceGeo.attributes.position.needsUpdate = true;
  resonanceGeo.setDrawRange(0, totalSegments * 2);
  resonanceTargetOpacity = 0.55;
}
function hideResonance() { resonanceTargetOpacity = 0; }

// (7) Glyph layer — solid dark-purple source dots.
const glyphs = buildGlyphLayer({ color: PAL.glyphMagenta, baseOpacity: 1.0 });
sceneRoot.add(glyphs.object);

// ============================================================
// Labels — one entry per named zone, derived from ZONE_POSITIONS.
//
// Tier rules (when a label becomes visible, by camera distance):
//   1 — BEING, Birth, Death, Past, Future                (always)
//   2 — Awakening, Obliteration                          (apex)
//   3 — Hate, Love                                       (sphere equator)
//   4 — Shell-3 zones: Intensity, Insight                (also Shell-3
//       affect would be — but Hate/Love already at radius 1)
//   4 — Shell-2 zones: Excitement, Meditation, Desire, Fear
//   5 — Shell-1 zones: Oppression, Reflection, Attraction, Aversion
//
// LABEL_KIND: 'axis-pole' for the six axis terminators (Birth/Death,
// Past/Future, Hate/Love, plus BEING) which carry full weight, vs
// 'zone' for the inner φ-tier names which are visually deprioritized
// (lighter font, muted ink) so they read as inhabitants of the frame
// and not as new principal axes. Awakening / Obliteration are zones
// even though they sit on the vertical axis — they are the points
// where the apex pierces the limit sphere, not axis poles.
// ============================================================
const LABEL_TIER = {
  being:1, birth:1, death:1, past:1, future:1,
  awakening:2, obliteration:2,
  hate:3, love:3,
  intensity:4, insight:4,
  excitement:4, meditation:4, desire:4, fear:4,
  oppression:5, reflection:5, attraction:5, aversion:5,
};
const LABEL_AXIS = {
  being:'vertical',
  oppression:'vertical', excitement:'vertical', intensity:'vertical',
  obliteration:'vertical', death:'vertical',
  reflection:'vertical', meditation:'vertical', insight:'vertical',
  awakening:'vertical', birth:'vertical',
  attraction:'affect', desire:'affect', love:'affect',
  aversion:'affect',   fear:'affect',   hate:'affect',
  past:'time', future:'time',
};
const LABEL_KIND = {
  // Axis poles — full visual weight.
  being:'axis-pole',
  birth:'axis-pole',  death:'axis-pole',
  hate:'axis-pole',   love:'axis-pole',
  past:'axis-pole',   future:'axis-pole',
  // Zones — deprioritized visually, fade as inhabitants of the frame.
  awakening:'zone',   obliteration:'zone',
  oppression:'zone',  excitement:'zone',  intensity:'zone',
  reflection:'zone',  meditation:'zone',  insight:'zone',
  attraction:'zone',  desire:'zone',      love:'zone',          // love is BOTH an axis-pole and a zone-member of shell-3 — stays axis-pole (overrides above)
  aversion:'zone',    fear:'zone',
};
// love/hate are axis-poles, not zones — patch the conflict from the
// shell-3 affect listing above. (We keep one declarative table over
// the duplication risk of two parallel ones.)
LABEL_KIND.love = 'axis-pole';
LABEL_KIND.hate = 'axis-pole';

// World-space label positions: each label is anchored on the zone's
// actual world coordinate so it sits at the centre of its zone, not
// at an offset edge. Visual separation from the y-axis line and from
// other labels is handled in screen space (in updateLabels) and by
// a vertical-cluster fade (in computeVerticalClusterFade) so labels
// piling on the y-axis from a top-down view dissolve cleanly.
const LABEL_WORLD = (() => {
  const m = {};
  for (const [id, p] of Object.entries(ZONE_POSITIONS)) {
    m[id] = p.clone();
  }
  return m;
})();

const labelData = [];

function addLabel(id) {
  const name = displayName(id);
  const axis = LABEL_AXIS[id];
  const tier = LABEL_TIER[id];
  const world = LABEL_WORLD[id];

  const kind = LABEL_KIND[id] || 'zone';
  const el = document.createElement('div');
  el.className = `tier-label axis-${axis} kind-${kind}`;
  el.dataset.id = id;
  el.dataset.kind = kind;
  el.textContent = name;
  el.setAttribute('role', 'button');
  el.setAttribute('tabindex', '0');
  el.setAttribute('aria-label', `${name} — click for sources`);
  if (id === 'being') { el.classList.add('being-label'); el.id = 'being-label-overlay'; }
  labelLayer.appendChild(el);

  // worldBase is the canonical resting position (used for the diamond at τ=0).
  // world is what we project each frame; the four pole labels (Birth, Death,
  // Past, Future) animate world inward toward BEING as τ rises.
  const entry = {
    id, name, axis, tier, kind,
    worldBase: world.clone(),
    world: world.clone(),
    el, visible: 1,
  };
  labelData.push(entry);

  el.addEventListener('mouseenter', (e) => showHoverTooltip(id, e));
  el.addEventListener('focus',      (e) => showHoverTooltip(id, e));
  el.addEventListener('mouseleave', hideTooltip);
  el.addEventListener('blur',       hideTooltip);
  el.addEventListener('click', (e) => { e.stopPropagation(); showHoverTooltip(id, e, { sticky: true }); });
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showHoverTooltip(id, e, { sticky: true }); }
  });
  return entry;
}

function displayName(id) {
  if (id === 'being') return 'BEING';
  return cap(id);
}

// Build all labels declaratively from the zone map.
Object.keys(ZONE_POSITIONS).forEach(id => addLabel(id));

// ============================================================
// Tooltip — hover (label-anchored) and glyph (source-deterministic).
// Carry-forward from v3, unchanged in behaviour.
// ============================================================
let tooltipState = { open: false, sticky: false, mode: null, currentId: null };

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function poolFor(hoverId) {
  const coordKey = HOVER_TO_POINT[hoverId];
  if (!coordKey) return [];
  const slotKey = `point:${coordKey}`;
  return (POSITION_INDEX[slotKey] || []).slice();
}

function buildHoverFor(hoverId) {
  const pool = poolFor(hoverId);
  const sample = shuffle(pool).slice(0, 5).map(id => sourceById(id)).filter(Boolean);
  const slotKey = `point:${HOVER_TO_POINT[hoverId]}`;
  return {
    id:    hoverId,
    name:  displayName(hoverId),
    blurb: HOVER_BLURBS[hoverId] || '',
    poolSize: pool.length,
    samples:  sample.map(s => ({
      id:    s.id,
      label: `${s.author} — ${s.work}`,
      gloss: glossFor(s, slotKey),
    })),
  };
}

function showHoverTooltip(hoverId, ev, opts = {}) {
  if (currentTau >= 0.95) return;
  const ld = labelData.find(l => l.id === hoverId);
  if (ld && ld.visible < 0.2) return;
  const data = buildHoverFor(hoverId);
  if (!data.samples.length) return;

  tooltip.innerHTML = `
    <button class="tip-close" aria-label="Close">×</button>
    <div class="tip-name">${data.name}</div>
    <div class="tip-blurb">${data.blurb}</div>
    <div class="tip-sources-label">
      Sources <span class="tip-pool-meta">${Math.min(5, data.poolSize)} of ${data.poolSize}</span>
    </div>
    <div class="tip-sources">
      ${data.samples.map(s => `
        <button class="tip-source" data-source-id="${s.id}" title="${escapeAttr(s.gloss)}">
          ${escapeHTML(s.label)}
        </button>
      `).join('')}
    </div>
  `;
  tooltip.setAttribute('aria-hidden', 'false');
  tooltip.classList.add('is-visible');
  tooltipState = { open: true, sticky: !!opts.sticky, mode: 'hover', currentId: hoverId };
  positionTooltipAt(ev);
  wireTooltipClose();
  tooltip.querySelectorAll('.tip-source').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleSourceClick(btn.dataset.sourceId);
    });
  });
}

function showGlyphTooltip(meta, ev) {
  if (currentTau >= 0.95) return;
  const s = meta.source;
  tooltip.innerHTML = `
    <button class="tip-close" aria-label="Close">×</button>
    <div class="tip-name tip-name-glyph">${escapeHTML(s.author)}</div>
    <div class="tip-work"><em>${escapeHTML(s.work)}</em>${s.year ? ` · ${escapeHTML(s.year)}` : ''}</div>
    <div class="tip-blurb">${escapeHTML(s.gloss_at_primary)}</div>
    <button class="tip-source tip-glyph-cta" data-source-id="${s.id}">read in full ↓</button>
  `;
  tooltip.setAttribute('aria-hidden', 'false');
  tooltip.classList.add('is-visible', 'is-glyph');
  tooltipState = { open: true, sticky: false, mode: 'glyph', currentId: s.id };
  positionTooltipAt(ev);
  wireTooltipClose();
  tooltip.querySelector('.tip-glyph-cta')?.addEventListener('click', (e) => {
    e.stopPropagation();
    handleSourceClick(s.id);
  });
}

// Wire the × close button on whichever tooltip card is currently rendered.
// Forces sticky off so hideTooltip() can actually hide it.
function wireTooltipClose() {
  tooltip.querySelector('.tip-close')?.addEventListener('click', (e) => {
    e.stopPropagation();
    tooltipState.sticky = false;
    hideTooltip();
  });
}

function hideTooltip() {
  if (tooltipState.sticky) return;
  tooltip.classList.remove('is-visible', 'is-glyph');
  tooltip.setAttribute('aria-hidden', 'true');
  tooltipState = { open: false, sticky: false, mode: null, currentId: null };
}

function positionTooltipAt(ev) {
  if (!ev) return;
  const rect = stage.getBoundingClientRect();
  const x = (ev.clientX ?? rect.left + rect.width/2) - rect.left;
  const y = (ev.clientY ?? rect.top + rect.height/2) - rect.top;
  // Measure the actual rendered tooltip so the clamp respects content
  // length (CSS max-height: 70% means the card can be tall when the
  // content is long). Falls back to nominal sizes if not laid out yet.
  const tw = tooltip.offsetWidth  || 320;
  const th = tooltip.offsetHeight || 240;
  const px = Math.min(rect.width  - tw - 12, Math.max(12, x + 14));
  const py = Math.min(rect.height - th - 12, Math.max(12, y + 14));
  tooltip.style.left = `${px}px`;
  tooltip.style.top  = `${py}px`;
}

document.addEventListener('click', (e) => {
  if (!tooltipState.sticky) return;
  if (tooltip.contains(e.target)) return;
  if (e.target.classList?.contains('tier-label')) return;
  if (e.target.id === 'being-label-overlay') return;
  tooltipState.sticky = false;
  hideTooltip();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (isExpanded) {
      isExpanded = false;
      stage.classList.remove('is-fullscreen');
      document.body.classList.remove('stage-expanded');
      resize();
    }
    tooltipState.sticky = false;
    hideTooltip();
    closeOverlayReading();
  }
});

// ============================================================
// Source click → in-figure overlay card (default).
// The overlay covers the figure stage, presents the full source
// entry, and offers an explicit "Read in full prose ↓" link that
// scrolls to the bibliography entry below. Pressing Escape, or
// clicking the backdrop / ×, closes the overlay and returns the
// reader to the figure.
//
// Rationale: previously a hover-panel click jumped the page to the
// bibliography, which lost the figure. The overlay keeps the reader
// in place and makes the bibliography a deliberate next step.
// ============================================================
const overlayReading = document.getElementById('overlay-reading');

function handleSourceClick(sourceId) {
  const s = sourceById(sourceId);
  if (!s) return;

  if (s.primary.type === 'point') {
    const labelId = pointCoordToLabelId(s.primary.coord);
    pulseLabel(labelId);
  }

  // Always open the in-figure overlay card. If the figure is not
  // currently in view (i.e. the user is reading the prose below),
  // bring the stage back into view so the overlay appears where it
  // is expected — over the model — not in the empty space below.
  ensureStageVisible();
  openOverlayReading(sourceId);
  // Hide the hover tooltip so the overlay reads cleanly.
  setTimeout(() => { tooltipState.sticky = false; hideTooltip(); }, 200);
}

function ensureStageVisible() {
  if (!stage) return;
  const rect = stage.getBoundingClientRect();
  // If less than ~30% of the stage is on screen, scroll it into view.
  const visible = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
  if (visible / window.innerHeight < 0.3) {
    stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Explicit scroll-to-prose path — used by the "Read in full prose ↓"
// link inside the overlay card. Closes the overlay, opens the
// containing accordion, scrolls to the entry, and pulses it.
function scrollToSourceEntry(sourceId) {
  closeOverlayReading();
  const entry = document.getElementById(`src-${sourceId}`);
  if (!entry) return;
  const accordion = entry.closest('details');
  if (accordion && !accordion.open) accordion.open = true;
  // Also open any nested details (e.g. region sub-groups in the
  // bibliography) so the entry is visible on arrival.
  let parent = entry.parentElement;
  while (parent && parent !== accordion) {
    if (parent.tagName === 'DETAILS') parent.open = true;
    parent = parent.parentElement;
  }
  // Slight delay so the accordion has time to expand before we scroll.
  requestAnimationFrame(() => {
    entry.scrollIntoView({ behavior: 'smooth', block: 'center' });
    entry.classList.add('is-flash');
    setTimeout(() => entry.classList.remove('is-flash'), 1600);
  });
}

function pointCoordToLabelId(coord) {
  if (coord === 'awakening_zone')    return 'awakening';
  if (coord === 'obliteration_zone') return 'obliteration';
  if (coord === 'omega_point')       return 'death';
  if (coord === 'tip_upper' || coord === 'tip_lower') return null;
  if (coord === 'BEING')             return 'being';
  return coord;
}

function pulseLabel(labelId) {
  if (!labelId) return;
  const l = labelData.find(x => x.id === labelId);
  if (!l) return;
  l.el.classList.remove('is-pulse');
  void l.el.offsetWidth;
  l.el.classList.add('is-pulse');
  setTimeout(() => l.el.classList.remove('is-pulse'), 1400);
}

function openOverlayReading(sourceId) {
  if (!overlayReading) return;
  const src = document.getElementById(`src-${sourceId}`);
  const text = src ? src.innerHTML : 'Source not found.';
  overlayReading.querySelector('.overlay-content').innerHTML = `
    <button class="overlay-close" aria-label="Close">×</button>
    <div class="overlay-source">${text}</div>
    <a class="overlay-jump" href="#src-${sourceId}" data-source-id="${sourceId}">Read in full prose ↓</a>
  `;
  overlayReading.classList.add('is-visible');
  overlayReading.querySelector('.overlay-close')
    .addEventListener('click', closeOverlayReading);
  overlayReading.querySelector('.overlay-jump')
    .addEventListener('click', (e) => {
      e.preventDefault();
      scrollToSourceEntry(sourceId);
    });
}
function closeOverlayReading() {
  if (!overlayReading) return;
  overlayReading.classList.remove('is-visible');
}
overlayReading?.addEventListener('click', (e) => {
  if (e.target === overlayReading) closeOverlayReading();
});

// ============================================================
// τ slider — manual scrub only (no auto-loop). The play button has
// been repurposed to drive sceneRoot rotation; τ is now a pure scrub
// control between bipyramid (τ=0) and horn torus (τ=1).
//
// Rotation toggle — spins the entire sceneRoot around the vertical
// (Birth–Death) axis at a slow rate, like a contemplative rotisserie.
// ============================================================
let currentTau     = 0;
let tauLabelFactor      = 1;   // pole labels: Birth / Death / Past / Future
let tauBeingLabelFactor = 1;   // BEING label — follows the gold dot's slow fade
let tauOtherLabelFactor = 1;   // shell-tier labels — fade with the diamond frame
let shellTauFade        = 1;   // onion-shell τ dimmer (1 → 0 as torus forms)
let isRotating     = false;
// Rotation now goes through OrbitControls.autoRotate (camera orbits the
// target). Speed is set per-frame in tick() based on camera distance,
// so the rotation slows as the user zooms inward toward the interior.

function setTau(t, fromUser = false) {
  currentTau = Math.max(0, Math.min(1, t));
  if (tauSlider) tauSlider.value = String(currentTau);
  if (tauValueEl) tauValueEl.textContent = currentTau.toFixed(2);

  bipy.setMorph(currentTau);

  // Torus grid morphs in lockstep with the bipyramid: at τ = 0 the grid
  // lies exactly on the bipyramid surface, at τ = 1 it is the full horn
  // torus. Opacity rises from the very first slider tick so the user
  // sees the donut shaping itself as the apices spread.
  torusGrid.setMorph(currentTau);
  // Two-stage grid opacity: appears early (cool, faint), brightens late
  // (gold, luminous) so the migration-of-glow lands as a real arrival.
  const gridIn   = THREE.MathUtils.smoothstep(currentTau, 0.0, 0.85);
  const gridGain = THREE.MathUtils.smoothstep(currentTau, 0.6, 1.0);
  torusGrid.setOpacity(0.30 * gridIn + 0.35 * gridGain);

  // Morph curves — three coordinated phases:
  //   collapseIn  : Birth/Death rush into BEING (fast, early)
  //   beingFade   : the gold dot dims through the morph
  //   gridGlow    : torus grid inherits BEING's gold luminosity as it forms
  const collapseIn = THREE.MathUtils.smoothstep(currentTau, 0.00, 0.30);
  const beingFade  = THREE.MathUtils.smoothstep(currentTau, 0.05, 0.85);
  const gridGlow   = THREE.MathUtils.smoothstep(currentTau, 0.10, 1.00);
  const limitOut   = 1 - THREE.MathUtils.smoothstep(currentTau, 0.30, 0.85);
  // Cached for updateLabels(), where shells are repainted per-frame and
  // need the same τ-fade as the bipyramid edges and axes (they belong to
  // the diamond frame and dissolve with it as the torus forms).
  shellTauFade = limitOut;
  const labelOut   = THREE.MathUtils.smoothstep(1 - currentTau, 0.05, 0.55);

  // Birth and Death rush down the y-axis into BEING and disappear early,
  // before the donut has finished forming. Their luminosity is what BEING
  // (and ultimately the torus) absorbs.
  deathDot.position.y =  POLE_R * (1 - collapseIn);
  birthDot.position.y = -POLE_R * (1 - collapseIn);
  const limitDotFade = 1 - collapseIn;
  [deathDot, birthDot].forEach(d => {
    d.userData.core.material.opacity = limitDotFade;
    d.userData.halo.material.opacity = limitDotFade;
  });

  // The three principal axes AND the bipyramid edges fade with τ — they
  // belong to the diamond frame. As Birth/Death collapse and the torus
  // forms, the frame quietly dissolves into the new surface.
  //
  // Axes also COLLAPSE into BEING along their own direction, in lockstep
  // with the pole-dot collapse. Each axis is aligned with a single world
  // axis (vertical=y, affect=x, time=z), so we scale only that component
  // of group.scale by (1 - collapseIn). The lines retract toward origin.
  const axisShrink = 1 - collapseIn;
  verticalAxis.group.scale.set(1, axisShrink, 1);
  affectAxis.group.scale.set(axisShrink, 1, 1);
  timeAxisObj.group.scale.set(1, 1, axisShrink);
  for (const ax of allAxes) ax.setOpacity(0.55 * limitOut);
  bipy.setOpacity(0.30 * limitOut);

  // BEING dot dims as the donut takes shape — its glow is migrating onto
  // the torus grid. By τ ≈ 0.85 the dot is gone; the torus carries the
  // gold luminosity that was concentrated at the centre.
  const beingHold = 1 - beingFade;
  being.userData.core.material.opacity = 1.0  * beingHold;
  being.userData.halo.material.opacity = 0.55 * beingHold;
  being.userData.glow.material.opacity = 0.10 * beingHold;

  // Torus grid: lerp colour from the cool bipy edge into BEING's gold.
  // The grid's own opacity ramp (set above) carries the appearance-of-form;
  // the colour shift carries the migration-of-glow.
  torusGrid.lerpColor(PAL.bipyEdge, PAL.gold, gridGlow);

  // Pole labels (Birth, Death, Past, Future) fade in lockstep with the
  // collapse of their points into BEING. BEING label fades on the slow
  // beingFade curve so it persists with the gold dot a little longer.
  // All OTHER labels drop to zero the moment the slider leaves 0.
  tauLabelFactor      = 1 - collapseIn;          // poles
  tauBeingLabelFactor = 1 - beingFade;           // BEING
  // All other labels (shell tiers — INTENSITY, OPPRESSION, REFLECTION, etc.)
  // fade with the same collapse curve as the bipyramid frame they label.
  tauOtherLabelFactor = 1 - collapseIn;

  // Pole labels also SLIDE inward along their axis to match the collapse.
  // Their worldBase is the canonical pole position; world is lerped toward
  // BEING (origin) so the label tracks its dot. Birth/Death have a small
  // x-offset so they don't pile on the BEING glow — we preserve that
  // offset by lerping the axial component only and keeping (x, z) for
  // verticals (or (x, y) for time labels) intact.
  for (const l of labelData) {
    if (l.id === 'birth' || l.id === 'death') {
      // Vertical poles: lerp y, keep the offset (x, z) intact.
      l.world.copy(l.worldBase);
      l.world.y = l.worldBase.y * (1 - collapseIn);
    } else if (l.id === 'past' || l.id === 'future') {
      // Time poles: lerp z toward 0.
      l.world.copy(l.worldBase);
      l.world.z = l.worldBase.z * (1 - collapseIn);
    } else if (l.world && !l.world.equals(l.worldBase)) {
      l.world.copy(l.worldBase);
    }
  }

  glyphs.setTau(currentTau);

  if (tooltip.classList.contains('is-visible')) {
    tooltip.style.opacity = String(labelOut);
    if (currentTau >= 0.95) {
      tooltipState.sticky = false;
      hideTooltip();
    }
  }

  // fromUser preserved as a no-op hook in case future modes want it.
  void fromUser;
}

function setRotating(rotating) {
  isRotating = rotating;
  controls.autoRotate = rotating;
  if (rotateBtn) {
    rotateBtn.textContent = rotating ? '❚❚' : '▶';
    rotateBtn.setAttribute('aria-label', rotating ? 'Stop rotation' : 'Start rotation');
    rotateBtn.classList.toggle('is-active', rotating);
  }
}

tauSlider?.addEventListener('input', () => setTau(parseFloat(tauSlider.value), true));
rotateBtn?.addEventListener('click', () => setRotating(!isRotating));

// ============================================================
// Glyph picking — hover at Tier 5 to show resonance lines + tooltip.
// ============================================================
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();
let hoveredGlyphId = null;
let longPressTimer = null;

function ndcFromEvent(ev) {
  const rect = canvas.getBoundingClientRect();
  ndc.x =  ((ev.clientX - rect.left) / rect.width)  * 2 - 1;
  ndc.y = -((ev.clientY - rect.top)  / rect.height) * 2 + 1;
}

canvas.addEventListener('mousemove', (ev) => {
  if (currentTau >= 0.9) return;
  ndcFromEvent(ev);
  const hit = (currentTier >= 5) ? pickGlyph(glyphs, raycaster, camera, ndc) : null;
  if (hit) {
    if (hit.id !== hoveredGlyphId) {
      hoveredGlyphId = hit.id;
      if (!tooltipState.sticky || tooltipState.mode === 'glyph') {
        showGlyphTooltip(hit, ev);
      }
      showResonanceFor(hit.id);
    }
  } else if (hoveredGlyphId) {
    hoveredGlyphId = null;
    if (tooltipState.mode === 'glyph') hideTooltip();
    hideResonance();
  }
});

canvas.addEventListener('mouseleave', () => {
  hoveredGlyphId = null;
  hideResonance();
});

canvas.addEventListener('touchstart', (ev) => {
  if (currentTau >= 0.9 || currentTier < 5) return;
  if (ev.touches.length !== 1) return;
  const t = ev.touches[0];
  ndcFromEvent(t);
  longPressTimer = setTimeout(() => {
    const hit = pickGlyph(glyphs, raycaster, camera, ndc);
    if (hit) {
      hoveredGlyphId = hit.id;
      showResonanceFor(hit.id);
      showGlyphTooltip(hit, t);
    }
  }, 350);
}, { passive: true });

canvas.addEventListener('touchend', () => {
  if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
  hideResonance();
});
canvas.addEventListener('touchcancel', () => {
  if (longPressTimer) { clearTimeout(longPressTimer); longPressTimer = null; }
  hideResonance();
});

canvas.addEventListener('click', (ev) => {
  // Intro-mode: the model boots as a slowly tumbling torus with the
  // welcome card hidden. The first click anywhere on the canvas wakes
  // the figure: τ animates from 1 → 0 (torus unfolds back into the
  // bipyramid), the slow precessional drift settles, and the welcome
  // card fades in. Subsequent clicks behave normally.
  if (introMode) {
    ev.stopPropagation();
    exitIntroMode();
    return;
  }
  if (currentTier < 5) return;
  ndcFromEvent(ev);
  const hit = pickGlyph(glyphs, raycaster, camera, ndc);
  if (hit) {
    ev.stopPropagation();
    handleSourceClick(hit.id);
  }
});

// ============================================================
// Expanded mode (in-page fullscreen)
// ============================================================
let isExpanded = false;
fullscreenBtn?.addEventListener('click', () => {
  isExpanded = !isExpanded;
  stage.classList.toggle('is-fullscreen', isExpanded);
  document.body.classList.toggle('stage-expanded', isExpanded);
  resize();
});

// ============================================================
// Resize + label projection + zoom-tier visibility
// ============================================================
function resize() {
  const w = stage.clientWidth;
  const h = stage.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / Math.max(1, h);
  camera.updateProjectionMatrix();
  // Line2 needs explicit resolution for pixel-width strokes.
  bipy.setResolution(w, h);
  torusGrid.setResolution(w, h);
  for (const ax of allAxes) ax.setResolution(w, h);
}
window.addEventListener('resize', resize);

const projectV = new THREE.Vector3();

// Map camera distance from origin → currently-revealed tier (1..5).
// Distances span [minDistance, maxDistance] = [2.4, 11].
function tierFromDistance(d) {
  if (d >= 8.0) return 1;
  if (d >= 6.0) return 2;
  if (d >= 4.5) return 3;
  if (d >= 3.2) return 4;
  return 5;
}
let currentTier = 4;

function approach(curr, target, rate) {
  return curr + (target - curr) * rate;
}

function updateLabels(dt) {
  const w = stage.clientWidth;
  const h = stage.clientHeight;
  const dist = camera.position.length();
  currentTier = tierFromDistance(dist);

  // Drive onion-shell opacities from camera distance, dimmed by τ so
  // shells dissolve in lockstep with the bipyramid as the torus forms.
  onion.update(dist, shellTauFade);

  // Vertical-cluster fade. When the camera approaches nadir or zenith
  // (looking straight down or up the y-axis), every vertical-axis label
  // collapses to nearly the same screen point. Fade them all out as a
  // function of the camera's elevation: full opacity when looking from
  // the equator (sin≈±0), zero at the poles. The curve is gentle so
  // the fade only kicks in within ≈25° of the pole.
  const camDir = camera.position.clone().sub(controls.target).normalize();
  const camElev = Math.abs(camDir.y);                    // 0 = equator, 1 = pole
  // smoothstep-out: 1 below 0.78 (≈39° elev), 0 above 0.94 (≈20° from pole)
  const verticalClusterFade = 1 - THREE.MathUtils.smoothstep(camElev, 0.78, 0.94);

  labelData.forEach(l => {
    projectV.copy(l.world).project(camera);
    const inFront = projectV.z < 1;
    const sx = (projectV.x * 0.5 + 0.5) * w;
    const sy = (-projectV.y * 0.5 + 0.5) * h;
    let dx = 0, dy = 0;
    // Screen-space label offsets. Vertical labels push to the right of
    // the y-axis line; affect labels sit below their zone; time labels
    // sit above. The vertical offset is larger (24px) than before so
    // labels don't overlap the y-axis line now that their world-space
    // x-offset has been removed.
    if      (l.axis === 'vertical') { dx = 24; dy =   0; }
    else if (l.axis === 'affect')   { dx =  0; dy =  14; }
    else if (l.axis === 'time')     { dx =  0; dy = -14; }
    if (l.id === 'being') { dx = 22; dy = -14; }
    if (l.id === 'death') { dx =  0; dy = -18; }
    if (l.id === 'birth') { dx =  0; dy =  20; }
    l.el.style.transform = `translate(${(sx + dx).toFixed(1)}px, ${(sy + dy).toFixed(1)}px) translate(-50%, -50%)`;

    const tierTarget = (l.tier <= currentTier) ? 1 : 0;
    let tauFactor;
    if (l.id === 'being')                        tauFactor = tauBeingLabelFactor;
    else if (l.tier === 1)                       tauFactor = tauLabelFactor;
    else                                         tauFactor = tauOtherLabelFactor;
    // Vertical-axis labels get the cluster-fade applied; BEING is
    // exempt because it's the centre of every view and its placement
    // above-right of the dot keeps it readable from any angle.
    const clusterFactor = (l.axis === 'vertical' && l.id !== 'being')
      ? verticalClusterFade : 1;
    const target = (inFront ? 1 : 0) * tierTarget * tauFactor * clusterFactor;
    l.visible = approach(l.visible, target, Math.min(1, dt * 6));
    l.el.style.opacity = String(l.visible);
    l.el.style.pointerEvents = l.visible < 0.2 ? 'none' : 'auto';
  });

  // Glyphs: visible only at Tier 5.
  glyphs.setTierFactor((currentTier >= 5) ? 1 : 0, dt);

  // Resonance line opacity smoothing.
  resonanceMat.opacity = approach(resonanceMat.opacity, resonanceTargetOpacity, Math.min(1, dt * 8));
}

// ============================================================
// Intro mode — the figure boots as a horn-torus tumbling on two
// axes (yaw + a slower pitch), inviting the user to click. The first
// canvas click animates τ from 1 → 0 (1.6s) so the torus visibly
// unfolds back into the bipyramid, then the welcome card fades in.
// ============================================================
let introMode = true;
document.body.classList.add('is-intro');   // CSS hook for intro-state styling (centered "click" hint)
let introTime = 0;                 // seconds since boot
const INTRO_YAW_RATE   = 0.18;     // rad/s — horizontal precession
const INTRO_PITCH_RATE = 0.07;     // rad/s — slow vertical bob (different rate → non-repeating tumble)
const INTRO_PITCH_AMP  = 0.55;     // rad — ±32° elevation swing (side ↔ above/below)
const INTRO_RADIUS     = camera.position.length();
const INTRO_BASE_PITCH = Math.asin(camera.position.y / INTRO_RADIUS);

// τ collapse animation state.
let tauTween = null;               // { from, to, dur, t, onDone? }
function tweenTau(from, to, dur, onDone) {
  tauTween = { from, to, dur, t: 0, onDone };
}
function stepTauTween(dt) {
  if (!tauTween) return;
  tauTween.t += dt;
  const k = Math.min(1, tauTween.t / tauTween.dur);
  // smoothstep eases in and out — contemplative, not snappy.
  const eased = k * k * (3 - 2 * k);
  setTau(tauTween.from + (tauTween.to - tauTween.from) * eased);
  if (k >= 1) { const cb = tauTween.onDone; tauTween = null; cb && cb(); }
}

function exitIntroMode() {
  if (!introMode) return;
  introMode = false;
  document.body.classList.remove('is-intro');
  const hint = document.getElementById('stage-hint');
  if (hint) hint.textContent = 'drag to orbit · scroll to zoom · hover a glyph to see resonances';
  // Restore the camera to a clean orbit pose so the unfolding diamond
  // reads cleanly. Lerp camera.position over the same window as τ.
  const startPos  = camera.position.clone();
  const targetPos = new THREE.Vector3(3.4, 2.0, 4.2);   // matches initial pose
  const tweenDur  = 1.6;
  let tweenT = 0;
  const introCamTween = (dt) => {
    tweenT += dt;
    const k = Math.min(1, tweenT / tweenDur);
    const eased = k * k * (3 - 2 * k);
    camera.position.lerpVectors(startPos, targetPos, eased);
    camera.lookAt(controls.target);
    if (k < 1) introCamTweenFn = introCamTween;
    else       introCamTweenFn = null;
  };
  introCamTweenFn = introCamTween;

  tweenTau(1, 0, 1.6, () => {
    // Welcome card fades in once the diamond is set.
    openIntro();
  });
}
let introCamTweenFn = null;

// ============================================================
// Animation loop
// ============================================================
const clock = new THREE.Clock();
function tick() {
  const dt = Math.min(0.05, clock.getDelta());

  if (introMode) {
    // Drive the camera on a yaw + pitch precession. Disabling controls
    // damping while we drive the camera directly avoids fighting between
    // OrbitControls and our manual orbit math.
    introTime += dt;
    const yaw   = introTime * INTRO_YAW_RATE;
    const pitch = INTRO_BASE_PITCH + INTRO_PITCH_AMP * Math.sin(introTime * INTRO_PITCH_RATE);
    const cp    = Math.cos(pitch), sp = Math.sin(pitch);
    const cy    = Math.cos(yaw),   sy = Math.sin(yaw);
    camera.position.set(
      INTRO_RADIUS * cp * sy,
      INTRO_RADIUS * sp,
      INTRO_RADIUS * cp * cy,
    );
    camera.lookAt(controls.target);
  } else {
    if (introCamTweenFn) introCamTweenFn(dt);
    if (isRotating) {
      const dist = camera.position.distanceTo(controls.target);
      controls.autoRotateSpeed = rotateSpeedForDistance(dist);
    }
    controls.update();
  }

  stepTauTween(dt);
  updateLabels(dt);
  renderer.render(scene, camera);
  requestAnimationFrame(tick);
}

// ============================================================
// Readings UI — render the spatial sections and the bibliography.
// ============================================================
function escapeHTML(s) { return String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function escapeAttr(s) { return escapeHTML(s).replace(/`/g, '&#96;'); }

function renderReadings() {
  if (!readingsRoot) return;
  readingsRoot.innerHTML = READINGS.map(s => `
    <details class="reading-block ${s.id === 'begin-here' ? 'reading-begin' : ''}" id="block-${s.id}" ${s.open ? 'open' : ''}>
      <summary><span class="reading-summary-title">${s.title}</span></summary>
      <div class="reading-body">${s.body}</div>
    </details>
  `).join('');

  readingsRoot.querySelectorAll('.src-entry').forEach(div => {
    const id = div.id.replace(/^src-/, '');
    const s = sourceById(id);
    if (s && hasResonances(s)) {
      const dot = document.createElement('span');
      dot.className = 'resonance-mark';
      dot.title = `resonates with: ${s.resonances.join(', ')}`;
      const name = div.querySelector('.src-name');
      if (name) name.prepend(dot);
    }
  });

  readingsRoot.querySelectorAll('a.source-ref').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      handleSourceClick(a.dataset.sourceId);
    });
  });

  // Layer 1.a — thematic-section accordion exclusivity.
  // Opening a thematic section closes the other thematic sections,
  // so the page never balloons to its full 28K-pixel height.
  // The bibliography (sources-index) and glossary stay independent,
  // because readers frequently bounce between a thematic reading
  // and the bibliography, and the glossary is a reference panel.
  const PERSISTENT_SECTIONS = new Set(['block-sources-index', 'block-glossary']);
  readingsRoot.querySelectorAll(':scope > details').forEach(d => {
    d.addEventListener('toggle', () => {
      if (!d.open) return;
      if (PERSISTENT_SECTIONS.has(d.id)) return;
      readingsRoot.querySelectorAll(':scope > details').forEach(other => {
        if (other === d) return;
        if (PERSISTENT_SECTIONS.has(other.id)) return;
        if (other.open) other.open = false;
      });
    });
  });
}
renderReadings();

// ============================================================
// Floating "return to model" button — appears once the user scrolls
// past the stage and disappears once they're back in view of it.
// Click smooth-scrolls back to the top of the stage element.
// ============================================================
const returnBtn = document.getElementById('return-to-model');
if (returnBtn && stage) {
  returnBtn.removeAttribute('hidden');
  // IntersectionObserver fires whenever the stage's visibility changes;
  // we treat “less than 25% in view” as “the user has scrolled away”.
  const io = new IntersectionObserver(([entry]) => {
    const visible = entry.intersectionRatio < 0.25;
    returnBtn.classList.toggle('is-visible', visible);
  }, { threshold: [0, 0.25, 0.5, 0.75, 1] });
  io.observe(stage);
  returnBtn.addEventListener('click', () => {
    stage.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// ============================================================
// Intro overlay — Begin / × / backdrop close, info button reopens.
// Markup carries data-close="intro" on every dismiss surface.
// ============================================================
const introOverlay = document.getElementById('intro-overlay');
const infoBtn      = document.getElementById('info-btn');
function closeIntro() { introOverlay?.classList.remove('is-visible'); }
function openIntro()  { introOverlay?.classList.add('is-visible'); }
introOverlay?.querySelectorAll('[data-close="intro"]').forEach(el => {
  el.addEventListener('click', (e) => { e.stopPropagation(); closeIntro(); });
});
infoBtn?.addEventListener('click', openIntro);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && introOverlay?.classList.contains('is-visible')) closeIntro();
});

// ============================================================
// Boot
// ============================================================
resize();
// Boot directly into intro mode: torus form, dual-axis precession, and
// the welcome overlay hidden. The first canvas click triggers the
// unfolding animation → the welcome card.
introOverlay?.classList.remove('is-visible');
setTau(1);
setRotating(false);
tick();

// Debug hook
window.__diamond = {
  controls, camera, scene, setTau, setRotating,
  glyphs, showResonanceFor, hideResonance,
  buildHoverFor, sourceById,
  ZONE_POSITIONS,
};
