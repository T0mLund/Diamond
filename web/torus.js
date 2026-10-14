// The Diamond — the τ-deformation (Spec §8.1): bipyramid ⇄ horn torus.
//
// Reinstated from the May 2026 prototype ("Graves' Diamond") as the
// opening animation (user decision 2026-10-14). The method is the
// prototype's; the proportions are the v3 bipyramid's.
//
// Both surfaces are axisymmetric about Z. A meridian profile gives a
// radius ρ(s) and a height z(s) for s ∈ [0, 1], from the upper apex
// (s = 0) through the equator (s = 0.5) to the lower apex (s = 1).
//
//   bipyramid: straight chords, equator radius E, apices at ±H
//   horn torus: R = r = H / 2, so the tube's inner edge meets at BEING
//               and the apices fold inward through the centre
//
// At τ = 0 the twelve edges lie exactly on the bipyramid's edges; at τ = 1
// they lie on the torus. The grid of meridians and parallels is invisible
// at τ = 0 and forms the torus as τ rises.

import * as THREE from 'three';

export function buildTorusMorph({ equatorRadius, apexHeight, equatorAzimuths }) {
  const E = equatorRadius;
  const H = apexHeight;
  const R = H / 2;          // major radius
  const r = H / 2;          // minor radius (horn condition R = r)

  const bipy = (s) => ({ z: H * (1 - 2 * s), rho: E * (1 - Math.abs(1 - 2 * s)) });

  // Outer half of the tube, used by the twelve edges.
  const torusOuter = (s) => {
    const t = Math.PI / 2 - s * Math.PI;
    return { z: r * Math.sin(t), rho: R + r * Math.cos(t) };
  };
  const edgeProfile = (s, tau) => {
    const a = bipy(s);
    const b = torusOuter(s);
    return { z: a.z + (b.z - a.z) * tau, rho: a.rho + (b.rho - a.rho) * tau };
  };

  // Full tube circle, used by the grid so the torus closes through BEING.
  const gridProfile = (s, tau) => {
    const t = Math.PI / 2 - s * 2 * Math.PI;
    const a = bipy(s < 0.5 ? s * 2 : (1 - s) * 2);
    const z = r * Math.sin(t);
    const rho = R + r * Math.cos(t);
    return { z: a.z + (z - a.z) * tau, rho: a.rho + (rho - a.rho) * tau };
  };

  const at = (rho, z, u, out, i) => {
    out[i] = rho * Math.cos(u);
    out[i + 1] = rho * Math.sin(u);
    out[i + 2] = z;
  };

  // Polylines are written into one LineSegments buffer as vertex pairs.
  function segmentBuffer(strips, segments) {
    const positions = new Float32Array(strips * segments * 2 * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return { positions, geometry };
  }
  function writeStrip(positions, strip, segments, point) {
    const a = new Float32Array(3);
    const b = new Float32Array(3);
    let base = strip * segments * 6;
    point(0, a, 0);
    for (let j = 1; j <= segments; j++) {
      point(j / segments, b, 0);
      positions.set(a, base);
      positions.set(b, base + 3);
      base += 6;
      a.set(b);
    }
  }

  // ── The twelve edges: eight apex edges and four belt edges ──────────
  const EDGE_SEGMENTS = 32;
  const edgeBuffer = segmentBuffer(12, EDGE_SEGMENTS);
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x3f4248, transparent: true, opacity: 0.55, depthWrite: false });
  const edges = new THREE.LineSegments(edgeBuffer.geometry, edgeMaterial);
  edges.frustumCulled = false;

  const sorted = [...equatorAzimuths].sort((p, q) => p - q);

  function writeEdges(tau) {
    let strip = 0;
    for (const u of sorted) {
      for (const top of [true, false]) {
        // Apex (s = 0 or 1) → equator (s = 0.5).
        const s0 = top ? 0 : 1;
        writeStrip(edgeBuffer.positions, strip++, EDGE_SEGMENTS, (k, out, i) => {
          const { z, rho } = edgeProfile(s0 + (0.5 - s0) * k, tau);
          at(rho, z, u, out, i);
        });
      }
    }
    for (let n = 0; n < sorted.length; n++) {
      const uA = sorted[n];
      let uB = sorted[(n + 1) % sorted.length];
      if (uB <= uA) uB += 2 * Math.PI;
      // Belt: straight chord at radius E (τ = 0) → arc at R + r (τ = 1).
      writeStrip(edgeBuffer.positions, strip++, EDGE_SEGMENTS, (k, out, i) => {
        const xC = E * (Math.cos(uA) + (Math.cos(uB) - Math.cos(uA)) * k);
        const yC = E * (Math.sin(uA) + (Math.sin(uB) - Math.sin(uA)) * k);
        const u = uA + (uB - uA) * k;
        out[i] = xC + ((R + r) * Math.cos(u) - xC) * tau;
        out[i + 1] = yC + ((R + r) * Math.sin(u) - yC) * tau;
        out[i + 2] = 0;
      });
    }
    edgeBuffer.geometry.attributes.position.needsUpdate = true;
  }

  // ── The grid: 24 meridians and 15 parallels ──────────────────────────
  const MERIDIANS = 24;
  const PARALLELS = 16;
  const GRID_SEGMENTS = 64;
  const parallelS = Array.from({ length: PARALLELS - 1 }, (_, j) => (j + 1) / PARALLELS);
  const gridBuffer = segmentBuffer(MERIDIANS + parallelS.length, GRID_SEGMENTS);
  const gridMaterial = new THREE.LineBasicMaterial({ color: 0x383c44, transparent: true, opacity: 0, depthWrite: false });
  const grid = new THREE.LineSegments(gridBuffer.geometry, gridMaterial);
  grid.frustumCulled = false;
  grid.visible = false;

  function writeGrid(tau) {
    let strip = 0;
    for (let m = 0; m < MERIDIANS; m++) {
      const u = (m / MERIDIANS) * 2 * Math.PI;
      writeStrip(gridBuffer.positions, strip++, GRID_SEGMENTS, (k, out, i) => {
        const { z, rho } = gridProfile(k, tau);
        at(rho, z, u, out, i);
      });
    }
    for (const s of parallelS) {
      const { z, rho } = gridProfile(s, tau);
      writeStrip(gridBuffer.positions, strip++, GRID_SEGMENTS, (k, out, i) => at(rho, z, k * 2 * Math.PI, out, i));
    }
    gridBuffer.geometry.attributes.position.needsUpdate = true;
  }

  const ink = new THREE.Color(0x383c44);
  const gold = new THREE.Color(0xc8951a);
  let current = -1;

  function setTau(tau) {
    const t = THREE.MathUtils.clamp(tau, 0, 1);
    if (t === current) return;
    current = t;
    writeEdges(t);
    writeGrid(t);
    const ss = THREE.MathUtils.smoothstep;
    const opacity = 0.30 * ss(t, 0, 0.85) + 0.35 * ss(t, 0.6, 1);
    gridMaterial.opacity = opacity;
    gridMaterial.color.copy(ink).lerp(gold, ss(t, 0.1, 1));
    grid.visible = opacity > 0.005;
  }

  return { edges, edgeMaterial, grid, setTau };
}
