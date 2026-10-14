// ============================================================
// geometry.js — bipyramid (12 edges) ⇄ horn-torus (R = r = √φ/2), declarative.
//
// The Diamond has THREE perpendicular axes meeting at BEING.
// Its skeleton is a SQUARE BIPYRAMID (octahedron stretched on y):
//   • 4 equator vertices  Love (+x), Hate (−x), Future (+z), Past (−z)
//   • 2 apices            Obliteration (+y · √φ), Awakening (−y · √φ)
//   • 8 edges             each equator vertex → both apices
//
// Each edge is tessellated into N segments and bowed outward toward
// the horn-torus profile as τ rises 0 → 1. At τ = 0 each edge is a
// straight chord; at τ = 1 each edge is the corresponding meridian
// quarter-arc of the horn torus (R = r = 1, axis = y).
//
// Onion shells: four concentric translucent SphereGeometry layers
// at radii 1, 1/φ, 1/φ², 1/φ³, with camera-distance fade bands.
//
// Breath rule: a square-bipyramid edge runs equator (radius 1) → apex
// (radius √φ ≈ 1.272). Its closest point to BEING is the equator
// vertex itself, distance 1. So no edge enters the breath zone — the
// rule is a no-op for the bipyramid skeleton. The breath rule still
// matters for resonance lines and the time-axis dashes; those are
// handled in app.js by clipping segments inside Shell 1.
// ============================================================

import * as THREE from 'three';
import { LineGeometry }  from 'three/addons/lines/LineGeometry.js';
import { LineMaterial }  from 'three/addons/lines/LineMaterial.js';
import { Line2 }         from 'three/addons/lines/Line2.js';

import { PHI, PHI_HALF, SHELLS } from './coordinates.js';

// Horn torus, apex-preserving: R = r = √φ / 2.
// The defining horn condition R = r makes the tube's inner edge meet at
// the origin — a single cusp at BEING, the singular point through which
// every meridian passes. Choosing R = r = √φ/2 preserves the diamond's
// vertical reach: the apices of the bipyramid (Awakening / Obliteration
// at ±√φ) collapse onto BEING at τ=1, and the equator opens to √φ — the
// same scale as the apex height. So the morph deflates nothing: the
// bipyramid's full vertical extent is folded inward through the centre.
const TORUS_R   = PHI_HALF / 2;   // major radius R = √φ / 2 ≈ 0.636
const TORUS_r   = PHI_HALF / 2;   // minor radius r = √φ / 2 (horn condition R = r)
const BIPY_TIP  = PHI_HALF;       // √φ ≈ 1.272

// ------------------------------------------------------------
// φ-shell radii, declaratively. SHELLS = [1/φ, 1/φ², 1/φ³].
// ------------------------------------------------------------
const SHELL3 = SHELLS[0];   // 0.618
const SHELL2 = SHELLS[1];   // 0.382
const SHELL1 = SHELLS[2];   // 0.236

// ============================================================
// Profile math (carried over from v3, applied per-edge now).
//
// Both surfaces are axisymmetric about y. A meridian profile is a
// pair of functions (r(s), y(s)) for s ∈ [0, 1] where s = 0 is the
// upper apex, s = 0.5 is the equator, s = 1 is the lower apex.
//
//   bipy(s):  triangular tent — straight chord apex → equator → apex
//   torus(s): outer half of horn torus (R = r = 1)
// ============================================================
const bipy = s => ({
  y: BIPY_TIP * (1 - 2 * s),
  r: 1.0      * (1 - Math.abs(1 - 2 * s)),
});

// Ring-torus meridian: s ∈ [0, 1] maps θ: π/2 → −π/2 across the OUTER
// half of the tube. y(θ) = r·sin(θ), ρ(θ) = R + r·cos(θ).
// At s = 0 (top): point sits at (R, +r·1·… wait the equator is at s=0.5).
//   s = 0   → (ρ = R,    y = +r)   top of tube on outer side? — see below
//   s = 0.5 → (ρ = R+r, y = 0)     outermost equator
//   s = 1   → (ρ = R,    y = −r)
// We want the meridian to span ALL the way around the tube cross-section
// so the torus closes. Use the full inner+outer meridian by mapping
// s linearly across θ ∈ [π, −π] when grid-drawing; for the bipy edges
// we keep the outer half (apex → equator) since edges only need to land
// on the outer surface to read as the diamond's frame morphing outward.
const torus = s => {
  // Outer half meridian: θ goes π/2 → −π/2 as s goes 0 → 1.
  const theta = Math.PI / 2 - s * Math.PI;
  return {
    y: TORUS_r * Math.sin(theta),
    r: TORUS_R + TORUS_r * Math.cos(theta),
  };
};

// Full meridian (used by the torus grid only) — sweeps the entire tube
// cross-section so the donut renders as a closed surface with a hole.
// s ∈ [0, 1] maps θ: π → −π, tracing inner-top → outer-top → inner-bottom
// → and back. We split into two meridian-walks per grid line so the line
// closes on itself when drawn.
const torusFullMeridian = (s, tau) => {
  // Bipy reference at this s (we slide from bipy → full ring as τ rises).
  // For the full meridian we walk θ ∈ [π/2, π/2 − 2π], which traces the
  // ENTIRE tube circle once. The bipy reference is the corresponding
  // outer-half profile evaluated at s' = the equivalent meridian-fraction.
  const theta = Math.PI / 2 - s * 2 * Math.PI;
  const yRing =  TORUS_r * Math.sin(theta);
  const rRing =  TORUS_R + TORUS_r * Math.cos(theta);
  // For the bipy reference, map s back into [0,1] of the outer-half so the
  // morph stays sane: at τ = 0 every grid sample collapses to the bipy.
  const sBipy = (s < 0.5) ? (s * 2) : ((1 - s) * 2);
  const a = bipy(sBipy);
  return {
    y: a.y + (yRing - a.y) * tau,
    r: a.r + (rRing - a.r) * tau,
  };
};

// Outer-half profile — used by the 8 bipyramid edges. Edges morph from
// straight chord (apex → equator) to the OUTER half of the ring torus,
// so the diamond's silhouette opens into the outer face of the donut.
export const profile = (s, tau) => {
  const a = bipy(s), b = torus(s);
  return { y: a.y + (b.y - a.y) * tau, r: a.r + (b.r - a.r) * tau };
};

// Full-meridian profile — used by the torus grid for closed donut lines.
export const profileFullMeridian = torusFullMeridian;

// ============================================================
// Bipyramid skeleton — 8 Line2 fat-line edges.
//
// Each equator vertex sits at azimuth φ_v in the (x, z) plane.
// We index the 4 equator vertices as v ∈ {0,1,2,3}:
//
//     v=0 → Love    (+x)   φ = 0
//     v=1 → Future  (+z)   φ = π/2
//     v=2 → Hate    (−x)   φ = π
//     v=3 → Past    (−z)   φ = 3π/2
//
// Each edge runs from one of these to one of the two apices
// (sign = +1 above, −1 below). 8 edges total.
// ============================================================
export const EQUATOR = Object.freeze([
  { id: 'love',   azimuth: 0           },
  { id: 'future', azimuth: Math.PI / 2 },
  { id: 'hate',   azimuth: Math.PI     },
  { id: 'past',   azimuth: 3 * Math.PI / 2 },
]);

export const APICES = Object.freeze([
  { id: 'obliteration', sign: +1 },
  { id: 'awakening',    sign: -1 },
]);

// All 8 apex→equator edges as a declarative pair list.
const APEX_EDGES = (() => {
  const out = [];
  for (const eq of EQUATOR) for (const ap of APICES) out.push({ eq, ap });
  return out;
})();

// 4 equatorial-belt edges that close the bipyramid into a proper square
// bipyramid: Love → Future → Hate → Past → Love. Each belt edge runs
// between two adjacent equator vertices in the y = 0 plane.
//
// At τ = 0 the belt is a straight chord between two unit-radius points
// (passing inside, midpoint radius = cos(π/4) ≈ 0.707).
// At τ = 1 the belt becomes a quarter-arc of the torus's outer equator,
// radius R + r = √φ ≈ 1.272, also at y = 0.
//
// We parametrise each belt by u ∈ [0, 1] going from start vertex to end
// vertex. The chord and the arc share the same azimuth-span; only the
// radial profile differs.
const BELT_EDGES = (() => {
  const out = [];
  const n = EQUATOR.length;
  for (let i = 0; i < n; i++) {
    out.push({ a: EQUATOR[i], b: EQUATOR[(i + 1) % n] });
  }
  return out;
})();

/**
 * Build the 8-edge bipyramid skeleton with τ-morph and breath-rule
 * vertex alpha. Uses Line2 fat-lines for crisp pixel-width strokes.
 *
 * @param {Object} opts
 * @param {Number} opts.segments     - per-edge tessellation (default 32)
 * @param {Number} opts.color        - hex (default 0x383c44)
 * @param {Number} opts.opacity      - line opacity (default 0.30)
 * @param {Number} opts.linewidth    - in screen pixels (default 2.0)
 *
 * @returns {{
 *   group: THREE.Group,
 *   setMorph: (tau:number) => void,
 *   setOpacity: (op:number) => void,
 *   setResolution: (w:number,h:number) => void,
 * }}
 */
export function buildBipyramidEdges({
  segments = 32,
  color = 0x383c44,
  opacity = 0.30,
  linewidth = 2.0,
} = {}) {
  const group = new THREE.Group();
  group.name  = 'bipyramid-edges';

  // Helper: build a Line2 with N+1 vertices.
  const makeLine = (userData) => {
    const positions = new Float32Array((segments + 1) * 3);
    const geo = new LineGeometry();
    geo.setPositions(positions);
    const mat = new LineMaterial({
      color,
      linewidth,                     // pixels
      transparent:     true,
      opacity,
      depthWrite:      false,
      vertexColors:    false,
      alphaToCoverage: false,
      dashed:          false,
      worldUnits:      false,        // pixel-width
    });
    mat.resolution.set(window.innerWidth || 1280, window.innerHeight || 800);
    const line = new Line2(geo, mat);
    line.computeLineDistances();
    line.userData = { ...userData, positions, geo, mat };
    group.add(line);
    return line.userData;
  };

  // 8 apex-edges + 4 belt-edges = 12 edges total (proper square bipyramid).
  const apexEntries = APEX_EDGES.map(({ eq, ap }) => makeLine({ kind: 'apex', eq, ap }));
  const beltEntries = BELT_EDGES.map(({ a, b })   => makeLine({ kind: 'belt', a, b }));
  const lineEntries = [...apexEntries, ...beltEntries];

  // Belt-edge radial profile: lerp between straight chord (τ=0) and the
  // torus outer-equator arc (τ=1). u ∈ [0, 1] runs along the belt from
  // vertex A (azimuth φ_a) to vertex B (azimuth φ_b = φ_a + π/2).
  //
  //   τ = 0 (chord): straight line between two unit-radius points.
  //                  Endpoints stay on radius 1; midpoint radius = √2/2.
  //   τ = 1 (arc):   on the torus's outer equator, radius R + r = √φ,
  //                  at constant y = 0.
  const TORUS_OUTER_R = TORUS_R + TORUS_r;        // √φ
  const beltPoint = (azA, azB, u, tau) => {
    // Chord endpoints in the (x, z) plane.
    const xA = Math.cos(azA), zA = Math.sin(azA);
    const xB = Math.cos(azB), zB = Math.sin(azB);
    const xC = xA + (xB - xA) * u;                // straight chord
    const zC = zA + (zB - zA) * u;
    // Arc point on the torus outer equator (radius √φ).
    const azArc = azA + (azB - azA) * u;
    const xT = TORUS_OUTER_R * Math.cos(azArc);
    const zT = TORUS_OUTER_R * Math.sin(azArc);
    return {
      x: xC + (xT - xC) * tau,
      y: 0,
      z: zC + (zT - zC) * tau,
    };
  };

  // -------- API --------
  function setMorph(tau) {
    const t = Math.max(0, Math.min(1, tau));
    for (const e of lineEntries) {
      const { kind, positions, geo } = e;
      if (kind === 'apex') {
        const { eq, ap } = e;
        const cosA = Math.cos(eq.azimuth);
        const sinA = Math.sin(eq.azimuth);
        // Edge runs apex (s=apexS) → equator (s=0.5).
        const apexS = (ap.sign > 0) ? 0.0 : 1.0;
        for (let i = 0; i <= segments; i++) {
          const u = i / segments;
          const s = apexS + (0.5 - apexS) * u;
          const { y, r } = profile(s, t);
          positions[i*3 + 0] = r * cosA;
          positions[i*3 + 1] = y;
          positions[i*3 + 2] = r * sinA;
        }
      } else {
        // belt edge: equator vertex A → equator vertex B in the y=0 plane.
        const { a, b } = e;
        // Use the shorter arc direction. Adjacent equator vertices are
        // π/2 apart; we always go positive azimuth (CCW) since the
        // declarative list orders them that way.
        let azA = a.azimuth, azB = b.azimuth;
        if (azB < azA) azB += 2 * Math.PI;        // wrap past→love crossing
        for (let i = 0; i <= segments; i++) {
          const u = i / segments;
          const p = beltPoint(azA, azB, u, t);
          positions[i*3 + 0] = p.x;
          positions[i*3 + 1] = p.y;
          positions[i*3 + 2] = p.z;
        }
      }
      geo.setPositions(positions);
    }
  }

  function setOpacity(op) {
    for (const e of lineEntries) e.mat.opacity = op;
  }

  function setResolution(w, h) {
    for (const e of lineEntries) e.mat.resolution.set(w, h);
  }

  setMorph(0);

  return { group, setMorph, setOpacity, setResolution };
}

// ============================================================
// Breath rule — a single function applied to any line type.
// alpha = 0 inside `inner`, 1 beyond `outer`, smoothstep between.
// ============================================================
export function breathAlpha(distFromOrigin, inner = SHELL1, outer = SHELL1 + 0.084) {
  if (distFromOrigin <= inner) return 0;
  if (distFromOrigin >= outer) return 1;
  const t = (distFromOrigin - inner) / (outer - inner);
  return t * t * (3 - 2 * t);   // smoothstep
}

// ============================================================
// Axis line — a single principal axis (vertical, affect, or time)
// rendered as TWO Line2 fat segments with a small breath gap around
// BEING so the centre stays luminous and uncrowded.
//
// `direction` is a unit-vector THREE.Vector3.
// `length` is the half-length along the axis (e.g. 1.0 for sphere,
// PHI for vertical Birth-Death which extends to the off-sphere poles).
// ============================================================
export function buildAxis(direction, length, {
  breathInner = SHELL1,
  color       = 0x8c5a2b,
  opacity     = 0.55,
  linewidth   = 1.6,
} = {}) {
  const group = new THREE.Group();
  group.name  = 'axis';
  const dir = direction.clone().normalize();
  const mats = [];

  const make = (start, end) => {
    const a = dir.clone().multiplyScalar(start);
    const b = dir.clone().multiplyScalar(end);
    const geo = new LineGeometry();
    geo.setPositions([a.x, a.y, a.z, b.x, b.y, b.z]);
    const mat = new LineMaterial({
      color, linewidth, transparent: true, opacity,
      depthWrite: false, vertexColors: false,
      alphaToCoverage: false, dashed: false, worldUnits: false,
    });
    mat.resolution.set(window.innerWidth || 1280, window.innerHeight || 800);
    const line = new Line2(geo, mat);
    line.computeLineDistances();
    group.add(line);
    mats.push(mat);
  };

  make(-length, -breathInner);
  make( breathInner, length);

  return {
    group, mats,
    setOpacity(op) { for (const m of mats) m.opacity = op; },
    setResolution(w, h) { for (const m of mats) m.resolution.set(w, h); },
  };
}

// ============================================================
// Bipyramid ⇄ horn-torus grid — dense translucent ribbed surface.
//
// The grid is a surface of revolution whose meridian profile IS the
// shared profile(s, tau) used by the 8 bipyramid edges. So at τ = 0
// the grid lies exactly on the bipyramid surface (every parallel a
// horizontal slice of the tent), at τ = 1 it is the full horn torus.
// As τ climbs the apices spread, the cone hollows, the donut forms.
//
// Parametrisation:
//   s ∈ [0, 1]  — meridian arclength parameter (0 = top apex, 1 = bottom apex)
//   u ∈ [0, 2π) — azimuth around the y axis
//   {y(s, τ), r(s, τ)} = profile(s, τ)
//   point(s, u, τ) = (r cos u, y, r sin u)
//
// Meridians: M lines at constant u, s swept across [0, 1].
// Parallels: P lines at constant s, u swept across [0, 2π).
// All lines share one material so opacity is a single assignment.
// All positions are rewritten in place each setMorph(τ) call.
// ============================================================
export function buildTorusGrid({
  meridians   = 24,
  parallels   = 16,
  segments    = 64,
  color       = 0x383c44,
  opacity     = 0,
  linewidth   = 1.0,
} = {}) {
  const group = new THREE.Group();
  group.name  = 'torus-grid';

  const mat = new LineMaterial({
    color, linewidth, transparent: true, opacity,
    depthWrite: false, vertexColors: false,
    alphaToCoverage: false, dashed: false, worldUnits: false,
  });
  mat.resolution.set(window.innerWidth || 1280, window.innerHeight || 800);

  // Pre-compute parallel s-values. With the full-meridian mapping the
  // critical s-values are s = 0.25 (outer equator at y=0) and s = 0.75
  // (inner equator — a cusp at the origin under the horn condition R=r).
  // To keep the bold middle rib aligned with the centre, sample at j/P
  // so the canonical equator s=0.25 (and its inner counterpart s=0.75)
  // are hit exactly when P is a multiple of 4.
  const parallelS = Array.from({ length: parallels }, (_, j) =>
    (j + 1) / parallels).filter(s => s < 1 && s > 0);

  // Pre-compute meridian azimuths.
  const meridianU = Array.from({ length: meridians }, (_, i) =>
    (i / meridians) * Math.PI * 2);

  // ---------- Meridian lines ----------
  const meridianEntries = meridianU.map(u => {
    const positions = new Float32Array((segments + 1) * 3);
    const geo = new LineGeometry();
    geo.setPositions(positions);
    const line = new Line2(geo, mat);
    line.computeLineDistances();
    group.add(line);
    return { u, positions, geo };
  });

  // ---------- Parallel lines ----------
  const parallelEntries = parallelS.map(s => {
    const positions = new Float32Array((segments + 1) * 3);
    const geo = new LineGeometry();
    geo.setPositions(positions);
    const line = new Line2(geo, mat);
    line.computeLineDistances();
    group.add(line);
    return { s, positions, geo };
  });

  function setMorph(tau) {
    const t = Math.max(0, Math.min(1, tau));

    // Meridians: constant u, s sweeps 0 → 1 across the FULL tube cross-
    // section (θ: π/2 → π/2 − 2π). At τ = 1 each meridian is a closed
    // circle around the tube. At τ = 0 every sample collapses to the
    // bipyramid (outer-half) so the grid lies on the bipyramid surface.
    for (const e of meridianEntries) {
      const cu = Math.cos(e.u), su = Math.sin(e.u);
      for (let j = 0; j <= segments; j++) {
        const s = j / segments;
        const { y, r } = torusFullMeridian(s, t);
        e.positions[j*3 + 0] = r * cu;
        e.positions[j*3 + 1] = y;
        e.positions[j*3 + 2] = r * su;
      }
      e.geo.setPositions(e.positions);
    }

    // Parallels: constant s, u sweeps 0 → 2π. With the full-meridian
    // mapping, parallels at s ∈ (0, 0.5) trace the upper-outer part of
    // the tube, s ∈ (0.5, 1) traces the lower-outer; the innermost
    // ring lives at s = 0 / 1 (clipped) and the outermost at s = 0.25.
    for (const e of parallelEntries) {
      const { y, r } = torusFullMeridian(e.s, t);
      for (let i = 0; i <= segments; i++) {
        const u = (i / segments) * Math.PI * 2;
        e.positions[i*3 + 0] = r * Math.cos(u);
        e.positions[i*3 + 1] = y;
        e.positions[i*3 + 2] = r * Math.sin(u);
      }
      e.geo.setPositions(e.positions);
    }
  }

  setMorph(0);                // start lying on the bipyramid surface
  group.visible = false;      // until opacity is lifted

  // Allow callers to lerp the grid colour over τ — e.g. cool edge near
  // τ = 0, gold (BEING's hue) at τ = 1, so the donut inherits the
  // luminosity that BEING was holding at its centre.
  const _tmp = new THREE.Color();
  return {
    group,
    setMorph,
    setOpacity(op) {
      mat.opacity = op;
      group.visible = op > 0.005;
    },
    setColor(hex) { mat.color.set(hex); },
    lerpColor(fromHex, toHex, k) {
      _tmp.set(fromHex).lerp(new THREE.Color(toHex), Math.max(0, Math.min(1, k)));
      mat.color.copy(_tmp);
    },
    setResolution(w, h) { mat.resolution.set(w, h); },
  };
}

// ============================================================
// Onion shells — declarative, 4 nested translucent spheres.
//
// Reveal curve: opacity = smoothstep(start → end) of camera distance,
// scaled by maxOpacity per shell. The limit sphere is faintly visible
// at all distances; inner shells appear as the camera draws inward.
//
// Rendered with side: BackSide so back-faces only — front faces would
// otherwise self-intersect when nested and produce ugly seams.
// ============================================================
// Tier-shells are scaled COPIES of the bipyramid surface (square bipyramid:
// 4 equator vertices, 2 apices), expressed as a tiny 6-vertex / 8-triangle
// solid. Each shell is the same shape scaled by its φ-tier radius, so the
// shells are concentric φ-tiers of the diamond itself — not arbitrary spheres.
//
// At radius R the bipyramid has equator vertices at distance R and apices
// at distance R · √φ (preserving the canonical apex/equator ratio).
// shape: 'sphere' for the canonical unit limit-sphere (love/hate/past/future
// sit on it; awakening/obliteration alone pierce it at ±√φ). 'bipyramid' for
// the inner φ-tier surfaces, which read as inhabitable tiers within the frame.
// Each shell carries a subtle hue so the three φ-tiers read as distinct
// strata, not as one fuzzy grey atmosphere. Hues are kept low-chroma so
// nothing overpowers the gold/magenta accents:
//   limit (sphere)  — neutral cool grey (frame of the cosmos)
//   shell-3 (outer) — faint warm sand   (the broadest interior tier)
//   shell-2 (mid)   — faint sage green  (the contemplative tier)
//   shell-1 (inner) — faint dusty mauve (the inmost tier near BEING)
//
// fadeBehavior:
//   'far-strong'  — opacity rises with camera distance (limit sphere)
//   'near-strong' — opacity rises as the camera approaches (inner shells)
export const SHELL_SPECS = Object.freeze([
  // The unit sphere — touches the four equator vertices, pierced only by
  // the apices. INVERTED curve: nearly opaque from afar so only the
  // Birth/Death tips poke out at Tier 1 zoom, dropping fast through
  // Tier 2 so the bipyramid becomes legible behind it, faint by Tier 3.
  // Stops are tuned to the tier-distance thresholds in tierFromDistance:
  //   d ≥ 8.0  Tier 1  → opacity ≈ 1.0   (sphere reads as solid)
  //   d ≈ 6.0  Tier 2  → opacity ≈ 0.30  (bipyramid + zone labels visible)
  //   d ≤ 4.5  Tier 3+ → opacity → 0    (interior fully revealed)
  { id: 'limit',   radius: 1.0,    shape: 'sphere',    color: 0xb6bcc6, maxOpacity: 0.95,
    fadeBehavior: 'far-strong', nearDist: 4.5, farDist: 8.0 },
  { id: 'shell-3', radius: SHELL3, shape: 'bipyramid', color: 0xc4bdac, maxOpacity: 0.12,
    fadeBehavior: 'near-strong', fadeStart: 5.5, fadeEnd: 4.0 },
  { id: 'shell-2', radius: SHELL2, shape: 'bipyramid', color: 0xb0bcb0, maxOpacity: 0.14,
    fadeBehavior: 'near-strong', fadeStart: 4.5, fadeEnd: 3.2 },
  { id: 'shell-1', radius: SHELL1, shape: 'bipyramid', color: 0xbcb0bc, maxOpacity: 0.16,
    fadeBehavior: 'near-strong', fadeStart: 3.6, fadeEnd: 2.6 },
]);

// Build a unit square bipyramid as a BufferGeometry: equator at radius 1
// (4 vertices in xz plane), apices at ±√φ on y. 8 faces.
function buildUnitBipyramidGeometry() {
  const a = PHI_HALF;                // √φ
  const positions = new Float32Array([
     0,  a,  0,    // 0  top apex
     0, -a,  0,    // 1  bottom apex
     1,  0,  0,    // 2  +x equator
     0,  0,  1,    // 3  +z equator
    -1,  0,  0,    // 4  -x equator
     0,  0, -1,    // 5  -z equator
  ]);
  const indices = new Uint16Array([
    // upper 4 faces (apex 0)
    0, 2, 3,   0, 3, 4,   0, 4, 5,   0, 5, 2,
    // lower 4 faces (apex 1) — reverse winding so normals point outward
    1, 3, 2,   1, 4, 3,   1, 5, 4,   1, 2, 5,
  ]);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setIndex(new THREE.BufferAttribute(indices, 1));
  geo.computeVertexNormals();
  return geo;
}

export function buildOnionShells() {
  const group = new THREE.Group();
  group.name  = 'onion-shells';

  // Two unit geometries, scaled per shell. Sphere for the limit, bipyramid
  // for the inner φ-tiers — geometry mirrors what each surface means.
  const bipyramidGeo = buildUnitBipyramidGeometry();
  const sphereGeo    = new THREE.SphereGeometry(1, 48, 32);

  const entries = SHELL_SPECS.map(spec => {
    // Limit sphere needs DoubleSide because at Tier 1 it ramps to near
    // full opacity and must read as a solid bounding shell from outside.
    // Inner bipyramid shells stay BackSide for clean translucent nesting.
    const side = (spec.id === 'limit') ? THREE.DoubleSide : THREE.BackSide;
    const mat = new THREE.MeshBasicMaterial({
      color:       spec.color,
      transparent: true,
      opacity:     0,                // set per-frame
      depthWrite:  false,
      side,
    });
    const geo = spec.shape === 'sphere' ? sphereGeo : bipyramidGeo;
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.setScalar(spec.radius);
    mesh.renderOrder = -spec.radius; // outer drawn first
    group.add(mesh);
    return { spec, mesh };
  });

  // tauFade lets the caller dim shells as the bipyramid collapses into
  // the torus — they belong to the diamond frame and should fade with it.
  // EXCEPT the limit sphere, which is the cosmological boundary and
  // should remain visible even after the bipyramid frame has dissolved
  // (so the torus still reads as bounded, not floating in nothing).
  function update(cameraDist, tauFade = 1) {
    for (const { spec, mesh } of entries) {
      let k;
      if (spec.fadeBehavior === 'far-strong') {
        // Inverted curve: opacity rises with distance. Smoothstep so
        // the Tier 1 ↔ Tier 2 transition feels like a perceptual veil
        // lifting rather than a linear ramp.
        const t = (cameraDist - spec.nearDist) / (spec.farDist - spec.nearDist);
        const u = Math.max(0, Math.min(1, t));
        k = u * u * (3 - 2 * u);
      } else {
        // Standard curve: shells appear as the camera approaches.
        const t = (spec.fadeStart - cameraDist) / (spec.fadeStart - spec.fadeEnd);
        k = Math.max(0, Math.min(1, t));
      }
      // limit sphere keeps half its presence even during the torus state
      const tauWeight = (spec.id === 'limit') ? (0.5 + 0.5 * tauFade) : tauFade;
      mesh.material.opacity = k * spec.maxOpacity * tauWeight;
    }
  }

  return { group, update, entries };
}
