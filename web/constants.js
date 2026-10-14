// The Diamond — constants.
//
// Every value is taken from Spec v3.1 and derived from φ at runtime
// (exactness rule, Spec §4.6). Nothing here is a rounded literal.

export const PHI = (1 + Math.sqrt(5)) / 2;

// §5 — the φ-cascade. Shell n has radius φ^(n − 3).
export const SHELLS = [1, 2, 3, 4, 5].map((n) => ({ n, radius: PHI ** (n - 3) }));
export const shellRadius = (n) => SHELLS[n - 1].radius;

// Only the three zone spheres are drawn: Shells 1, 2 and 3 (user decision
// 2026-10-14: "there should just be three nested spheres visible").
// Shell 4 and Shell 5 remain radii only (the apices and the zoom horizon).
export const DRAWN_SHELLS = [1, 2, 3];

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

// Axes. X and Y end at their landmarks on Shell 3 (Heaven / Hell, Future /
// Past); Z runs through the apices to Birth and Death on Shell 5 (user
// decision 2026-10-14: the axes stop at Past / Future and Heaven / Hell).
export const AXIS_EXTENT = { x: shellRadius(3), y: shellRadius(3), z: shellRadius(5) };

// Containment Note §A.3 — one navigation, two perspectives, keyed to Shell 1.
//   r > φ⁻²  3rd-person orbit around BEING (§A.3.1), out to Shell 5.
//   r < φ⁻²  1st-person view through BEING (§A.3.2). BEING is approached
//            but never reached or passed.
export const CAMERA = {
  maxDistance: shellRadius(5),
  threshold: shellRadius(1),
  minDistance: shellRadius(1) / 12,
};

// §A.3.2 — the aperture. The viewer looks through an opening of radius
// APERTURE at BEING, so the cone's half-angle is atan(APERTURE / depth):
// close → wide, far → narrow. The radius φ⁻³ (one step further down the
// cascade than Shell 1) is a display choice, not a Spec value.
export const APERTURE = PHI ** -3;
