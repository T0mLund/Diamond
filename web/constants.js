// The Diamond — Stage 1 constants.
//
// Every value is taken from Spec v3.1 and derived from φ at runtime
// (exactness rule, Spec §4.6). Nothing here is a rounded literal.

export const PHI = (1 + Math.sqrt(5)) / 2;

// §5 — the φ-cascade. Shell n has radius φ^(n − 3).
export const SHELLS = [1, 2, 3, 4, 5].map((n) => ({ n, radius: PHI ** (n - 3) }));
export const shellRadius = (n) => SHELLS[n - 1].radius;

// §3.1 – §3.2 — the nine Class-H landmarks.
//   hull: true  → a vertex of the bipyramid (convex hull, §6.22)
//   zone: null  → NULL-zoned (BEING at the origin; Birth and Death on Shell 5)
export const LANDMARKS = [
  { slug: 'heaven',       name: 'Heaven',       pos: [ 1, 0, 0],                    shell: 3,    hull: true  },
  { slug: 'hell',         name: 'Hell',         pos: [-1, 0, 0],                    shell: 3,    hull: true  },
  { slug: 'future',       name: 'Future',       pos: [ 0, 1, 0],                    shell: 3,    hull: true  },
  { slug: 'past',         name: 'Past',         pos: [ 0, -1, 0],                   shell: 3,    hull: true  },
  { slug: 'obliteration', name: 'Obliteration', pos: [ 0, 0, shellRadius(4)],       shell: 4,    hull: true  },
  { slug: 'awakening',    name: 'Awakening',    pos: [ 0, 0, -shellRadius(4)],      shell: 4,    hull: true  },
  { slug: 'being',        name: 'BEING',        pos: [ 0, 0, 0],                    shell: null, hull: false, zone: null },
  { slug: 'birth',        name: 'Birth',        pos: [ 0, 0, -shellRadius(5)],      shell: 5,    hull: false, zone: null },
  { slug: 'death',        name: 'Death',        pos: [ 0, 0, shellRadius(5)],       shell: 5,    hull: false, zone: null },
];

// Containment Note §A.3.1 — 3rd-person orbital mode.
// Inner limit: the camera must not enter Zone 1 (r ≤ φ⁻²) in Stage 1
// (Roadmap IV.1, criterion 4). A small margin keeps Shell 1's surface off
// the near clipping plane. Outer limit: Shell 5 (r = φ²), the horizon.
export const CAMERA = {
  minDistance: shellRadius(1) * 1.06,
  maxDistance: shellRadius(5),
};

// Axes run to Shell 5 so that Birth and Death sit on the Z axis line.
export const AXIS_EXTENT = shellRadius(5);
