// The Diamond — constants.
//
// Every value is taken from Spec v3.3 and derived from φ at runtime
// (exactness rule, Spec §4.6). Nothing here is a rounded literal.

export const PHI = (1 + Math.sqrt(5)) / 2;

// §5 — the φ-cascade. Shell n has radius φ^(n − 3).
export const SHELLS = [1, 2, 3, 4, 5].map((n) => ({ n, radius: PHI ** (n - 3) }));
export const shellRadius = (n) => SHELLS[n - 1].radius;

// Only the three zone spheres are drawn: Shells 1, 2 and 3 (user decisions
// 2026-10-14: "there should just be three nested spheres visible", and
// 2026-10-15: "Shell 1, 2, 3 are the only ones that would remain visible
// under any circumstance"). Shell 4 anchors Permanence and Erasure (formerly Awakening and Obliteration) and
// Shell 5 anchors Birth and Death; neither is ever drawn.
export const DRAWN_SHELLS = [1, 2, 3];

// §3.1 – §3.2 — the seven Class-H landmarks and the two limits.
//   hull: true  → a vertex of the bipyramid (convex hull, §6.22)
//   zone: null  → NULL-zoned (BEING at the origin; Birth and Death on Shell 5)
//   limit: true → Birth and Death, a category of their own (user decision
//                 2026-10-15). Seen only from outside, never from BEING.
export const LANDMARKS = [
  { slug: 'craving',      name: 'Craving',              pos: [ 1, 0, 0],                    shell: 3,    hull: true  },
  { slug: 'hostility',    name: 'Hostility',            pos: [-1, 0, 0],                    shell: 3,    hull: true  },
  { slug: 'inflation',    name: 'Inflation',          pos: [ 0, 1, 0],                    shell: 3,    hull: true  },
  { slug: 'abasement',    name: 'Abasement',            pos: [ 0, -1, 0],                   shell: 3,    hull: true  },
  { slug: 'erasure',      name: 'Erasure',       pos: [ 0, 0, shellRadius(4)],       shell: 4,    hull: true  },
  { slug: 'permanence',   name: 'Permanence',    pos: [ 0, 0, -shellRadius(4)],      shell: 4,    hull: true  },
  { slug: 'being',        name: 'BEING',        pos: [ 0, 0, 0],                    shell: null, hull: false, zone: null },
  { slug: 'birth',        name: 'Birth',        pos: [ 0, 0, -shellRadius(5)],      shell: 5,    hull: false, zone: null, limit: true },
  { slug: 'death',        name: 'Death',        pos: [ 0, 0, shellRadius(5)],       shell: 5,    hull: false, zone: null, limit: true },
];

// Axes. X and Y end at their landmarks on Shell 3 (Craving / Hostility,
// Inflation / Abasement); Z runs through the apices to Birth and Death on Shell 5 (user
// decision 2026-10-14: the axes stop at the four equatorial landmarks).
export const AXIS_EXTENT = { x: shellRadius(3), y: shellRadius(3), z: shellRadius(5) };

// Containment Note §A.3 — one navigation, two perspectives, keyed to Shell 1.
//   r > φ⁻²  3rd-person orbit around BEING (§A.3.1), out to zoom level 0.
//   r < φ⁻²  the view from BEING (user decision 2026-10-14, replacing the
//            §A.3.2 viewer behind an aperture): zooming in past Shell 1
//            carries the eye into BEING, at the origin, facing the way it
//            was travelling. It returns along the same line to exitDistance.
// Zoom level 0 is the outermost camera position and a stop: zooming out
// ends there, and only a new zoom-out gesture goes on to the torus, level
// −1 (user decisions 2026-10-15). It lies a quarter beyond Shell 5, so
// the model has room above and below; this is a design choice, not a
// property of the framework.
export const CAMERA = {
  maxDistance: shellRadius(5) * 1.25,
  threshold: shellRadius(1),
  minDistance: shellRadius(1) * 0.8,
  exitDistance: shellRadius(1) * 1.25,
};

// The light cone from BEING (user decision 2026-10-14). The cone fills the
// screen; zoom sets its angle. maxAngle mimics human vision (the user's
// figure). Both limits are design choices that make a statement about
// experience, not measurements; minAngle is the narrowest magnification.
export const CONE = {
  minAngle: 24,
  maxAngle: 220,
};

