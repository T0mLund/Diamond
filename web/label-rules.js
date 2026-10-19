// Display rules, not changes to the framework's coordinate partition.
// User decisions 2026-10-15. Numeric fade/zoom thresholds are display
// choices, open to revision.
import { CAMERA } from './constants.js';

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const smooth = (x, a, b) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };

// Zoom levels (user decision 2026-10-15, revised the same day):
//   0  Birth and Death, an opaque diamond in a slightly translucent
//      sphere, and Indra's net
//   1  BEING, Birth and Death; the sphere and diamond translucent
//   2  adds Permanence and Erasure
//   3  adds Craving, Hostility, Inflation and Abasement
//   4  adds the rest: the other axis points
export const LABEL_LEVEL = {
  birth: 0, death: 0, being: 1, permanence: 2, erasure: 2,
  craving: 3, hostility: 3, inflation: 3, abasement: 3,
  discernment: 4, appreciation: 4, humility: 4, dignity: 4, vitality: 4, release: 4,
  resistance: 4, wanting: 4, deference: 4, pride: 4, striving: 4, withdrawal: 4,
  insistence: 4, escape: 4,
};
// The names of the axis points: where the affect (x) and vertical (z)
// axes meet each zone's sphere. All three axes are zoned.
// Renamed 2026-10-15: Stillness (was Meditation) mirrors Acceleration;
// Meditation (was Contemplation).
export const ZONE_NAMES = [
  { x: ['Discernment', 'Appreciation'], y: ['Humility', 'Dignity'], z: ['Vitality', 'Release'] },
  { x: ['Resistance', 'Wanting'], y: ['Deference', 'Pride'], z: ['Striving', 'Withdrawal'] },
  { x: ['Hostility', 'Craving'], y: ['Abasement', 'Inflation'], z: ['Insistence', 'Escape'] },
];
// Contemplative-mandala vocabulary (proposal of 19 October 2026). The three
// spheres describe how tightly a position is held, not how much of anything
// there is. Birth, Death and BEING are unchanged.
export const SPHERE_NAMES = ['Responsiveness', 'Involvement', 'Fixation'];
export const AXIS_NAMES = {
  x: ['Rejecting', 'Grasping'], y: ['Self-diminishment', 'Self-elevation'], z: ['Insistence on continuance', 'Insistence on disappearance'],
};

// Level n is complete at LEVEL_DISTANCE[n] and fades in over the 12%
// farther out. Level 0 is the plateau at the outermost camera position.
// The levels sit a quarter farther out than in v3.3, so the names
// appear with more room around the model (user, 2026-10-15).
const SPREAD = 1.25;
export const LEVEL_DISTANCE = [CAMERA.maxDistance, 2.1 * SPREAD, 1.7 * SPREAD, 1.33 * SPREAD, 1.0 * SPREAD];
export function labelReveal(slug, distance) {
  const level = LABEL_LEVEL[slug] ?? 1;
  if (level === 0) return 1;
  const D = LEVEL_DISTANCE[level];
  return 1 - smooth(distance, D, D * 1.12);
}
export const opaqueWeight = (distance) => smooth(distance, LEVEL_DISTANCE[1], LEVEL_DISTANCE[1] * 1.12);
// Indra's net is gone at the distance where BEING begins to fade in
// (user, 2026-10-15), and fully there a little farther out.
export const BEING_BEGINS = LEVEL_DISTANCE[1] * 1.12;
export const netWeight = (distance) => smooth(distance, BEING_BEGINS, BEING_BEGINS * 1.05);

// Dimming behind the spheres. A label is behind a sphere when it lies in
// the far half of the model (beyond the plane through BEING that faces the
// camera), on or outside that sphere, and inside its outline. The dimming
// begins about 6 degrees past that plane and is complete by about 20. This
// is a rule about the model's halves, not a ray test, so it reads the same
// at every distance, the camera inside Shell 3 included. Sphere count
// contributes to a shared contrast curve: 90% after one sphere, 61.5%
// after two and 33% after three. This is not repeated multiplication:
// the old 32%-per-layer rule left only 3.3% after three spheres.
export function shellLayerOpacity(layers) {
  const n = clamp(layers, 0, 3);
  return n <= 1 ? 1 - 0.1 * n : 0.9 - (n - 1) * 0.285;
}
export function shellTransmission(camera, point, radii) {
  const c = Math.hypot(camera.x, camera.y, camera.z) || 1;
  const s = (point.x * camera.x + point.y * camera.y + point.z * camera.z) / c;
  const rho = Math.hypot(point.x, point.y, point.z);
  const across = Math.sqrt(Math.max(0, rho * rho - s * s));
  let layers = 0;
  for (const r of radii) {
    if (rho < r * 0.999) continue;
    layers += smooth(-s / rho, 0.1, 0.35) * (1 - smooth(across, r * 0.94, r * 1.02));
  }
  return { opacity: shellLayerOpacity(layers), layers };
}

// Angular label anchors: six axes, twelve plane bisectors and eight
// octant centres. Nearest-direction selection is a display convention;
// it neither changes database sub-zones nor moves the eye from BEING.
export const DIRECTIONS = [];
for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
  const n = Math.hypot(x, y, z);
  if (n) DIRECTIONS.push({ id: `${x},${y},${z}`, signs: [x, y, z], vector: [x / n, y / n, z / n] });
}
export function closestDirection(forward, previous) {
  const score = (d) => d.vector[0] * forward.x + d.vector[1] * forward.y + d.vector[2] * forward.z;
  let best = DIRECTIONS[0];
  for (const d of DIRECTIONS) if (score(d) > score(best)) best = d;
  if (previous && score(best) - score(previous) < 0.025) return previous;
  return best;
}
export function compoundName(zoneIndex, signs) {
  const [x, y, z] = signs;
  const names = ZONE_NAMES[zoneIndex];
  const parts = [];
  if (x) parts.push(names.x[x > 0 ? 1 : 0]);
  if (y) parts.push(names.y[y > 0 ? 1 : 0]);
  if (z) parts.push(names.z[z > 0 ? 1 : 0]);
  return parts.join(' \u00b7 ');
}
// Narrowing moves the focus outward (user, 2026-10-15). The focus is in
// Zone 1 from the widest cone down to 118 degrees, in Zone 2 down to 66,
// and in Zone 3 below that; 3 degrees of hysteresis keep it from
// flickering at a boundary. The change itself is a short crossfade.
export const ZONE_ANGLES = [118, 66];
export function zoneForAngle(angle, previous = 0) {
  let zone = angle > ZONE_ANGLES[0] ? 0 : angle > ZONE_ANGLES[1] ? 1 : 2;
  if (Math.abs(zone - previous) === 1) {
    const edge = ZONE_ANGLES[Math.min(zone, previous)];
    if (Math.abs(angle - edge) < 3) zone = previous;
  }
  return zone;
}
export const polarWeight = (angle) => 1 - smooth(angle, 24, 40);
