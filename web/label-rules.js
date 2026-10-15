// Display rules, not changes to the framework's coordinate partition.
// User decisions 2026-10-15. Numeric fade/zoom thresholds are preview tuning.
import { CAMERA } from './constants.js';

const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const smooth = (x, a, b) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };

export const LABEL_LEVEL = {
  birth: 0, death: 0, being: 1, awakening: 2, obliteration: 2,
  love: 3, hate: 3, acceleration: 3, meditation: 3,
  past: 4, future: 4, fear: 4, aversion: 4, attraction: 4, desire: 4,
  contemplation: 4, reflection: 4, oppression: 4, excitement: 4,
};
export const ZONE_NAMES = [
  { x: ['Aversion', 'Attraction'], z: ['Reflection', 'Oppression'] },
  { x: ['Fear', 'Desire'], z: ['Contemplation', 'Excitement'] },
  { x: ['Hate', 'Love'], z: ['Meditation', 'Acceleration'] },
];

// Five zoom levels inside the existing Shell 1 to Shell 5 camera range.
// Level n is complete at LEVEL_DISTANCE[n] and fades in over the 12%
// farther out. Level 0 is the plateau at the outer limit.
export const LEVEL_DISTANCE = [CAMERA.maxDistance, 2.1, 1.7, 1.33, 1.0];
export function labelReveal(slug, distance) {
  const level = LABEL_LEVEL[slug];
  if (!level) return 1;
  const D = LEVEL_DISTANCE[level];
  return 1 - smooth(distance, D, D * 1.12);
}
export const opaqueWeight = (distance) => smooth(distance, LEVEL_DISTANCE[1], LEVEL_DISTANCE[1] * 1.12);

// Dimming behind the spheres. A label is behind a sphere when it lies in
// the far half of the model (beyond the plane through BEING that faces the
// camera), on or outside that sphere, and inside its outline. The dimming
// begins about 6 degrees past that plane and is complete by about 20; the
// camera's own enclosing spheres do not count. Each sphere a label is behind
// transmits 32% of its contrast, so two spheres dim more than one.
export function shellTransmission(camera, point, radii) {
  const c = Math.hypot(camera.x, camera.y, camera.z) || 1;
  const s = (point.x * camera.x + point.y * camera.y + point.z * camera.z) / c;
  const rho = Math.hypot(point.x, point.y, point.z);
  const across = Math.sqrt(Math.max(0, rho * rho - s * s));
  let layers = 0;
  for (const r of radii) {
    if (rho < r * 0.999) continue;
    layers += smooth(-s / rho, 0.1, 0.35) * (1 - smooth(across, r * 0.94, r * 1.02)) * smooth(c, r, r * 1.06);
  }
  return { opacity: 0.32 ** layers, layers };
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
  const time = y === 0 ? '' : y < 0 ? 'Past' : 'Future';
  const affect = x === 0 ? '' : names.x[x > 0 ? 1 : 0];
  const vertical = z === 0 ? '' : names.z[z > 0 ? 1 : 0];
  return [time, [affect, vertical].filter(Boolean).join('-')].filter(Boolean).join(' ');
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
