// ============================================================
// glyphs.js — source layer (v3).
//
// Each of the 62 sources renders as a small magenta luminous
// sprite (point with a radial-gradient texture for soft glow).
// One Points object holds them all (one draw call). A picking
// raycaster identifies which glyph the cursor is over.
// ============================================================

import * as THREE from 'three';
import {
  PHI, PHI_HALF, SHELLS, SPHERE_RADIUS,
} from './coordinates.js';
import { SOURCES, POINT, slotKeyOf } from './content/sources.js';

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

// ------------------------------------------------------------
// Position generators — stateless, deterministic.
// ------------------------------------------------------------
const generators = {
  point(i, n, p) {
    const r = 0.05 + 0.025 * Math.sqrt(i + 1);
    const a = i * GOLDEN_ANGLE;
    const onAxisY = Math.abs(p.y) > 1e-3 && Math.abs(p.x) < 1e-3;
    const onAxisX = Math.abs(p.x) > 1e-3 && Math.abs(p.y) < 1e-3;
    const dx = r * Math.cos(a), dy = r * Math.sin(a);
    if (onAxisY)      return new THREE.Vector3(p.x + dx, p.y, p.z + dy);
    else if (onAxisX) return new THREE.Vector3(p.x, p.y + dx, p.z + dy);
    else              return new THREE.Vector3(p.x + dx, p.y + dy, p.z);
  },
  shell(i, n, radius) {
    const y = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(1 - y * y);
    const a = i * GOLDEN_ANGLE;
    return new THREE.Vector3(
      radius * r * Math.cos(a),
      radius * y,
      radius * r * Math.sin(a),
    );
  },
  region(i, n, name) {
    const a = i * GOLDEN_ANGLE;
    if (name === 'interstitial') {
      const r = 0.78 + 0.18 * ((i + 0.3) / n);
      const lat = Math.asin(1 - 2 * ((i * 0.61803) % 1));
      return new THREE.Vector3(
        r * Math.cos(lat) * Math.cos(a),
        r * Math.sin(lat),
        r * Math.cos(lat) * Math.sin(a),
      );
    }
    if (name === 'bipyramid_form') {
      const s = 0.18 + 0.28 * ((i + 0.4) / n);
      const radius = 1 - 2 * Math.abs(0.5 - s);
      const y = PHI_HALF * (1 - 2 * s);
      return new THREE.Vector3(
        radius * Math.cos(a), y, radius * Math.sin(a),
      );
    }
    if (name === 'tau_axis') {
      const y = 0.1 + 1.4 * ((i + 0.3) / n);
      const off = 0.04;
      return new THREE.Vector3(off * Math.cos(a), y, off * Math.sin(a));
    }
    // time_axis fallback
    const z = -SPHERE_RADIUS + (2 * SPHERE_RADIUS) * ((i + 0.5) / n);
    return new THREE.Vector3(0.04 * Math.cos(a), 0.04 * Math.sin(a), z);
  },
};

function positionFor(source, indexInSlot, slotSize) {
  const slot = source.primary;
  if (slot.type === 'point')  return generators.point(indexInSlot, slotSize, POINT[slot.coord]);
  if (slot.type === 'shell')  return generators.shell(indexInSlot, slotSize, slot.radius);
  return generators.region(indexInSlot, slotSize, slot.name);
}

// ------------------------------------------------------------
// Build a SOLID dot texture (dark purple) for the source glyphs.
// A small inner disc at full opacity, a 1-px feather to avoid alias
// jaggies, and instant alpha=0 outside. No halo, no glow.
// ------------------------------------------------------------
function makeGlowTexture(hexColor) {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const cx = size / 2;
  const r = (hexColor >> 16) & 0xff;
  const g = (hexColor >>  8) & 0xff;
  const b =  hexColor        & 0xff;
  // Solid disc: opaque core out to ~70% of the texture radius, then a tiny
  // feather to 0 alpha by ~78%. Reads as a hard purple dot.
  const grad = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx);
  grad.addColorStop(0.00, `rgba(${r},${g},${b},1)`);
  grad.addColorStop(0.70, `rgba(${r},${g},${b},1)`);
  grad.addColorStop(0.78, `rgba(${r},${g},${b},0)`);
  grad.addColorStop(1.00, `rgba(${r},${g},${b},0)`);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// ------------------------------------------------------------
// Build the layer.
// ------------------------------------------------------------
export function buildGlyphLayer({ color = 0x3a1d52, baseOpacity = 1.0 } = {}) {
  const buckets = new Map();
  for (const s of SOURCES) {
    const k = slotKeyOf(s.primary);
    if (!buckets.has(k)) buckets.set(k, []);
    buckets.get(k).push(s);
  }

  const positions = new Float32Array(SOURCES.length * 3);
  const meta = [];
  const idToIndex = new Map();

  let cursor = 0;
  for (const [, list] of buckets) {
    list.forEach((src, i) => {
      const v = positionFor(src, i, list.length);
      positions[cursor * 3]     = v.x;
      positions[cursor * 3 + 1] = v.y;
      positions[cursor * 3 + 2] = v.z;
      meta.push({ id: src.id, position: v.clone(), source: src });
      idToIndex.set(src.id, cursor);
      cursor += 1;
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const tex = makeGlowTexture(color);
  const material = new THREE.PointsMaterial({
    color: 0xffffff,             // texture provides the magenta
    map: tex,
    size: 0.12,                  // magenta glyph world size (radius ~0.018)
    sizeAttenuation: true,
    transparent: true,
    opacity: baseOpacity,
    depthWrite: false,
    // NormalBlending preserves the magenta hue against the off-white
    // light theme background; additive blending drives colors toward
    // white, which washes the glyphs out.
    blending: THREE.NormalBlending,
    alphaTest: 0.01,
  });

  const points = new THREE.Points(geometry, material);
  points.visible = true;

  // ---------- API ----------
  let currentTau = 0;
  let baseO = baseOpacity;
  let tierFactor = 0;          // smoothed 0..1 from app.js (tier-5 gating)

  return {
    object: points,
    meta,
    idToIndex,

    setTau(t) {
      currentTau = t;
      const fade = Math.max(0, 1 - t * 1.05);
      material.opacity = baseO * fade * tierFactor;
      points.visible = (material.opacity > 0.01);
    },

    // Smoothly approach a tier-5 visibility target from app.js's frame loop.
    setTierFactor(target, dt) {
      tierFactor = tierFactor + (target - tierFactor) * Math.min(1, dt * 6);
      const fade = Math.max(0, 1 - currentTau * 1.05);
      material.opacity = baseO * fade * tierFactor;
      points.visible = (material.opacity > 0.01);
    },

    setColor(hex, opacity = baseO) {
      tex.dispose();
      const t = makeGlowTexture(hex);
      material.map = t;
      baseO = opacity;
      material.needsUpdate = true;
    },

    isEnabled() { return tierFactor > 0.01; },
  };
}

// ------------------------------------------------------------
// Picking — given normalised mouse coords (NDC), return the
// hovered meta entry or null.
// ------------------------------------------------------------
export function pickGlyph(layer, raycaster, camera, ndc) {
  if (!layer.object.visible) return null;
  raycaster.setFromCamera(ndc, camera);
  raycaster.params.Points = { threshold: 0.05 };
  const hits = raycaster.intersectObject(layer.object, false);
  if (!hits.length) return null;
  return layer.meta[hits[0].index] || null;
}
