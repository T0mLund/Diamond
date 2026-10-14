// ============================================================
// coordinates.js — Scheme α (φ-cascade)
//
// Every length in the model is derived from φ.
// Three concentric shells at φ⁻³, φ⁻², φ⁻¹ are the structural
// equivalence classes; vertical, affect, and any future axis
// reference them.
// ============================================================

export const PHI      = (1 + Math.sqrt(5)) / 2;   // 1.6180339887...
export const PHI_HALF = Math.sqrt(PHI);           // φ^½  — bipyramid tips

// Three φ-shells. SHELLS[n] = φ^-(n+1).
export const SHELLS = Object.freeze([1, 2, 3].map(n => 1 / PHI ** n));
//                                                ^   ^   ^
//                                          0.618  0.382  0.236

export const SPHERE_RADIUS = 1.0;       // sphere of the imaginable
export const BIPY_TIP      = PHI_HALF;  // bipyramid apex / nadir
export const BIPY_EQ       = SPHERE_RADIUS;
export const LIMIT         = PHI;       // birth / death — off-sphere limit
export const ZONE_Y        = SPHERE_RADIUS;  // awakening / obliteration on the shell

// Tier names by shell index. The same indexing serves both axes,
// so the cross-axis equivalence is a property of the data structure
// and not a coincidence to be re-stated in commentary.
//
//                        n=2 (inner)   n=1           n=0 (outer)
const VERTICAL_UP   = ['oppression', 'excitement', 'intensity'];
const VERTICAL_DOWN = ['reflection', 'meditation', 'insight'];
const AFFECT_NEG    = ['aversion',   'fear',       'hate'];
const AFFECT_POS    = ['attraction', 'desire',     'love'];

const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
const tierAt = (id, axis, i) => ({
  id, name: cap(id), shell: 2 - i, axis, kind: 'tier',
});

// VERTICAL — 13 ordered positions, top (Death, +φ) → bottom (Birth, −φ).
// y > 0 is upward toward Death.
export const VERTICAL_TIERS = [
  { id: 'death',        name: 'Death',        y:  LIMIT,       kind: 'limit',  axis: 'vertical' },
  { id: 'obliteration', name: 'Obliteration', y:  ZONE_Y,      kind: 'zone',   axis: 'vertical' },
  { id: 'tip-upper',    name: '',             y:  BIPY_TIP,    kind: 'tip',    axis: 'vertical' },
  ...VERTICAL_UP.map((id, i) => ({ ...tierAt(id, 'vertical', i), y:  SHELLS[i] })),
  { id: 'being',        name: 'BEING',        y:  0,           kind: 'center', axis: 'vertical' },
  ...VERTICAL_DOWN.map((id, i) => ({ ...tierAt(id, 'vertical', i), y: -SHELLS[i] })),
  { id: 'tip-lower',    name: '',             y: -BIPY_TIP,    kind: 'tip',    axis: 'vertical' },
  { id: 'awakening',    name: 'Awakening',    y: -ZONE_Y,      kind: 'zone',   axis: 'vertical' },
  { id: 'birth',        name: 'Birth',        y: -LIMIT,       kind: 'limit',  axis: 'vertical' },
];

// AFFECT — equatorial (x-axis). Same shells, perpendicular axis.
export const AFFECT_TIERS = [
  ...AFFECT_NEG.map((id, i) => ({ ...tierAt(id, 'affect', i), x: -SHELLS[i] })),
  ...AFFECT_POS.map((id, i) => ({ ...tierAt(id, 'affect', i), x:  SHELLS[i] })),
];

// TIME — bare. The line through ±z exists structurally so the axes
// span ℝ³ and so a later version can place trajectories on it.
export const TIME_TIERS = [];
export const TIME_AXIS_ENDPOINTS = {
  back:  { x: 0, y: 0, z: -SPHERE_RADIUS },
  front: { x: 0, y: 0, z:  SPHERE_RADIUS },
};

// All labelled elements as a flat list for the hover system.
export function allLabels() {
  return [
    ...VERTICAL_TIERS.filter(t => t.name && t.kind !== 'tip'),
    ...AFFECT_TIERS,
  ];
}
