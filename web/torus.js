// The Diamond — the opening: a horn torus opens into the diamond.
//
// The torus is the one from the May 2026 prototype ("Graves' Diamond"):
// a horn torus (R = r = H / 2) about the Z axis. The opening follows the
// user's description of 2026-10-14:
//
//   1. Closing.  The walls of the central hole come together at the
//      centre and fuse into a line of no volume: the Z axis.
//   2. Stretching.  Birth and Death rise and descend along that line,
//      drawing Erasure and Permanence out into the apices, while the
//      round body settles onto the square bipyramid.
//
// Every curve is a point on one surface, given by a meridian parameter
// s ∈ [0, 1) (0 top, 0.25 outer equator, 0.5 bottom, 0.75 inner wall)
// and an azimuth u, at closing progress a and stretching progress b.

import * as THREE from 'three';

const lerp = THREE.MathUtils.lerp;

export function buildOpening({ equatorRadius: E, apexHeight: H, equatorAzimuths }) {
  const R = H / 2;          // major radius
  const r = H / 2;          // minor radius (horn condition R = r)

  // The square bipyramid in polar form: its equator |x| + |y| = E has
  // radius E · k(u) at azimuth u, where the vertices sit at u = 0, π/2, π, 3π/2.
  const k = (u) => 1 / (Math.abs(Math.cos(u)) + Math.abs(Math.sin(u)));

  function point(s, u, a, b, out, i) {
    const theta = Math.PI / 2 - 2 * Math.PI * s;
    const c = Math.cos(theta);
    const sn = Math.sin(theta);
    const outer = s <= 0.5;

    // 0. Torus: the tube's circular cross-section.
    const rho0 = R + r * c;
    const z0 = r * sn;
    // 1. Closed: the inner wall lies on the axis (the line of no volume);
    //    the outer wall becomes an arc that meets the axis above and below.
    const rho1 = outer ? (R + r) * Math.max(0, c) : 0;
    const z1 = r * sn;
    // 2. Diamond: straight edges from the apices to the square equator;
    //    the inner wall is the axis from Permanence to Erasure.
    let rho2;
    let z2;
    if (outer) {
      const t = 2 * s;
      z2 = H * (1 - 2 * t);
      rho2 = E * k(u) * (1 - Math.abs(1 - 2 * t));
    } else {
      const t = 2 * (s - 0.5);
      z2 = H * (2 * t - 1);
      rho2 = 0;
    }

    const rho = lerp(lerp(rho0, rho1, a), rho2, b);
    out[i] = rho * Math.cos(u);
    out[i + 1] = rho * Math.sin(u);
    out[i + 2] = lerp(lerp(z0, z1, a), z2, b);
  }

  // Polylines are written into one LineSegments buffer as vertex pairs.
  function strips(count, segments, material) {
    const positions = new Float32Array(count * segments * 6);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const lines = new THREE.LineSegments(geometry, material);
    lines.frustumCulled = false;
    return { lines, positions, geometry, segments };
  }
  const p0 = new Float32Array(3);
  const p1 = new Float32Array(3);
  function writeStrip(target, index, f) {
    const { positions, segments } = target;
    let base = index * segments * 6;
    f(0, p0, 0);
    for (let j = 1; j <= segments; j++) {
      f(j / segments, p1, 0);
      positions.set(p0, base);
      positions.set(p1, base + 3);
      base += 6;
      p0.set(p1);
    }
  }

  // The twelve edges: the outer half-meridians at the four landmark
  // azimuths (eight apex edges) and the outer equator (four belt edges).
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0x3f4248, transparent: true, opacity: 0, depthWrite: false });
  const edges = strips(equatorAzimuths.length + 1, 64, edgeMaterial);

  // The grid: 24 full meridians and 15 parallels.
  const MERIDIANS = 24;
  const parallelS = Array.from({ length: 15 }, (_, j) => (j + 1) / 16);
  const gridMaterial = new THREE.LineBasicMaterial({ color: 0xc8951a, transparent: true, opacity: 0, depthWrite: false });
  const grid = strips(MERIDIANS + parallelS.length, 96, gridMaterial);

  let last = '';
  function set(a, b) {
    const key = `${a.toFixed(4)}|${b.toFixed(4)}`;
    if (key === last) return;
    last = key;
    let n = 0;
    for (const u of equatorAzimuths) writeStrip(edges, n++, (t, out, i) => point(t * 0.5, u, a, b, out, i));
    writeStrip(edges, n, (t, out, i) => point(0.25, t * 2 * Math.PI, a, b, out, i));
    edges.geometry.attributes.position.needsUpdate = true;

    n = 0;
    for (let m = 0; m < MERIDIANS; m++) {
      const u = (m / MERIDIANS) * 2 * Math.PI;
      writeStrip(grid, n++, (t, out, i) => point(t, u, a, b, out, i));
    }
    for (const s of parallelS) writeStrip(grid, n++, (t, out, i) => point(s, t * 2 * Math.PI, a, b, out, i));
    grid.geometry.attributes.position.needsUpdate = true;
  }

  return {
    edges: edges.lines,
    edgeMaterial,
    grid: grid.lines,
    gridMaterial,
    set,
    torusHeight: r,          // the fused line first spans ±r
  };
}
